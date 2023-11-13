// エラーのログ出力はmain関数内ではなく呼び出される関数のほうで出力する
package main

import (
	"html/template"
	"io"
	"log"
	"os"
	"strconv"

	"net/http"

	"golang.org/x/crypto/acme/autocert"

	_ "github.com/go-sql-driver/mysql"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}

func main() {
	// ログファイルの出力先をセット
	f, err := os.OpenFile("./logFile.log", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		log.Printf("error opening logFile.log: %v", err)
	}
	defer f.Close()
	log.SetOutput(f)

	// mode==deployの時http認証を行う。
	// 認証取得に上限あるためいったんdeploy環境でも認証機能使わないようにしとく(mode=devにしとく)
	mode := "dev"

	// データベースサーバーに接続する文が書かれたファイルを読み込む
	dbServer, err := os.ReadFile("../dbServerLocation.txt")
	if err != nil {
		log.Printf("Cannot read dbServerLocation.txt; err: %v", err)
	}
	// 開発環境の時はlocalhostのデータベース使う。
	var dbServerLocation string
	if mode == "dev" {
		dbServerLocation = "root:abichan99@tcp(localhost:3306)/loldictdb"
	} else {
		dbServerLocation = string(dbServer[:])
	}

	e := echo.New()
	e.Static("/static", "../frontend/app/static")
	if mode == "deploy" {
		// https認証（実際に動くかはまだ試してない）
		e.AutoTLSManager.HostPolicy = autocert.HostWhitelist("www.loldictkrjp.ap-northeast-1.elasticbeanstalk.com/")
		e.AutoTLSManager.Cache = autocert.DirCache("/var/www/.cache")
	}
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	if mode == "deploy" {
		// https認証（実際に動くかはまだ試してない）
		e.Pre(middleware.HTTPSWWWRedirect())
	}
	e.Debug = true
	// link this program with index.html
	renderer := &Template{
		templates: template.Must(template.New("funcmap").Funcs(funcMap).ParseFiles("../frontend/app/templates/index.html")),
	}
	e.Renderer = renderer

	e.GET("/", func(c echo.Context) error {
		var (
			translations []translationForm
			errorMessage []errMessage
		)
		// params of c.render(c.render renders index.html with given parameters)
		data := make(map[string]interface{})
		db, err := Connect2DB(dbServerLocation)
		if err != nil {
			log.Printf("got error in /: %v", err)
			return c.String(http.StatusBadRequest, "Cannot connect to database")
		}
		// elements of autocompletion which is used for searching translations in the loldict website
		keywordList, err := pullKeywordListFromDB(db)
		if err != nil {
			log.Printf("got error in /: %v", err)
			return c.String(http.StatusBadRequest, "Cannot pull keywords")
		}

		keyword := c.QueryParam("keyword")
		data["registeredWords"] = keywordList
		data["translations"] = translations
		data["errorMessage"] = errorMessage

		// render the loldict website with translations when clients search for translations
		if keyword != "" {
			translations, err = pullTranslationFromDB(db, keyword)
			if err != nil {
				log.Printf("got error in /: %v", err)
				return c.String(http.StatusBadRequest, "Cannot find translations")
			}
			data["translations"] = translations
			// show error message if no translation found
			if len(translations) == 0 {
				db.Close()
				tmp := errMessage{ErrMessage: "등록되지 않은 단어입니다: " + keyword}
				errorMessage = append(errorMessage, tmp)
				data["errorMessage"] = errorMessage
				return c.Render(http.StatusOK, "index.html", data)
			}
		}

		db.Close()
		return c.Render(http.StatusOK, "index.html", data)
	})
	// TODO: postに直す
	e.GET("/increaseGoodNum", func(c echo.Context) error {
		db, err := Connect2DB(dbServerLocation)
		if err != nil {
			log.Printf("got error in /increaseGoodNum %v", err)
			return c.String(http.StatusBadRequest, "Cannot connect to database")
		}
		tmp := c.QueryParam("id")
		id, err := strconv.Atoi(tmp)
		if err != nil {
			log.Printf("in /increaseGoodNum, strconv.Atoi(%v) returned error: %v", tmp, err)
		}
		increaseGoodNum(db, id)
		db.Close()
		return c.String(http.StatusOK, "")
	})

	// TODO: postに直す
	e.GET("/increaseBadNum", func(c echo.Context) error {
		db, err := Connect2DB(dbServerLocation)
		if err != nil {
			log.Printf("got error in /increaseBadNum %v", err)
			return c.String(http.StatusBadRequest, "Cannot connect to database")
		}
		tmp := c.QueryParam("id")
		id, err := strconv.Atoi(tmp)
		if err != nil {
			log.Printf("in /increaseGadNum, strconv.Atoi(%v) returned error: %v", tmp, err)
		}
		increaseBadNum(db, id)
		db.Close()
		return c.String(http.StatusOK, "")
	})

	// register the posted data to db
	e.POST("/register", func(c echo.Context) (err error) {
		var r registrationForm
		if err = c.Bind(&r); err != nil {
			log.Printf("in /register, c.Bind(%v) returned error: %v", &r, err)
			return c.String(http.StatusBadRequest, "Cannot register")
		}

		db, err := Connect2DB(dbServerLocation)
		if err != nil {
			log.Printf("got error in /register: %v", err)
			return c.String(http.StatusBadRequest, "Cannot connect to database")
		}

		id, err := registerTranslation(db, r.WordKr, r.WordJp, r.Description)
		_ = id // avoid unused error
		if err != nil {
			log.Printf("got error in /register: %v", err)
			return c.String(http.StatusBadRequest, "cannot register")
		}
		db.Close()
		return c.String(http.StatusOK, "등록 성공~")
	})

	httpPort := os.Getenv("PORT")
	if httpPort == "" {
		if mode == "deploy" {
			httpPort = "443"
			e.Logger.Fatal(e.StartAutoTLS(":443"))
		} else {
			httpPort = "5000"
			e.Logger.Fatal(e.Start(":" + httpPort))
		}
	}
}
