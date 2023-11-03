import { describe, expect, test } from "@jest/globals";
import { fireEvent } from "@testing-library/dom";
import { toggleDarkMode } from "../../src/darkMode/toggleDarkMode";

// index.html読み込んでhtmlに代入
const fs = require("fs");

const htmlStr = fs.readFileSync("app/templates/index.html", { encoding: "utf-8", flag: "r" });
document.body.innerHTML = htmlStr;

describe("test toggleDarkMode", () => {
  const darkModeBtn = document.getElementById("darkModeBtn") as HTMLInputElement;
  localStorage.setItem("theme", "sth");
  toggleDarkMode();
  test("dark modeをonにした時", () => {
    fireEvent.change(darkModeBtn, { target: { checked: true } });
    expect(document.documentElement.className.includes("dark")).toBe(true);
    expect(localStorage.getItem("theme")).toBe("dark");
  });
  test("dark modeをoffにした時", () => {
    fireEvent.change(darkModeBtn, { target: { checked: false } });
    expect(document.documentElement.className.includes("dark")).toBe(false);
    expect(localStorage.getItem("theme")).toBe("light");
  });
});
