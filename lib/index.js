"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Errors = exports.Client = exports.SearchClient = void 0;
const tslib_1 = require("tslib");
const SearchClient_1 = tslib_1.__importDefault(require("./Typesense/SearchClient"));
exports.SearchClient = SearchClient_1.default;
const Client_1 = tslib_1.__importDefault(require("./Typesense/Client"));
exports.Client = Client_1.default;
exports.Errors = tslib_1.__importStar(require("./Typesense/Errors"));
//# sourceMappingURL=index.js.map