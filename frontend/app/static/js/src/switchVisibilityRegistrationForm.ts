/** 訳語登録フォームの表示／非表示の切り替え */
export function switchVisibilityRegistrationForm() {
  const formBtn = document.getElementById("collapseBtnRegistrationForm");
  formBtn?.addEventListener("click", (e) => {
    (e.currentTarget as HTMLInputElement).classList.toggle("active"); // TODO: この文はなんだろう。。
    const content = document.getElementById("target-collapse");

    if (content != null && content.style.display === "block") {
      content.style.display = "none";
    } else if (content != null && content.style.display === "none") {
      content.style.display = "block";
    }
  });
}
