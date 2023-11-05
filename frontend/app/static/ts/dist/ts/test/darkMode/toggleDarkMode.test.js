"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
const dom_1 = require("@testing-library/dom");
const toggleDarkMode_1 = require("../../src/darkMode/toggleDarkMode");
// index.html読み込んでhtmlに代入
const fs = require("fs");
const htmlStr = fs.readFileSync("app/templates/index.html", {
    encoding: "utf-8",
    flag: "r",
});
document.body.innerHTML = htmlStr;
describe("test toggleDarkMode", () => {
    const darkModeBtn = document.getElementById("darkModeBtn");
    localStorage.setItem("theme", "sth");
    (0, toggleDarkMode_1.toggleDarkMode)();
    test("dark modeをonにした時", () => {
        dom_1.fireEvent.change(darkModeBtn, { target: { checked: true } });
        expect(document.documentElement.className.includes("dark")).toBe(true);
        expect(localStorage.getItem("theme")).toBe("dark");
    });
    test("dark modeをoffにした時", () => {
        dom_1.fireEvent.change(darkModeBtn, { target: { checked: false } });
        expect(document.documentElement.className.includes("dark")).toBe(false);
        expect(localStorage.getItem("theme")).toBe("light");
    });
});
