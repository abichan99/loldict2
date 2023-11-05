import { validateWord, validateDescription } from "./validators.js";
document
  .getElementById("registrationForm")!
  .addEventListener("submit", registerIfValid);

/**
 *
 * @param e
 * @returns string: error message(when input form data is invalid),
 * JSON: input form data(when valid)
 */
function registerIfValid(e) {
  // assign input data
  e.preventDefault();
  const wordKr: HTMLInputElement = e.target!.querySelector("#wordKrInput");
  const wordJp: HTMLInputElement = e.target!.querySelector("#wordJpInput");
  const description: HTMLInputElement =
    e.target!.querySelector("#descriptionInput");

  // validate each input data
  const tmp1 = validateWord(wordKr.value);
  const tmp2 = validateWord(wordJp.value);
  const tmp3 = validateDescription(description.value);

  // when invalid, stop sending data and display error messages on input fields
  if (!tmp1.isValid) {
    wordKr.setCustomValidity(tmp1.errMessage);
    return;
  }
  if (!tmp2.isValid) {
    wordJp.setCustomValidity(tmp2.errMessage);
    return;
  }
  if (!tmp3.isValid) {
    description.setCustomValidity(tmp3.errMessage);
    return;
  }

  // include input data to json if valid
  const requestData = {
    isValid: true,
    wordKr: wordKr,
    wordJp: wordJp,
    description: description,
  };

  // send ajax post request to register data to db
  const url = (<HTMLFormElement>document.getElementById("registrationForm"))
    .action;
  const xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    //Call a function when the state changes.
    if (xhr.readyState == 4 && xhr.status == 200) {
      alert(xhr.responseText);
    }
  };
  xhr.send(JSON.stringify(requestData));
}
