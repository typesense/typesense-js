var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./TypesenseError"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const TypesenseError_1 = __importDefault(require("./TypesenseError"));
    class ImportError extends TypesenseError_1.default {
        constructor(message, importResults) {
            super(message);
            this.importResults = importResults;
        }
    }
    exports.default = ImportError;
});
//# sourceMappingURL=ImportError.js.map