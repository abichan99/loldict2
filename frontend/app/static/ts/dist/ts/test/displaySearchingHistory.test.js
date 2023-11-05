"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
const displaySearchingHistory_1 = require("../src/displaySearchingHistory");
const testTools_1 = require("./testTools");
// loadHTML使えない
// index.html読み込んでhtmlに代入
const fs = require("fs");
const htmlStr = fs.readFileSync("app/templates/index.html", {
    encoding: "utf-8",
    flag: "r",
});
describe("test displaySearchingHistory", () => {
    test("表示するものが何もないとき", () => {
        (0, testTools_1.createMockLocalStorage)({ searchingHistory: undefined });
        document.body.innerHTML = htmlStr;
        (0, displaySearchingHistory_1.displaySearchingHistory)();
        const field = document.getElementById("searchingHistoryField");
        expect(field.innerHTML).toMatch(/ */);
    });
    test("検索履歴を1つ表示", () => {
        window.localStorage.setItem("searchingHistory", "word1");
        document.body.innerHTML = htmlStr;
        (0, displaySearchingHistory_1.displaySearchingHistory)();
        const field = document.getElementById("searchingHistoryField");
        const expected = `<div id="searched-word0" ${(0, displaySearchingHistory_1.convert2classCode)(displaySearchingHistory_1.classListDiv)}>`
            + `<button ${(0, displaySearchingHistory_1.convert2classCode)(displaySearchingHistory_1.classListBtn)}>word1</button>`
            + "</div>";
        expect(field.innerHTML).toBe(expected);
    });
});
describe("test convert2classCode", () => {
    test("クラスの値がないとき", () => {
        const noClass = [];
        expect((0, displaySearchingHistory_1.convert2classCode)(noClass)).toBe("class=\"\"");
    });
    test("クラスの値が一つの時", () => {
        const singleClass = ["sth"];
        expect((0, displaySearchingHistory_1.convert2classCode)(singleClass)).toBe("class=\"sth\"");
    });
    test("クラスの値が2つ以上の時", () => {
        const multipleClasses = ["sth1", "sth2"];
        expect((0, displaySearchingHistory_1.convert2classCode)(multipleClasses)).toBe("class=\"sth1 sth2\"");
    });
});
describe("test createHtmlDisplayingSearchingHistory", () => {
    test("searchingHistoryがundefinedの時", () => {
        testCreateHtmlDisplayingSearchingHistory(undefined, "");
    });
    test("searchingHistoryが空の文字列の時", () => {
        testCreateHtmlDisplayingSearchingHistory("", "");
    });
    test("searchingHistoryにfalsy及びinvalidな単語が含まれる時", () => {
        const retValExpect = `<div id="searched-word0" ${(0, displaySearchingHistory_1.convert2classCode)(displaySearchingHistory_1.classListDiv)}>`
            + `<button ${(0, displaySearchingHistory_1.convert2classCode)(displaySearchingHistory_1.classListBtn)}>sth</button>`
            + "</div>";
        testCreateHtmlDisplayingSearchingHistory("sth,undefined,invalid@", retValExpect);
    });
    test("searchingHistoryにvalidな単語が含まれていない時", () => {
        testCreateHtmlDisplayingSearchingHistory("undefined,,invalid@", "");
    });
    test("searchingHistoryに単語が一つしかないとき", () => {
        const retValExpect = `<div id="searched-word0" ${(0, displaySearchingHistory_1.convert2classCode)(displaySearchingHistory_1.classListDiv)}>`
            + `<button ${(0, displaySearchingHistory_1.convert2classCode)(displaySearchingHistory_1.classListBtn)}>word1</button>`
            + "</div>";
        testCreateHtmlDisplayingSearchingHistory("word1", retValExpect);
    });
    test("searchingHistoryに単語が複数個あるとき", () => {
        const retValExpect = `<div id="searched-word0" ${(0, displaySearchingHistory_1.convert2classCode)(displaySearchingHistory_1.classListDiv)}>`
            + `<button ${(0, displaySearchingHistory_1.convert2classCode)(displaySearchingHistory_1.classListBtn)}>word2</button>`
            + "</div>"
            + `<div id="searched-word1" ${(0, displaySearchingHistory_1.convert2classCode)(displaySearchingHistory_1.classListDiv)}>`
            + `<button ${(0, displaySearchingHistory_1.convert2classCode)(displaySearchingHistory_1.classListBtn)}>word1</button>`
            + "</div>";
        testCreateHtmlDisplayingSearchingHistory("word1,word2", retValExpect);
    });
});
/**
 *
 * @param cond searchingHistoryとして設定する文字列
 * @param exp createHtmlDisplayingSearchingHistoryの戻り値の予測値
 */
function testCreateHtmlDisplayingSearchingHistory(cond, exp) {
    const retVal = (0, displaySearchingHistory_1.createHtmlDisplayingSearchingHistory)(cond, displaySearchingHistory_1.classListDiv, displaySearchingHistory_1.classListBtn);
    expect(retVal).toBe(exp);
}
