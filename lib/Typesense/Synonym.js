'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Collections = _interopRequireDefault(require("./Collections"));

var _Synonyms = _interopRequireDefault(require("./Synonyms"));

var Synonym = /*#__PURE__*/function () {
  function Synonym(collectionName, synonymId, apiCall) {
    (0, _classCallCheck2.default)(this, Synonym);
    this._collectionName = collectionName;
    this._synonymId = synonymId;
    this._apiCall = apiCall;
  }

  (0, _createClass2.default)(Synonym, [{
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
    key: "_endpointPath",
    value: function _endpointPath() {
      return "".concat(_Collections.default.RESOURCEPATH, "/").concat(this._collectionName).concat(_Synonyms.default.RESOURCEPATH, "/").concat(this._synonymId);
    }
  }]);
  return Synonym;
}();

exports.default = Synonym;
//# sourceMappingURL=Synonym.js.map
