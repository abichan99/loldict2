"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRegexpGu = createRegexpGu;
exports.returnValidationResult = returnValidationResult;
exports.validateDescription = validateDescription;
exports.validateWord = validateWord;
/**
 * validationする際の条件
 *
 * maxCharNum: 文字数の上限
 *
 * allowedUnicodeCategoryList: 許可するunicode category
 *
 * allowedIndividualCharacterList: allowedUnicodeCategoryListの条件を満たさない文字のうち、例外的に許可する文字
 */

/**
 *
 * @param {string} word validate対象の文字列
 * @returns {{boolean; string}} {isValid, errMessage} validかどうか、invalidの時のエラーメッセ―ジ
 */
function validateWord(word) {
  var validationConditions = {
    maxCharNum: 30,
    // allowed unicode properties: Letter, Number
    allowedUnicodeCategoryList: ["L", "N"],
    allowedIndividualCharacterList: [" ", "　", "`", "_", "-", "、", "。", "「", "」", "ー", "(", ")", "（", "）", "[", "]", "%", "％", "‘", "’"]
  };
  return returnValidationResult(word, validationConditions);
}

/**
 *
 * @param {string} description validate対象の文字列
 * @returns {{boolean; string}} {isValid, errMessage} validかどうか、invalidの時のエラーメッセ―ジ
 */
function validateDescription(description) {
  var validationConditions = {
    maxCharNum: 200,
    // allowed unicode properties: Letter, Number
    allowedUnicodeCategoryList: ["L", "N"],
    allowedIndividualCharacterList: [".", ",", " ", "　", "\"", "'", "`", "_", "-", "、", "。", "「", "」", "^", "~", "ー", "(", ")", "{", "}", "[", "]", "%", "％", "‘", "’"]
  };
  return returnValidationResult(description, validationConditions);
}

/**
 *
 * @param {string} target validate対象の文字列
 * @param {ValidationConditions} validationConditions
 * @returns
 */
function returnValidationResult(target, validationConditions) {
  // validationConditions.allowedUnicodeCategoryListに入っているunicode categoryに属さない文字をすべてリストに代入する正規表現
  var REGEXP_PROHIBITED_CHARACTERS = createRegexpGu(validationConditions.allowedUnicodeCategoryList);

  // raise an error if word length is longer than validationConditions.maxCharNum
  if (target.length > validationConditions.maxCharNum) {
    return {
      isValid: false,
      errMessage: "".concat(validationConditions.maxCharNum, "\uC790 \uC774\uB0B4\uB85C \uC785\uB825\uD574 \uC8FC\uC138\uC694.")
    };
  }

  // NFC：サロゲートペアを単一の文字コードで表すように正規化にする
  // NFCの説明：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
  var normalizedWord = target.normalize("NFC");
  var invalidCharacterList = normalizedWord.match(REGEXP_PROHIBITED_CHARACTERS);
  if (invalidCharacterList === null) {
    return {
      isValid: true,
      errMessage: ""
    };
  }

  // raise an error if...
  // 1. word includes characters that are not letters or numbers and
  // 2. any of them are not the element of validationConditions.allowedIndividualCharacterList
  for (var i = 0; i < invalidCharacterList.length; i++) {
    var invalidCharacter = invalidCharacterList[i];
    if (!validationConditions.allowedIndividualCharacterList.includes(invalidCharacter)) {
      return {
        isValid: false,
        errMessage: "\uC0AC\uC6A9 \uD560 \uC218 \uC5C6\uB294 \uBB38\uC790\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4: ".concat(invalidCharacter, ".")
      };
    }
  }

  // this must be at the end of this function
  // set isValid as true if the given word passes all the validation
  return {
    isValid: true,
    errMessage: ""
  };
}

/**
 * 入力を許可するunicode categoryのリストを引数として受け取り、それ以外の文字を見つける正規表現を返す。
 * 正規表現のフラグgu：マッチするすべての文字をリストで返す。サロゲートペアまで正しく処理する。(フラグについて：https://javascript.info/regexp-introduction)
 *
 * @param {Array<string>} unicodeCategoryList 入力を許可するunicode category(Letter, Numberなど)。
 * @returns 引数で与えられたunicode categoryに属さない文字を見つける正規表現
 */
function createRegexpGu(unicodeCategoryList) {
  var regexp = "[^";
  for (var i = 0; i < unicodeCategoryList.length; i++) {
    var elem = unicodeCategoryList[i];
    regexp += "\\p{".concat(elem, "}");
  }
  regexp += "]";
  return new RegExp(regexp, "gu");
}
