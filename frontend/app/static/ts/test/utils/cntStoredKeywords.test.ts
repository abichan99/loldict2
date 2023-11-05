import { describe, expect, test } from "@jest/globals";
import { cntStoredKeywords } from "../../src/utils/cntStoredKeywords";

describe("test cntStoredKeywords", () => {
  test("検索履歴が空の時", () => {
    testCntStoredKeywords("", 0);
  });
  test("検索履歴が1つの時", () => {
    testCntStoredKeywords("word1", 1);
  });
  test("検索履歴が複数の時", () => {
    testCntStoredKeywords("word1,word2", 2);
  });
});

/**
 *
 * @param cond searchingHistoryとして設定する文字列
 * @param exp cntStoredKeywords関数の戻り値の予測値
 */
function testCntStoredKeywords(cond: string, exp: number) {
  localStorage.setItem("searchingHistory", cond);
  expect(cntStoredKeywords()).toBe(exp);
}
