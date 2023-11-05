import { describe, expect, test } from "@jest/globals";
import {
  createRegexpGu,
  validateWord,
  validateDescription,
} from "../../src/utils/validators";

describe("test createRegexpGu", () => {
  const ALLOWED_UNICODE_CATEGORY_LIST: Array<string> = ["L", "N"];
  const regexpProhibitedCharacters = createRegexpGu(
    ALLOWED_UNICODE_CATEGORY_LIST,
  );
  test("指定の文字カテゴリ以外の文字がすべて入ったリストをリターンしているか", () => {
    const testStr: string = "s@t`r日本語한국어 ";
    const testVal = testStr.match(
      regexpProhibitedCharacters,
    ) as RegExpMatchArray;
    expect(testVal).toStrictEqual(["@", "`", " "]);
  });
});

const MAX_LEN_WORD = 30;
describe("test validateWord", () => {
  test(`${MAX_LEN_WORD}字を超える文字を不正な値と判断できるか`, () => {
    const { isValid, errMessage } =
      validateWord(`more than ${MAX_LEN_WORD} characters
                                      .`);
    expect(isValid).toBe(false);
    expect(errMessage).toBe(`${MAX_LEN_WORD}자 이내로 입력해 주세요.`);
  });
  test("禁止文字がが入力されたとき、validationを中断しその文字を含んだエラーメッセージを出力できるか", () => {
    const { isValid, errMessage } = validateWord("invalid character @|&");
    expect(isValid).toBe(false);
    expect(errMessage).toBe("사용 할 수 없는 문자가 포함되어 있습니다: @.");
  });
});

const MAX_LEN_DESCRIPTION = 200;
describe("test validateDescription", () => {
  test(`${MAX_LEN_DESCRIPTION}字を超える文字を不正な値と判断できるか`, () => {
    const { isValid, errMessage } =
      validateDescription(`more than ${MAX_LEN_DESCRIPTION} letters                              
        fsdddddddddddd                                                                                     d
        fsdddddddddddddddddddddddddvvvvvvvvv                                                                      d         
        sfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd.`);
    expect(isValid).toBe(false);
    expect(errMessage).toBe(`${MAX_LEN_DESCRIPTION}자 이내로 입력해 주세요.`);
  });
  test("禁止文字がが入力されたとき、validationを中断し、最初に引っかかった文字を含んだエラーメッセージを出力できるか", () => {
    const { isValid, errMessage } = validateDescription(
      "invalid character @|&",
    );
    expect(isValid).toBe(false);
    expect(errMessage).toBe("사용 할 수 없는 문자가 포함되어 있습니다: @.");
  });
});
