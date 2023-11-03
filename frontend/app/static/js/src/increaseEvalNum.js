"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.increaseBadNum = increaseBadNum;
exports.increaseGoodNum = increaseGoodNum;
exports.sendAjaxReq = sendAjaxReq;
exports.updateEval = updateEval;
// TODO: increaseGoodNum, increaseBadNumを統一
// TODO: リロードせずに更新されるようにする
// TODO: xhrの例外処理する(調べる)

function increaseGoodNum(id, translationID, curUrl) {
  // send ajax get request to increase good num
  var url = "".concat(curUrl, "increaseGoodNum?id=").concat(id);
  sendAjaxReq(url, translationID, "good");

  // TODO: callback関数とか使ってみる
  // 1秒後(サーバーとのやり取りが終わった後)に画面更新
  var output = function output() {
    return window.location.reload();
  };
  setTimeout(output, 1000); // time unit: ms
}

function increaseBadNum(id, translationID, curUrl) {
  // send ajax get request to increase good num
  var url = "".concat(curUrl, "increaseBadNum?id=").concat(id);
  sendAjaxReq(url, translationID, "bad");

  // TODO: callback関数とか使ってみる
  // 1秒後(サーバーとのやり取りが終わった後)に画面更新
  var output = function output() {
    return window.location.reload();
  };
  setTimeout(output, 1000); // time unit: ms
}

function sendAjaxReq(url, translationID, state) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      updateEval(translationID, state);
    }
  };
  xhr.send(null);
}

/**
 * stateをもとにgoodまたはbadが押された回数と幅を更新。
 *
 * 幅は0~100で押された回数全体に対する外套の評価が占める割合の100分率である。整数。
 * @param translationID 押されたボタンが属する訳語のid
 * @param state どのボタンが押されたか。
 */
function updateEval(translationID, state) {
  var translation = document.getElementById(translationID);
  var good = translation === null || translation === void 0 ? void 0 : translation.querySelector(".myapp-translation-goodBar");
  var bad = translation === null || translation === void 0 ? void 0 : translation.querySelector(".myapp-translation-badBar");

  // stateに応じてgoodまたはbadが押された回数に1を足す。さらにdom内に記録された回数も更新
  var goodNum = parseInt(good.children[0].innerHTML, 10);
  var badNum = parseInt(bad.children[0].innerHTML, 10);
  if (state === "good") {
    goodNum += 1;
  } else {
    badNum += 1;
  }
  good.children[0].innerHTML = goodNum.toString();
  bad.children[0].innerHTML = badNum.toString();

  // 更新されたgoodNum, badNumをもとに幅を計算しdom要素のstyle.widthに代入
  var totalNum = goodNum + badNum;
  var goodWidth = Math.round(goodNum * 100 / totalNum);
  var badWidth = 100 - goodWidth;
  good.style.width = "".concat(goodWidth.toString(), "px");
  bad.style.width = "".concat(badWidth.toString(), "px");
}
