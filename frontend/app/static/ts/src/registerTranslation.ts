import { validateWord, validateDescription } from "./utils/index";

export const IDs = {
  registrationForm: "registrationForm",
  wordKr: "wordKrInput",
  wordJp: "wordJpInput",
  description: "descriptionInput",
};

/** inputsがvalidな時に訳語としてdbに登録 */
export function registerTranslation() {
  document
    .getElementById(IDs.registrationForm)
    ?.addEventListener("submit", registerIfValid);
}

/** それぞれのinput dataのうち一つでもinvalidならエラーメッセージを表示、validならdbに登録 */
export function registerIfValid(e: Event): undefined {
  // assign input data
  e.preventDefault();
  const wordKr = (e.target as HTMLFormElement).querySelector(`#${IDs.wordKr}`);
  const wordJp = (e.target as HTMLFormElement).querySelector(`#${IDs.wordJp}`);
  const description = (e.target as HTMLFormElement).querySelector(
    `#${IDs.description}`,
  );

  // validate each input data
  const validationResultWordKr = validateWord(
    (wordKr as HTMLInputElement).value,
  );
  const validationResultWordJp = validateWord(
    (wordJp as HTMLInputElement).value,
  );
  const validationResultDescription = validateDescription(
    (description as HTMLInputElement).value,
  );

  // when invalid, stop sending data and display error messages on input fields
  if (!validationResultWordKr.isValid) {
    (wordKr as HTMLInputElement).setCustomValidity(
      validationResultWordKr.errMessage,
    );
    return;
  }
  if (!validationResultWordJp.isValid) {
    (wordJp as HTMLInputElement).setCustomValidity(
      validationResultWordJp.errMessage,
    );
    return;
  }
  if (!validationResultDescription.isValid) {
    (description as HTMLInputElement).setCustomValidity(
      validationResultDescription.errMessage,
    );
    return;
  }

  // include input data to json if valid
  const csrfToken = (document.getElementById("csrfToken") as HTMLInputElement).value;
  const requestData = {
    wordKr: (wordKr as HTMLInputElement).value,
    wordJp: (wordJp as HTMLInputElement).value,
    description: (description as HTMLInputElement).value,
    _csrf: csrfToken,
  };

  // send ajax post request to register data to db
  const url: string = (
    document.getElementById(IDs.registrationForm) as HTMLFormElement
  ).action;
  const xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("X-CSRF-Token", csrfToken);
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
