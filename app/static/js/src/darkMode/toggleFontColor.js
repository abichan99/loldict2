export var props = {
    className: "myapp-text",
    darkMode: "dark:text-gray-400",
};
/** ダークモード時の文字色を指定する関数。適用させたい要素のclass属性にmtapp-textを追加する */
export function toggleFontColor() {
    var textElemList = document.getElementsByClassName(props.className);
    // arrayに変換してfor文使えるようにする
    Array.from(textElemList).forEach(function (element) {
        element.classList.add(props.darkMode);
    });
}
