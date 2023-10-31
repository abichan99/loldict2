import { validateWord, validateDescription } from "./utils";
export var IDs = {
    registrationForm: "registrationForm",
    wordKr: "wordKrInput",
    wordJp: "wordJpInput",
    description: "descriptionInput",
};
/** inputsがvalidな時に訳語としてdbに登録 */
export function registerTranslation() {
    var _a;
    (_a = document
        .getElementById(IDs.registrationForm)) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", registerIfValid);
}
/** それぞれのinput dataのうち一つでもinvalidならエラーメッセージを表示、validならdbに登録 */
export function registerIfValid(e) {
    // assign input data
    e.preventDefault();
    var wordKr = e.target.querySelector("#".concat(IDs.wordKr));
    var wordJp = e.target.querySelector("#".concat(IDs.wordJp));
    var description = e.target.querySelector("#".concat(IDs.description));
    // validate each input data
    var validationResultWordKr = validateWord(wordKr.value);
    var validationResultWordJp = validateWord(wordJp.value);
    var validationResultDescription = validateDescription(description.value);
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
    var requestData = {
        wordKr: wordKr.value,
        wordJp: wordJp.value,
        description: description.value,
    };
    // send ajax post request to register data to db
    var url = document.getElementById(IDs.registrationForm).action;
    var xhr = new XMLHttpRequest();
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
