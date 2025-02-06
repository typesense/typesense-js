"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var TypesenseError_1 = tslib_1.__importDefault(require("./TypesenseError"));
var ImportError = /** @class */ (function (_super) {
    tslib_1.__extends(ImportError, _super);
    function ImportError(message, importResults, payload) {
        var _this = _super.call(this, message) || this;
        _this.importResults = importResults;
        _this.payload = payload;
        return _this;
    }
    return ImportError;
}(TypesenseError_1.default));
exports.default = ImportError;
//# sourceMappingURL=ImportError.js.map