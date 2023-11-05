"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchVisibilityRegistrationForm = void 0;
/** 訳語登録フォームの表示／非表示の切り替え */
function switchVisibilityRegistrationForm() {
    const formBtn = document.getElementById("collapseBtnRegistrationForm");
    formBtn === null || formBtn === void 0 ? void 0 : formBtn.addEventListener("click", (e) => {
        e.currentTarget.classList.toggle("active"); // TODO: この文はなんだろう。。
        const content = document.getElementById("target-collapse");
        if (content != null && content.style.display === "block") {
            content.style.display = "none";
        }
        else if (content != null) {
            content.style.display = "block";
        }
    });
}
exports.switchVisibilityRegistrationForm = switchVisibilityRegistrationForm;
