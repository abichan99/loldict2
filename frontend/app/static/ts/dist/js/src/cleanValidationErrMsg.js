"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IDlist = void 0;
exports.cleanValidationErrMsg = cleanValidationErrMsg;
var IDlist = exports.IDlist = ["wordKrInput",
// 韓国語入力欄
"wordJpInput",
// 日本語入力欄
"descriptionInput",
// 説明入力欄
"translationSearchingBar" // 検索ワード入力欄
];

/** input要素のvalueが変わったらvalidation messageを空にする */
function cleanValidationErrMsg() {
  cleanMsg(IDlist);
}
function cleanMsg(IDlist) {
  IDlist.forEach(function (id) {
    var _document$getElementB;
    (_document$getElementB = document.getElementById(id)) === null || _document$getElementB === void 0 || _document$getElementB.addEventListener("change", function () {
      this.setCustomValidity("");
    });
  });
}
