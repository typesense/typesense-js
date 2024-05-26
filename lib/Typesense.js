"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Errors = exports.SearchClient = exports.Client = void 0;
var tslib_1 = require("tslib");
var Client_1 = tslib_1.__importDefault(require("./Typesense/Client"));
exports.Client = Client_1.default;
var SearchClient_1 = tslib_1.__importDefault(require("./Typesense/SearchClient"));
exports.SearchClient = SearchClient_1.default;
var Errors = tslib_1.__importStar(require("./Typesense/Errors"));
exports.Errors = Errors;
exports.default = { Client: Client_1.default, SearchClient: SearchClient_1.default, Errors: Errors };
//# sourceMappingURL=Typesense.js.map