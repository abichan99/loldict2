export const SCROLL_PX: number = 4;
export const INTERVAL_MS: number = 10;

/** ボタンが押されたときに一定の時間間隔で訳語をスクロール(押しっぱなしの処理) */
export function scrollSearchingHistory() {
  const directions: string[] = ["left", "right"];
  directions.forEach((direction) => {
    document
      .getElementById(`scroll-button-${direction}`)
      ?.addEventListener("pointerdown", () => {
        const intervalId = setInterval(() => {
          scroll(direction as "left" | "right", SCROLL_PX);
        }, INTERVAL_MS); // 引数渡すための記述法、第二引数の単位：ms

        // document要素にイベント登録することで、クリックした後ボタンから動かしてもOK
        // once: true を指定して一度発火したらイベントを削除する
        document.addEventListener(
          "pointerup",
          () => {
            clearInterval(intervalId);
          },
          { once: true },
        );
      });
  });
}

/**
 * ボタンを押すとdirection方向にscrollPx移動する関数。
 * @param direction "left" or "right"
 * @param scrollPx
 */
export function scroll(direction: "left" | "right", scrollPx: number) {
  const contentSearchingHistory = document.getElementById(
    "searchingHistoryField",
  );
  if (direction === "left" && contentSearchingHistory != null) {
    contentSearchingHistory.scrollLeft -= scrollPx; // scrollPxごとにスクロールする（適宜調整可能）
  } else if (direction === "right" && contentSearchingHistory != null) {
    contentSearchingHistory.scrollLeft += scrollPx;
  }
}
