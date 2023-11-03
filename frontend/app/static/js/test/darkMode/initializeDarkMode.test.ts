import { describe, expect, test } from "@jest/globals";
import { initializeDarkMode } from "../../src/darkMode/initializeDarkMode";
import { loadHTML } from "../testTools";

loadHTML();

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

describe("test initializeDarkMode", () => {
  test("localStorage.themeがdarkの時", () => {
    localStorage.setItem("theme", "dark");
    initializeDarkMode();
    expect(document.documentElement.className.includes("dark")).toBe(true);
  });
  test("localStorage.themeがdarkではないとき", () => {
    localStorage.setItem("theme", "light");
    initializeDarkMode();
    expect(document.documentElement.className.includes("dark")).toBe(false);
  });
  // test("matchmMediaでタークモード設定されているとき", () => {
  //     localStorage.clear();
  //     // window.matchMedia('(prefers-color-scheme: dark)').matches = jest.fn(() => true);
  //     initializeDarkMode();
  //     expect(document.documentElement.className.includes("dark")).toBe(true);
  // })
});
