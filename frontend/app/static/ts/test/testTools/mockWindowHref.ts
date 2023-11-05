/**
 * window.location.hrefのmock。初期のurl: "http://dummy.com"
 */
export function mockWindowHref() {
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
