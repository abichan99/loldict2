"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const insertHomepageLink_1 = require("../src/insertHomepageLink");
const testTools_1 = require("./testTools");
(0, testTools_1.loadHTML)("app/templates/index.html");
(0, globals_1.describe)("test insertHomepageLink", () => {
    const homepageUrl = "url";
    const elem = document.getElementById("header-title");
    (0, insertHomepageLink_1.insertHomepageLink)(homepageUrl);
    (0, globals_1.test)("ちゃんとurlが埋め込まれているか", () => {
        // trigger DOMContentLoaded
        const DOMContentLoadedEvent = document.createEvent("Event");
        DOMContentLoadedEvent.initEvent("DOMContentLoaded", true, true);
        window.document.dispatchEvent(DOMContentLoadedEvent);
        (0, globals_1.expect)(elem.href).toBe(`http://localhost/${homepageUrl}`);
    });
});
