import * as store2localStorage from "../src/utils/store2localStorage";
import { searchForTranslation } from "../src/searchForTranslation";
import { loadHTML, mockWindowHref } from "./testTools";

loadHTML();
mockWindowHref();

// test対象の関数内で呼び出される関数
(store2localStorage.store2localStorage as jest.Mock) = jest.fn();
// get input elem(keyword for searching translations)
const inputElem = document.getElementById("translationSearchingBar") as HTMLInputElement;
searchForTranslation("url");

// TODO: 入力欄が空の時のテスト
describe("test searchForTranslation", () => {
  test("invalidな検索単語が入力されたとき", () => {
    submitKeyword("invalid@");
    expect(inputElem.validationMessage).toBe("사용 할 수 없는 문자가 포함되어 있습니다: @.");
    expect(window.location.href).toBe("http://dummy.com");
  });
  test("validな検索単語が入力されたとき", () => {
    submitKeyword("keyword");
    expect(store2localStorage.store2localStorage).toHaveBeenCalledWith("keyword");
    expect(window.location.href).toBe("url?keyword=keyword");
  });
});

/** keywordを検索フォームのinput要素に代入しsubmit */
function submitKeyword(keyword: string) {
  inputElem.value = keyword;
  // emulate a submit on the form
  (document.getElementById("searchingForm") as HTMLFormElement).submit();
}
