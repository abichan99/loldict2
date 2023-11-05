"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
const initializeDarkModeBtn_1 = require("../../src/darkMode/initializeDarkModeBtn");
// index.html読み込んでhtmlに代入
const fs = require("fs");
const htmlStr = fs.readFileSync("app/templates/index.html", {
    encoding: "utf-8",
    flag: "r",
});
document.body.innerHTML = htmlStr;
describe("test initializeDarkModeBtn", () => {
    const darkModeBtn = document.getElementById("darkModeBtn");
    test("localStorage.themeがdarkの時", () => {
        localStorage.setItem("theme", "dark");
        (0, initializeDarkModeBtn_1.initializeDarkModeBtn)();
        expect(darkModeBtn.checked).toBe(true);
    });
    test("localStorage.themeがdarkでない時", () => {
        localStorage.setItem("theme", "light");
        (0, initializeDarkModeBtn_1.initializeDarkModeBtn)();
        expect(darkModeBtn.checked).toBe(false);
    });
});
