"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const scrollSearchingHistory_1 = require("../src/scrollSearchingHistory");
const testTools_1 = require("./testTools");
(0, testTools_1.loadHTML)("app/templates/index.html");
(0, globals_1.describe)("test scroll", () => {
    const contentSearchingHistory = document.getElementById("searchingHistoryField");
    contentSearchingHistory.style.maxWidth = "400px";
    contentSearchingHistory.style.width = "1000px";
    (0, globals_1.test)(`左に${scrollSearchingHistory_1.SCROLL_PX}pxだけ動くか`, () => {
        const beforeScroll = contentSearchingHistory.scrollLeft;
        (0, scrollSearchingHistory_1.scroll)("left", scrollSearchingHistory_1.SCROLL_PX);
        (0, globals_1.expect)(contentSearchingHistory.scrollLeft).toBe(beforeScroll - scrollSearchingHistory_1.SCROLL_PX);
    });
    (0, globals_1.test)(`右に${scrollSearchingHistory_1.SCROLL_PX}pxだけ動くか`, () => {
        const beforeScroll = contentSearchingHistory.scrollLeft;
        (0, scrollSearchingHistory_1.scroll)("right", scrollSearchingHistory_1.SCROLL_PX);
        (0, globals_1.expect)(contentSearchingHistory.scrollLeft).toBe(beforeScroll + scrollSearchingHistory_1.SCROLL_PX);
    });
});
// describe("test scrollSearchingHistory", () => {
//     const times = 5;
//     const leftScrollBtn = document.getElementById("scroll-button-" + "left") as HTMLElement;
//     const rightScrollBtn = document.getElementById("scroll-button-" + "right") as HTMLElement;
