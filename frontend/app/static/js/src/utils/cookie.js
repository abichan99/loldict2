"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCookie = getCookie;
function getCookie(name) {
  var value = "; ".concat(document.cookie);
  var parts = value.split("; ".concat(name, "="));
  if (parts.length === 2) {
    if (parts !== undefined) {
      return parts.pop().split(";").shift();
    }
  }
  return "";
}