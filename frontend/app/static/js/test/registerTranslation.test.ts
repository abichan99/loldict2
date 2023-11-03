import { describe, expect, test } from "@jest/globals";
import { registerTranslation, IDs } from "../src/registerTranslation";
import { loadHTML, mockXhr } from "./testTools";

loadHTML("app/templates/index.html");

// TODO: 値がないときの処理もtest
describe("test registerTranslation", () => {
  const wordKr = document.getElementById(IDs.wordKr) as HTMLInputElement;
  const wordJp = document.getElementById(IDs.wordJp) as HTMLInputElement;
  const description = document.getElementById(IDs.description) as HTMLInputElement;

  test("韓国語がinvalidなとき", () => {
    submitValues("invalid@", "valid", "valid");
    expect(wordKr.validationMessage).toBe("사용 할 수 없는 문자가 포함되어 있습니다: @.");
  });
  test("日本語がinvalidなとき", () => {
    submitValues("valid", "invalid+", "valid");
    expect(wordJp.validationMessage).toBe("사용 할 수 없는 문자가 포함되어 있습니다: +.");
  });
  test("descriptionがinvalidなとき", () => {
    submitValues("valid", "valid", "invalid@");
    expect(description.validationMessage).toBe("사용 할 수 없는 문자가 포함되어 있습니다: @.");
  });
  test("すべてvalidなとき", () => {
    const xhrMock = mockXhr();
    // mock alert
    jest.spyOn(window, "alert");

    submitValues("valid", "valid", "valid");
    expect(xhrMock.open).toBeCalledWith("POST", "http://localhost/register", true);
    expect(xhrMock.setRequestHeader).toBeCalledWith("Content-Type", "application/json");
    (xhrMock.onreadystatechange as EventListener)(new Event("")); // trigger onreadystatechange
    expect(window.alert).toBeCalledWith("Hello World!"); // triggered when readystate changes
  });
});

/**
 * 訳語に登録する3つの入力値を訳語登録formに代入してsubmitする関数
 * @param wordKr 韓国語
 * @param wordJp wordKrに対する日本語訳
 * @param description 説明(任意)
 */
function submitValues(wordKr: string, wordJp: string, description: string) {
  const elemKr = document.getElementById(IDs.wordKr) as HTMLInputElement;
  const elemJp = document.getElementById(IDs.wordJp) as HTMLInputElement;
  const elemDesk = document.getElementById(IDs.description) as HTMLInputElement;

  elemKr.value = wordKr;
  elemJp.value = wordJp;
  elemDesk.value = description;
  registerTranslation();
  (document.getElementById(IDs.registrationForm) as HTMLFormElement).submit();
}
