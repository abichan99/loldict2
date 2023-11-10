"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.toggleDarkMode = toggleDarkMode;
/** toggle dark mode and switch localStorage value (localStorage.theme: dark <-> light) */
function toggleDarkMode() {
  var darkModeBtn = document.getElementById("darkModeBtn");
  if (darkModeBtn === null) {
    return;
  }
  darkModeBtn.addEventListener("change", function () {
    if (this.checked === true) {
      localStorage.theme = "dark";
      // htmlタグのクラスにdarkを追加するとtailwind css下でダークモードになる。
      document.documentElement.classList.add("dark");
    } else {
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
    }
  });
}