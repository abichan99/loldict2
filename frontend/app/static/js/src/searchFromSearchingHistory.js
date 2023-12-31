import { validateWord, store2localStorage, cntStoredKeywords } from "./utils/index";
/**
 * 検索履歴の単語が押されたときにその単語を検索ワードとして訳語をサーチ。検索ワードのvalidationも行う。
 * @param homepageUrl ホームページのurl
 */
export function searchFromSearchingHistory(homepageUrl) {
    var _a;
    const numStoredKeywords = cntStoredKeywords();
    for (let i = 0; i < numStoredKeywords; i++) {
        const id = `searched-word${i.toString()}`; // 検索履歴に表示された単語それぞれのhtmlのid
        const wordBtn = (_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.children[0];
        const keyword = wordBtn === null || wordBtn === void 0 ? void 0 : wordBtn.innerHTML;
        wordBtn === null || wordBtn === void 0 ? void 0 : wordBtn.addEventListener("click", () => {
            if (keyword === undefined) {
                return;
            }
            // when invalid, stop sending data and display error messages on input fields
            if (!validateWord(keyword).isValid) {
                return;
            }
            // store the input elem to local storage(検索履歴の単語の順番を更新)
            store2localStorage(keyword);
            window.location.href = `${homepageUrl}?keyword=${(keyword)}`;
        });
    }
}
