/* eslint-disable @typescript-eslint/no-unused-expressions */
// TODO: validator.jsのリファクタリング
import * as src from "./src/index";

// ローカルで開発するときはのHOMEPAGE_URLを自分のローカルの住所に変える
// const HOMEPAGE_URL: string = "http://loldictkrjp.ap-northeast-1.elasticbeanstalk.com/";  // 本番の住所
const curURL = window.location.href;
const HOMEPAGE_URL = curURL.split("?")[0];

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
