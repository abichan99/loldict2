"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleFontColor = exports.props = void 0;
exports.props = {
    nameClass: "myapp-text",
    darkMode: "dark:text-gray-400",
};
/** ダークモード時の文字色を指定する関数。適用させたい要素のclass属性にmtapp-textを追加する */
function toggleFontColor() {
    const textElemList = document.getElementsByClassName(exports.props.nameClass);
    // arrayに変換してfor文使えるようにする
    Array.from(textElemList).forEach((element) => {
        element.classList.add(exports.props.darkMode);
    });
}
exports.toggleFontColor = toggleFontColor;
