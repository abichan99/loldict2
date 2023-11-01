/**
 * localStorageのsearchingHistoryに保存されている単語の数を検索
 * @returns searchingHistoryに保存されている単語の数
 */
export function cntStoredKeywords() {
    const searchingHistory = localStorage.getItem("searchingHistory");
    let numStoredKeywords = 0;
    if (!!searchingHistory && searchingHistory !== "undefined") {
        numStoredKeywords = searchingHistory.split(",").length;
    }
    return numStoredKeywords;
}
