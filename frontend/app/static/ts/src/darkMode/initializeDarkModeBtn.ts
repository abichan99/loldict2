/** localStorage.themeの値によってダークモードボタンのcheck具合を変える
 * head内にも似たようなコードがあるが、以下のコードはhtmlが読み込まれた後にdark mode switchをチェック状態にするかどうかを決めている */
export function initializeDarkModeBtn() {
  const darkModeBtn = document.getElementById(
    "darkModeBtn",
  ) as HTMLInputElement;
  if (darkModeBtn === null) {
    return;
  }
  if (localStorage.theme === "dark") {
    darkModeBtn.checked = true;
  } else {
    darkModeBtn.checked = false;
  }
}
