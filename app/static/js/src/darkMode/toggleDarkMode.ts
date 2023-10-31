/** toggle dark mode and switch localStorage value */
export function toggleDarkMode() {
  const darkModeBtn = document.getElementById("darkModeBtn");
  if (darkModeBtn != null) {
    (darkModeBtn as HTMLInputElement).addEventListener("change", function () {
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
}
