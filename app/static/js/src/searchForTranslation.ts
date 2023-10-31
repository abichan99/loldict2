import { validateWord, store2localStorage } from "./utils";

/** 検索ワードがvalidなときに訳語を検索、あれば表示する関数。なければないと知らせる。
 *
 * 検索ワードがinvalidな時はurl更新せずinput fieldにエラーメッセージ表示。
 * @param homepageUrl ホームページのurl
 */
export function searchForTranslation(homepageUrl: string) {
  document
    .getElementById("searchingForm")
    ?.addEventListener("submit", (event) => {
      searchIfValid(event, homepageUrl);
    });
}

/**
 * 検索ワードがinvalidならエラーメッセージを表示し、validならurlを更新して訳語を検索する関数。
 * @param curUrl この関数が実行されたときのurl
 */
export function searchIfValid(e: Event, curUrl: string): undefined {
  e.preventDefault();
  const elem = (e.target as HTMLFormElement).querySelector(
    "#translationSearchingBar",
  );
  const keyword: string = (elem as HTMLInputElement).value;

  const tmp = validateWord(keyword);
  // when invalid, stop sending data and display error messages on input fields
  if (elem != null && !tmp.isValid) {
    (elem as HTMLInputElement).setCustomValidity(tmp.errMessage);
    return;
  }

  store2localStorage(keyword);

  const url = `${curUrl}?keyword=${keyword}`;
  window.location.href = url;
}
