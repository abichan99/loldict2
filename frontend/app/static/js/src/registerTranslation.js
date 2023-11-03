"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IDs = void 0;
exports.registerIfValid = registerIfValid;
exports.registerTranslation = registerTranslation;
var _index = require("./utils/index");
var IDs = exports.IDs = {
  registrationForm: "registrationForm",
  wordKr: "wordKrInput",
  wordJp: "wordJpInput",
  description: "descriptionInput"
};

/** inputsがvalidな時に訳語としてdbに登録 */
function registerTranslation() {
  var _document$getElementB;
  (_document$getElementB = document.getElementById(IDs.registrationForm)) === null || _document$getElementB === void 0 || _document$getElementB.addEventListener("submit", registerIfValid);
}

/** それぞれのinput dataのうち一つでもinvalidならエラーメッセージを表示、validならdbに登録 */
function registerIfValid(e) {
  // assign input data
  e.preventDefault();
  var wordKr = e.target.querySelector("#".concat(IDs.wordKr));
  var wordJp = e.target.querySelector("#".concat(IDs.wordJp));
  var description = e.target.querySelector("#".concat(IDs.description));

  // validate each input data
  var validationResultWordKr = (0, _index.validateWord)(wordKr.value);
  var validationResultWordJp = (0, _index.validateWord)(wordJp.value);
  var validationResultDescription = (0, _index.validateDescription)(description.value);

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
    description: description.value
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
