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

var Document = /*#__PURE__*/function () {
  function Document(collectionName, documentId, apiCall) {
    (0, _classCallCheck2.default)(this, Document);
    this._collectionName = collectionName;
    this._documentId = documentId;
    this._apiCall = apiCall;
  }

  (0, _createClass2.default)(Document, [{
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
    key: "update",
    value: function update(partialDocument) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this._apiCall.patch(this._endpointPath(), partialDocument, options);
    }
  }, {
    key: "_endpointPath",
    value: function _endpointPath() {
      return "".concat(_Collections.default.RESOURCEPATH, "/").concat(this._collectionName).concat(_Documents.default.RESOURCEPATH, "/").concat(this._documentId);
    }
  }]);
  return Document;
}();

exports.default = Document;
//# sourceMappingURL=Document.js.map
