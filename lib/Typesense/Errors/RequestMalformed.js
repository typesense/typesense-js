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
    class RequestMalformed extends TypesenseError_1.default {
    }
    exports.default = RequestMalformed;
});
//# sourceMappingURL=RequestMalformed.js.map