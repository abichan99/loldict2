import { describe, expect, test } from "@jest/globals";
import { toggleFontColor, props } from "../../src/darkMode/toggleFontColor";
import { loadHTML } from "../testTools";

loadHTML();

describe("test toggleFontColor", () => {
  const textElemList = document.getElementsByClassName(props.nameClass);
  test("ダークモード時の条件を表すclassの値が追加されたかどうか", () => {
    toggleFontColor();
    (Array.from(textElemList)).forEach((elem) => {
      expect(elem.className.includes(props.darkMode)).toBe(true);
    });
  });
});
