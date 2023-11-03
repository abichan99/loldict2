"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cntStoredKeywords = cntStoredKeywords;
/**
 * localStorageのsearchingHistoryに保存されている単語の数を検索
 * @returns searchingHistoryに保存されている単語の数
 */
function cntStoredKeywords() {
  var searchingHistory = localStorage.getItem("searchingHistory");
  var numStoredKeywords = 0;
  if (!!searchingHistory && searchingHistory !== "undefined") {
    numStoredKeywords = searchingHistory.split(",").length;
  }
  return numStoredKeywords;
}
