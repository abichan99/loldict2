// TODO: エラー出た時の画面表示工夫する
// エラーのログ出力はmain関数内ではなく呼び出される関数のほうで出力する
package main

import (
	"database/sql"
	"html"
	"html/template"
	"io"
	"log"
	"os"
	"strconv"

	"net/http"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type Template struct {
	templates *template.Template
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}

func main() {
	// 開発環境か本番環境かを設定
	err := godotenv.Load(".env")
	if err != nil {
		log.Printf("Error loading .env file' %v", err)
	}
	mode := os.Getenv("MODE")

	// ログファイルの出力先をセット
	f, err := os.OpenFile("./logFile.log", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		log.Printf("error opening logFile.log: %v", err)
	}
	defer f.Close()
	log.SetOutput(f)

	// 環境に合わせてdbサーバーの住所を切り替え
	var dbServerLocation string
	if mode == "dev_container" {
		dbServerLocation = "operator:abichan99@tcp(lol_dict_db:3306)/loldictdb"
	} else if mode == "dev_localhost" {
		dbServerLocation = "operator:abichan99@tcp(localhost:3306)/loldictdb"
	} else if mode == "production" {
		dbServerLocation = "operator:abichan99@tcp(lol_dict_db:3306)/loldictdb"
	} else {
		log.Printf("err in .env: set the correct mode, available mode: production, dev_container, dev_localhost, got %v", mode)
	}
	// データベースに接続
	db, err := Connect2DB(dbServerLocation)
	if err != nil {
		log.Println(err)
		return
	}

	e := echo.New()
	// e.Use(middleware.CSRF())
	e.Use(middleware.CSRFWithConfig(middleware.CSRFConfig{
		TokenLookup:    "cookie:_csrf",
		CookieHTTPOnly: true,
		CookieSameSite: http.SameSiteStrictMode,
	}))
	e.Use(middleware.SecureWithConfig(middleware.SecureConfig{
		XFrameOptions:      "DENY", // anti-clickjacking
		ContentTypeNosniff: "nosniff",
		// ContentSecurityPolicy: "default-src 'self' 'unsafe-inline'; script-src 'self' https://cdn.tailwindcss.com 'sha256-EA3gDGGMY6TzHC5ikQyy1nqDhftHaEpPOl6ODKAFglY=' 'sha256-MCMB52Tm7CY2mMuDY9FeH78r35sfA37sR7tfdHFvQ1s=' 'sha256-xBRs1St98+DjL2AHmJNA+zAIEdQSkKPFPpOr3g2vlSU=';",
	}))
	e.Static("/static", "../frontend/app/static")
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Debug = true
	// テンプレートの設定
	renderer := &Template{
		templates: template.Must(template.New("funcmap").Funcs(funcMap).ParseFiles("../frontend/app/templates/index.html")),
	}
	e.Renderer = renderer

	e.GET("/", func(c echo.Context) error {
		return homePage(c, db)
	})
	e.POST("/increaseGoodNum", func(c echo.Context) error {
		return incGood(c, db)
	})
	e.POST("/increaseBadNum", func(c echo.Context) error {
		return incBad(c, db)
	})
	// register the posted data to db
	e.POST("/register", func(c echo.Context) (err error) {
		return register(c, db)
	})
	httpPort := os.Getenv("PORT")
	if httpPort == "" {
		httpPort = "5000"
		e.Logger.Fatal(e.Start(":" + httpPort))
	}
}

func register(c echo.Context, db *sql.DB) (err error) {
	var r registrationForm
	if err = c.Bind(&r); err != nil {
		log.Printf("in /register, c.Bind(%v) returned error: %v", &r, err)
		return c.String(http.StatusBadRequest, "Cannot register")
	}
	id, err := registerTranslation(db, r.WordKr, r.WordJp, r.Description)
	_ = id // avoid unused error
	if err != nil {
		log.Printf("got error in /register: %v", err)
		return c.String(http.StatusBadRequest, "cannot register")
	}
	return c.String(http.StatusOK, "등록 성공~")
}

func incGood(c echo.Context, db *sql.DB) (err error) {
	var params postParams
	if err = c.Bind(&params); err != nil {
		log.Printf("in /increaseGoodNum, c.Bind(%v) returned error: %v", &params, err)
		return nil
	}
	id, err := strconv.Atoi(params.DbID)
	if err != nil {
		log.Printf("in /increaseGoodNum, strconv.Atoi(%v) returned error: %v", params.DbID, err)
	}
	increaseGoodNum(db, id)
	return c.String(http.StatusOK, "")
}

func incBad(c echo.Context, db *sql.DB) (err error) {
	var params postParams
	if err = c.Bind(&params); err != nil {
		log.Printf("in /increaseBadNum, c.Bind(%v) returned error: %v", &params, err)
		return nil
	}
	id, err := strconv.Atoi(params.DbID)
	if err != nil {
		log.Printf("in /increaseGadNum, strconv.Atoi(%v) returned error: %v", params.DbID, err)
	}
	increaseBadNum(db, id)
	return c.String(http.StatusOK, "")
}

func homePage(c echo.Context, db *sql.DB) error {
	var (
		translations []translationForm
		errorMessage []errMessage
	)
	// params of c.render(c.render renders index.html with given parameters)
	data := make(map[string]interface{})
	// elements of autocompletion which is used for searching translations in the loldict website
	keywordList, err := pullKeywordListFromDB(db)
	if err != nil {
		log.Printf("got error in /: %v", err)
		return c.String(http.StatusBadRequest, "Cannot pull keywords")
	}

	keywordEscaped := html.EscapeString(c.QueryParam("keyword"))
	data["registeredWords"] = keywordList
	data["translations"] = translations
	data["errorMessage"] = errorMessage

	// render the loldict website with translations when clients search for translations
	if keywordEscaped != "" {
		translations, err = pullTranslationFromDB(db, keywordEscaped)
		if err != nil {
			log.Printf("got error in /: %v", err)
			return c.String(http.StatusBadRequest, "Cannot find translations")
		}
		data["translations"] = translations
		// show error message if no translation found
		if len(translations) == 0 {
			tmp := errMessage{ErrMessage: "등록되지 않은 단어입니다: " + keywordEscaped}
			errorMessage = append(errorMessage, tmp)
			data["errorMessage"] = errorMessage
			return c.Render(http.StatusOK, "index.html", data)
		}
	}
	return c.Render(http.StatusOK, "index.html", data)
}
