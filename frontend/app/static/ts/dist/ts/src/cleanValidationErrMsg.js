"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanValidationErrMsg = exports.IDlist = void 0;
exports.IDlist = [
    "wordKrInput",
    "wordJpInput",
    "descriptionInput",
    "translationSearchingBar",
];
/** input要素のvalueが変わったらvalidation messageを空にする */
function cleanValidationErrMsg() {
    cleanMsg(exports.IDlist);
}
exports.cleanValidationErrMsg = cleanValidationErrMsg;
function cleanMsg(IDlist) {
    IDlist.forEach((id) => {
        var _a;
        (_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.addEventListener("change", function () {
            this.setCustomValidity("");
        });
    });
}
