import { describe, expect, test } from "@jest/globals";
import { store2localStorage, move2end, removeOldestAndAdd } from "../../src/utils/store2localStorage";
import { createMockLocalStorage } from "../testTools";

describe("test move2end", () => {
  const validKeywordsAry: Array<string> = ["Banana", "Orange", "Apple", "Mango", "Berry"];
  const keyword: string = "Mango";

  test("正常動作", () => {
    const retVal = move2end(validKeywordsAry, keyword);
    expect(retVal).toBe("Banana,Orange,Apple,Berry,Mango");
  });
});

describe("test removeOldestAndAdd", () => {
  const validKeywordsAry: Array<string> = ["word1", "word2", "word3", "word4", "word5", "word6", "word7", "word8", "word9", "word10"];
  const keyword: string = "Mango";

  test("正常動作", () => {
    const retVal = removeOldestAndAdd(validKeywordsAry, keyword);
    expect(retVal).toBe("word2,word3,word4,word5,word6,word7,word8,word9,word10,Mango");
  });
});

describe("test store2localStorage", () => {
  test("keywordがinvalidな時", () => {
    testStore2localStorage([undefined, "invalid@"], null);
  });
  test("searchingHistoryがundefinedの時", () => {
    testStore2localStorage([undefined, "keyword"], "keyword");
  });
  test("searchingHistoryの文字列が空の時", () => {
    testStore2localStorage(["", "keyword"], "keyword");
  });
  test("searchingHistoryに単語が一つしかなく、その単語が検索されたとき", () => {
    testStore2localStorage(["keyword", "keyword"], "keyword");
  });
  test("すでにsearchingHistoryにある単語を検索した時", () => {
    testStore2localStorage(["word1,word2,word3,word4", "word2"], "word1,word3,word4,word2");
  });
  test("searchingHistoryが満タンな状態で、含まれていない単語を検索した時", () => {
    testStore2localStorage(
      ["word1,word2,word3,word4,word5,word6,word7,word8,word9,word10",
        "word11"],
      "word2,word3,word4,word5,word6,word7,word8,word9,word10,word11",
    );
  });
  test("searchingHistoryに含まれていない単語を検索した時", () => {
    testStore2localStorage(
      ["word1,word2,word3,word4,word5,word6",
        "word7"],
      "word1,word2,word3,word4,word5,word6,word7",
    );
  });
});

/**
 *
 * @param cond arg0: serachingHistoryとして設定する文字列 arg1: 検索履歴に登録する単語(must be a string)
 * @param exp store2localStorage関数を実行した後のsearchingHistoryの値の予測値
 */
function testStore2localStorage(cond: (string | undefined)[], exp: string | null) {
  if (cond[0] === undefined) {
    createMockLocalStorage({ searchingHistory: cond[0] });
  } else {
    window.localStorage.setItem("searchingHistory", cond[0]);
  }
  store2localStorage((cond[1] as string));
  expect(window.localStorage.getItem("searchingHistory")).toBe(exp);
}
