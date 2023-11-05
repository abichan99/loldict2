"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const cntStoredKeywords_1 = require("../../src/utils/cntStoredKeywords");
(0, globals_1.describe)("test cntStoredKeywords", () => {
    (0, globals_1.test)("検索履歴が空の時", () => {
        testCntStoredKeywords("", 0);
    });
    (0, globals_1.test)("検索履歴が1つの時", () => {
        testCntStoredKeywords("word1", 1);
    });
    (0, globals_1.test)("検索履歴が複数の時", () => {
        testCntStoredKeywords("word1,word2", 2);
    });
});
/**
 *
 * @param cond searchingHistoryとして設定する文字列
 * @param exp cntStoredKeywords関数の戻り値の予測値
 */
function testCntStoredKeywords(cond, exp) {
    localStorage.setItem("searchingHistory", cond);
    (0, globals_1.expect)((0, cntStoredKeywords_1.cntStoredKeywords)()).toBe(exp);
}
