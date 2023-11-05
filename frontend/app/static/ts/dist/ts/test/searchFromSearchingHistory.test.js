"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-useless-concat */
const searchFromSearchingHistory_1 = require("../src/searchFromSearchingHistory");
const src_1 = require("../src");
const testTools_1 = require("./testTools");
(0, testTools_1.loadHTML)();
(0, testTools_1.mockWindowHref)();
const homeUrl = "url";
// test追加時の注意：searchingHistoryに保存された単語がinvalidなことは基本的にはないので、invalidな値の処理には
// そこまでこだわらなくてもいい
describe("test searchFromSearchingHistory", () => {
    test("invliadな値で検索した時", () => {
        // displaySearchingHistoryするとlocalStorage.searchingHistory内のinvalidな単語は表示されない
        // ので以下のようにしてinvalidな値のhtmlを直接代入
        document.getElementById("searchingHistoryField").innerHTML = "<div id='searched-word0'>" + "<button>invalid@</button>" + "</div>";
        testSearchFromSearchingHistory(["word1,invalid@,word3,word4", "searched-word0"], ["word1,invalid@,word3,word4", "http://dummy.com"]);
    });
    test("validな値で検索した時", () => {
        window.localStorage.setItem("searchingHistory", "word1,word2,word3,word4");
        (0, src_1.displaySearchingHistory)();
        testSearchFromSearchingHistory(["word1,word2,word3,word4", "searched-word2"], ["word1,word3,word4,word2", `${homeUrl}?keyword=word2`]);
    });
    test("searchingHistoryに単語が一つしかないとき", () => {
        window.localStorage.setItem("searchingHistory", "word1");
        (0, src_1.displaySearchingHistory)();
        testSearchFromSearchingHistory(["word1", "searched-word0"], ["word1", `${homeUrl}?keyword=word1`]);
    });
});
/**
 * @param cond arg0: csv形式の検索履歴, arg1: 検索履歴のうち、検索に用いる単語のボタン要素のid
 * @param exp arg0: SearchFromSearchingHistory関数実行後のsearchingHistoryの予測値,
 * arg1: SearchFromSearchingHistory関数実行後のwindow.location.hrefの予測値
 */
function testSearchFromSearchingHistory(cond, exp) {
    var _a;
    window.localStorage.setItem("searchingHistory", cond[0]);
    (0, searchFromSearchingHistory_1.searchFromSearchingHistory)(homeUrl);
    const wordBtn = (_a = document.getElementById(cond[1])) === null || _a === void 0 ? void 0 : _a.childNodes[0]; // invalidな値html要素のid
    wordBtn.click();
    expect(window.location.href).toBe(exp[1]);
    expect(window.localStorage.getItem("searchingHistory")).toBe(exp[0]);
}
