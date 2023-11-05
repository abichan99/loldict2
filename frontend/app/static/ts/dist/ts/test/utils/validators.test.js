"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const validators_1 = require("../../src/utils/validators");
(0, globals_1.describe)("test createRegexpGu", () => {
    const ALLOWED_UNICODE_CATEGORY_LIST = ["L", "N"];
    const regexpProhibitedCharacters = (0, validators_1.createRegexpGu)(ALLOWED_UNICODE_CATEGORY_LIST);
    (0, globals_1.test)("指定の文字カテゴリ以外の文字がすべて入ったリストをリターンしているか", () => {
        const testStr = "s@t`r日本語한국어 ";
        const testVal = testStr.match(regexpProhibitedCharacters);
        (0, globals_1.expect)(testVal).toStrictEqual(["@", "`", " "]);
    });
});
const MAX_LEN_WORD = 30;
(0, globals_1.describe)("test validateWord", () => {
    (0, globals_1.test)(`${MAX_LEN_WORD}字を超える文字を不正な値と判断できるか`, () => {
        const { isValid, errMessage } = (0, validators_1.validateWord)(`more than ${MAX_LEN_WORD} characters
                                      .`);
        (0, globals_1.expect)(isValid).toBe(false);
        (0, globals_1.expect)(errMessage).toBe(`${MAX_LEN_WORD}자 이내로 입력해 주세요.`);
    });
    (0, globals_1.test)("禁止文字がが入力されたとき、validationを中断しその文字を含んだエラーメッセージを出力できるか", () => {
        const { isValid, errMessage } = (0, validators_1.validateWord)("invalid character @|&");
        (0, globals_1.expect)(isValid).toBe(false);
        (0, globals_1.expect)(errMessage).toBe("사용 할 수 없는 문자가 포함되어 있습니다: @.");
    });
});
const MAX_LEN_DESCRIPTION = 200;
(0, globals_1.describe)("test validateDescription", () => {
    (0, globals_1.test)(`${MAX_LEN_DESCRIPTION}字を超える文字を不正な値と判断できるか`, () => {
        const { isValid, errMessage } = (0, validators_1.validateDescription)(`more than ${MAX_LEN_DESCRIPTION} letters                              
        fsdddddddddddd                                                                                     d
        fsdddddddddddddddddddddddddvvvvvvvvv                                                                      d         
        sfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd.`);
        (0, globals_1.expect)(isValid).toBe(false);
        (0, globals_1.expect)(errMessage).toBe(`${MAX_LEN_DESCRIPTION}자 이내로 입력해 주세요.`);
    });
    (0, globals_1.test)("禁止文字がが入力されたとき、validationを中断し、最初に引っかかった文字を含んだエラーメッセージを出力できるか", () => {
        const { isValid, errMessage } = (0, validators_1.validateDescription)("invalid character @|&");
        (0, globals_1.expect)(isValid).toBe(false);
        (0, globals_1.expect)(errMessage).toBe("사용 할 수 없는 문자가 포함되어 있습니다: @.");
    });
});
