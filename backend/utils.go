package main

import (
	"database/sql"
	"html/template"
	"log"
	"strconv"
)

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
	// TOOD: numbad消す
	"calculateBadBarWidth": func(goodBarWidth, numBad int) (badBarWidth int) {
		badBarWidth = 100 - goodBarWidth
		return badBarWidth
	},
}

// クライアントから受け取った値を保持したりする
type registrationForm struct {
	WordKr      string `json:"wordKr"`
	WordJp      string `json:"wordJp"`
	Description string `json:"description"`
}

type Template struct {
	templates *template.Template
}

// データベースに登録されている訳語の情報を格納できたりする
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

// FIXME: dbの住所が間違ったりしてもerr変数にエラーが保存されない。。(ブラウザで開くブラウザのデフォルトのエラー出る)
// sql.Openでデータベースに接続し、Ping()でやり取りできるかも確認する
func Connect2DB(dbServerLocation string) (*sql.DB, error) {
	db, err := sql.Open("mysql", dbServerLocation)
	if err != nil {
		log.Fatalf("Connect2DB(%q) got error: %v", dbServerLocation, err)
		return db, err
	}
	// 上のOpen操作だとデータベースとやり取りはできないのでPingでやり取りできるか確認
	err = db.Ping()
	if err != nil {
		log.Fatalf("in Connecet2DB, db.Ping() got error: %v", err)
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

func pullKeywordListFromDB(db *sql.DB) ([]string, error) {
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

	return keywordList, err
}

func pullTranslationFromDB(db *sql.DB, wordKr string) (t []translationForm, err error) {
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
	return t, err
}

func increaseGoodNum(db *sql.DB, id int) (int64, error) {
	res, err := db.Exec(
		"UPDATE translations SET good = good + 1 WHERE id = ?",
		id,
	)
	if err != nil {
		log.Fatalf("increaseGoodNum(%v, %d) got error: %v, expected nil", db, id, err)
	}
	num, err := res.RowsAffected()
	if err != nil {
		log.Fatalf("in increaseGoodNum, res.RowsAffected() got error: %v, expected nil", err)
	}
	// idがデータベースに存在しないなどの理由で更新されたデータがないときの処理
	if num == 0 {
		log.Fatalf("increaseBadNum(%v, %d) failed to update data of given id: %d", db, id, id)
	}
	return num, err
}

func increaseBadNum(db *sql.DB, id int) (int64, error) {
	res, err := db.Exec(
		"UPDATE translations SET bad = bad + 1 WHERE id = ?",
		id,
	)
	if err != nil {
		log.Fatalf("rgst %v", err)
	}
	num, err := res.RowsAffected()
	if err != nil {
		log.Fatalf("in increaseBadNum, res.RowsAffected() got error: %v, expected nil", err)
	}
	// idがデータベースに存在しないなどの理由で更新されたデータがないときの処理
	if num == 0 {
		log.Fatalf("increaseBadNum(%v, %d) failed to update data of given id: %d", db, id, id)
	}
	return num, err
}
