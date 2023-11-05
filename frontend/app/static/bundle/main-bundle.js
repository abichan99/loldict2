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
/* eslint-disable @typescript-eslint/no-unused-expressions */
// TODO: validator.jsのリファクタリング
const src = __importStar(require("./src/index"));
// ローカルで開発するときはのHOMEPAGE_URLを自分のローカルの住所に変える
// const HOMEPAGE_URL: string = "http://loldictkrjp.ap-northeast-1.elasticbeanstalk.com/";  // 本番の住所
const HOMEPAGE_URL = "http://localhost:5000/";
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

},{"./src/index":10}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanValidationErrMsg = exports.IDlist = void 0;
exports.IDlist = [
    "wordKrInput",
    "wordJpInput",
    "descriptionInput",
    "translationSearchingBar",
];
/** input要素のvalueが変わったらvalidation messageを空にする */
function cleanValidationErrMsg() {
    cleanMsg(exports.IDlist);
}
exports.cleanValidationErrMsg = cleanValidationErrMsg;
function cleanMsg(IDlist) {
    IDlist.forEach((id) => {
        var _a;
        (_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.addEventListener("change", function () {
            this.setCustomValidity("");
        });
    });
}

},{}],3:[function(require,module,exports){
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./toggleFontColor"), exports);
__exportStar(require("./toggleDarkMode"), exports);
__exportStar(require("./initializeDarkModeBtn"), exports);
__exportStar(require("./initializeDarkMode"), exports);

},{"./initializeDarkMode":4,"./initializeDarkModeBtn":5,"./toggleDarkMode":6,"./toggleFontColor":7}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeDarkModeBtn = void 0;
/** localStorage.themeの値によってダークモードボタンのcheck具合を変える
 * head内にも似たようなコードがあるが、以下のコードはhtmlが読み込まれた後にdark mode switchをチェック状態にするかどうかを決めている */
function initializeDarkModeBtn() {
    const darkModeBtn = document.getElementById("darkModeBtn");
    if (darkModeBtn === null) {
        return;
    }
    if (localStorage.theme === "dark") {
        darkModeBtn.checked = true;
    }
    else {
        darkModeBtn.checked = false;
    }
}
exports.initializeDarkModeBtn = initializeDarkModeBtn;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleDarkMode = void 0;
/** toggle dark mode and switch localStorage value (localStorage.theme: dark <-> light) */
function toggleDarkMode() {
    const darkModeBtn = document.getElementById("darkModeBtn");
    if (darkModeBtn === null) {
        return;
    }
    darkModeBtn.addEventListener("change", function () {
        if (this.checked === true) {
            localStorage.theme = "dark";
            // htmlタグのクラスにdarkを追加するとtailwind css下でダークモードになる。
            document.documentElement.classList.add("dark");
        }
        else {
            localStorage.theme = "light";
            document.documentElement.classList.remove("dark");
        }
    });
}
exports.toggleDarkMode = toggleDarkMode;

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleFontColor = exports.props = void 0;
exports.props = {
    nameClass: "myapp-text",
    darkMode: "dark:text-gray-400",
};
/** ダークモード時の文字色を指定する関数。適用させたい要素のclass属性にmtapp-textを追加する */
function toggleFontColor() {
    const textElemList = document.getElementsByClassName(exports.props.nameClass);
    // arrayに変換してfor文使えるようにする
    Array.from(textElemList).forEach((element) => {
        element.classList.add(exports.props.darkMode);
    });
}
exports.toggleFontColor = toggleFontColor;

},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convert2classCode = exports.createHtmlDisplayingSearchingHistory = exports.displaySearchingHistory = exports.classListBtn = exports.classListDiv = void 0;
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
const index_1 = require("./utils/index");
exports.classListDiv = [
    "flex",
    "justify-center",
    "items-center",
    "mx-3.5",
];
exports.classListBtn = [
    "mx-2",
    "myapp-text",
    "break-keep",
    "hover:underline",
]; // Btnと書いているが、検索ワードを表示する役がメインであり、クリックすると飛ぶようにしたかったので仕方なくボタンにした。
/** localHistory内に作ったsearchingHistoryを使って検索履歴を表示させる関数。 */
function displaySearchingHistory() {
    // display searching history dynamically using javascript
    // classList：wordのelementそれぞれに対する共通のクラス
    // それぞれのワードに対するdivのid：searched-word + i(iはそれぞれのワードを区別するためのもので特に取り方に意味なし、iは0～検索履歴の単語の数-1、整数)
    const searchingHistory = window.localStorage.getItem("searchingHistory");
    const html4searchingHistory = createHtmlDisplayingSearchingHistory(searchingHistory, exports.classListDiv, exports.classListBtn);
    const target = document.getElementById("searchingHistoryField");
    if (html4searchingHistory !== "" && target != null) {
        target.innerHTML = html4searchingHistory;
    }
}
exports.displaySearchingHistory = displaySearchingHistory;
/**
 * 検索履歴を表示するためのhtmlコードを生成する関数。
 * 表示するものがないときはundefinedを返す。生成例は関数内のコメントを参照。
 *
 * @param {string | Falsy} searchingHistory csv形式の検索履歴
 * @param {Array<string>} classListDiv 作成するコード内のdivのクラスの値の配列
 * @param {Array<string>} classListBtn 作成するコード内のbtnのクラスの値の配列
 * @returns
 */
function createHtmlDisplayingSearchingHistory(searchingHistory, classListDiv, classListBtn) {
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
    let wordList;
    if (searchingHistory.indexOf(",") === -1) {
        wordList = [searchingHistory];
    }
    else {
        wordList = searchingHistory.split(",").reverse();
    }
    // divのidを動的生成すうための変数
    let i = 0;
    let retval = "";
    // wordListのすべての文字が表示不可条件を満たしていないときは何もしない。
    // 表示不可条件：wordがfalsyかinvalid
    const refuseDisplay = (word) => !word || word === "undefined" || !(0, index_1.validateWord)(word).isValid;
    if (wordList.every(refuseDisplay)) {
        return "";
    }
    // eslint-disable-next-line consistent-return
    wordList.forEach((word) => {
        // ここでのreturnはfor文でのcontinueと同じ
        // wordがfalsyの時、invalidの時はわざわざ表示しない
        if (!word || word === "undefined" || !(0, index_1.validateWord)(word).isValid) {
            return "";
        }
        // それぞれのwordに対するdivにid追加
        let html = "<div ";
        html += `id="searched-word${i}" `;
        i += 1;
        // 引数のclassListでclass属性のコード書く
        html += `${convert2classCode(classListDiv)}>`;
        html += `<button ${convert2classCode(classListBtn)}>${word}</button>`;
        html += "</div>";
        // 単語を表示するそれぞれhtmlコードをretvalに追加
        retval += html;
    });
    return retval;
}
exports.createHtmlDisplayingSearchingHistory = createHtmlDisplayingSearchingHistory;
/**
 * class="classList[0] classList[1] ... classList[-1]"
 * を作ってreturnする
 *
 * @param {Array<string>} classList htmlのクラス属性の値が入った配列
 * @returns 上記の説明のとおり。
 */
function convert2classCode(classList) {
    let classCode;
    if (classList.length === 0) {
        return "class=\"\"";
    }
    classCode = `class="${classList[0]}`;
    for (let i = 1; i < classList.length; i++) {
        classCode = `${classCode} ${classList[i]}`;
    }
    classCode += "\"";
    return classCode;
}
exports.convert2classCode = convert2classCode;

},{"./utils/index":19}],9:[function(require,module,exports){
"use strict";
// TODO: increaseGoodNum, increaseBadNumを統一
// TODO: リロードせずに更新されるようにする
// TODO: xhrの例外処理する(調べる)
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEval = exports.sendAjaxReq = exports.increaseBadNum = exports.increaseGoodNum = void 0;
function increaseGoodNum(id, translationID, curUrl) {
    // send ajax get request to increase good num
    const url = `${curUrl}increaseGoodNum?id=${id}`;
    sendAjaxReq(url, translationID, "good");
    // TODO: callback関数とか使ってみる
    // 1秒後(サーバーとのやり取りが終わった後)に画面更新
    const output = () => window.location.reload();
    setTimeout(output, 1000); // time unit: ms
}
exports.increaseGoodNum = increaseGoodNum;
function increaseBadNum(id, translationID, curUrl) {
    // send ajax get request to increase good num
    const url = `${curUrl}increaseBadNum?id=${id}`;
    sendAjaxReq(url, translationID, "bad");
    // TODO: callback関数とか使ってみる
    // 1秒後(サーバーとのやり取りが終わった後)に画面更新
    const output = () => window.location.reload();
    setTimeout(output, 1000); // time unit: ms
}
exports.increaseBadNum = increaseBadNum;
function sendAjaxReq(url, translationID, state) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            updateEval(translationID, state);
        }
    };
    xhr.send(null);
}
exports.sendAjaxReq = sendAjaxReq;
/**
 * stateをもとにgoodまたはbadが押された回数と幅を更新。
 *
 * 幅は0~100で押された回数全体に対する外套の評価が占める割合の100分率である。整数。
 * @param translationID 押されたボタンが属する訳語のid
 * @param state どのボタンが押されたか。
 */
function updateEval(translationID, state) {
    const translation = document.getElementById(translationID);
    const good = translation === null || translation === void 0 ? void 0 : translation.querySelector(".myapp-translation-goodBar");
    const bad = translation === null || translation === void 0 ? void 0 : translation.querySelector(".myapp-translation-badBar");
    // stateに応じてgoodまたはbadが押された回数に1を足す。さらにdom内に記録された回数も更新
    let goodNum = parseInt(good.children[0].innerHTML, 10);
    let badNum = parseInt(bad.children[0].innerHTML, 10);
    if (state === "good") {
        goodNum += 1;
    }
    else {
        badNum += 1;
    }
    good.children[0].innerHTML = goodNum.toString();
    bad.children[0].innerHTML = badNum.toString();
    // 更新されたgoodNum, badNumをもとに幅を計算しdom要素のstyle.widthに代入
    const totalNum = goodNum + badNum;
    const goodWidth = Math.round((goodNum * 100) / totalNum);
    const badWidth = 100 - goodWidth;
    good.style.width = `${goodWidth.toString()}px`;
    bad.style.width = `${badWidth.toString()}px`;
}
exports.updateEval = updateEval;

},{}],10:[function(require,module,exports){
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./darkMode/index"), exports);
__exportStar(require("./utils/index"), exports);
__exportStar(require("./searchForTranslation"), exports);
__exportStar(require("./registerTranslation"), exports);
__exportStar(require("./cleanValidationErrMsg"), exports);
__exportStar(require("./displaySearchingHistory"), exports);
__exportStar(require("./switchVisibilityRegistrationForm"), exports);
__exportStar(require("./searchFromSearchingHistory"), exports);
__exportStar(require("./scrollSearchingHistory"), exports);
__exportStar(require("./insertHomepageLink"), exports);
__exportStar(require("./increaseEvalNum"), exports);

},{"./cleanValidationErrMsg":2,"./darkMode/index":3,"./displaySearchingHistory":8,"./increaseEvalNum":9,"./insertHomepageLink":11,"./registerTranslation":12,"./scrollSearchingHistory":13,"./searchForTranslation":14,"./searchFromSearchingHistory":15,"./switchVisibilityRegistrationForm":16,"./utils/index":19}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertHomepageLink = void 0;
// ホームページへのリンク挿入はhtmlに直接書き込まずjsの変数を利用して自動化している。こっちのほうが環境の切り替えの時に安全。
function insertHomepageLink(homepageUrl) {
    window.addEventListener("DOMContentLoaded", () => {
        // headerのホーム遷移ボタンが押されたときにHOMEPAGE_URLに移動。
        const elem = document.getElementById("header-title");
        elem === null || elem === void 0 ? void 0 : elem.setAttribute("href", homepageUrl);
    });
}
exports.insertHomepageLink = insertHomepageLink;

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerIfValid = exports.registerTranslation = exports.IDs = void 0;
const index_1 = require("./utils/index");
exports.IDs = {
    registrationForm: "registrationForm",
    wordKr: "wordKrInput",
    wordJp: "wordJpInput",
    description: "descriptionInput",
};
/** inputsがvalidな時に訳語としてdbに登録 */
function registerTranslation() {
    var _a;
    (_a = document
        .getElementById(exports.IDs.registrationForm)) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", registerIfValid);
}
exports.registerTranslation = registerTranslation;
/** それぞれのinput dataのうち一つでもinvalidならエラーメッセージを表示、validならdbに登録 */
function registerIfValid(e) {
    // assign input data
    e.preventDefault();
    const wordKr = e.target.querySelector(`#${exports.IDs.wordKr}`);
    const wordJp = e.target.querySelector(`#${exports.IDs.wordJp}`);
    const description = e.target.querySelector(`#${exports.IDs.description}`);
    // validate each input data
    const validationResultWordKr = (0, index_1.validateWord)(wordKr.value);
    const validationResultWordJp = (0, index_1.validateWord)(wordJp.value);
    const validationResultDescription = (0, index_1.validateDescription)(description.value);
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
    const requestData = {
        wordKr: wordKr.value,
        wordJp: wordJp.value,
        description: description.value,
    };
    // send ajax post request to register data to db
    const url = document.getElementById(exports.IDs.registrationForm).action;
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
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
exports.registerIfValid = registerIfValid;

},{"./utils/index":19}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scroll = exports.scrollSearchingHistory = exports.INTERVAL_MS = exports.SCROLL_PX = void 0;
exports.SCROLL_PX = 4;
exports.INTERVAL_MS = 10;
/** ボタンが押されたときに一定の時間間隔で訳語をスクロール(押しっぱなしの処理) */
function scrollSearchingHistory() {
    const directions = ["left", "right"];
    directions.forEach((direction) => {
        var _a;
        (_a = document
            .getElementById(`scroll-button-${direction}`)) === null || _a === void 0 ? void 0 : _a.addEventListener("pointerdown", () => {
            const intervalId = setInterval(() => {
                scroll(direction, exports.SCROLL_PX);
            }, exports.INTERVAL_MS); // 引数渡すための記述法、第二引数の単位：ms
            // document要素にイベント登録することで、クリックした後ボタンから動かしてもOK
            // once: true を指定して一度発火したらイベントを削除する
            document.addEventListener("pointerup", () => {
                clearInterval(intervalId);
            }, { once: true });
        });
    });
}
exports.scrollSearchingHistory = scrollSearchingHistory;
/**
 * ボタンを押すとdirection方向にscrollPx移動する関数。
 * @param direction "left" or "right"
 * @param scrollPx
 */
function scroll(direction, scrollPx) {
    const contentSearchingHistory = document.getElementById("searchingHistoryField");
    if (direction === "left" && contentSearchingHistory != null) {
        contentSearchingHistory.scrollLeft -= scrollPx; // scrollPxごとにスクロールする（適宜調整可能）
    }
    else if (direction === "right" && contentSearchingHistory != null) {
        contentSearchingHistory.scrollLeft += scrollPx;
    }
}
exports.scroll = scroll;

},{}],14:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchIfValid = exports.searchForTranslation = void 0;
const index_1 = require("./utils/index");
/** 検索ワードがvalidなときに訳語を検索、あれば表示する関数。なければないと知らせる。
 *
 * 検索ワードがinvalidな時はurl更新せずinput fieldにエラーメッセージ表示。
 * @param homepageUrl ホームページのurl
 */
function searchForTranslation(homepageUrl) {
    var _a;
    (_a = document
        .getElementById("searchingForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", (event) => {
        searchIfValid(event, homepageUrl);
    });
}
exports.searchForTranslation = searchForTranslation;
/**
 * 検索ワードがinvalidならエラーメッセージを表示し、validならurlを更新して訳語を検索する関数。
 * @param curUrl この関数が実行されたときのurl
 */
function searchIfValid(e, curUrl) {
    e.preventDefault();
    const elem = e.target.querySelector("#translationSearchingBar");
    const keyword = elem.value;
    const tmp = (0, index_1.validateWord)(keyword);
    // when invalid, stop sending data and display error messages on input fields
    if (elem != null && !tmp.isValid) {
        elem.setCustomValidity(tmp.errMessage);
        return;
    }
    (0, index_1.store2localStorage)(keyword);
    const url = `${curUrl}?keyword=${keyword}`;
    window.location.href = url;
}
exports.searchIfValid = searchIfValid;

},{"./utils/index":19}],15:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchFromSearchingHistory = void 0;
const index_1 = require("./utils/index");
/**
 * 検索履歴の単語が押されたときにその単語を検索ワードとして訳語をサーチ。検索ワードのvalidationも行う。
 * @param homepageUrl ホームページのurl
 */
function searchFromSearchingHistory(homepageUrl) {
    var _a;
    const numStoredKeywords = (0, index_1.cntStoredKeywords)();
    for (let i = 0; i < numStoredKeywords; i++) {
        const id = `searched-word${i.toString()}`; // 検索履歴に表示された単語それぞれのhtmlのid
        const wordBtn = (_a = document.getElementById(id)) === null || _a === void 0 ? void 0 : _a.children[0];
        const keyword = wordBtn === null || wordBtn === void 0 ? void 0 : wordBtn.innerHTML;
        wordBtn === null || wordBtn === void 0 ? void 0 : wordBtn.addEventListener("click", () => {
            if (keyword === undefined) {
                return;
            }
            // when invalid, stop sending data and display error messages on input fields
            if (!(0, index_1.validateWord)(keyword).isValid) {
                return;
            }
            // store the input elem to local storage(検索履歴の単語の順番を更新)
            (0, index_1.store2localStorage)(keyword);
            window.location.href = `${homepageUrl}?keyword=${keyword}`;
        });
    }
}
exports.searchFromSearchingHistory = searchFromSearchingHistory;

},{"./utils/index":19}],16:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.switchVisibilityRegistrationForm = void 0;
/** 訳語登録フォームの表示／非表示の切り替え */
function switchVisibilityRegistrationForm() {
    const formBtn = document.getElementById("collapseBtnRegistrationForm");
    formBtn === null || formBtn === void 0 ? void 0 : formBtn.addEventListener("click", (e) => {
        e.currentTarget.classList.toggle("active"); // TODO: この文はなんだろう。。
        const content = document.getElementById("target-collapse");
        if (content != null && content.style.display === "block") {
            content.style.display = "none";
        }
        else if (content != null) {
            content.style.display = "block";
        }
    });
}
exports.switchVisibilityRegistrationForm = switchVisibilityRegistrationForm;

},{}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cntStoredKeywords = void 0;
/**
 * localStorageのsearchingHistoryに保存されている単語の数を検索
 * @returns searchingHistoryに保存されている単語の数
 */
function cntStoredKeywords() {
    const searchingHistory = localStorage.getItem("searchingHistory");
    let numStoredKeywords = 0;
    if (!!searchingHistory && searchingHistory !== "undefined") {
        numStoredKeywords = searchingHistory.split(",").length;
    }
    return numStoredKeywords;
}
exports.cntStoredKeywords = cntStoredKeywords;

},{}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

},{}],19:[function(require,module,exports){
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./store2localStorage"), exports);
__exportStar(require("./validators"), exports);
__exportStar(require("./falsy"), exports);
__exportStar(require("./cntStoredKeywords"), exports);

},{"./cntStoredKeywords":17,"./falsy":18,"./store2localStorage":20,"./validators":21}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.move2end = exports.removeOldestAndAdd = exports.store2localStorage = void 0;
const index_1 = require("./index");
/**
 *
 * @param keyword 検索された単語(dbに登録されてないものも含む、一応validationする)
 * @returns keywordが追加されたcsv形式の検索履歴
 */
function store2localStorage(keyword) {
    // local storageに保存するkeywordの最大値
    const MAX_KEYWORD_NUM = 10;
    const searchingHistory = window.localStorage.getItem("searchingHistory");
    if (!(0, index_1.validateWord)(keyword).isValid) {
        return;
    }
    const validKeyword = keyword;
    // local storageには文字列しか入力できないので、csv形式で検索ワードを保存する(単語が一つの時は先頭にコンマ書く)。
    // 検索履歴がないときの処理
    if (searchingHistory === null || searchingHistory === "") {
        window.localStorage.setItem("searchingHistory", validKeyword);
        return;
    }
    // local storageに保存されているワードをリストに保存
    let storedKeywordAry;
    if (searchingHistory.indexOf(",") === -1) {
        storedKeywordAry = [searchingHistory];
    }
    else {
        storedKeywordAry = searchingHistory.split(",");
    }
    // storedKeywordsAryの要素のうちvalidな単語だけ抽出
    const validKeywordAry = [];
    storedKeywordAry.forEach((word) => {
        if ((0, index_1.validateWord)(word).isValid) {
            validKeywordAry.push(word);
        }
    });
    const numValidKeywords = validKeywordAry.length;
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
    window.localStorage.setItem("searchingHistory", `${searchingHistory},${keyword}`);
}
exports.store2localStorage = store2localStorage;
/**
 * 先頭要素(一番古く検索された単語)を削除したvalidKeywordsAryとkeywordを用いて、keywordを最新の検索単語とするcsv形式の検索履歴を返す
 *
 * @param {Array<string>} validKeywordAry 検索履歴のうちvalidなやつの配列
 * @param {string} validatedKeyword validKeywordsAryに含まれる単語
 * @returns 一番古く検索された単語を削除し、最新の単語を追加したcsv形式の検索履歴
 */
function removeOldestAndAdd(validKeywordAry, validatedKeyword) {
    let newSearchingHistory = validKeywordAry[1];
    for (let i = 2; i < validKeywordAry.length; i++) {
        newSearchingHistory = `${newSearchingHistory},${validKeywordAry[i]}`;
    }
    newSearchingHistory = `${newSearchingHistory},${validatedKeyword}`;
    return newSearchingHistory;
}
exports.removeOldestAndAdd = removeOldestAndAdd;
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
    const index = validKeywordAry.indexOf(validKeyword);
    validKeywordAry.splice(index, 1);
    let newSearchingHistory = validKeywordAry[0];
    // 更新られたsotredKeywordAryをカンマ区切りの文字列に変換
    for (let i = 1; i < validKeywordAry.length; i++) {
        newSearchingHistory = `${newSearchingHistory},${validKeywordAry[i]}`;
    }
    // keywordを最後尾に追加
    newSearchingHistory = `${newSearchingHistory},${validKeyword}`;
    return newSearchingHistory;
}
exports.move2end = move2end;

},{"./index":19}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRegexpGu = exports.returnValidationResult = exports.validateDescription = exports.validateWord = void 0;
/**
 *
 * @param {string} word validate対象の文字列
 * @returns {{boolean; string}} {isValid, errMessage} validかどうか、invalidの時のエラーメッセ―ジ
 */
function validateWord(word) {
    const validationConditions = {
        maxCharNum: 30,
        // allowed unicode properties: Letter, Number
        allowedUnicodeCategoryList: ["L", "N"],
        allowedIndividualCharacterList: [
            " ",
            "　",
            "`",
            "_",
            "-",
            "、",
            "。",
            "「",
            "」",
            "ー",
            "(",
            ")",
            "（",
            "）",
            "[",
            "]",
            "%",
            "％",
            "‘",
            "’",
        ],
    };
    return returnValidationResult(word, validationConditions);
}
exports.validateWord = validateWord;
/**
 *
 * @param {string} description validate対象の文字列
 * @returns {{boolean; string}} {isValid, errMessage} validかどうか、invalidの時のエラーメッセ―ジ
 */
function validateDescription(description) {
    const validationConditions = {
        maxCharNum: 200,
        // allowed unicode properties: Letter, Number
        allowedUnicodeCategoryList: ["L", "N"],
        allowedIndividualCharacterList: [
            ".",
            ",",
            " ",
            "　",
            "\"",
            "'",
            "`",
            "_",
            "-",
            "、",
            "。",
            "「",
            "」",
            "^",
            "~",
            "ー",
            "(",
            ")",
            "{",
            "}",
            "[",
            "]",
            "%",
            "％",
            "‘",
            "’",
        ],
    };
    return returnValidationResult(description, validationConditions);
}
exports.validateDescription = validateDescription;
/**
 *
 * @param {string} target validate対象の文字列
 * @param {ValidationConditions} validationConditions
 * @returns
 */
function returnValidationResult(target, validationConditions) {
    // validationConditions.allowedUnicodeCategoryListに入っているunicode categoryに属さない文字をすべてリストに代入する正規表現
    const REGEXP_PROHIBITED_CHARACTERS = createRegexpGu(validationConditions.allowedUnicodeCategoryList);
    // raise an error if word length is longer than validationConditions.maxCharNum
    if (target.length > validationConditions.maxCharNum) {
        return {
            isValid: false,
            errMessage: `${validationConditions.maxCharNum}자 이내로 입력해 주세요.`,
        };
    }
    // NFC：サロゲートペアを単一の文字コードで表すように正規化にする
    // NFCの説明：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
    const normalizedWord = target.normalize("NFC");
    const invalidCharacterList = normalizedWord.match(REGEXP_PROHIBITED_CHARACTERS);
    if (invalidCharacterList === null) {
        return {
            isValid: true,
            errMessage: "",
        };
    }
    // raise an error if...
    // 1. word includes characters that are not letters or numbers and
    // 2. any of them are not the element of validationConditions.allowedIndividualCharacterList
    for (let i = 0; i < invalidCharacterList.length; i++) {
        const invalidCharacter = invalidCharacterList[i];
        if (!validationConditions.allowedIndividualCharacterList.includes(invalidCharacter)) {
            return {
                isValid: false,
                errMessage: `사용 할 수 없는 문자가 포함되어 있습니다: ${invalidCharacter}.`,
            };
        }
    }
    // this must be at the end of this function
    // set isValid as true if the given word passes all the validation
    return {
        isValid: true,
        errMessage: "",
    };
}
exports.returnValidationResult = returnValidationResult;
/**
 * 入力を許可するunicode categoryのリストを引数として受け取り、それ以外の文字を見つける正規表現を返す。
 * 正規表現のフラグgu：マッチするすべての文字をリストで返す。サロゲートペアまで正しく処理する。(フラグについて：https://javascript.info/regexp-introduction)
 *
 * @param {Array<string>} unicodeCategoryList 入力を許可するunicode category(Letter, Numberなど)。
 * @returns 引数で与えられたunicode categoryに属さない文字を見つける正規表現
 */
function createRegexpGu(unicodeCategoryList) {
    let regexp = "[^";
    for (let i = 0; i < unicodeCategoryList.length; i++) {
        const elem = unicodeCategoryList[i];
        regexp += `\\p{${elem}}`;
    }
    regexp += "]";
    return new RegExp(regexp, "gu");
}
exports.createRegexpGu = createRegexpGu;

},{}]},{},[1]);
