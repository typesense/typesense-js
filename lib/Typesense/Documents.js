'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

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

module.exports = Documents;
//# sourceMappingURL=Documents.js.map
