"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.classListDiv = exports.classListBtn = void 0;
exports.convert2classCode = convert2classCode;
exports.createHtmlDisplayingSearchingHistory =
  createHtmlDisplayingSearchingHistory;
exports.displaySearchingHistory = displaySearchingHistory;
var _index = require("./utils/index");
var classListDiv = (exports.classListDiv = [
  "flex",
  "justify-center",
  "items-center",
  "mx-3.5",
]);
var classListBtn = (exports.classListBtn = [
  "mx-2",
  "myapp-text",
  "break-keep",
  "hover:underline",
]); // Btnと書いているが、検索ワードを表示する役がメインであり、クリックすると飛ぶようにしたかったので仕方なくボタンにした。

/** localHistory内に作ったsearchingHistoryを使って検索履歴を表示させる関数。 */
function displaySearchingHistory() {
  // display searching history dynamically using javascript
  // classList：wordのelementそれぞれに対する共通のクラス
  // それぞれのワードに対するdivのid：searched-word + i(iはそれぞれのワードを区別するためのもので特に取り方に意味なし、iは0～検索履歴の単語の数-1、整数)
  var searchingHistory = window.localStorage.getItem("searchingHistory");
  var html4searchingHistory = createHtmlDisplayingSearchingHistory(
    searchingHistory,
    classListDiv,
    classListBtn,
  );
  var target = document.getElementById("searchingHistoryField");
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
function createHtmlDisplayingSearchingHistory(
  searchingHistory,
  classListDiv,
  classListBtn,
) {
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
  var wordList;
  if (searchingHistory.indexOf(",") === -1) {
    wordList = [searchingHistory];
  } else {
    wordList = searchingHistory.split(",").reverse();
  }
  // divのidを動的生成すうための変数
  var i = 0;
  var retval = "";

  // wordListのすべての文字が表示不可条件を満たしていないときは何もしない。
  // 表示不可条件：wordがfalsyかinvalid
  var refuseDisplay = function refuseDisplay(word) {
    return (
      !word || word === "undefined" || !(0, _index.validateWord)(word).isValid
    );
  };
  if (wordList.every(refuseDisplay)) {
    return "";
  }

  // eslint-disable-next-line consistent-return
  wordList.forEach(function (word) {
    // ここでのreturnはfor文でのcontinueと同じ
    // wordがfalsyの時、invalidの時はわざわざ表示しない
    if (
      !word ||
      word === "undefined" ||
      !(0, _index.validateWord)(word).isValid
    ) {
      return "";
    }

    // それぞれのwordに対するdivにid追加
    var html = "<div ";
    html += 'id="searched-word'.concat(i, '" ');
    i += 1;

    // 引数のclassListでclass属性のコード書く
    html += "".concat(convert2classCode(classListDiv), ">");
    html += "<button "
      .concat(convert2classCode(classListBtn), ">")
      .concat(word, "</button>");
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
function convert2classCode(classList) {
  var classCode;
  if (classList.length === 0) {
    return 'class=""';
  }
  classCode = 'class="'.concat(classList[0]);
  for (var i = 1; i < classList.length; i++) {
    classCode = "".concat(classCode, " ").concat(classList[i]);
  }
  classCode += '"';
  return classCode;
}
