/** toggle dark mode and switch localStorage value */
export function toggleDarkMode() {
    var darkModeBtn = document.getElementById("darkModeBtn");
    if (darkModeBtn != null) {
        darkModeBtn.addEventListener("change", function () {
            if (this.checked === true) {
                localStorage.theme = "dark";
                // htmlタグのクラスにdarkを追加するとtailwind css下でダークモードになる。
                document.documentElement.classList.add("dark");
            }
            else {
                localStorage.theme = "light";
                document.documentElement.classList.remove("dark");
            }
        });
    }
}
