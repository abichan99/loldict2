import { describe, expect, test } from "@jest/globals";
import { switchVisibilityRegistrationForm } from "../src/switchVisibilityRegistrationForm";
import { loadHTML } from "./testTools";

loadHTML();

describe("test switchVisibilityRegistrationForm", () => {
  switchVisibilityRegistrationForm();
  const formBtn = document.getElementById("collapseBtnRegistrationForm");
  const targetCollapse = document.getElementById("target-collapse") as HTMLElement;

  test("登録フォームの表示、非表示がうまくできるか", () => {
    targetCollapse.style.display = "none"; // targetCollapseを非表示設定
    formBtn?.click();
    expect(targetCollapse.style.display).toBe("block"); // 表示
    formBtn?.click();
    expect(targetCollapse.style.display).toBe("none"); // 非表示
  });
});
