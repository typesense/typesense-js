'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Configuration = _interopRequireDefault(require("./Configuration"));

var _ApiCall = _interopRequireDefault(require("./ApiCall"));

var _Collection = _interopRequireDefault(require("./Collection"));

var _Search = _interopRequireDefault(require("./Search"));

var SearchClient = /*#__PURE__*/function () {
  function SearchClient(options) {
    (0, _classCallCheck2.default)(this, SearchClient);
    this.configuration = new _Configuration.default(options);
    this._apiCall = new _ApiCall.default(this.configuration);
    this.search = new _Search.default(this._apiCall);
    this._individualCollections = {};
  }

  (0, _createClass2.default)(SearchClient, [{
    key: "collections",
    value: function collections(collectionName) {
      if (collectionName === undefined) {
        throw new Error('Typesense.SearchClient only supports search operations, so the collectionName that needs to ' + 'be searched must be specified. Use Typesense.Client if you need to access the collection object.');
      } else {
        if (this._individualCollections[collectionName] === undefined) {
          this._individualCollections[collectionName] = new _Collection.default(collectionName, this._apiCall);
        }

        return this._individualCollections[collectionName];
      }
    }
  }]);
  return SearchClient;
}();

exports.default = SearchClient;
//# sourceMappingURL=SearchClient.js.map
