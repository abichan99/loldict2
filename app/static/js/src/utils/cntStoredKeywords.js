/**
 * localStorageのsearchingHistoryに保存されている単語の数を検索
 * @returns searchingHistoryに保存されている単語の数
 */
export function cntStoredKeywords() {
    var searchingHistory = localStorage.getItem("searchingHistory");
    var numStoredKeywords = 0;
    if (!!searchingHistory && searchingHistory !== "undefined") {
        numStoredKeywords = searchingHistory.split(",").length;
    }
    return numStoredKeywords;
}
