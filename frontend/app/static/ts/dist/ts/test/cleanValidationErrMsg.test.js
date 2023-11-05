"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@testing-library/dom");
const globals_1 = require("@jest/globals");
const cleanValidationErrMsg_1 = require("../src/cleanValidationErrMsg");
const testTools_1 = require("./testTools");
(0, testTools_1.loadHTML)();
// IDlist内のidを持つ要素のvalidation message, valueを初期化し、それぞれを配列に代入
const beforeChangeMsg = [];
for (let i = 0; i < cleanValidationErrMsg_1.IDlist.length; i++) {
    document.getElementById(cleanValidationErrMsg_1.IDlist[i]).setCustomValidity(`msg${i.toString()}`);
    beforeChangeMsg.push(`msg${i.toString()}`);
}
(0, globals_1.describe)("test cleanValidationErrMsg", () => {
    (0, cleanValidationErrMsg_1.cleanValidationErrMsg)();
    for (let i = 0; i < cleanValidationErrMsg_1.IDlist.length; i++) {
        const id = cleanValidationErrMsg_1.IDlist[i];
        const elem = document.getElementById(id);
        (0, globals_1.test)(`要素の値が更新されたときにvalidation errorのメッセージが空になっているか、要素のid: ${id}`, () => {
            dom_1.fireEvent.change(elem, { target: { value: "a" } });
            (0, globals_1.expect)(beforeChangeMsg[i] !== elem.value).toBe(true);
            (0, globals_1.expect)(elem.validationMessage).toBe("");
        });
    }
});
