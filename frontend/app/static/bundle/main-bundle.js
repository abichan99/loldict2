(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var src = _interopRequireWildcard(require("./src/index"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
/* eslint-disable @typescript-eslint/no-unused-expressions */
// TODO: validator.jsのリファクタリング

// ローカルで開発するときはのHOMEPAGE_URLを自分のローカルの住所に変える
// const HOMEPAGE_URL: string = "http://loldictkrjp.ap-northeast-1.elasticbeanstalk.com/";  // 本番の住所
var HOMEPAGE_URL = "http://localhost:5000/";
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

},{"./src/index":9}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IDlist = void 0;
exports.cleanValidationErrMsg = cleanValidationErrMsg;
var IDlist = exports.IDlist = ["wordKrInput",
// 韓国語入力欄
"wordJpInput",
// 日本語入力欄
"descriptionInput",
// 説明入力欄
"translationSearchingBar" // 検索ワード入力欄
];

/** input要素のvalueが変わったらvalidation messageを空にする */
function cleanValidationErrMsg() {
  cleanMsg(IDlist);
}
function cleanMsg(IDlist) {
  IDlist.forEach(function (id) {
    var _document$getElementB;
    (_document$getElementB = document.getElementById(id)) === null || _document$getElementB === void 0 || _document$getElementB.addEventListener("change", function () {
      this.setCustomValidity("");
    });
  });
}

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _toggleFontColor = require("./toggleFontColor");
Object.keys(_toggleFontColor).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _toggleFontColor[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _toggleFontColor[key];
    }
  });
});
var _toggleDarkMode = require("./toggleDarkMode");
Object.keys(_toggleDarkMode).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _toggleDarkMode[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _toggleDarkMode[key];
    }
  });
});
var _initializeDarkModeBtn = require("./initializeDarkModeBtn");
Object.keys(_initializeDarkModeBtn).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _initializeDarkModeBtn[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _initializeDarkModeBtn[key];
    }
  });
});
var _initializeDarkMode = require("./initializeDarkMode");
Object.keys(_initializeDarkMode).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _initializeDarkMode[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _initializeDarkMode[key];
    }
  });
});

},{"./initializeDarkMode":4,"./initializeDarkModeBtn":5,"./toggleDarkMode":6,"./toggleFontColor":7}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeDarkMode = initializeDarkMode;
// tailwind公式文書を参照して作成：https://tailwindcss.com/docs/dark-mode
/** 画面ロード時にlocal storageやwindow.matchMediaを使ってdark modeにするかどうかを決定する。
 *
 * </body>下のスクリプトタグ内に置くと、画面が一瞬白になってからダークモードが発動するので目に悪いので、headタグ内に置く。
 */
function initializeDarkMode() {
  if (localStorage.getItem("theme") === "dark" || !("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    localStorage.setItem("theme", "dark");
    document.documentElement.classList.add("dark");
  } else {
    localStorage.setItem("theme", "light");
    document.documentElement.classList.remove("dark");
  }
}

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeDarkModeBtn = initializeDarkModeBtn;
/** localStorage.themeの値によってダークモードボタンのcheck具合を変える
 * head内にも似たようなコードがあるが、以下のコードはhtmlが読み込まれた後にdark mode switchをチェック状態にするかどうかを決めている */
function initializeDarkModeBtn() {
  var darkModeBtn = document.getElementById("darkModeBtn");
  if (darkModeBtn === null) {
    return;
  }
  if (localStorage.theme === "dark") {
    darkModeBtn.checked = true;
  } else {
    darkModeBtn.checked = false;
  }
}

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleDarkMode = toggleDarkMode;
/** toggle dark mode and switch localStorage value (localStorage.theme: dark <-> light) */
function toggleDarkMode() {
  var darkModeBtn = document.getElementById("darkModeBtn");
  if (darkModeBtn === null) {
    return;
  }
  darkModeBtn.addEventListener("change", function () {
    if (this.checked === true) {
      localStorage.theme = "dark";
      // htmlタグのクラスにdarkを追加するとtailwind css下でダークモードになる。
      document.documentElement.classList.add("dark");
    } else {
      localStorage.theme = "light";
      document.documentElement.classList.remove("dark");
    }
  });
}

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.props = void 0;
exports.toggleFontColor = toggleFontColor;
var props = exports.props = {
  nameClass: "myapp-text",
  // index.htmlのテキスト要素につけているclassの名前
  darkMode: "dark:text-gray-400"
};

/** ダークモード時の文字色を指定する関数。適用させたい要素のclass属性にmtapp-textを追加する */
function toggleFontColor() {
  var textElemList = document.getElementsByClassName(props.nameClass);
  // arrayに変換してfor文使えるようにする
  Array.from(textElemList).forEach(function (element) {
    element.classList.add(props.darkMode);
  });
}

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classListDiv = exports.classListBtn = void 0;
exports.convert2classCode = convert2classCode;
exports.createHtml4SearchingHistory = createHtml4SearchingHistory;
exports.displaySearchingHistory = displaySearchingHistory;
var _index = require("./utils/index");
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */

var classListDiv = exports.classListDiv = ["flex", "justify-center", "items-center", "mx-3.5"];
var classListBtn = exports.classListBtn = ["mx-2", "myapp-text", "break-keep", "hover:underline"]; // Btnと書いているが、検索ワードを表示する役がメインであり、クリックすると飛ぶようにしたかったので仕方なくボタンにした。

/** localHistory内に作ったsearchingHistoryを使って検索履歴を表示させる関数。 */
function displaySearchingHistory() {
  // classList：wordのelementそれぞれに対する共通のクラス
  // それぞれのワードに対するdivのid：searched-word + i(iはそれぞれのワードを区別するためのもので特に取り方に意味なし、iは0～検索履歴の単語の数-1、整数)
  var searchingHistory = window.localStorage.getItem("searchingHistory");
  var html4searchingHistory = createHtml4SearchingHistory(searchingHistory, classListDiv, classListBtn);
  var target = document.getElementById("searchingHistoryField");
  if (html4searchingHistory !== "" && target != null) {
    target.innerHTML = html4searchingHistory;
  }
}

/**
 * 検索履歴を表示するためのhtmlコードを生成する関数。
 * 表示するものがないときは空の文字列を返す。生成例は関数内のコメントを参照。
 *
 * @param {string | Falsy} searchingHistory csv形式の検索履歴
 * @param {Array<string>} classListDiv 作成するコード内のdivのクラスの値の配列
 * @param {Array<string>} classListBtn 作成するコード内のbtnのクラスの値の配列
 * @returns
 */
function createHtml4SearchingHistory(searchingHistory, classListDiv, classListBtn) {
  // 完成形は以下のような感じ
  // <div id="searched-word0" class="a1 a2 ...">
  //     <button class="b1 b2 ...">word1</button>
  // </div>
  // <div id="searched-word1" class="a1 a2 ...">
  //     <button class="b1 b2 ...">word2</button>
  // </div>
  // ...

  // searchingHistoryがfalsyな時は何もしない
  if (!searchingHistory) {
    return "";
  }

  // wordList：最新の検索履歴が前に来る配列
  var wordList;
  if (searchingHistory.indexOf(",") === -1) {
    // 検索履歴の単語が一つの時の処理
    wordList = [searchingHistory];
  } else {
    wordList = searchingHistory.split(",").reverse();
  }
  // divのidを動的生成すうための変数
  var i = 0;
  var retval = "";

  // wordListのすべての文字が表示不可条件を満たしていないときは何もしない。
  // 表示不可条件：wordがfalsyかinvalid
  var refuseDisplay = function refuseDisplay(word) {
    return !word || word === "undefined" || !(0, _index.validateWord)(word).isValid;
  };
  if (wordList.every(refuseDisplay)) {
    return "";
  }

  // eslint-disable-next-line consistent-return
  wordList.forEach(function (word) {
    // ここでのreturnはfor文でのcontinueと同じ
    // wordがfalsyの時、invalidの時はわざわざ表示しない
    if (!word || word === "undefined" || !(0, _index.validateWord)(word).isValid) {
      return "";
    }

    // それぞれのwordに対するdivにid追加
    var html = "<div ";
    html += "id=\"searched-word".concat(i, "\" ");
    i += 1;

    // 引数のclassListでclass属性のコード書く
    html += "".concat(convert2classCode(classListDiv), ">");
    html += "<button ".concat(convert2classCode(classListBtn), ">").concat(word, "</button>");
    html += "</div>";

    // 単語を表示するそれぞれhtmlコードをretvalに追加
    retval += html;
  });
  return retval;
}

/**
 * class="classList[0] classList[1] ... classList[-1]"
 * を作ってreturnする
 *
 * @param {Array<string>} classList htmlのクラス属性の値が入った配列
 * @returns 上記の説明のとおり。
 */
function convert2classCode(classList) {
  var classCode;
  if (classList.length === 0) {
    return "class=\"\"";
  }
  classCode = "class=\"".concat(classList[0]);
  for (var i = 1; i < classList.length; i++) {
    classCode = "".concat(classCode, " ").concat(classList[i]);
  }
  classCode += "\"";
  return classCode;
}

},{"./utils/index":19}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _index = require("./darkMode/index");
Object.keys(_index).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index[key];
    }
  });
});
var _index2 = require("./utils/index");
Object.keys(_index2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _index2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _index2[key];
    }
  });
});
var _searchForTranslation = require("./searchForTranslation");
Object.keys(_searchForTranslation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _searchForTranslation[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _searchForTranslation[key];
    }
  });
});
var _registerTranslation = require("./registerTranslation");
Object.keys(_registerTranslation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _registerTranslation[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _registerTranslation[key];
    }
  });
});
var _cleanValidationErrMsg = require("./cleanValidationErrMsg");
Object.keys(_cleanValidationErrMsg).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _cleanValidationErrMsg[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _cleanValidationErrMsg[key];
    }
  });
});
var _displaySearchingHistory = require("./displaySearchingHistory");
Object.keys(_displaySearchingHistory).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _displaySearchingHistory[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _displaySearchingHistory[key];
    }
  });
});
var _switchVisibilityRegistrationForm = require("./switchVisibilityRegistrationForm");
Object.keys(_switchVisibilityRegistrationForm).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _switchVisibilityRegistrationForm[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _switchVisibilityRegistrationForm[key];
    }
  });
});
var _searchFromSearchingHistory = require("./searchFromSearchingHistory");
Object.keys(_searchFromSearchingHistory).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _searchFromSearchingHistory[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _searchFromSearchingHistory[key];
    }
  });
});
var _scrollSearchingHistory = require("./scrollSearchingHistory");
Object.keys(_scrollSearchingHistory).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _scrollSearchingHistory[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _scrollSearchingHistory[key];
    }
  });
});
var _insertHomepageLink = require("./insertHomepageLink");
Object.keys(_insertHomepageLink).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _insertHomepageLink[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _insertHomepageLink[key];
    }
  });
});

},{"./cleanValidationErrMsg":2,"./darkMode/index":3,"./displaySearchingHistory":8,"./insertHomepageLink":10,"./registerTranslation":11,"./scrollSearchingHistory":12,"./searchForTranslation":13,"./searchFromSearchingHistory":14,"./switchVisibilityRegistrationForm":15,"./utils/index":19}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.insertHomepageLink = insertHomepageLink;
// ホームページへのリンク挿入はhtmlに直接書き込まずjsの変数を利用して自動化している。こっちのほうが環境の切り替えの時に安全。
function insertHomepageLink(homepageUrl) {
  window.addEventListener("DOMContentLoaded", function () {
    // headerのホーム遷移ボタンが押されたときにHOMEPAGE_URLに移動。
    var elem = document.getElementById("header-title");
    elem === null || elem === void 0 || elem.setAttribute("href", homepageUrl);
  });
}

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IDs = void 0;
exports.registerIfValid = registerIfValid;
exports.registerTranslation = registerTranslation;
var _index = require("./utils/index");
var _cookie = require("./utils/cookie");
var IDs = exports.IDs = {
  registrationForm: "registrationForm",
  wordKr: "wordKrInput",
  wordJp: "wordJpInput",
  description: "descriptionInput"
};

/** inputsがvalidな時に訳語としてdbに登録 */
function registerTranslation() {
  var _document$getElementB;
  (_document$getElementB = document.getElementById(IDs.registrationForm)) === null || _document$getElementB === void 0 || _document$getElementB.addEventListener("submit", registerIfValid);
}

/** それぞれのinput dataのうち一つでもinvalidならエラーメッセージを表示、validならdbに登録 */
function registerIfValid(e) {
  // assign input data
  e.preventDefault();
  var wordKr = e.target.querySelector("#".concat(IDs.wordKr));
  var wordJp = e.target.querySelector("#".concat(IDs.wordJp));
  var description = e.target.querySelector("#".concat(IDs.description));

  // validate each input data
  var validationResultWordKr = (0, _index.validateWord)(wordKr.value);
  var validationResultWordJp = (0, _index.validateWord)(wordJp.value);
  var validationResultDescription = (0, _index.validateDescription)(description.value);

  // when invalid, stop sending data and display error messages on input fields
  if (!validationResultWordKr.isValid) {
    wordKr.setCustomValidity(validationResultWordKr.errMessage);
    return;
  }
  if (!validationResultWordJp.isValid) {
    wordJp.setCustomValidity(validationResultWordJp.errMessage);
    return;
  }
  if (!validationResultDescription.isValid) {
    description.setCustomValidity(validationResultDescription.errMessage);
    return;
  }

  // include input data to json if valid
  var csrfToken = (0, _cookie.getCookie)("_csrf");
  var requestData = {
    wordKr: wordKr.value,
    wordJp: wordJp.value,
    description: description.value
  };

  // send ajax post request to register data to db
  var url = document.getElementById(IDs.registrationForm).action;
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("X-CSRF-Token", csrfToken);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // eslint-disable-next-line no-alert
      alert(xhr.responseText);
      window.location.reload();
    }
  };
  xhr.send(JSON.stringify(requestData));
}

},{"./utils/cookie":17,"./utils/index":19}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SCROLL_PX = exports.INTERVAL_MS = void 0;
exports.scroll = scroll;
exports.scrollSearchingHistory = scrollSearchingHistory;
var SCROLL_PX = exports.SCROLL_PX = 4;
var INTERVAL_MS = exports.INTERVAL_MS = 10;

/** ボタンが押されたときに一定の時間間隔で訳語をスクロール(押しっぱなしの処理) */
function scrollSearchingHistory() {
  var directions = ["left", "right"];
  directions.forEach(function (direction) {
    var _document$getElementB;
    (_document$getElementB = document.getElementById("scroll-button-".concat(direction))) === null || _document$getElementB === void 0 || _document$getElementB.addEventListener("pointerdown", function () {
      var intervalId = setInterval(function () {
        scroll(direction, SCROLL_PX);
      }, INTERVAL_MS); // 引数渡すための記述法、第二引数の単位：ms

      // document要素にイベント登録することで、クリックした後ボタンから動かしてもOK
      // once: true を指定して一度発火したらイベントを削除する
      document.addEventListener("pointerup", function () {
        clearInterval(intervalId);
      }, {
        once: true
      });
    });
  });
}

/**
 * ボタンを押すとdirection方向にscrollPx移動する関数。
 * @param direction "left" or "right"
 * @param scrollPx
 */
function scroll(direction, scrollPx) {
  var contentSearchingHistory = document.getElementById("searchingHistoryField");
  if (direction === "left" && contentSearchingHistory != null) {
    contentSearchingHistory.scrollLeft -= scrollPx; // scrollPxごとにスクロールする（適宜調整可能）
  } else if (direction === "right" && contentSearchingHistory != null) {
    contentSearchingHistory.scrollLeft += scrollPx;
  }
}

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchForTranslation = searchForTranslation;
exports.searchIfValid = searchIfValid;
var _index = require("./utils/index");
/** 検索ワードがvalidなときに訳語を検索、あれば表示する関数。なければないと知らせる。
 *
 * 検索ワードがinvalidな時はurl更新せずinput fieldにエラーメッセージ表示。
 * @param homepageUrl ホームページのurl
 */
function searchForTranslation(homepageUrl) {
  var _document$getElementB;
  (_document$getElementB = document.getElementById("searchingForm")) === null || _document$getElementB === void 0 || _document$getElementB.addEventListener("submit", function (event) {
    searchIfValid(event, homepageUrl);
  });
}

/**
 * 検索ワードがinvalidならエラーメッセージを表示し、validならurlを更新して訳語を検索する関数。
 * @param curUrl この関数が実行されたときのurl
 */
function searchIfValid(e, curUrl) {
  e.preventDefault();
  var elem = e.target.querySelector("#translationSearchingBar");
  var keyword = elem.value;
  var tmp = (0, _index.validateWord)(keyword);
  // when invalid, stop sending data and display error messages on input fields
  if (elem != null && !tmp.isValid) {
    elem.setCustomValidity(tmp.errMessage);
    return;
  }
  (0, _index.store2localStorage)(keyword);
  var url = "".concat(curUrl, "?keyword=").concat(keyword);
  window.location.href = url;
}

},{"./utils/index":19}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.searchFromSearchingHistory = searchFromSearchingHistory;
var _index = require("./utils/index");
/**
 * 検索履歴の単語が押されたときにその単語を検索ワードとして訳語をサーチ。検索ワードのvalidationも行う。
 * @param homepageUrl ホームページのurl
 */
function searchFromSearchingHistory(homepageUrl) {
  var numStoredKeywords = (0, _index.cntStoredKeywords)();
  var _loop = function _loop() {
    var _document$getElementB;
    var id = "searched-word".concat(i.toString()); // 検索履歴に表示された単語それぞれのhtmlのid
    var wordBtn = (_document$getElementB = document.getElementById(id)) === null || _document$getElementB === void 0 ? void 0 : _document$getElementB.children[0];
    var keyword = wordBtn === null || wordBtn === void 0 ? void 0 : wordBtn.innerHTML;
    wordBtn === null || wordBtn === void 0 || wordBtn.addEventListener("click", function () {
      if (keyword === undefined) {
        return;
      }
      // when invalid, stop sending data and display error messages on input fields
      if (!(0, _index.validateWord)(keyword).isValid) {
        return;
      }
      // store the input elem to local storage(検索履歴の単語の順番を更新)
      (0, _index.store2localStorage)(keyword);
      window.location.href = "".concat(homepageUrl, "?keyword=").concat(keyword);
    });
  };
  for (var i = 0; i < numStoredKeywords; i++) {
    _loop();
  }
}

},{"./utils/index":19}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.switchVisibilityRegistrationForm = switchVisibilityRegistrationForm;
/** 訳語登録フォームの表示／非表示の切り替え */
function switchVisibilityRegistrationForm() {
  var formBtn = document.getElementById("collapseBtnRegistrationForm");
  formBtn === null || formBtn === void 0 || formBtn.addEventListener("click", function (e) {
    e.currentTarget.classList.toggle("active");
    var content = document.getElementById("target-collapse");
    if (content != null && content.style.display === "block") {
      content.style.display = "none";
    } else if (content != null) {
      content.style.display = "block";
    }
  });
}

},{}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cntStoredKeywords = cntStoredKeywords;
/**
 * localStorageのsearchingHistoryに保存されている単語の数を検索
 * @returns searchingHistoryに保存されている単語の数
 */
function cntStoredKeywords() {
  var searchingHistory = localStorage.getItem("searchingHistory");
  var numStoredKeywords = 0;
  if (!!searchingHistory && searchingHistory !== "undefined") {
    numStoredKeywords = searchingHistory.split(",").length;
  }
  return numStoredKeywords;
}

},{}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCookie = getCookie;
function getCookie(name) {
  var value = "; ".concat(document.cookie);
  var parts = value.split("; ".concat(name, "="));
  if (parts.length === 2) {
    if (parts !== undefined) {
      return parts.pop().split(";").shift();
    }
  }
  return "";
}

},{}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _store2localStorage = require("./store2localStorage");
Object.keys(_store2localStorage).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _store2localStorage[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _store2localStorage[key];
    }
  });
});
var _validators = require("./validators");
Object.keys(_validators).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _validators[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _validators[key];
    }
  });
});
var _falsy = require("./falsy");
Object.keys(_falsy).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _falsy[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _falsy[key];
    }
  });
});
var _cntStoredKeywords = require("./cntStoredKeywords");
Object.keys(_cntStoredKeywords).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _cntStoredKeywords[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _cntStoredKeywords[key];
    }
  });
});

},{"./cntStoredKeywords":16,"./falsy":18,"./store2localStorage":20,"./validators":21}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.move2end = move2end;
exports.removeOldestAndAdd = removeOldestAndAdd;
exports.store2localStorage = store2localStorage;
var _index = require("./index");
/**
 *
 * @param keyword 検索された単語(dbに登録されてないものも含む、一応validationする)
 * @returns keywordが追加されたcsv形式の検索履歴
 */
function store2localStorage(keyword) {
  // local storageに保存するkeywordの最大値
  var MAX_KEYWORD_NUM = 10;
  var searchingHistory = window.localStorage.getItem("searchingHistory");
  if (!(0, _index.validateWord)(keyword).isValid) {
    return;
  }
  var validKeyword = keyword;
  // local storageには文字列しか入力できないので、csv形式で検索ワードを保存する(単語が一つの時は先頭にコンマ書く)。
  // 検索履歴がないときの処理
  if (searchingHistory === null || searchingHistory === "") {
    window.localStorage.setItem("searchingHistory", validKeyword);
    return;
  }

  // local storageに保存されているワードをリストに保存
  var storedKeywordAry;
  if (searchingHistory.indexOf(",") === -1) {
    storedKeywordAry = [searchingHistory];
  } else {
    storedKeywordAry = searchingHistory.split(",");
  }
  // storedKeywordsAryの要素のうちvalidな単語だけ抽出
  var validKeywordAry = [];
  storedKeywordAry.forEach(function (word) {
    if ((0, _index.validateWord)(word).isValid) {
      validKeywordAry.push(word);
    }
  });
  var numValidKeywords = validKeywordAry.length;

  // 検索履歴に含まれているものを検索した場合、重複を許さず該当のワードを最新の検索ワードとするように順番を入れ替える
  // ex) keyword: Mango, searchingHistory: "Banana,Orange,Apple,Mango,Berry"
  // retval: "Banana,Orange,Apple,Berry,Mango"
  if (validKeywordAry.indexOf(validKeyword) !== -1) {
    window.localStorage.setItem("searchingHistory", move2end(validKeywordAry, validKeyword));
    return;
  }

  // 保存された検索ワード数がMAX_KEYWORD_NUMを超えたときに、一番長く検索されなかったワードを捨てて最新の検索ワードを追加する
  if (numValidKeywords >= MAX_KEYWORD_NUM) {
    window.localStorage.setItem("searchingHistory", removeOldestAndAdd(validKeywordAry, validKeyword));
    return;
  }

  // 検索履歴に含まれていないワードが検索されたときはsearchingHistoryの最後尾にワードを追加
  window.localStorage.setItem("searchingHistory", "".concat(searchingHistory, ",").concat(keyword));
}

/**
 * 先頭要素(一番古く検索された単語)を削除したvalidKeywordsAryとkeywordを用いて、keywordを最新の検索単語とするcsv形式の検索履歴を返す
 *
 * @param {Array<string>} validKeywordAry 検索履歴のうちvalidなやつの配列
 * @param {string} validatedKeyword validKeywordsAryに含まれる単語
 * @returns 一番古く検索された単語を削除し、最新の単語を追加したcsv形式の検索履歴
 */
function removeOldestAndAdd(validKeywordAry, validatedKeyword) {
  var newSearchingHistory = validKeywordAry[1];
  for (var i = 2; i < validKeywordAry.length; i++) {
    newSearchingHistory = "".concat(newSearchingHistory, ",").concat(validKeywordAry[i]);
  }
  newSearchingHistory = "".concat(newSearchingHistory, ",").concat(validatedKeyword);
  return newSearchingHistory;
}

/** keywordを最後尾の単語とするcsv形式の検索履歴を返す関数

 *  ex) keyword: Mango, validKeywordsAry: ["Banana","Orange","Apple","Mango","Berry"]

    retval: "Banana,Orange,Apple,Berry,Mango"
 *
 * @param {Array<string>} validKeywordAry 検索履歴の単語の配列。
 * @param {string} validKeyword validKeywordsAryの中に含まれる単語
 * @returns 新しく生成されたcsv形式の検索履歴
 */
function move2end(validKeywordAry, validKeyword) {
  if (validKeywordAry.length === 1 && validKeywordAry[0] === validKeyword) {
    return validKeyword.toString();
  }
  // storedKeywordAryからkeywordを取り除く
  var index = validKeywordAry.indexOf(validKeyword);
  validKeywordAry.splice(index, 1);
  var newSearchingHistory = validKeywordAry[0];
  // 更新られたsotredKeywordAryをカンマ区切りの文字列に変換
  for (var i = 1; i < validKeywordAry.length; i++) {
    newSearchingHistory = "".concat(newSearchingHistory, ",").concat(validKeywordAry[i]);
  }
  // keywordを最後尾に追加
  newSearchingHistory = "".concat(newSearchingHistory, ",").concat(validKeyword);
  return newSearchingHistory;
}

},{"./index":19}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRegexpGu = createRegexpGu;
exports.returnValidationResult = returnValidationResult;
exports.validateDescription = validateDescription;
exports.validateWord = validateWord;
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */

/**
 * validationする際の条件
 *
 * maxCharNum: 文字数の上限
 *
 * allowedUnicodeCategoryList: 許可するunicode category
 *
 * allowedIndividualCharacterList: allowedUnicodeCategoryListの条件を満たさない文字のうち、例外的に許可する文字
 */

/**
 *
 * @param {string} word validate対象の文字列
 * @returns {{boolean; string}} {isValid, errMessage} validかどうか、invalidの時のエラーメッセ―ジ
 */
function validateWord(word) {
  var validationConditions = {
    maxChar: 30,
    // allowed unicode properties: Letter, Number
    allowedUnicodeCategoryList: ["L", "N"],
    allowedIndividualCharacterList: [" ", "　", "`", "_", "-", "、", "。", "「", "」", "ー", "(", ")", "（", "）", "[", "]", "%", "％", "‘", "’"]
  };
  return returnValidationResult(word, validationConditions);
}

/**
 *
 * @param {string} description validate対象の文字列
 * @returns {{boolean; string}} {isValid, errMessage} validかどうか、invalidの時のエラーメッセ―ジ
 */
function validateDescription(description) {
  var validationConditions = {
    maxChar: 200,
    // allowed unicode properties: Letter, Number
    allowedUnicodeCategoryList: ["L", "N"],
    allowedIndividualCharacterList: [".", ",", " ", "　", "\"", "'", "`", "_", "-", "、", "。", "「", "」", "^", "~", "ー", "(", ")", "{", "}", "[", "]", "%", "％", "‘", "’"]
  };
  return returnValidationResult(description, validationConditions);
}

/**
 *
 * @param {string} target validate対象の文字列
 * @param {ValidationConditions} validationConditions
 * @returns
 */
function returnValidationResult(target, validationConditions) {
  // validationConditions.allowedUnicodeCategoryListに入っているunicode categoryに属さない文字をすべてリストに代入する正規表現
  var REGEXP_PROHIBITED_CHARACTERS = createRegexpGu(validationConditions.allowedUnicodeCategoryList);

  // raise an error if word length is longer than validationConditions.maxCharNum
  if (target.length > validationConditions.maxChar) {
    return {
      isValid: false,
      errMessage: "".concat(validationConditions.maxChar, "\uC790 \uC774\uB0B4\uB85C \uC785\uB825\uD574 \uC8FC\uC138\uC694.")
    };
  }

  // NFC：サロゲートペアを単一の文字コードで表すように正規化にする
  // NFCの説明：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
  var normalizedWord = target.normalize("NFC");
  var invalidCharacterList = normalizedWord.match(REGEXP_PROHIBITED_CHARACTERS);
  if (invalidCharacterList === null) {
    return {
      isValid: true,
      errMessage: ""
    };
  }

  // raise an error if...
  // 1. word includes characters that are not letters or numbers and
  // 2. any of them are not the element of validationConditions.allowedIndividualCharacterList
  for (var i = 0; i < invalidCharacterList.length; i++) {
    var invalidCharacter = invalidCharacterList[i];
    if (!validationConditions.allowedIndividualCharacterList.includes(invalidCharacter)) {
      return {
        isValid: false,
        errMessage: "\uC0AC\uC6A9 \uD560 \uC218 \uC5C6\uB294 \uBB38\uC790\uAC00 \uD3EC\uD568\uB418\uC5B4 \uC788\uC2B5\uB2C8\uB2E4: ".concat(invalidCharacter, ".")
      };
    }
  }

  // this must be at the end of this function
  // set isValid as true if the given word passes all the validation
  return {
    isValid: true,
    errMessage: ""
  };
}

/**
 * 入力を許可するunicode categoryのリストを引数として受け取り、それ以外の文字を見つける正規表現を返す。
 * 正規表現のフラグgu：マッチするすべての文字をリストで返す。サロゲートペアまで正しく処理する。(フラグについて：https://javascript.info/regexp-introduction)
 *
 * @param {Array<string>} unicodeCategoryList 入力を許可するunicode category(Letter, Numberなど)。
 * @returns 引数で与えられたunicode categoryに属さない文字を見つける正規表現
 */
function createRegexpGu(unicodeCategoryList) {
  var regexp = "[^";
  for (var i = 0; i < unicodeCategoryList.length; i++) {
    var elem = unicodeCategoryList[i];
    regexp += "\\p{".concat(elem, "}");
  }
  regexp += "]";
  return new RegExp(regexp, "gu");
}

},{}]},{},[1]);
