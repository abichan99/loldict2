"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const store2localStorage_1 = require("../../src/utils/store2localStorage");
const testTools_1 = require("../testTools");
(0, globals_1.describe)("test move2end", () => {
    const validKeywordsAry = [
        "Banana",
        "Orange",
        "Apple",
        "Mango",
        "Berry",
    ];
    const keyword = "Mango";
    (0, globals_1.test)("正常動作", () => {
        const retVal = (0, store2localStorage_1.move2end)(validKeywordsAry, keyword);
        (0, globals_1.expect)(retVal).toBe("Banana,Orange,Apple,Berry,Mango");
    });
});
(0, globals_1.describe)("test removeOldestAndAdd", () => {
    const validKeywordsAry = [
        "word1",
        "word2",
        "word3",
        "word4",
        "word5",
        "word6",
        "word7",
        "word8",
        "word9",
        "word10",
    ];
    const keyword = "Mango";
    (0, globals_1.test)("正常動作", () => {
        const retVal = (0, store2localStorage_1.removeOldestAndAdd)(validKeywordsAry, keyword);
        (0, globals_1.expect)(retVal).toBe("word2,word3,word4,word5,word6,word7,word8,word9,word10,Mango");
    });
});
(0, globals_1.describe)("test store2localStorage", () => {
    (0, globals_1.test)("keywordがinvalidな時", () => {
        testStore2localStorage([undefined, "invalid@"], null);
    });
    (0, globals_1.test)("searchingHistoryがundefinedの時", () => {
        testStore2localStorage([undefined, "keyword"], "keyword");
    });
    (0, globals_1.test)("searchingHistoryの文字列が空の時", () => {
        testStore2localStorage(["", "keyword"], "keyword");
    });
    (0, globals_1.test)("searchingHistoryに単語が一つしかなく、その単語が検索されたとき", () => {
        testStore2localStorage(["keyword", "keyword"], "keyword");
    });
    (0, globals_1.test)("すでにsearchingHistoryにある単語を検索した時", () => {
        testStore2localStorage(["word1,word2,word3,word4", "word2"], "word1,word3,word4,word2");
    });
    (0, globals_1.test)("searchingHistoryが満タンな状態で、含まれていない単語を検索した時", () => {
        testStore2localStorage([
            "word1,word2,word3,word4,word5,word6,word7,word8,word9,word10",
            "word11",
        ], "word2,word3,word4,word5,word6,word7,word8,word9,word10,word11");
    });
    (0, globals_1.test)("searchingHistoryに含まれていない単語を検索した時", () => {
        testStore2localStorage(["word1,word2,word3,word4,word5,word6", "word7"], "word1,word2,word3,word4,word5,word6,word7");
    });
});
/**
 *
 * @param cond arg0: serachingHistoryとして設定する文字列 arg1: 検索履歴に登録する単語(must be a string)
 * @param exp store2localStorage関数を実行した後のsearchingHistoryの値の予測値
 */
function testStore2localStorage(cond, exp) {
    if (cond[0] === undefined) {
        (0, testTools_1.createMockLocalStorage)({ searchingHistory: cond[0] });
    }
    else {
        window.localStorage.setItem("searchingHistory", cond[0]);
    }
    (0, store2localStorage_1.store2localStorage)(cond[1]);
    (0, globals_1.expect)(window.localStorage.getItem("searchingHistory")).toBe(exp);
}
