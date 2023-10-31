/** 訳語登録フォームの表示／非表示の切り替え */
export function switchVisibilityRegistrationForm() {
    var formBtn = document.getElementById("collapseBtnRegistrationForm");
    formBtn === null || formBtn === void 0 ? void 0 : formBtn.addEventListener("click", function (e) {
        e.currentTarget.classList.toggle("active"); // TODO: この文はなんだろう。。
        var content = document.getElementById("target-collapse");
        if (content != null && content.style.display === "block") {
            content.style.display = "none";
        }
        else if (content != null && content.style.display === "none") {
            content.style.display = "block";
        }
    });
}
