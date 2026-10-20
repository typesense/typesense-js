"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var FetchTransportError = /** @class */ (function (_super) {
    tslib_1.__extends(FetchTransportError, _super);
    function FetchTransportError(type, message, _a) {
        var _b = _a === void 0 ? {} : _a, code = _b.code, request = _b.request, response = _b.response, originalError = _b.originalError;
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        _this.name = "FetchTransportError";
        _this.type = type;
        _this.code = code;
        _this.request = request;
        _this.response = response;
        _this.originalError = originalError;
        return _this;
    }
    return FetchTransportError;
}(Error));
exports.default = FetchTransportError;
//# sourceMappingURL=FetchTransportError.js.map