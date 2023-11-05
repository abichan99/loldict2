"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDarkModeBtn = void 0;
/** localStorage.themeの値によってダークモードボタンのcheck具合を変える
 * head内にも似たようなコードがあるが、以下のコードはhtmlが読み込まれた後にdark mode switchをチェック状態にするかどうかを決めている */
function initializeDarkModeBtn() {
    const darkModeBtn = document.getElementById("darkModeBtn");
    if (darkModeBtn === null) {
        return;
    }
    if (localStorage.theme === "dark") {
        darkModeBtn.checked = true;
    }
    else {
        darkModeBtn.checked = false;
    }
}
exports.initializeDarkModeBtn = initializeDarkModeBtn;
