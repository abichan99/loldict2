document.getElementById("submit_btn").addEventListener("submit", searchWord);
function searchWord(e) {
  e.preventDefault();
  var word = e.target.querySelector("#searchWord");
  console.log(word);
  // const xhr = new XMLHttpRequest();
  // xhr.open("GET", "../server.go", true);
}
