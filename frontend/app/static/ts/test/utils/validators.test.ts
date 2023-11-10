import { describe, expect, test } from "@jest/globals";
import {
  createRegexpGu,
  validateWord,
  validateDescription,
} from "../../src/utils/validators";

describe("test createRegexpGu", () => {
  const regexpProhibitedCharacters = createRegexpGu(
    ["L", "N"], // Letter, Number
  );
  test("指定の文字カテゴリ以外の文字がすべて入ったリストをリターンしているか", () => {
    matchInvalidChars("s@t`r日本語한국어 ", regexpProhibitedCharacters, ["@", "`", " "]);
  });
});

describe("test validateWord", () => {
  const MAX_LEN_WORD = 30;
  test(`${MAX_LEN_WORD}字を超える文字を不正な値と判断できるか`, () => {
    const { isValid, errMessage } = validateWord(`more than ${MAX_LEN_WORD} characters
                                      .`);
    expect(isValid).toBe(false);
    expect(errMessage).toBe(`${MAX_LEN_WORD}자 이내로 입력해 주세요.`);
  });
  test("禁止文字がが入力されたとき、validationを中断しその文字を含んだエラーメッセージを出力できるか", () => {
    wordInvalidChars("invalid character @|&", "@");
    wordInvalidChars("invalid character |&", "|");
  });
});

describe("test validateDescription", () => {
  const MAX_LEN_DESCRIPTION = 200;
  test(`${MAX_LEN_DESCRIPTION}字を超える文字を不正な値と判断できるか`, () => {
    const { isValid, errMessage } = validateDescription(`more than ${MAX_LEN_DESCRIPTION} letters                              
        fsdddddddddddd                                                                                     d
        fsdddddddddddddddddddddddddvvvvvvvvv                                                                      d         
        sfdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd.`);
    expect(isValid).toBe(false);
    expect(errMessage).toBe(`${MAX_LEN_DESCRIPTION}자 이내로 입력해 주세요.`);
  });
  test("禁止文字がが入力されたとき、validationを中断し、最初に引っかかった文字を含んだエラーメッセージを出力できるか", () => {
    descriptionInvalidChars("invalid character @|&", "@");
  });
});

function descriptionInvalidChars(invalidDescription: string, invalidCharExpect: string) {
  const { isValid, errMessage } = validateDescription(
    invalidDescription,
  );
  expect(isValid).toBe(false);
  expect(errMessage).toBe(`사용 할 수 없는 문자가 포함되어 있습니다: ${invalidCharExpect}.`);
}

function wordInvalidChars(invalidWord: string, invalidCharExpect: string) {
  const { isValid, errMessage } = validateWord(invalidWord);
  expect(isValid).toBe(false);
  expect(errMessage).toBe(`사용 할 수 없는 문자가 포함되어 있습니다: ${invalidCharExpect}.`);
}

function matchInvalidChars(testStr: string, regexp: RegExp, invalidCharList: Array<string>) {
  const testVal = testStr.match(
    regexp,
  ) as RegExpMatchArray;
  expect(testVal).toStrictEqual(invalidCharList);
}
