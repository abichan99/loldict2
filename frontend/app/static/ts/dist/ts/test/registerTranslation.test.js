"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const registerTranslation_1 = require("../src/registerTranslation");
const testTools_1 = require("./testTools");
(0, testTools_1.loadHTML)("app/templates/index.html");
// TODO: 値がないときの処理もtest
(0, globals_1.describe)("test registerTranslation", () => {
    const wordKr = document.getElementById(registerTranslation_1.IDs.wordKr);
    const wordJp = document.getElementById(registerTranslation_1.IDs.wordJp);
    const description = document.getElementById(registerTranslation_1.IDs.description);
    (0, globals_1.test)("韓国語の入力欄がinvalidなとき", () => {
        submitValues("invalid@", "有効な日本語valid", "有効なdescipriton");
        (0, globals_1.expect)(wordKr.validationMessage).toBe("사용 할 수 없는 문자가 포함되어 있습니다: @.");
    });
    (0, globals_1.test)("日本語の入力欄がinvalidなとき", () => {
        submitValues("有効な韓国語valid", "invalid+", "有効なdescipriton");
        (0, globals_1.expect)(wordJp.validationMessage).toBe("사용 할 수 없는 문자가 포함되어 있습니다: +.");
    });
    (0, globals_1.test)("descriptionの入力欄がinvalidなとき", () => {
        submitValues("有効な韓国語valid", "有効な日本語valid", "invalid@");
        (0, globals_1.expect)(description.validationMessage).toBe("사용 할 수 없는 문자가 포함되어 있습니다: @.");
    });
    (0, globals_1.test)("すべてvalidなとき", () => {
        const xhrMock = (0, testTools_1.mockXhr)();
        // mock alert
        window.alert = jest.fn();
        Object.defineProperty(window, "location", {
            writable: true,
            value: { reload: jest.fn() },
        });
        submitValues("valid", "valid", "valid");
        (0, globals_1.expect)(xhrMock.open).toBeCalledWith("POST", "http://localhost/register", true);
        (0, globals_1.expect)(xhrMock.setRequestHeader).toBeCalledWith("Content-Type", "application/json");
        xhrMock.onreadystatechange(new Event("")); // trigger onreadystatechange
        (0, globals_1.expect)(window.alert).toBeCalledWith("Hello World!"); // triggered when readystate changes
    });
});
/**
 * 訳語に登録する3つの入力値を訳語登録formに代入してsubmitする関数
 * @param wordKr 韓国語
 * @param wordJp wordKrに対する日本語訳
 * @param description 説明(任意)
 */
function submitValues(wordKr, wordJp, description) {
    const elemKr = document.getElementById(registerTranslation_1.IDs.wordKr);
    const elemJp = document.getElementById(registerTranslation_1.IDs.wordJp);
    const elemDesk = document.getElementById(registerTranslation_1.IDs.description);
    elemKr.value = wordKr;
    elemJp.value = wordJp;
    elemDesk.value = description;
    (0, registerTranslation_1.registerTranslation)();
    document.getElementById(registerTranslation_1.IDs.registrationForm).submit();
}
