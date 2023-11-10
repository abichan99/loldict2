"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRegexpGu = exports.returnValidationResult = exports.validateDescription = exports.validateWord = void 0;
/**
 *
 * @param {string} word validate対象の文字列
 * @returns {{boolean; string}} {isValid, errMessage} validかどうか、invalidの時のエラーメッセ―ジ
 */
function validateWord(word) {
    const validationConditions = {
        maxCharNum: 30,
        // allowed unicode properties: Letter, Number
        allowedUnicodeCategoryList: ["L", "N"],
        allowedIndividualCharacterList: [
            " ",
            "　",
            "`",
            "_",
            "-",
            "、",
            "。",
            "「",
            "」",
            "ー",
            "(",
            ")",
            "（",
            "）",
            "[",
            "]",
            "%",
            "％",
            "‘",
            "’",
        ],
    };
    return returnValidationResult(word, validationConditions);
}
exports.validateWord = validateWord;
/**
 *
 * @param {string} description validate対象の文字列
 * @returns {{boolean; string}} {isValid, errMessage} validかどうか、invalidの時のエラーメッセ―ジ
 */
function validateDescription(description) {
    const validationConditions = {
        maxCharNum: 200,
        // allowed unicode properties: Letter, Number
        allowedUnicodeCategoryList: ["L", "N"],
        allowedIndividualCharacterList: [
            ".",
            ",",
            " ",
            "　",
            "\"",
            "'",
            "`",
            "_",
            "-",
            "、",
            "。",
            "「",
            "」",
            "^",
            "~",
            "ー",
            "(",
            ")",
            "{",
            "}",
            "[",
            "]",
            "%",
            "％",
            "‘",
            "’",
        ],
    };
    return returnValidationResult(description, validationConditions);
}
exports.validateDescription = validateDescription;
/**
 *
 * @param {string} target validate対象の文字列
 * @param {ValidationConditions} validationConditions
 * @returns
 */
function returnValidationResult(target, validationConditions) {
    // validationConditions.allowedUnicodeCategoryListに入っているunicode categoryに属さない文字をすべてリストに代入する正規表現
    const REGEXP_PROHIBITED_CHARACTERS = createRegexpGu(validationConditions.allowedUnicodeCategoryList);
    // raise an error if word length is longer than validationConditions.maxCharNum
    if (target.length > validationConditions.maxCharNum) {
        return {
            isValid: false,
            errMessage: `${validationConditions.maxCharNum}자 이내로 입력해 주세요.`,
        };
    }
    // NFC：サロゲートペアを単一の文字コードで表すように正規化にする
    // NFCの説明：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
    const normalizedWord = target.normalize("NFC");
    const invalidCharacterList = normalizedWord.match(REGEXP_PROHIBITED_CHARACTERS);
    if (invalidCharacterList === null) {
        return {
            isValid: true,
            errMessage: "",
        };
    }
    // raise an error if...
    // 1. word includes characters that are not letters or numbers and
    // 2. any of them are not the element of validationConditions.allowedIndividualCharacterList
    for (let i = 0; i < invalidCharacterList.length; i++) {
        const invalidCharacter = invalidCharacterList[i];
        if (!validationConditions.allowedIndividualCharacterList.includes(invalidCharacter)) {
            return {
                isValid: false,
                errMessage: `사용 할 수 없는 문자가 포함되어 있습니다: ${invalidCharacter}.`,
            };
        }
    }
    // this must be at the end of this function
    // set isValid as true if the given word passes all the validation
    return {
        isValid: true,
        errMessage: "",
    };
}
exports.returnValidationResult = returnValidationResult;
/**
 * 入力を許可するunicode categoryのリストを引数として受け取り、それ以外の文字を見つける正規表現を返す。
 * 正規表現のフラグgu：マッチするすべての文字をリストで返す。サロゲートペアまで正しく処理する。(フラグについて：https://javascript.info/regexp-introduction)
 *
 * @param {Array<string>} unicodeCategoryList 入力を許可するunicode category(Letter, Numberなど)。
 * @returns 引数で与えられたunicode categoryに属さない文字を見つける正規表現
 */
function createRegexpGu(unicodeCategoryList) {
    let regexp = "[^";
    for (let i = 0; i < unicodeCategoryList.length; i++) {
        const elem = unicodeCategoryList[i];
        regexp += `\\p{${elem}}`;
    }
    regexp += "]";
    return new RegExp(regexp, "gu");
}
exports.createRegexpGu = createRegexpGu;