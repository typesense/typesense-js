"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toErrorWithMessage = exports.normalizeArrayableParams = void 0;
const Types_1 = require("./Types");
function hasNoArrayValues(params) {
    return Object.keys(Types_1.arrayableParams)
        .filter((key) => params[key] !== undefined)
        .every((key) => isNonArrayValue(params[key]));
}
function normalizeArrayableParams(params) {
    const result = { ...params };
    const transformedValues = Object.keys(Types_1.arrayableParams)
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
exports.normalizeArrayableParams = normalizeArrayableParams;
function isNonArrayValue(value) {
    return !Array.isArray(value);
}
function isErrorWithMessage(error) {
    return (typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof error.message === "string");
}
function toErrorWithMessage(couldBeError) {
    if (isErrorWithMessage(couldBeError))
        return couldBeError;
    try {
        if (typeof couldBeError === "string") {
            return new Error(couldBeError);
        }
        return new Error(JSON.stringify(couldBeError));
    }
    catch (_a) {
        return new Error(String(couldBeError));
    }
}
exports.toErrorWithMessage = toErrorWithMessage;
//# sourceMappingURL=Utils.js.map