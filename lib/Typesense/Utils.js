"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeArrayableParams = normalizeArrayableParams;
const Documents_1 = require("./Documents");
function hasNoArrayValues(params) {
    return Object.keys(Documents_1.arrayableParams)
        .filter((key) => params[key] !== undefined)
        .every((key) => isNonArrayValue(params[key]));
}
function normalizeArrayableParams(params) {
    const result = { ...params };
    const transformedValues = Object.keys(Documents_1.arrayableParams)
        .filter((key) => Array.isArray(result[key]))
        .map((key) => {
        result[key] = result[key].join(",");
        return key;
    });
    if (!transformedValues.length && hasNoArrayValues(result)) {
        return result;
    }
    if (!hasNoArrayValues(result)) {
        throw new Error(`Failed to normalize arrayable params: ${JSON.stringify(result)}`);
    }
    return result;
}
function isNonArrayValue(value) {
    return !Array.isArray(value);
}
//# sourceMappingURL=Utils.js.map