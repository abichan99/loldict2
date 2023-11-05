"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const initializeDarkMode_1 = require("../../src/darkMode/initializeDarkMode");
const testTools_1 = require("../testTools");
(0, testTools_1.loadHTML)();
// // mock window.matchMedia
// Object.defineProperty(window, 'matchMedia', {
//     writable: true,
//     value: jest.fn().mockImplementation(query => ({
//       matches: false,
//       media: query,
//       onchange: null,
//       addListener: jest.fn(), // deprecated
//       removeListener: jest.fn(), // deprecated
//       addEventListener: jest.fn(),
//       removeEventListener: jest.fn(),
//       dispatchEvent: jest.fn(),
//     })),
// });
(0, globals_1.describe)("test initializeDarkMode", () => {
    (0, globals_1.test)("localStorage.themeがdarkの時", () => {
        localStorage.setItem("theme", "dark");
        (0, initializeDarkMode_1.initializeDarkMode)();
        (0, globals_1.expect)(document.documentElement.className.includes("dark")).toBe(true);
    });
    (0, globals_1.test)("localStorage.themeがdarkではないとき", () => {
        localStorage.setItem("theme", "light");
        (0, initializeDarkMode_1.initializeDarkMode)();
        (0, globals_1.expect)(document.documentElement.className.includes("dark")).toBe(false);
    });
    // test("matchmMediaでタークモード設定されているとき", () => {
    //     localStorage.clear();
    //     // window.matchMedia('(prefers-color-scheme: dark)').matches = jest.fn(() => true);
    //     initializeDarkMode();
    //     expect(document.documentElement.className.includes("dark")).toBe(true);
    // })
});
