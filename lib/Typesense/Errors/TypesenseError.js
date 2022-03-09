"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var TypesenseError = /** @class */ (function (_super) {
    __extends(TypesenseError, _super);
    // Source: https://stackoverflow.com/a/58417721/123545
    function TypesenseError(message) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        _this.name = _newTarget.name;
        Object.setPrototypeOf(_this, _newTarget.prototype);
        return _this;
    }
    return TypesenseError;
}(Error));
exports.default = TypesenseError;
//# sourceMappingURL=TypesenseError.js.map