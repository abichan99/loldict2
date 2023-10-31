import { validateWord } from ".";
/**
 *
 * @param keyword 検索された単語(dbに登録されてないものも含む、一応validationする)
 * @returns keywordが追加されたcsv形式の検索履歴
 */
export function store2localStorage(keyword) {
    // local storageに保存するkeywordの最大値
    var MAX_KEYWORD_NUM = 10;
    var searchingHistory = window.localStorage.getItem("searchingHistory");
    if (!validateWord(keyword).isValid) {
        return;
    }
    var validKeyword = keyword;
    // local storageには文字列しか入力できないので、csv形式で検索ワードを保存する(単語が一つの時は先頭にコンマ書く)。
    // 検索履歴がないときの処理
    if (searchingHistory === null || searchingHistory === "") {
        window.localStorage.setItem("searchingHistory", validKeyword);
        return;
    }
    // local storageに保存されているワードをリストに保存
    var storedKeywordAry;
    if (searchingHistory.indexOf(",") === -1) {
        storedKeywordAry = [searchingHistory];
    }
    else {
        storedKeywordAry = searchingHistory.split(",");
    }
    // storedKeywordsAryの要素のうちvalidな単語だけ抽出
    var validKeywordAry = [];
    storedKeywordAry.forEach(function (word) {
        if (validateWord(word).isValid) {
            validKeywordAry.push(word);
        }
    });
    var numValidKeywords = validKeywordAry.length;
    // 検索履歴に含まれているものを検索した場合、重複を許さず該当のワードを最新の検索ワードとするように順番を入れ替える
    // ex) keyword: Mango, searchingHistory: "Banana,Orange,Apple,Mango,Berry"
    // retval: "Banana,Orange,Apple,Berry,Mango"
    if (validKeywordAry.indexOf(validKeyword) !== -1) {
        window.localStorage.setItem("searchingHistory", move2end(validKeywordAry, validKeyword));
        return;
    }
    // 保存された検索ワード数がMAX_KEYWORD_NUMを超えたときに、一番長く検索されなかったワードを捨てて最新の検索ワードを追加する
    if (numValidKeywords >= MAX_KEYWORD_NUM) {
        window.localStorage.setItem("searchingHistory", removeOldestAndAdd(validKeywordAry, validKeyword));
        return;
    }
    // 検索履歴に含まれていないワードが検索されたときはsearchingHistoryの最後尾にワードを追加
    window.localStorage.setItem("searchingHistory", "".concat(searchingHistory, ",").concat(keyword));
}
/**
 * 先頭要素(一番古く検索された単語)を削除したvalidKeywordsAryとkeywordを用いて、keywordを最新の検索単語とするcsv形式の検索履歴を返す
 *
 * @param {Array<string>} validKeywordAry 検索履歴のうちvalidなやつの配列
 * @param {string} validatedKeyword validKeywordsAryに含まれる単語
 * @returns 一番古く検索された単語を削除し、最新の単語を追加したcsv形式の検索履歴
 */
export function removeOldestAndAdd(validKeywordAry, validatedKeyword) {
    var newSearchingHistory = validKeywordAry[1];
    for (var i = 2; i < validKeywordAry.length; i++) {
        newSearchingHistory = "".concat(newSearchingHistory, ",").concat(validKeywordAry[i]);
    }
    newSearchingHistory = "".concat(newSearchingHistory, ",").concat(validatedKeyword);
    return newSearchingHistory;
}
/** keywordを最後尾の単語とするcsv形式の検索履歴を返す関数

 *  ex) keyword: Mango, validKeywordsAry: ["Banana","Orange","Apple","Mango","Berry"]

    retval: "Banana,Orange,Apple,Berry,Mango"
 *
 * @param {Array<string>} validKeywordAry 検索履歴の単語の配列。
 * @param {string} validKeyword validKeywordsAryの中に含まれる単語
 * @returns 新しく生成されたcsv形式の検索履歴
 */
export function move2end(validKeywordAry, validKeyword) {
    if (validKeywordAry.length === 1 && validKeywordAry[0] === validKeyword) {
        return validKeyword.toString();
    }
    // storedKeywordAryからkeywordを取り除く
    var index = validKeywordAry.indexOf(validKeyword);
    validKeywordAry.splice(index, 1);
    var newSearchingHistory = validKeywordAry[0];
    // 更新られたsotredKeywordAryをカンマ区切りの文字列に変換
    for (var i = 1; i < validKeywordAry.length; i++) {
        newSearchingHistory = "".concat(newSearchingHistory, ",").concat(validKeywordAry[i]);
    }
    // keywordを最後尾に追加
    newSearchingHistory = "".concat(newSearchingHistory, ",").concat(validKeyword);
    return newSearchingHistory;
}
