export const props = {
  nameClass: "myapp-text",  // index.htmlのテキスト要素につけているclassの名前
  darkMode: "dark:text-gray-400",
};

/** ダークモード時の文字色を指定する関数。適用させたい要素のclass属性にmtapp-textを追加する */
export function toggleFontColor() {
  const textElemList = document.getElementsByClassName(props.nameClass);
  // arrayに変換してfor文使えるようにする
  Array.from(textElemList).forEach((element) => {
    element.classList.add(props.darkMode);
  });
}
