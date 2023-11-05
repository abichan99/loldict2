"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.initializeDarkMode = initializeDarkMode;
// tailwind公式文書を参照して作成：https://tailwindcss.com/docs/dark-mode
/** 画面ロード時にlocal storageやwindow.matchMediaを使ってdark modeにするかどうかを決定する。
 *
 * </body>下のスクリプトタグ内に置くと、画面が一瞬白になってからダークモードが発動するので目に悪いので、headタグ内に置く。
 */
function initializeDarkMode() {
  if (
    localStorage.getItem("theme") === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    localStorage.setItem("theme", "dark");
    document.documentElement.classList.add("dark");
  } else {
    localStorage.setItem("theme", "light");
    document.documentElement.classList.remove("dark");
  }
}
