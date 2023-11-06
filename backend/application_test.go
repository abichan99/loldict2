package main

import (
	"testing"

	_ "github.com/go-sql-driver/mysql"
)

// テスト用のローカルデータベース
var dbServerLocation = "root:abichan99@tcp(localhost:3306)/loldictdb"

func TestConnect2DB(t *testing.T) {
	db, err := Connect2DB(dbServerLocation)
	if err != nil {
		t.Fatalf(`Connect2DB(%q): got err %v, expected nil`, dbServerLocation, err)
	}
	t.Log(db.Exec("select * from translations"))
}
