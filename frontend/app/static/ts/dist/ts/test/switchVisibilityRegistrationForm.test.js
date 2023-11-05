"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const switchVisibilityRegistrationForm_1 = require("../src/switchVisibilityRegistrationForm");
const testTools_1 = require("./testTools");
(0, testTools_1.loadHTML)();
describe("test switchVisibilityRegistrationForm", () => {
    (0, switchVisibilityRegistrationForm_1.switchVisibilityRegistrationForm)();
    const formBtn = document.getElementById("collapseBtnRegistrationForm");
    const targetCollapse = document.getElementById("target-collapse");
    test("登録フォームの表示、非表示がうまくできるか FIXME: jsdomでボタンのclickイベントが動作しない(browserで手動test済み)", () => {
        targetCollapse.style.display = "none"; // targetCollapseを非表示設定
        formBtn.click();
        expect(targetCollapse.style.display).toBe("block"); // 表示
        formBtn.click();
        expect(targetCollapse.style.display).toBe("none"); // 非表示
    });
});
