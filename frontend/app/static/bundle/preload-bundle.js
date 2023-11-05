(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const src = __importStar(require("./src/darkMode/initializeDarkMode"));
src.initializeDarkMode();

},{"./src/darkMode/initializeDarkMode":2}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDarkMode = void 0;
// tailwind公式文書を参照して作成：https://tailwindcss.com/docs/dark-mode
/** 画面ロード時にlocal storageやwindow.matchMediaを使ってdark modeにするかどうかを決定する。
 *
 * </body>下のスクリプトタグ内に置くと、画面が一瞬白になってからダークモードが発動するので目に悪いので、headタグ内に置く。
 */
function initializeDarkMode() {
    if (localStorage.getItem("theme") === "dark"
        || (!("theme" in localStorage)
            && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        localStorage.setItem("theme", "dark");
        document.documentElement.classList.add("dark");
    }
    else {
        localStorage.setItem("theme", "light");
        document.documentElement.classList.remove("dark");
    }
}
exports.initializeDarkMode = initializeDarkMode;

},{}]},{},[1]);
