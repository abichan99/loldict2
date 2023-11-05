// TODO: increaseGoodNum, increaseBadNumを統一
// TODO: リロードせずに更新されるようにする
// TODO: xhrの例外処理する(調べる)

export function increaseGoodNum(
  id: string,
  translationID: string,
  curUrl: string,
): void {
  // send ajax get request to increase good num
  const url: string = `${curUrl}increaseGoodNum?id=${id}`;
  sendAjaxReq(url, translationID, "good");

  // TODO: callback関数とか使ってみる
  // 1秒後(サーバーとのやり取りが終わった後)に画面更新
  const output = () => window.location.reload();
  setTimeout(output, 1000); // time unit: ms
}

export function increaseBadNum(
  id: string,
  translationID: string,
  curUrl: string,
): void {
  // send ajax get request to increase good num
  const url: string = `${curUrl}increaseBadNum?id=${id}`;
  sendAjaxReq(url, translationID, "bad");

  // TODO: callback関数とか使ってみる
  // 1秒後(サーバーとのやり取りが終わった後)に画面更新
  const output = () => window.location.reload();
  setTimeout(output, 1000); // time unit: ms
}

export function sendAjaxReq(
  url: string,
  translationID: string,
  state: "good" | "bad",
) {
  const xhr = new XMLHttpRequest();
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
export function updateEval(translationID: string, state: "good" | "bad") {
  const translation = document.getElementById(translationID);
  const good = translation?.querySelector(
    ".myapp-translation-goodBar",
  ) as HTMLElement;
  const bad = translation?.querySelector(
    ".myapp-translation-badBar",
  ) as HTMLElement;

  // stateに応じてgoodまたはbadが押された回数に1を足す。さらにdom内に記録された回数も更新
  let goodNum = parseInt(good.children[0].innerHTML, 10);
  let badNum = parseInt(bad.children[0].innerHTML, 10);
  if (state === "good") {
    goodNum += 1;
  } else {
    badNum += 1;
  }
  good.children[0].innerHTML = goodNum.toString();
  bad.children[0].innerHTML = badNum.toString();

  // 更新されたgoodNum, badNumをもとに幅を計算しdom要素のstyle.widthに代入
  const totalNum = goodNum + badNum;
  const goodWidth = Math.round((goodNum * 100) / totalNum);
  const badWidth = 100 - goodWidth;
  good.style.width = `${goodWidth.toString()}px`;
  bad.style.width = `${badWidth.toString()}px`;
}
