/* eslint-disable @typescript-eslint/no-var-requires */
import {
  displaySearchingHistory,
  createHtml4SearchingHistory,
  convert2classCode,
  classListDiv,
  classListBtn,
} from "../src/displaySearchingHistory";
import { createMockLocalStorage } from "./testTools";

//  ここではloadHTML使えない
// index.html読み込んでhtmlに代入
const fs = require("fs");

const htmlStr = fs.readFileSync("app/templates/index.html", {
  encoding: "utf-8",
  flag: "r",
});

describe("test displaySearchingHistory", () => {
  test("表示するものが何もないとき", () => {
    createMockLocalStorage({ searchingHistory: undefined });
    document.body.innerHTML = htmlStr;
    displaySearchingHistory();
    const field = document.getElementById(
      "searchingHistoryField",
    ) as HTMLElement;
    expect(field.innerHTML).toMatch(/ */);
  });
  test("検索履歴を1つ表示", () => {
    window.localStorage.setItem("searchingHistory", "word1");
    document.body.innerHTML = htmlStr;
    displaySearchingHistory();
    const field = document.getElementById(
      "searchingHistoryField",
    ) as HTMLElement;
    const expected: string = `<div id="searched-word0" ${convert2classCode(classListDiv)}>`
      + `<button ${convert2classCode(classListBtn)}>word1</button>`
      + "</div>";
    expect(field.innerHTML).toBe(expected);
  });
});

describe("test convert2classCode", () => {
  test("クラスの値がないとき", () => {
    const noClass: Array<string> = [];
    expect(convert2classCode(noClass)).toBe("class=\"\"");
  });
  test("クラスの値が一つの時", () => {
    const singleClass: Array<string> = ["sth"];
    expect(convert2classCode(singleClass)).toBe("class=\"sth\"");
  });
  test("クラスの値が2つ以上の時", () => {
    const multipleClasses: Array<string> = ["sth1", "sth2"];
    expect(convert2classCode(multipleClasses)).toBe("class=\"sth sth2\"");
  });
});

describe("test createHtmlDisplayingSearchingHistory", () => {
  test("searchingHistoryがundefinedの時", () => {
    testCreateHtmlDisplayingSearchingHistory(undefined, "");
  });
  test("searchingHistoryが空の文字列の時", () => {
    testCreateHtmlDisplayingSearchingHistory("", "");
  });
  test("searchingHistoryにfalsy及びinvalidな単語が含まれる時", () => {
    const retValExpect = `<div id="searched-word0" ${convert2classCode(classListDiv)}>`
      + `<button ${convert2classCode(classListBtn)}>sth</button>`
      + "</div>";
    testCreateHtmlDisplayingSearchingHistory(
      "sth,undefined,invalid@",
      retValExpect,
    );
  });
  test("searchingHistoryにvalidな単語が含まれていない時", () => {
    testCreateHtmlDisplayingSearchingHistory("undefined,,invalid@", "");
  });
  test("searchingHistoryに単語が一つしかないとき", () => {
    const retValExpect = `<div id="searched-word0" ${convert2classCode(classListDiv)}>`
      + `<button ${convert2classCode(classListBtn)}>word1</button>`
      + "</div>";
    testCreateHtmlDisplayingSearchingHistory("word1", retValExpect);
  });
  test("searchingHistoryに単語が複数個あるとき", () => {
    const retValExpect = `<div id="searched-word0" ${convert2classCode(classListDiv)}>`
      + `<button ${convert2classCode(classListBtn)}>word2</button>`
      + "</div>"
      + `<div id="searched-word1" ${convert2classCode(classListDiv)}>`
      + `<button ${convert2classCode(classListBtn)}>word1</button>`
      + "</div>";
    testCreateHtmlDisplayingSearchingHistory("word1,word2", retValExpect);
  });
});

/**
 *
 * @param cond searchingHistoryとして設定する文字列
 * @param exp createHtmlDisplayingSearchingHistoryの戻り値の予測値
 */
function testCreateHtmlDisplayingSearchingHistory(
  cond: string | undefined,
  exp: string,
) {
  const retVal = createHtml4SearchingHistory(
    cond,
    classListDiv,
    classListBtn,
  );
  expect(retVal).toBe(exp);
}
