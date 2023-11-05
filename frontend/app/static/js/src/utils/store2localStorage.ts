import { validateWord } from "./index";

/**
 *
 * @param keyword 検索された単語(dbに登録されてないものも含む、一応validationする)
 * @returns keywordが追加されたcsv形式の検索履歴
 */
export function store2localStorage(keyword: string): undefined {
  // local storageに保存するkeywordの最大値
  const MAX_KEYWORD_NUM: number = 10;
  const searchingHistory: string | null =
    window.localStorage.getItem("searchingHistory");

  if (!validateWord(keyword).isValid) {
    return;
  }
  const validKeyword: string = keyword;
  // local storageには文字列しか入力できないので、csv形式で検索ワードを保存する(単語が一つの時は先頭にコンマ書く)。
  // 検索履歴がないときの処理
  if (searchingHistory === null || searchingHistory === "") {
    window.localStorage.setItem("searchingHistory", validKeyword);
    return;
  }

  // local storageに保存されているワードをリストに保存
  let storedKeywordAry: Array<string>;
  if (searchingHistory.indexOf(",") === -1) {
    storedKeywordAry = [searchingHistory];
  } else {
    storedKeywordAry = searchingHistory.split(",");
  }
  // storedKeywordsAryの要素のうちvalidな単語だけ抽出
  const validKeywordAry: Array<string> = [];
  storedKeywordAry.forEach((word) => {
    if (validateWord(word).isValid) {
      validKeywordAry.push(word);
    }
  });
  const numValidKeywords: number = validKeywordAry.length;

  // 検索履歴に含まれているものを検索した場合、重複を許さず該当のワードを最新の検索ワードとするように順番を入れ替える
  // ex) keyword: Mango, searchingHistory: "Banana,Orange,Apple,Mango,Berry"
  // retval: "Banana,Orange,Apple,Berry,Mango"
  if (validKeywordAry.indexOf(validKeyword) !== -1) {
    window.localStorage.setItem(
      "searchingHistory",
      move2end(validKeywordAry, validKeyword),
    );
    return;
  }

  // 保存された検索ワード数がMAX_KEYWORD_NUMを超えたときに、一番長く検索されなかったワードを捨てて最新の検索ワードを追加する
  if (numValidKeywords >= MAX_KEYWORD_NUM) {
    window.localStorage.setItem(
      "searchingHistory",
      removeOldestAndAdd(validKeywordAry, validKeyword),
    );
    return;
  }

  // 検索履歴に含まれていないワードが検索されたときはsearchingHistoryの最後尾にワードを追加
  window.localStorage.setItem(
    "searchingHistory",
    `${searchingHistory},${keyword}`,
  );
}

/**
 * 先頭要素(一番古く検索された単語)を削除したvalidKeywordsAryとkeywordを用いて、keywordを最新の検索単語とするcsv形式の検索履歴を返す
 *
 * @param {Array<string>} validKeywordAry 検索履歴のうちvalidなやつの配列
 * @param {string} validatedKeyword validKeywordsAryに含まれる単語
 * @returns 一番古く検索された単語を削除し、最新の単語を追加したcsv形式の検索履歴
 */
export function removeOldestAndAdd(
  validKeywordAry: Array<string>,
  validatedKeyword: string,
): string {
  let newSearchingHistory: string = validKeywordAry[1];
  for (let i = 2; i < validKeywordAry.length; i++) {
    newSearchingHistory = `${newSearchingHistory},${validKeywordAry[i]}`;
  }
  newSearchingHistory = `${newSearchingHistory},${validatedKeyword}`;
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
export function move2end(
  validKeywordAry: Array<string>,
  validKeyword: string,
): string {
  if (validKeywordAry.length === 1 && validKeywordAry[0] === validKeyword) {
    return validKeyword.toString();
  }
  // storedKeywordAryからkeywordを取り除く
  const index: number = validKeywordAry.indexOf(validKeyword);
  validKeywordAry.splice(index, 1);
  let newSearchingHistory: string = validKeywordAry[0];
  // 更新られたsotredKeywordAryをカンマ区切りの文字列に変換
  for (let i = 1; i < validKeywordAry.length; i++) {
    newSearchingHistory = `${newSearchingHistory},${validKeywordAry[i]}`;
  }
  // keywordを最後尾に追加
  newSearchingHistory = `${newSearchingHistory},${validKeyword}`;
  return newSearchingHistory;
}
