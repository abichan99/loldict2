/**
 *  xhrMockのプロパティ：
 *   readyState: 4
 *   status: 200
 *   response,responseText: "Hello World!"
 * @returns xhrのmock
 */
export function mockXhr(): Partial<XMLHttpRequest> {
  // mock window.location.href
  const xhrMock: Partial<XMLHttpRequest> = {
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
    .mockImplementation(() => xhrMock as XMLHttpRequest);
  return xhrMock;
}
