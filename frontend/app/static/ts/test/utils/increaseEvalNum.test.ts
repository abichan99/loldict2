import { describe, expect, test } from "@jest/globals";
import * as tmp from "../../src/increaseEvalNum";
// sendAjaxReqのtest時に下のunused宣言はがす
import { loadHTML, mockXhr as _u2 } from "../testTools";

loadHTML();
MockTranslation();

// const xhrMock = mockXhr();
// describe("test sendAjaxReq", () => {
//     test("sendAjaxOpen関数が正しく動作したか", () => {
//       updateEval = jest.fn();
//       tmp.sendAjaxReq("url", "translation0", "good");
//       expect(xhrMock.open).toBeCalledWith("GET", "url", true);
//       (xhrMock.onreadystatechange as EventListener)(new Event('')); // trigger onreadystatechange
//       expect(mockUpdateEval).toBeCalledWith("translation0", "good");
//     })
// })

describe("test updateEval", () => {
  testUpdateEval(["0", "0", "good"], ["1", "0", "100", "0"]);
  testUpdateEval(["0", "0", "bad"], ["0", "1", "0", "100"]);
  testUpdateEval(["1", "0", "bad"], ["1", "1", "50", "50"]);
  testUpdateEval(["1", "1", "good"], ["2", "1", "67", "33"]); // 小数であるstyle.widthが整数値に丸められているかの確認
});

function MockTranslation() {
  loadHTML("app/templates/index.html");
  const displayTranslation = document.getElementById("display") as HTMLElement;
  displayTranslation.innerHTML = "/<div id=\"translation0\" class=\"flex items-center\">"
    + "<div class=\"flex items-center mr-5\">"
    + "<p class=\"myapp-translation-wordJp text-3xl myapp-text mr-2\">{{.WordJp}}</p>"
    + "<div>"
    // <!-- evaluation bar -->
    + "<div class=\"flex items-center ml-4\">"
    // <!-- evaluate translation positively -->
    + "<button style=\"height: 30px; width: 30px;\" class=\"myapp-translation-goodBtn rounded-full\"></button>"
    + "<!-- display good-bad ratio of the translation -->"
    + "<div style=\"width: 180px; height: 20px;\" class=\"myapp-translation-gbRatio flex\">"
    + "<div class=\"myapp-translation-goodBar bg-red-300 text-center dark:bg-pink-900\" style=\"width: {{$goodBarWidth}}%;\"><p class=\"myapp-text\">{{.Good}}</p></div>"
    + "<div class=\"myapp-translation-badBar bg-zinc-200 text-center dark:bg-zinc-700\" style=\"width: {{$badBarWidth}}%;\"><p class=\"myapp-text\">{{.Bad}}</p></div>"
    + "</div>"
    // <!-- evaluate translation negatively -->
    + "<button style=\"height: 30px; width: 30px;\" class=\"myapp-translation-badBtn rounded-full\"><img src=\"/static/imgs/sad_bee.jpg\" alt=\"bad\" width=\"35px\" height=\"35px\" class=\"rounded-full\"></button>"
    + "</div>"
    + "</div>";
}

/** evaluation fieldのgood, badが押された回数を設定 */
function setEvalNums(translationID: string, goodNum: number, badNum: number) {
  const translation = document.getElementById(translationID);
  const good = translation?.querySelector(
    ".myapp-translation-goodBar",
  ) as HTMLElement;
  const bad = translation?.querySelector(
    ".myapp-translation-badBar",
  ) as HTMLElement;

  good.children[0].innerHTML = goodNum.toString();
  bad.children[0].innerHTML = badNum.toString();
}

/**
 * @param before [goodNum: string, badNum: string, state: "good"|"bad"] updateEval関数を通す前の条件
 * @param after [goodNum: string, badNum: string, goodWidth: string, badWidth: string]
 * updateEval関数を実行した後の予測値
 */
function testUpdateEval(before: string[], after: string[]) {
  const translation = document.getElementById("translation0");
  const good = translation?.querySelector(
    ".myapp-translation-goodBar",
  ) as HTMLElement;
  const bad = translation?.querySelector(
    ".myapp-translation-badBar",
  ) as HTMLElement;

  test(`good,badが押された回数がそれぞれ${before[0]},${before[1]}回のもと、${before[2]}ボタンが押されたとき`, () => {
    setEvalNums(
      "translation0",
      parseInt(before[0], 10),
      parseInt(before[1], 10),
    );
    tmp.updateEval("translation0", before[2] as "good" | "bad");

    // updateEval関数を実行した後の値と受け取った引数(after)の値を比較
    expect(good.children[0].innerHTML).toBe(after[0]); // goodが押された回数
    expect(bad.children[0].innerHTML).toBe(after[1]); // badが押された回数
    const goodStyle = window.getComputedStyle(good);
    const badStyle = window.getComputedStyle(bad);
    expect(goodStyle.getPropertyValue("width")).toBe(`${after[2]}px`); // goodのwidth
    expect(badStyle.getPropertyValue("width")).toBe(`${after[3]}px`); // badのwidth
  });
}
