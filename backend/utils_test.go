// データベースの住所は変えず、データベースの内容の削除や既存の内容の変更もできる限りしないこと。
// もし内容を変更するなら、テストコードに影響が出ないように変更する。
package main

import (
	"database/sql"
	"log"
	"os"
	"reflect"
	"testing"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

var dbServerLocation string
var db *sql.DB

func init() {
	// 環境に合わせてdbサーバーの住所を切り替え
	// 開発環境か本番環境かを設定
	err := godotenv.Load(".env")
	if err != nil {
		log.Printf("Error loading .env file' %v", err)
	}
	// データベースサーバーに接続する文が書かれたファイルを読み込む
	dbServer, err := os.ReadFile("../dbServerLocation.txt")
	if err != nil {
		log.Printf("Cannot read dbServerLocation.txt; err: %v", err)
	}
	mode := os.Getenv("MODE")
	if mode == "dev_container" {
		dbServerLocation = "root:abichan99@tcp(lol_dict_db:3306)/loldictdb"
	} else if mode == "dev_localhost" {
		dbServerLocation = "root:abichan99@tcp(localhost:3306)/loldictdb"
	} else if mode == "production" {
		dbServerLocation = string(dbServer[:])
	} else {
		log.Println("err in .env: set the correct mode, available mode: production, dev_container, dev_localhost")
	}
	db, _ = Connect2DB(dbServerLocation)
}

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

func TestRegisterTranslation(t *testing.T) {
	id, err := registerTranslation(db, "sthKr", "sthJp", "description")
	if err != nil {
		t.Fatal(err)
	}
	// 登録した訳語を削除
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
	// デモデータ登録
	registerTranslation(db, "demoKr", "demoJp", "description")
	keyword := "demoKr"
	expect := translationForm{"demoJp", "description", 0, 0, 18} // id(最後の要素)は適当
	translation, err := pullTranslationFromDB(db, keyword)
	if err != nil {
		t.Fatal(err)
	}
	if !(checkEqualityTranslation(translation[0], expect)) {
		t.Fatalf("got %v, expected: %v", translation[0], expect)
	}
	// 追加したデータを削除
	_, err = db.Exec(
		"DELETE FROM translations WHERE wordKr = ?",
		keyword,
	)
	if err != nil {
		t.Fatalf("failed to make back the modified data, err: %v", err)
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
	// デモデータ登録
	registerTranslation(db, "abundantKr", "abundantJp1", "description")
	registerTranslation(db, "abundantKr", "abundantJp2", "description")
	// 一つのkeywordに対して複数の訳語が登録されているとき、それらを格納したリストを返すことを期待
	keyword := "abundantKr"
	expected0 := translationForm{"abundantJp1", "description", 0, 0, 19} // id(最後の要素)は適当
	expected1 := translationForm{"abundantJp2", "description", 0, 0, 20} // id(最後の要素)は適当
	translations, err := pullTranslationFromDB(db, keyword)
	both_match := (checkEqualityTranslation(expected0, translations[0]) && checkEqualityTranslation(expected1, translations[1]))
	if err != nil {
		t.Fatal(err)
	}
	if !both_match {
		t.Logf("got %v, expected %v", translations[0], expected0)
		t.Fatalf("got %v, expected %v", translations[1], expected1)
	}
	// 追加したデータを削除
	_, err = db.Exec(
		"DELETE FROM translations WHERE wordKr = ?",
		keyword,
	)
	if err != nil {
		t.Fatalf("failed to make back the modified data, err: %v", err)
	}
}

func TestIncreaseGoodNum_noErrExpected(t *testing.T) {
	keyword := "goodNumKr"
	// デモデータ登録
	registerTranslation(db, keyword, "goodNumJp", "description")
	// id取得
	translations, _ := pullTranslationFromDB(db, keyword)
	id := translations[0].Id
	err := increaseGoodNum(db, id)
	if err != nil {
		t.Fatal(err)
	}
	expect := translationForm{"goodNumJp", "description", 1, 0, id}
	translation, err := pullTranslationFromDB(db, keyword)
	if err != nil {
		t.Fatal(err)
	}
	if expect != translation[0] || err != nil {
		t.Fatalf("got %v, expected %v", translation[0], expect)
	}
	// 追加したデータを削除
	_, err = db.Exec(
		"DELETE FROM translations WHERE wordKr = ?",
		keyword,
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
	// デモデータ登録
	keyword := "badNumKr"
	registerTranslation(db, keyword, "badNumJp", "description")
	// id取得
	translations, _ := pullTranslationFromDB(db, keyword)
	id := translations[0].Id
	err := increaseGoodNum(db, id)
	if err != nil {
		t.Fatal(err)
	}
	expect := translationForm{"badNumJp", "description", 1, 0, id}
	translation, err := pullTranslationFromDB(db, keyword)
	if err != nil {
		t.Fatal(err)
	}
	if expect != translation[0] || err != nil {
		t.Fatalf("got %v, expected %v", translation[0], expect)
	}
	// 追加したデータを削除
	_, err = db.Exec(
		"DELETE FROM translations WHERE wordKr = ?",
		keyword,
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

func checkEqualityTranslation(translation translationForm, expect translationForm) bool {
	// id以外すべて一致する場合trueを返す
	return (reflect.DeepEqual(translation.WordJp, expect.WordJp) &&
		reflect.DeepEqual(translation.Description, expect.Description) &&
		reflect.DeepEqual(translation.Good, expect.Good) &&
		reflect.DeepEqual(translation.Bad, expect.Bad))
}
