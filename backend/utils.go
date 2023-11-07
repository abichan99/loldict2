package main

import (
	"database/sql"
	"log"
)

func Connect2DB(dbServerLocation string) (*sql.DB, error) {
	db, err := sql.Open("mysql", dbServerLocation)
	if err != nil {
		log.Fatalf("cnt %v", err)
	}
	err = db.Ping()
	if err != nil {
		log.Fatal(err)
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
