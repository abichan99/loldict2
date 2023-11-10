// データベースの住所は変えず、データベースの内容の削除や既存の内容の変更もできる限りしないこと。
// もし内容を変更するなら、テストコードに影響が出ないように変更する。
package main

import (
	"reflect"
	"testing"

	_ "github.com/go-sql-driver/mysql"
)

// テスト用のローカルデータベース
var dbServerLocation = "root:abichan99@tcp(localhost:3306)/loldictdb"

func TestConnect2DB_noErrExpected(t *testing.T) {
	_, err := Connect2DB(dbServerLocation)
	if err != nil {
		t.Fatal(err)
	}
}

func TestConnect2DB_invalidDBlocation(t *testing.T) {
	invalidDBlocation := "root:abichan9@tcp(localhost:3306)/loldictdb"
	_, err := Connect2DB(invalidDBlocation)
	if err == nil {
		t.Fatal("got no err, expected invalid db location error")
	}
}

// 上のテストでdbへの接続が確認できたので、グローバルに使ってコードの重複減らす
var db, _ = Connect2DB(dbServerLocation)

func TestRegisterTranslation(t *testing.T) {
	id, err := registerTranslation(db, "sthKr", "sthJp", "description")
	if err != nil {
		t.Fatal(err)
	}
	// 修正されたデータを元に戻す
	_, err = db.Exec(
		"DELETE FROM translations WHERE id = ?",
		id,
	)
	if err != nil {
		t.Fatalf("failed to make back the modified data, err: %v", err)
	}
}

func TestPullKeywordListFromDB(t *testing.T) {
	_, err := pullKeywordListFromDB(db)
	if err != nil {
		t.Fatal(err)
	}
}

func TestPullTranslationFromDB_noErrExpected(t *testing.T) {
	keyword := "demoKr"
	expect := translationForm{"demoJp", "descripton", 0, 0, 18}
	translation, err := pullTranslationFromDB(db, keyword)
	if err != nil {
		t.Fatal(err)
	}
	if !(reflect.DeepEqual(translation[0], expect)) {
		t.Fatalf("got %v, expected: %v", translation[0], expect)
	}
}

func TestPullTranslationFromDB_KeywordNotRegistered(t *testing.T) {
	// keywordが登録されてないときは空のリストを返すことを期待
	keyword := "notRegisteredKr"
	translation, err := pullTranslationFromDB(db, keyword)
	if err != nil {
		t.Fatal(err)
	}
	if len(translation) != 0 {
		t.Fatalf("got: %v, expected an empty object", translation)
	}
}

func TestPullTranslationFromDB_multipleTranslations(t *testing.T) {
	// 一つのkeywordに対して複数の訳語が登録されているとき、それらを格納したリストを返すことを期待
	keyword := "abundantKr"
	expected1 := translationForm{"abundantJp1", "description", 0, 0, 19}
	expected2 := translationForm{"abundantJp2", "description", 0, 0, 20}
	translations, err := pullTranslationFromDB(db, keyword)
	both_match := (reflect.DeepEqual(expected1, translations[0]) && reflect.DeepEqual(expected2, translations[1]))
	if err != nil {
		t.Fatal(err)
	}
	if !both_match {
		t.Logf("got %v, expected %v", translations[0], expected1)
		t.Fatalf("got %v, expected %v", translations[1], expected2)
	}
}

func TestIncreaseGoodNum_noErrExpected(t *testing.T) {
	id := 21
	err := increaseGoodNum(db, id)
	if err != nil {
		t.Fatal(err)
	}
	keyword := "goodNumKr"
	expect := translationForm{"goodNumJp", "description", 1, 0, id}
	translation, err := pullTranslationFromDB(db, keyword)
	if err != nil {
		t.Fatal(err)
	}
	if expect != translation[0] || err != nil {
		t.Fatalf("got %v, expected %v", translation[0], expect)
	}
	// 修正されたデータを元に戻す
	_, err = db.Exec(
		"UPDATE translations SET good = good - 1 WHERE id = ?",
		id,
	)
	if err != nil {
		t.Fatalf("failed to make back the modified data, err: %v", err)
	}
}

func TestIncreaseGoodNum_invalidID(t *testing.T) {
	id := 999999999999 // テスト用データベースだと合理的に存在しないid(そこまでテスト用の訳語を追加することはないと思うので)
	err := increaseGoodNum(db, id)
	if err == nil {
		t.Fatalf(`increaseGoodNum(%v, %d): got no err, expected given id not found error`, db, id)
	}
}

func TestIncreaseBadNum_noErrExpected(t *testing.T) {
	id := 23
	err := increaseBadNum(db, id)
	if err != nil {
		t.Fatal(err)
	}
	keyword := "badNumKr"
	expect := translationForm{"badNumJp", "description", 0, 1, id}
	translation, err := pullTranslationFromDB(db, keyword)
	if err != nil {
		t.Fatal(err)
	}
	if expect != translation[0] || err != nil {
		t.Fatalf("got %v, expected %v", translation[0], expect)
	}
	// 修正されたデータを元に戻す
	_, err = db.Exec(
		"UPDATE translations SET bad = bad - 1 WHERE id = ?",
		id,
	)
	if err != nil {
		t.Fatalf("failed to make back the modified data, err: %v", err)
	}
}

func TestIncreaseBadNum_invalidID(t *testing.T) {
	id := 999999999999 // テスト用データベースだと合理的に存在しないid(そこまでテスト用の訳語を追加することはないと思うので)
	err := increaseBadNum(db, id)
	if err == nil {
		t.Fatalf(`increaseBad(%v, %d): got no err, expected given id not found error`, db, id)
	}
}
