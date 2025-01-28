"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeArrayableParams = normalizeArrayableParams;
var tslib_1 = require("tslib");
var Documents_1 = require("./Documents");
function hasNoArrayValues(params) {
    return Object.keys(Documents_1.arrayableParams)
        .filter(function (key) { return params[key] !== undefined; })
        .every(function (key) { return isNonArrayValue(params[key]); });
}
function normalizeArrayableParams(params) {
    var result = tslib_1.__assign({}, params);
    var transformedValues = Object.keys(Documents_1.arrayableParams)
        .filter(function (key) { return Array.isArray(result[key]); })
        .map(function (key) {
        result[key] = result[key].join(",");
        return key;
    });
    if (!transformedValues.length && hasNoArrayValues(result)) {
        return result;
    }
    if (!hasNoArrayValues(result)) {
        throw new Error("Failed to normalize arrayable params: ".concat(JSON.stringify(result)));
    }
    return result;
}
function isNonArrayValue(value) {
    return !Array.isArray(value);
}
//# sourceMappingURL=Utils.js.map