package main

import (
	"database/sql"
	"fmt"
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
		err = fmt.Errorf("Connect2DB(%q): got error: %v", dbServerLocation, err)
		return db, err
	}
	// 上のOpen操作だとデータベースとやり取りはできないのでPingでやり取りできるか確認
	err = db.Ping()
	if err != nil {
		err = fmt.Errorf("in Connecet2DB(%q), db.Ping() returned error: %v", dbServerLocation, err)
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
		err = fmt.Errorf("registerTranslation(%v, %q, %q, %q): got error while executing query, error: %v", db, wordKr, wordJp, description, err)
		return -1, err
	}
	// TODO: 以下のコードブロックの挙動調べる
	id, err := res.LastInsertId()
	if err != nil {
		err = fmt.Errorf("in registerTranslation(%v, %q, %q, %q): rows.Scan() returned error: %v", db, wordKr, wordJp, description, err)
		return -1, err
	}
	return id, err
}

func pullKeywordListFromDB(db *sql.DB) ([]string, error) {
	var (
		keywordList []string
		i           int = 0
	)
	// 登録されてる韓国語を全部取ってくる
	rows, err := db.Query(("select wordKr from translations"))
	if err != nil {
		err = fmt.Errorf("pullKeyowrdListFromDB(%v): got error while executing query, error: %v", db, err)
		return nil, err
	}
	defer rows.Close()

	// rowsに入ったままだと使えないのでkeywordListにrowsの要素を入れる
	for rows.Next() {
		keywordList = append(keywordList, "")
		err := rows.Scan(&keywordList[i])
		if err != nil {
			err = fmt.Errorf("in pullKeyowrdListFromDB(%v), rows.Scan() returned error: %v", db, err)
			return nil, err
		}
		i++
	}
	err = rows.Err()
	if err != nil {
		err = fmt.Errorf("in pullTranslationFromDB(%v), rows.Err() returned error: %v", db, err)
		return nil, err
	}

	return keywordList, err
}

func pullTranslationFromDB(db *sql.DB, wordKr string) (t []translationForm, err error) {
	var i int = 0
	// wordKrをキーとしてヒットした訳語を全部取ってくる
	rows, err := db.Query("select wordJp, description, good, bad, id from translations where wordKr = ?", wordKr)
	if err != nil {
		err = fmt.Errorf("pullTranslationFromDB(%v, %q): got error while executing query, error: %v", db, wordKr, err)
		return nil, err
	}
	defer rows.Close()

	// rowsに入ったままだと使えないのでtにrowsの要素を入れる
	for rows.Next() {
		// 鋳型をappend
		tmp := translationForm{WordJp: "", Description: "", Good: 0, Bad: 0, Id: 0}
		t = append(t, tmp)
		// 鋳型にクエリで得たrowsの値を代入
		err := rows.Scan(&t[i].WordJp, &t[i].Description, &t[i].Good, &t[i].Bad, &t[i].Id)
		if err != nil {
			err = fmt.Errorf("in pullTranslationFromDB(%v, %q), rows.Scan() returned error: %v", db, wordKr, err)
			return nil, err
		}
		i++
	}
	err = rows.Err()
	if err != nil {
		err = fmt.Errorf("in pullTranslationFromDB(%v, %q), rows.Err() returned error: %v", db, wordKr, err)
		return nil, err
	}
	return t, err
}

func increaseGoodNum(db *sql.DB, id int) error {
	res, err := db.Exec(
		"UPDATE translations SET good = good + 1 WHERE id = ?",
		id,
	)
	if err != nil {
		err = fmt.Errorf("increaseGoodNum(%v, %d): got error while executing query, error: %v", db, id, err)
		return err
	}
	num, err := res.RowsAffected()
	if err != nil {
		err = fmt.Errorf("in increaseGoodNum(%v, %d), res.RowsAffected() got error: %v, expected nil", db, id, err)
		return err
	}
	// データが正しく更新されてないとき(更新されてなかったり、複数の行が更新されたり)の処理
	if num != 1 {
		err = fmt.Errorf("increaseGoodNum(%v, %d): failed to update data in a proper way; number of affected rows: %d, expected 1", db, id, num)
		return err
	}
	return err
}

func increaseBadNum(db *sql.DB, id int) error {
	res, err := db.Exec(
		"UPDATE translations SET bad = bad + 1 WHERE id = ?",
		id,
	)
	if err != nil {
		err = fmt.Errorf("increaseBadNum(%v, %d): got error while executing query, error: %v", db, id, err)
		return err
	}
	num, err := res.RowsAffected()
	if err != nil {
		err = fmt.Errorf("in increaseBadNum(%v, %d), res.RowsAffected() got error: %v", db, id, err)
		return err
	}
	// データが正しく更新されてないとき(更新されてなかったり、複数の行が更新されたり)の処理
	if num != 1 {
		err = fmt.Errorf("increaseBadNum(%v, %d): failed to update data in a proper way; number of affected rows: %d, expected 1", db, id, num)
	}
	return err
}
