"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cntStoredKeywords = void 0;
/**
 * localStorageのsearchingHistoryに保存されている単語の数を検索
 * @returns searchingHistoryに保存されている単語の数
 */
function cntStoredKeywords() {
    const searchingHistory = localStorage.getItem("searchingHistory");
    let numStoredKeywords = 0;
    if (!!searchingHistory && searchingHistory !== "undefined") {
        numStoredKeywords = searchingHistory.split(",").length;
    }
    return numStoredKeywords;
}
exports.cntStoredKeywords = cntStoredKeywords;
