"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TypesenseError extends Error {
    // Source: https://stackoverflow.com/a/58417721/123545
    constructor(message, httpBody, httpStatus) {
        super(message);
        this.name = new.target.name;
        this.httpBody = httpBody;
        this.httpStatus = httpStatus;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}
exports.default = TypesenseError;
//# sourceMappingURL=TypesenseError.js.map