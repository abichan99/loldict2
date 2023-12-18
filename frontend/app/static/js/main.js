"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var src = _interopRequireWildcard(require("./src/index"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/* eslint-disable @typescript-eslint/no-unused-expressions */
// TODO: validator.jsのリファクタリング

// ローカルで開発するときはのHOMEPAGE_URLを自分のローカルの住所に変える
// const HOMEPAGE_URL: string = "http://loldictkrjp.ap-northeast-1.elasticbeanstalk.com/";  // 本番の住所
var curURL = window.location.href;
var HOMEPAGE_URL = curURL.split("?")[0];
src.insertHomepageLink(HOMEPAGE_URL);

// 以下2文の順序を変えないこと。
src.initializeDarkModeBtn();
src.toggleDarkMode();
src.displaySearchingHistory();
src.scrollSearchingHistory(); // この関数の内部関数であるsrcollのみtest済み

src.searchFromSearchingHistory(HOMEPAGE_URL);
src.registerTranslation();
src.searchForTranslation(HOMEPAGE_URL);
src.cleanValidationErrMsg();
src.switchVisibilityRegistrationForm();
src.toggleFontColor();
