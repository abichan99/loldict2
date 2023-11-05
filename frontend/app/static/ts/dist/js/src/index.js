"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./darkMode/index"), exports);
__exportStar(require("./utils/index"), exports);
__exportStar(require("./searchForTranslation"), exports);
__exportStar(require("./registerTranslation"), exports);
__exportStar(require("./cleanValidationErrMsg"), exports);
__exportStar(require("./displaySearchingHistory"), exports);
__exportStar(require("./switchVisibilityRegistrationForm"), exports);
__exportStar(require("./searchFromSearchingHistory"), exports);
__exportStar(require("./scrollSearchingHistory"), exports);
__exportStar(require("./insertHomepageLink"), exports);
__exportStar(require("./increaseEvalNum"), exports);
