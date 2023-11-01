package main

import (
	"database/sql"
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

type registrationForm struct {
	WordKr      string `json:"wordKr"`
	WordJp      string `json:"wordJp"`
	Description string `json:"description"`
}

type Template struct {
	templates *template.Template
}

type translationForm struct {
	WordJp      string
	Description string
	Good        int
	Bad         int
	Id          int
}

type errMessage struct {
	ErrMessage string
}

var funcMap = map[string]interface{}{
	"createTranslationID": func(i int) string {
		return "translation" + strconv.Itoa(i)
	},
	"calculateGoodBarWidth": func(numGood, numBad int) (goodBarWidth int) {
		if numGood+numBad == 0 {
			return 50
		}
		goodBarWidth = numGood * 100 / (numGood + numBad)
		return int(goodBarWidth)
	},
	"calculateBadBarWidth": func(goodBarWidth, numBad int) (badBarWidth int) {
		badBarWidth = 100 - goodBarWidth
		return badBarWidth
	},
}

func (t *Template) Render(w io.Writer, name string, data interface{}, c echo.Context) error {
	return t.templates.ExecuteTemplate(w, name, data)
}

func main() {
	// if deploy, set https
	// 認証取得に上限あるためいったんdeploy環境でも認証機能使わないようにしとく(mode=deployにしとく)
	mode := "dev"

	tmp, err := os.ReadFile("../dbServerLocation.txt")
	if err != nil {
		log.Fatal(err)
	}
	// 開発環境の時はlocalhostのデータベース使う。
	var dbServerLocation string
	if mode == "dev" {
		dbServerLocation = "root:abichan99@tcp(localhost:3306)/loldictdb"
	} else {
		dbServerLocation = string(tmp[:])
	}

	e := echo.New()
	e.Static("/static", "../frontend/app/static")
	if mode == "deploy" {
		e.AutoTLSManager.HostPolicy = autocert.HostWhitelist("www.loldictkrjp.ap-northeast-1.elasticbeanstalk.com/")
		e.AutoTLSManager.Cache = autocert.DirCache("/var/www/.cache")
	}
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	if mode == "deploy" {
		e.Pre(middleware.HTTPSWWWRedirect())
	}
	e.Debug = true
	// link this server with index.html
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
		db, err := connectDB(dbServerLocation)
		if err != nil {
			return c.String(http.StatusBadRequest, "Cannot connect to database")
		}

		// elements of autocompletion which is used for searching translations in the loldict website
		keywordList := pullKeywordListFromDB(db)

		keyword := c.QueryParam("keyword")
		data["registeredWords"] = keywordList
		data["translations"] = translations
		data["errorMessage"] = errorMessage

		// render the loldict website with translations when clients search for translations
		if keyword != "" {
			translations = pullTranslationFromDB(db, keyword)
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

	e.GET("/increaseGoodNum", func(c echo.Context) error {
		db, err := connectDB(dbServerLocation)
		if err != nil {
			return c.String(http.StatusBadRequest, "Cannot connect to database")
		}
		tmp := c.QueryParam("id")
		id, err := strconv.Atoi(tmp)
		increaseGoodNum(db, id)
		db.Close()
		return c.String(http.StatusOK, "")
	})

	e.GET("/increaseBadNum", func(c echo.Context) error {
		db, err := connectDB(dbServerLocation)
		if err != nil {
			return c.String(http.StatusBadRequest, "Cannot connect to database")
		}
		tmp := c.QueryParam("id")
		id, err := strconv.Atoi(tmp)
		increaseBadNum(db, id)
		db.Close()
		return c.String(http.StatusOK, "")
	})

	// register the posted data to db
	e.POST("/register", func(c echo.Context) (err error) {
		var r registrationForm
		if err = c.Bind(&r); err != nil {
			return c.String(http.StatusBadRequest, "bad request")
		}

		db, err := connectDB(dbServerLocation)
		if err != nil {
			return c.String(http.StatusBadRequest, "Cannot connect to database")
		}

		id, err := registerTranslation(db, r.WordKr, r.WordJp, r.Description)
		if id == -1 {
			return c.String(http.StatusBadRequest, "cannot register to database")
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

func connectDB(dbServerLocation string) (*sql.DB, error) {
	db, err := sql.Open("mysql", dbServerLocation)
	if err != nil {
		log.Fatalf("cnt %v", err)
	}
	return db, err
}

func registerTranslation(db *sql.DB, wordKr, wordJp, description string) (int64, error) {
	res, err := db.Exec(
		"INSERT INTO translations (wordKr, wordJp, description) VALUES (?, ?, ?)",
		wordKr,
		wordJp,
		description)
	if err != nil {
		log.Fatalf("rgst %v", err)
		var id int64 = -1
		return id, err
	}

	id, err := res.LastInsertId()
	if err != nil {
		var id int64 = -1
		return id, err
	}

	return id, err
}

func pullKeywordListFromDB(db *sql.DB) []string {
	var (
		keywordList []string
		i           int = 0
	)
	rows, err := db.Query(("select wordKr from translations"))
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	for rows.Next() {
		keywordList = append(keywordList, "")
		err := rows.Scan(&keywordList[i])
		if err != nil {
			log.Fatal(err)
		}
		i++
	}
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}

	return keywordList
}

func pullTranslationFromDB(db *sql.DB, wordKr string) (t []translationForm) {
	var i int = 0

	rows, err := db.Query("select wordJp, description, good, bad, id from translations where wordKr = ?", wordKr)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	for rows.Next() {
		tmp := translationForm{WordJp: "", Description: "", Good: 0, Bad: 0, Id: 0}
		t = append(t, tmp)
		err := rows.Scan(&t[i].WordJp, &t[i].Description, &t[i].Good, &t[i].Bad, &t[i].Id)
		if err != nil {
			log.Fatal(err)
		}
		i++
	}
	err = rows.Err()
	if err != nil {
		log.Fatal(err)
	}
	return t
}

func increaseGoodNum(db *sql.DB, id int) error {
	_, err := db.Exec(
		"UPDATE translations SET good = good + 1 WHERE id = ?",
		id,
	)
	if err != nil {
		log.Fatalf("rgst %v", err)
		return err
	}
	return err
}

func increaseBadNum(db *sql.DB, id int) error {
	_, err := db.Exec(
		"UPDATE translations SET bad = bad + 1 WHERE id = ?",
		id,
	)
	if err != nil {
		log.Fatalf("rgst %v", err)
		return err
	}
	return err
}
