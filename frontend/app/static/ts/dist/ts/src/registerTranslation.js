"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerIfValid = exports.registerTranslation = exports.IDs = void 0;
const index_1 = require("./utils/index");
exports.IDs = {
    registrationForm: "registrationForm",
    wordKr: "wordKrInput",
    wordJp: "wordJpInput",
    description: "descriptionInput",
};
/** inputsがvalidな時に訳語としてdbに登録 */
function registerTranslation() {
    var _a;
    (_a = document
        .getElementById(exports.IDs.registrationForm)) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", registerIfValid);
}
exports.registerTranslation = registerTranslation;
/** それぞれのinput dataのうち一つでもinvalidならエラーメッセージを表示、validならdbに登録 */
function registerIfValid(e) {
    // assign input data
    e.preventDefault();
    const wordKr = e.target.querySelector(`#${exports.IDs.wordKr}`);
    const wordJp = e.target.querySelector(`#${exports.IDs.wordJp}`);
    const description = e.target.querySelector(`#${exports.IDs.description}`);
    // validate each input data
    const validationResultWordKr = (0, index_1.validateWord)(wordKr.value);
    const validationResultWordJp = (0, index_1.validateWord)(wordJp.value);
    const validationResultDescription = (0, index_1.validateDescription)(description.value);
    // when invalid, stop sending data and display error messages on input fields
    if (!validationResultWordKr.isValid) {
        wordKr.setCustomValidity(validationResultWordKr.errMessage);
        return;
    }
    if (!validationResultWordJp.isValid) {
        wordJp.setCustomValidity(validationResultWordJp.errMessage);
        return;
    }
    if (!validationResultDescription.isValid) {
        description.setCustomValidity(validationResultDescription.errMessage);
        return;
    }
    // include input data to json if valid
    const requestData = {
        wordKr: wordKr.value,
        wordJp: wordJp.value,
        description: description.value,
    };
    // send ajax post request to register data to db
    const url = document.getElementById(exports.IDs.registrationForm).action;
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // eslint-disable-next-line no-alert
            alert(xhr.responseText);
            window.location.reload();
        }
    };
    xhr.send(JSON.stringify(requestData));
}
exports.registerIfValid = registerIfValid;
