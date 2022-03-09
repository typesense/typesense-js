"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchOnlyCollection = void 0;
var SearchOnlyDocuments_1 = require("./SearchOnlyDocuments");
var SearchOnlyCollection = /** @class */ (function () {
    function SearchOnlyCollection(name, apiCall, configuration) {
        this.name = name;
        this.apiCall = apiCall;
        this.configuration = configuration;
        this._documents = new SearchOnlyDocuments_1.SearchOnlyDocuments(this.name, this.apiCall, this.configuration);
    }
    SearchOnlyCollection.prototype.documents = function () {
        return this._documents;
    };
    return SearchOnlyCollection;
}());
exports.SearchOnlyCollection = SearchOnlyCollection;
//# sourceMappingURL=SearchOnlyCollection.js.map