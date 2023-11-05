"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const store2localStorage = __importStar(require("../src/utils/store2localStorage"));
const searchForTranslation_1 = require("../src/searchForTranslation");
const testTools_1 = require("./testTools");
(0, testTools_1.loadHTML)();
(0, testTools_1.mockWindowHref)();
// test対象の関数内で呼び出される関数
store2localStorage.store2localStorage = jest.fn();
// get input elem(keyword for searching translations)
const inputElem = document.getElementById("translationSearchingBar");
(0, searchForTranslation_1.searchForTranslation)("url");
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
function submitKeyword(keyword) {
    inputElem.value = keyword;
    // emulate a submit on the form
    document.getElementById("searchingForm").submit();
}
