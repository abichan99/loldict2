"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const toggleFontColor_1 = require("../../src/darkMode/toggleFontColor");
const testTools_1 = require("../testTools");
(0, testTools_1.loadHTML)();
(0, globals_1.describe)("test toggleFontColor", () => {
    const textElemList = document.getElementsByClassName(toggleFontColor_1.props.nameClass);
    (0, globals_1.test)("ダークモード時の条件を表すclassの値が追加されたかどうか", () => {
        (0, toggleFontColor_1.toggleFontColor)();
        Array.from(textElemList).forEach((elem) => {
            (0, globals_1.expect)(elem.className.includes(toggleFontColor_1.props.darkMode)).toBe(true);
        });
    });
});
