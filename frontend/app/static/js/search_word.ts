import { validateWord, validateDescription } from "./validators.js";

document.getElementById("submit_btn")!.addEventListener("submit", searchWord);
function searchWord(e) {
  e.preventDefault();
  const word = e.target!.querySelector("#searchWord")!;
  console.log(word);

  // const xhr = new XMLHttpRequest();
  // xhr.open("GET", "../server.go", true);
}
