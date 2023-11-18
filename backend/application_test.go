package main

import (
	"bytes"
	"database/sql"
	"html/template"
	"log"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/PuerkitoBio/goquery"
	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
)

func TestHomePage(t *testing.T) {
	t.Run("韓国語の自動完成がちゃんとセットされているか", func(t *testing.T) {
		// setup
		e := echo.New()
		req := httptest.NewRequest(http.MethodGet, "/", nil)
		rec := httptest.NewRecorder()
		c := e.NewContext(req, rec)
		e.Renderer = &Template{
			templates: template.Must(template.New("funcmap").Funcs(funcMap).ParseFiles("../frontend/app/templates/index.html")),
		}
		// ハンドラ実行及びエラーチェック
		err := homePage(c, db)
		assert.NoError(t, err)

		keywordsExpect, err := pullKeywordListFromDB(db)
		if err != nil {
			log.Fatal(err)
		}
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, keywordsExpect, homePage_getKeywordsFromHTML(rec.Body))
	})
	t.Run("存在するキーワードで検索した時", func(t *testing.T) {
		checkNumTranslations("우르곳", t) // 訳語が一つ
		checkNumTranslations("한2", t)  // 訳語が複数個
	})
	t.Run("訳語が登録されていないとき", func(t *testing.T) {
		keyword := "dgasdflfjk"
		// setup
		e := echo.New()
		req := httptest.NewRequest(http.MethodGet, "/?keyword="+keyword, nil)
		rec := httptest.NewRecorder()
		c := e.NewContext(req, rec)
		e.Renderer = &Template{
			templates: template.Must(template.New("funcmap").Funcs(funcMap).ParseFiles("../frontend/app/templates/index.html")),
		}
		// ハンドラ実行及びエラーチェック
		err := homePage(c, db)
		assert.NoError(t, err)
		assert.Equal(t, http.StatusOK, rec.Code)
		assert.Equal(t, 0, homePage_cntTranslationsFromHTML(rec.Body)) // 訳語が表示されていないかチェック
		assert.Equal(t, true, containsNotFoundMsg(rec.Body))           // エラーメッセージ表示する要素があるかチェック
	})
}

func checkNumTranslations(keyword string, t *testing.T) {
	// setup
	e := echo.New()
	req := httptest.NewRequest(http.MethodGet, "/?keyword="+keyword, nil)
	rec := httptest.NewRecorder()
	c := e.NewContext(req, rec)
	e.Renderer = &Template{
		templates: template.Must(template.New("funcmap").Funcs(funcMap).ParseFiles("../frontend/app/templates/index.html")),
	}
	// ハンドラ実行及びエラーチェック
	err := homePage(c, db)
	assert.NoError(t, err)
	assert.Equal(t, http.StatusOK, rec.Code)
	assert.Equal(t, homePage_cntTranslationsFromDB(db, keyword), homePage_cntTranslationsFromHTML(rec.Body))
}

func homePage_getKeywordsFromHTML(htmlStr *bytes.Buffer) []string {
	var keywordList = []string{}
	// read html
	dest := bytes.Buffer{}
	dest.Write(htmlStr.Bytes())
	html, err := goquery.NewDocumentFromReader(&dest)
	if err != nil {
		log.Fatal(err)
	}
	// parse auto completion list
	wrapper := html.Find("datalist#datalistOptions")
	options := wrapper.Find("option")
	// options 순회하면서 출력
	options.Each(func(idx int, option *goquery.Selection) {
		val, _ := option.Attr("value")
		keywordList = append(keywordList, val)
	})
	return keywordList
}

func homePage_cntTranslationsFromHTML(htmlStr *bytes.Buffer) int {
	numTranslations := 0
	// read html
	dest := bytes.Buffer{}
	dest.Write(htmlStr.Bytes())
	html, err := goquery.NewDocumentFromReader(&dest)
	if err != nil {
		log.Fatal(err)
	}
	// parse auto completion list
	translations := html.Find("div.myapp-translation")
	// options 순회하면서 출력
	translations.Each(func(idx int, translation *goquery.Selection) {
		numTranslations += 1
	})
	return numTranslations
}

func homePage_cntTranslationsFromDB(db *sql.DB, wordKr string) int {
	numT := 0
	rows, err := db.Query("select wordJp, description, good, bad, id from translations where wordKr = ?", wordKr)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	// count number of translations
	for rows.Next() {
		numT += 1
	}
	return numT
}

func containsNotFoundMsg(htmlStr *bytes.Buffer) bool {
	contain := false
	// read html
	dest := bytes.Buffer{}
	dest.Write(htmlStr.Bytes())
	html, err := goquery.NewDocumentFromReader(&dest)
	if err != nil {
		log.Fatal(err)
	}
	// parse auto completion list
	errMsgDiv := html.Find("div#errMessage")
	// options 순회하면서 출력
	errMsgDiv.Each(func(idx int, option *goquery.Selection) {
		contain = true
	})
	return contain
}
