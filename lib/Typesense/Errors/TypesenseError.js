"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var TypesenseError = /** @class */ (function (_super) {
    tslib_1.__extends(TypesenseError, _super);
    // Source: https://stackoverflow.com/a/58417721/123545
    function TypesenseError(message, httpBody, httpStatus) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        _this.name = _newTarget.name;
        _this.httpBody = httpBody;
        _this.httpStatus = httpStatus;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return TypesenseError;
}(Error));
exports.default = TypesenseError;
//# sourceMappingURL=TypesenseError.js.map