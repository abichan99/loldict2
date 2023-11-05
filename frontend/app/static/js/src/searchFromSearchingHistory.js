"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.searchFromSearchingHistory = searchFromSearchingHistory;
var _index = require("./utils/index");
/**
 * 検索履歴の単語が押されたときにその単語を検索ワードとして訳語をサーチ。検索ワードのvalidationも行う。
 * @param homepageUrl ホームページのurl
 */
function searchFromSearchingHistory(homepageUrl) {
  var numStoredKeywords = (0, _index.cntStoredKeywords)();
  var _loop = function _loop() {
    var _document$getElementB;
    var id = "searched-word".concat(i.toString()); // 検索履歴に表示された単語それぞれのhtmlのid
    var wordBtn =
      (_document$getElementB = document.getElementById(id)) === null ||
      _document$getElementB === void 0
        ? void 0
        : _document$getElementB.children[0];
    var keyword =
      wordBtn === null || wordBtn === void 0 ? void 0 : wordBtn.innerHTML;
    wordBtn === null ||
      wordBtn === void 0 ||
      wordBtn.addEventListener("click", function () {
        if (keyword === undefined) {
          return;
        }
        // when invalid, stop sending data and display error messages on input fields
        if (!(0, _index.validateWord)(keyword).isValid) {
          return;
        }
        // store the input elem to local storage(検索履歴の単語の順番を更新)
        (0, _index.store2localStorage)(keyword);
        window.location.href = ""
          .concat(homepageUrl, "?keyword=")
          .concat(keyword);
      });
  };
  for (var i = 0; i < numStoredKeywords; i++) {
    _loop();
  }
}
