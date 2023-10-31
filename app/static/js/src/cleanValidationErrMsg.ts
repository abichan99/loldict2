export const IDlist: string[] = [
  "wordKrInput",
  "wordJpInput",
  "descriptionInput",
  "translationSearchingBar",
];

/** input要素のvalueが変わったらvalidation messageを空にする */
export function cleanValidationErrMsg() {
  cleanMsg(IDlist);
}

function cleanMsg(IDlist: string[]) {
  IDlist.forEach((id) => {
    document.getElementById(id)?.addEventListener("change", function () {
      (this as HTMLInputElement).setCustomValidity("");
    });
  });
}
