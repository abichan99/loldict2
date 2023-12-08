"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchForTranslation = searchForTranslation;
exports.searchIfValid = searchIfValid;
var _index = require("./utils/index");
/** 検索ワードがvalidなときに訳語を検索、あれば表示する関数。なければないと知らせる。
 *
 * 検索ワードがinvalidな時はurl更新せずinput fieldにエラーメッセージ表示。
 * @param homepageUrl ホームページのurl
 */
function searchForTranslation(homepageUrl) {
  var _document$getElementB;
  (_document$getElementB = document.getElementById("searchingForm")) === null || _document$getElementB === void 0 || _document$getElementB.addEventListener("submit", function (event) {
    searchIfValid(event, homepageUrl);
  });
}

/**
 * 検索ワードがinvalidならエラーメッセージを表示し、validならurlを更新して訳語を検索する関数。
 * @param curUrl この関数が実行されたときのurl
 */
function searchIfValid(e, curUrl) {
  e.preventDefault();
  var elem = e.target.querySelector("#translationSearchingBar");
  var keyword = elem.value;
  var tmp = (0, _index.validateWord)(keyword);
  // when invalid, stop sending data and display error messages on input fields
  if (elem != null && !tmp.isValid) {
    elem.setCustomValidity(tmp.errMessage);
    return;
  }
  (0, _index.store2localStorage)(keyword);
  var url = "".concat(curUrl, "?keyword=").concat(keyword);
  window.location.href = url;
}
