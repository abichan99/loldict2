import { validateWord, Falsy } from "./utils/index";

export const classListDiv: Array<string> = [
  "flex",
  "justify-center",
  "items-center",
  "mx-3.5",
];
export const classListBtn: Array<string> = [
  "mx-2",
  "myapp-text",
  "break-keep",
  "hover:underline",
]; // Btnと書いているが、検索ワードを表示する役がメインであり、クリックすると飛ぶようにしたかったので仕方なくボタンにした。

/** localHistory内に作ったsearchingHistoryを使って検索履歴を表示させる関数。 */
export function displaySearchingHistory() {
  // display searching history dynamically using javascript
  // classList：wordのelementそれぞれに対する共通のクラス
  // それぞれのワードに対するdivのid：searched-word + i(iはそれぞれのワードを区別するためのもので特に取り方に意味なし、iは0～検索履歴の単語の数-1、整数)
  const searchingHistory = window.localStorage.getItem(
    "searchingHistory",
  ) as string;
  const html4searchingHistory: string = createHtmlDisplayingSearchingHistory(
    searchingHistory,
    classListDiv,
    classListBtn,
  );
  const target = document.getElementById("searchingHistoryField");
  if (html4searchingHistory !== "" && target != null) {
    target.innerHTML = html4searchingHistory;
  }
}

/**
 * 検索履歴を表示するためのhtmlコードを生成する関数。
 * 表示するものがないときはundefinedを返す。生成例は関数内のコメントを参照。
 *
 * @param {string | Falsy} searchingHistory csv形式の検索履歴
 * @param {Array<string>} classListDiv 作成するコード内のdivのクラスの値の配列
 * @param {Array<string>} classListBtn 作成するコード内のbtnのクラスの値の配列
 * @returns
 */
export function createHtmlDisplayingSearchingHistory(
  searchingHistory: string | Falsy,
  classListDiv: Array<string>,
  classListBtn: Array<string>,
): string {
  // 完成形は以下のような感じ
  // <div id="searched-word0" class="a1 a2 ...">
  //     <button class="b1 b2 ...">word1</button>
  // </div>
  // <div id="searched-word1" class="a1 a2 ...">
  //     <button class="b1 b2 ...">word2</button>
  // </div>
  // ...

  // searchingHistoryがfalsyな時は何もしない
  if (!searchingHistory) {
    return "";
  }

  // wordList：最新の検索履歴が前に来る配列
  let wordList: Array<string>;
  if (searchingHistory.indexOf(",") === -1) {
    wordList = [searchingHistory];
  } else {
    wordList = searchingHistory.split(",").reverse();
  }
  // divのidを動的生成すうための変数
  let i: number = 0;
  let retval: string = "";

  // wordListのすべての文字が表示不可条件を満たしていないときは何もしない。
  // 表示不可条件：wordがfalsyかinvalid
  const refuseDisplay = (word: string | Falsy) =>
    !word || word === "undefined" || !validateWord(word).isValid;
  if (wordList.every(refuseDisplay)) {
    return "";
  }

  // eslint-disable-next-line consistent-return
  wordList.forEach((word: string | Falsy) => {
    // ここでのreturnはfor文でのcontinueと同じ
    // wordがfalsyの時、invalidの時はわざわざ表示しない
    if (!word || word === "undefined" || !validateWord(word).isValid) {
      return "";
    }

    // それぞれのwordに対するdivにid追加
    let html: string = "<div ";
    html += `id="searched-word${i}" `;
    i += 1;

    // 引数のclassListでclass属性のコード書く
    html += `${convert2classCode(classListDiv)}>`;
    html += `<button ${convert2classCode(classListBtn)}>${word}</button>`;
    html += "</div>";

    // 単語を表示するそれぞれhtmlコードをretvalに追加
    retval += html;
  });
  return retval;
}

/**
 * class="classList[0] classList[1] ... classList[-1]"
 * を作ってreturnする
 *
 * @param {Array<string>} classList htmlのクラス属性の値が入った配列
 * @returns 上記の説明のとおり。
 */
export function convert2classCode(classList: Array<string>): string {
  let classCode: string;
  if (classList.length === 0) {
    return 'class=""';
  }

  classCode = `class="${classList[0]}`;
  for (let i = 1; i < classList.length; i++) {
    classCode = `${classCode} ${classList[i]}`;
  }
  classCode += '"';
  return classCode;
}
