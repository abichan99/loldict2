"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchIfValid = exports.searchForTranslation = void 0;
const index_1 = require("./utils/index");
/** 検索ワードがvalidなときに訳語を検索、あれば表示する関数。なければないと知らせる。
 *
 * 検索ワードがinvalidな時はurl更新せずinput fieldにエラーメッセージ表示。
 * @param homepageUrl ホームページのurl
 */
function searchForTranslation(homepageUrl) {
    var _a;
    (_a = document
        .getElementById("searchingForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", (event) => {
        searchIfValid(event, homepageUrl);
    });
}
exports.searchForTranslation = searchForTranslation;
/**
 * 検索ワードがinvalidならエラーメッセージを表示し、validならurlを更新して訳語を検索する関数。
 * @param curUrl この関数が実行されたときのurl
 */
function searchIfValid(e, curUrl) {
    e.preventDefault();
    const elem = e.target.querySelector("#translationSearchingBar");
    const keyword = elem.value;
    const tmp = (0, index_1.validateWord)(keyword);
    // when invalid, stop sending data and display error messages on input fields
    if (elem != null && !tmp.isValid) {
        elem.setCustomValidity(tmp.errMessage);
        return;
    }
    (0, index_1.store2localStorage)(keyword);
    const url = `${curUrl}?keyword=${keyword}`;
    window.location.href = url;
}
exports.searchIfValid = searchIfValid;
