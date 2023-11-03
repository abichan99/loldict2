// localStorageのmock
export function createMockLocalStorage(storage: any) {
  const localStorageMock = (function () {
    let store: any = storage;

    return {
      getItem(key: string) {
        return store[key] ?? null;
      },
      setItem(key: string, value: string) {
        store[key] = value.toString();
      },
      clear() {
        store = {};
      },
    };
  }());

  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
  });
}
