// ホームページへのリンク挿入はhtmlに直接書き込まずjsの変数を利用して自動化している。こっちのほうが環境の切り替えの時に安全。
export function insertHomepageLink(homepageUrl) {
    window.addEventListener("DOMContentLoaded", () => {
        // headerのホーム遷移ボタンが押されたときにHOMEPAGE_URLに移動。
        const elem = document.getElementById("header-title");
        elem === null || elem === void 0 ? void 0 : elem.setAttribute("href", homepageUrl);
    });
}
