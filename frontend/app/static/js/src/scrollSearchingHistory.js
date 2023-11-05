"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.SCROLL_PX = exports.INTERVAL_MS = void 0;
exports.scroll = scroll;
exports.scrollSearchingHistory = scrollSearchingHistory;
var SCROLL_PX = (exports.SCROLL_PX = 4);
var INTERVAL_MS = (exports.INTERVAL_MS = 10);

/** ボタンが押されたときに一定の時間間隔で訳語をスクロール(押しっぱなしの処理) */
function scrollSearchingHistory() {
  var directions = ["left", "right"];
  directions.forEach(function (direction) {
    var _document$getElementB;
    (_document$getElementB = document.getElementById(
      "scroll-button-".concat(direction),
    )) === null ||
      _document$getElementB === void 0 ||
      _document$getElementB.addEventListener("pointerdown", function () {
        var intervalId = setInterval(function () {
          scroll(direction, SCROLL_PX);
        }, INTERVAL_MS); // 引数渡すための記述法、第二引数の単位：ms

        // document要素にイベント登録することで、クリックした後ボタンから動かしてもOK
        // once: true を指定して一度発火したらイベントを削除する
        document.addEventListener(
          "pointerup",
          function () {
            clearInterval(intervalId);
          },
          {
            once: true,
          },
        );
      });
  });
}

/**
 * ボタンを押すとdirection方向にscrollPx移動する関数。
 * @param direction "left" or "right"
 * @param scrollPx
 */
function scroll(direction, scrollPx) {
  var contentSearchingHistory = document.getElementById(
    "searchingHistoryField",
  );
  if (direction === "left" && contentSearchingHistory != null) {
    contentSearchingHistory.scrollLeft -= scrollPx; // scrollPxごとにスクロールする（適宜調整可能）
  } else if (direction === "right" && contentSearchingHistory != null) {
    contentSearchingHistory.scrollLeft += scrollPx;
  }
}
