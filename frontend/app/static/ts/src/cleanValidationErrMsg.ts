export const IDlist: string[] = [
  "wordKrInput", // 韓国語入力欄
  "wordJpInput", // 日本語入力欄
  "descriptionInput", // 説明入力欄
  "translationSearchingBar", // 検索ワード入力欄
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
