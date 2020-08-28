'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Collections = _interopRequireDefault(require("./Collections"));

var RESOURCEPATH = '/documents';

var Documents = /*#__PURE__*/function () {
  function Documents(collectionName, apiCall) {
    (0, _classCallCheck2.default)(this, Documents);
    this._collectionName = collectionName;
    this._apiCall = apiCall;
  }

  (0, _createClass2.default)(Documents, [{
    key: "create",
    value: function create(document) {
      return this._apiCall.post(this._endpointPath(), document);
    }
  }, {
    key: "createMany",
    value: function createMany(documents) {
      var documentsInJSONLFormat = documents.map(function (document) {
        return JSON.stringify(document);
      }).join('\n');
      return this.import(documentsInJSONLFormat);
    }
  }, {
    key: "import",
    value: function _import(documentsInJSONLFormat) {
      return this._apiCall.performRequest('post', this._endpointPath('import'), undefined, documentsInJSONLFormat, {
        'Content-Type': 'text/plain'
      });
    }
  }, {
    key: "export",
    value: function _export() {
      return this._apiCall.get(this._endpointPath('export')).then(function (result) {
        return Promise.resolve(result.split('\n'));
      });
    }
  }, {
    key: "search",
    value: function search(searchParameters) {
      return this._apiCall.get(this._endpointPath('search'), searchParameters);
    }
  }, {
    key: "_endpointPath",
    value: function _endpointPath(operation) {
      return "".concat(_Collections.default.RESOURCEPATH, "/").concat(this._collectionName).concat(Documents.RESOURCEPATH).concat(operation === undefined ? '' : '/' + operation);
    }
  }], [{
    key: "RESOURCEPATH",
    get: function get() {
      return RESOURCEPATH;
    }
  }]);
  return Documents;
}();

exports.default = Documents;
//# sourceMappingURL=Documents.js.map
