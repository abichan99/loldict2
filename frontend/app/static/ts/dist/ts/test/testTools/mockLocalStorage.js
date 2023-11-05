"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMockLocalStorage = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
// localStorageのmock
function createMockLocalStorage(storage) {
    const localStorageMock = (function () {
        let store = storage;
        return {
            getItem(key) {
                var _a;
                return (_a = store[key]) !== null && _a !== void 0 ? _a : null;
            },
            setItem(key, value) {
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
exports.createMockLocalStorage = createMockLocalStorage;
