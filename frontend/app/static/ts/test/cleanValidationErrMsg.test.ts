import { fireEvent } from "@testing-library/dom";
import { describe, expect, test } from "@jest/globals";
import { cleanValidationErrMsg, IDlist } from "../src/cleanValidationErrMsg";
import { loadHTML } from "./testTools";

loadHTML();

// IDlist内のidを持つ要素のvalidation message, valueを適当に初期化し、配列に代入
const beforeChangeMsg: string[] = [];
for (let i = 0; i < IDlist.length; i++) {
  const msg = `msg${i.toString()}`; // 適当なエラーメッセージ
  (document.getElementById(IDlist[i]) as HTMLInputElement).setCustomValidity(
    msg,
  );
  (document.getElementById(IDlist[i]) as HTMLInputElement).value = msg;
  beforeChangeMsg.push(msg);
}

describe("test cleanValidationErrMsg", () => {
  cleanValidationErrMsg();
  for (let i = 0; i < IDlist.length; i++) {
    const id = IDlist[i];
    const elem = document.getElementById(id) as HTMLInputElement;
    test(`要素の値が更新されたときにvalidation errorのメッセージが空になっているか、要素のid: ${id}`, () => {
      fireEvent.change(elem, { target: { value: "a" } }); // valueは適当な値
      expect(beforeChangeMsg[i] !== elem.value).toBe(true);
      expect(elem.validationMessage).toBe("");
    });
  }
});
