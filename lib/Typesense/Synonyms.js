'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Collections = _interopRequireDefault(require("./Collections"));

var RESOURCEPATH = '/synonyms';

var Synonyms = /*#__PURE__*/function () {
  function Synonyms(collectionName, apiCall) {
    (0, _classCallCheck2.default)(this, Synonyms);
    this._collectionName = collectionName;
    this._apiCall = apiCall;
  }

  (0, _createClass2.default)(Synonyms, [{
    key: "upsert",
    value: function upsert(synonymId, params) {
      return this._apiCall.put(this._endpointPath(synonymId), params);
    }
  }, {
    key: "retrieve",
    value: function retrieve() {
      return this._apiCall.get(this._endpointPath());
    }
  }, {
    key: "_endpointPath",
    value: function _endpointPath(operation) {
      return "".concat(_Collections.default.RESOURCEPATH, "/").concat(this._collectionName).concat(Synonyms.RESOURCEPATH).concat(operation === undefined ? '' : '/' + operation);
    }
  }], [{
    key: "RESOURCEPATH",
    get: function get() {
      return RESOURCEPATH;
    }
  }]);
  return Synonyms;
}();

exports.default = Synonyms;
//# sourceMappingURL=Synonyms.js.map
