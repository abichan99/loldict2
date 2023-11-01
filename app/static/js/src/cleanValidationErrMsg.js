export const IDlist = [
    "wordKrInput",
    "wordJpInput",
    "descriptionInput",
    "translationSearchingBar",
];
/** input要素のvalueが変わったらvalidation messageを空にする */
export function cleanValidationErrMsg() {
    cleanMsg(IDlist);
}
function cleanMsg(IDlist) {
    IDlist.forEach((id) => {
        var _a;
        (_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.addEventListener("change", function () {
            this.setCustomValidity("");
        });
    });
}
