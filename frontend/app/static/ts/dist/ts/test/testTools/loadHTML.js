"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadHTML = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * htmlPathにあるhtmlファイルを読み込んでdocument.body.innerHTMLに代入
 * @param htmlPath root directoryからの相対パス ex) "app/templates/index.html"
 * default: "app/templates/index.html"
 */
function loadHTML(htmlPath = "app/templates/index.html") {
    // eslint-disable-next-line global-require
    const fs = require("fs");
    const htmlStr = fs.readFileSync(htmlPath, { encoding: "utf-8", flag: "r" });
    document.body.innerHTML = htmlStr;
}
exports.loadHTML = loadHTML;
