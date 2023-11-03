import { describe, expect, test } from "@jest/globals";
import {
  // scrollSearchingHistoryのtestでのみ使われるのでunusedにしておいた。
  scroll, SCROLL_PX, scrollSearchingHistory as _u1, INTERVAL_MS as _u2,
} from "../src/scrollSearchingHistory";
import { loadHTML } from "./testTools";

loadHTML("app/templates/index.html");

describe("test scroll", () => {
  const contentSearchingHistory = document.getElementById("searchingHistoryField") as HTMLElement;
  contentSearchingHistory.style.maxWidth = "400px";
  contentSearchingHistory.style.width = "1000px";
  test(`左に${SCROLL_PX}pxだけ動くか`, () => {
    const beforeScroll = contentSearchingHistory.scrollLeft;
    scroll("left", SCROLL_PX);
    expect(contentSearchingHistory.scrollLeft).toBe(beforeScroll - SCROLL_PX);
  });
  test(`右に${SCROLL_PX}pxだけ動くか`, () => {
    const beforeScroll = contentSearchingHistory.scrollLeft;
    scroll("right", SCROLL_PX);
    expect(contentSearchingHistory.scrollLeft).toBe(beforeScroll + SCROLL_PX);
  });
});

// describe("test scrollSearchingHistory", () => {
//     const times = 5;
//     const leftScrollBtn = document.getElementById("scroll-button-" + "left") as HTMLElement;
//     const rightScrollBtn = document.getElementById("scroll-button-" + "right") as HTMLElement;
