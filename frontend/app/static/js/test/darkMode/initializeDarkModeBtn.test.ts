import { describe, expect, test } from "@jest/globals";
import { initializeDarkModeBtn } from "../../src/darkMode/initializeDarkModeBtn";

// index.html読み込んでhtmlに代入
const fs = require("fs");

const htmlStr = fs.readFileSync("app/templates/index.html", { encoding: "utf-8", flag: "r" });
document.body.innerHTML = htmlStr;

describe("test initializeDarkModeBtn", () => {
  const darkModeBtn = document.getElementById("darkModeBtn") as HTMLInputElement;
  test("localStorage.themeがdarkの時", () => {
    localStorage.setItem("theme", "dark");
    initializeDarkModeBtn();
    expect(darkModeBtn.checked).toBe(true);
  });
  test("localStorage.themeがdarkでない時", () => {
    localStorage.setItem("theme", "light");
    initializeDarkModeBtn();
    expect(darkModeBtn.checked).toBe(false);
  });
});
