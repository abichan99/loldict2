"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockWindowHref = void 0;
/**
 * window.location.hrefのmock。初期のurl: "http://dummy.com"
 */
function mockWindowHref() {
    // eslint-disable-next-line no-global-assign
    window = Object.create(window);
    const url = "http://dummy.com";
    Object.defineProperty(window, "location", {
        value: {
            href: url,
        },
        writable: true,
    });
}
exports.mockWindowHref = mockWindowHref;
