import { describe, expect, test } from "@jest/globals";
import { insertHomepageLink } from "../src/insertHomepageLink";
import { loadHTML } from "./testTools";

loadHTML("app/templates/index.html");

describe("test insertHomepageLink", () => {
  const homepageUrl = "url";
  const elem = document.getElementById("header-title") as HTMLLinkElement;
  insertHomepageLink(homepageUrl);
  test("ちゃんとurlが埋め込まれているか", () => {
    // trigger DOMContentLoaded
    const DOMContentLoadedEvent = document.createEvent("Event");
    DOMContentLoadedEvent.initEvent("DOMContentLoaded", true, true);
    window.document.dispatchEvent(DOMContentLoadedEvent);

    expect(elem.href).toBe(`http://localhost/${homepageUrl}`);
  });
});
