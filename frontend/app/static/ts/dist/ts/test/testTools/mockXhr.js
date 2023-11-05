"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockXhr = void 0;
/**
 *  xhrMockのプロパティ：
 *   readyState: 4
 *   status: 200
 *   response,responseText: "Hello World!"
 * @returns xhrのmock
 */
function mockXhr() {
    // mock window.location.href
    const xhrMock = {
        open: jest.fn(),
        send: jest.fn(),
        setRequestHeader: jest.fn(),
        readyState: 4,
        status: 200,
        response: "Hello World!",
        responseText: "Hello World!",
    };
    jest
        .spyOn(window, "XMLHttpRequest")
        .mockImplementation(() => xhrMock);
    return xhrMock;
}
exports.mockXhr = mockXhr;
