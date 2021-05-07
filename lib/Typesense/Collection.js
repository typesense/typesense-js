'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Collections = _interopRequireDefault(require("./Collections"));

var _Documents = _interopRequireDefault(require("./Documents"));

var _Document = _interopRequireDefault(require("./Document"));

var _Overrides = _interopRequireDefault(require("./Overrides"));

var _Override = _interopRequireDefault(require("./Override"));

var _Synonyms = _interopRequireDefault(require("./Synonyms"));

var _Synonym = _interopRequireDefault(require("./Synonym"));

var Collection = /*#__PURE__*/function () {
  function Collection(name, apiCall, configuration) {
    (0, _classCallCheck2.default)(this, Collection);
    this._name = name;
    this._apiCall = apiCall;
    this._configuration = configuration;
    this._documents = new _Documents.default(this._name, this._apiCall, this._configuration);
    this._individualDocuments = {};
    this._overrides = new _Overrides.default(this._name, this._apiCall);
    this._individualOverrides = {};
    this._synonyms = new _Synonyms.default(this._name, this._apiCall);
    this._individualSynonyms = {};
  }

  (0, _createClass2.default)(Collection, [{
    key: "retrieve",
    value: function retrieve() {
      return this._apiCall.get(this._endpointPath());
    }
  }, {
    key: "delete",
    value: function _delete() {
      return this._apiCall.delete(this._endpointPath());
    }
  }, {
    key: "documents",
    value: function documents(documentId) {
      if (documentId === undefined) {
        return this._documents;
      } else {
        if (this._individualDocuments[documentId] === undefined) {
          this._individualDocuments[documentId] = new _Document.default(this._name, documentId, this._apiCall);
        }

        return this._individualDocuments[documentId];
      }
    }
  }, {
    key: "overrides",
    value: function overrides(overrideId) {
      if (overrideId === undefined) {
        return this._overrides;
      } else {
        if (this._individualOverrides[overrideId] === undefined) {
          this._individualOverrides[overrideId] = new _Override.default(this._name, overrideId, this._apiCall);
        }

        return this._individualOverrides[overrideId];
      }
    }
  }, {
    key: "synonyms",
    value: function synonyms(synonymId) {
      if (synonymId === undefined) {
        return this._synonyms;
      } else {
        if (this._individualSynonyms[synonymId] === undefined) {
          this._individualSynonyms[synonymId] = new _Synonym.default(this._name, synonymId, this._apiCall);
        }

        return this._individualSynonyms[synonymId];
      }
    }
  }, {
    key: "_endpointPath",
    value: function _endpointPath() {
      return "".concat(_Collections.default.RESOURCEPATH, "/").concat(this._name);
    }
  }]);
  return Collection;
}();

exports.default = Collection;
//# sourceMappingURL=Collection.js.map
