"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var TypesenseError_1 = tslib_1.__importDefault(require("./TypesenseError"));
var MissingConfigurationError = /** @class */ (function (_super) {
    tslib_1.__extends(MissingConfigurationError, _super);
    function MissingConfigurationError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MissingConfigurationError;
}(TypesenseError_1.default));
exports.default = MissingConfigurationError;
//# sourceMappingURL=MissingConfigurationError.js.map