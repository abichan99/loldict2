// index.htmlからimportして使いたいのでtscでコンパイルしてexportsの代わりにexport文使うようにする
// TODO: increaseGoodNum, increaseBadNumのユニットテスト
import { getCookie } from "../utils/cookie.js";
export function increaseGoodNum(databaseID, translationID, homePageURL) {
    // send ajax post request to increase good num
    var url = "".concat(homePageURL, "increaseGoodNum");
    var data = { dbID: databaseID };
    sendAjaxReq(url, translationID, "good", data);
}
export function increaseBadNum(databaseID, translationID, HomePageURL) {
    // send ajax post request to increase bad num
    var url = "".concat(HomePageURL, "increaseBadNum");
    var data = { dbID: databaseID };
    sendAjaxReq(url, translationID, "bad", data);
}
export function sendAjaxReq(url, translationID, state, data) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            window.location.reload();
        }
    };
    var csrfToken = getCookie("_csrf");
    xhr.setRequestHeader("X-CSRF-Token", csrfToken);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
}
/**
 * stateをもとにgoodまたはbadが押された回数と幅を更新。
 *
 * 幅は0~100で押された回数全体に対する外套の評価が占める割合の100分率である。整数。
 * @param translationID 押されたボタンが属する訳語のid
 * @param state どのボタンが押されたか。
 */
export function updateEval(translationID, state) {
    var translation = document.getElementById(translationID);
    var good = translation === null || translation === void 0 ? void 0 : translation.querySelector(".myapp-translation-goodBar");
    var bad = translation === null || translation === void 0 ? void 0 : translation.querySelector(".myapp-translation-badBar");
    // stateに応じてgoodまたはbadが押された回数に1を足す。さらにdom内に記録された回数も更新
    var goodNum = parseInt(good.children[0].innerHTML, 10);
    var badNum = parseInt(bad.children[0].innerHTML, 10);
    if (state === "good") {
        goodNum += 1;
    }
    else {
        badNum += 1;
    }
    good.children[0].innerHTML = goodNum.toString();
    bad.children[0].innerHTML = badNum.toString();
    // 更新されたgoodNum, badNumをもとに幅を計算しdom要素のstyle.widthに代入
    var totalNum = goodNum + badNum;
    var goodWidth = Math.round((goodNum * 100) / totalNum);
    var badWidth = 100 - goodWidth;
    good.style.width = "".concat(goodWidth.toString(), "px");
    bad.style.width = "".concat(badWidth.toString(), "px");
}
