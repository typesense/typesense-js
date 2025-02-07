"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const TypesenseError_1 = tslib_1.__importDefault(require("./TypesenseError"));
class ImportError extends TypesenseError_1.default {
    constructor(message, importResults, payload) {
        super(message);
        this.importResults = importResults;
        this.payload = payload;
    }
}
exports.default = ImportError;
//# sourceMappingURL=ImportError.js.map