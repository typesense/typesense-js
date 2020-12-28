'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Collections = _interopRequireDefault(require("./Collections"));

var RESOURCEPATH = '/overrides';

var Overrides = /*#__PURE__*/function () {
  function Overrides(collectionName, apiCall) {
    (0, _classCallCheck2.default)(this, Overrides);
    this._collectionName = collectionName;
    this._apiCall = apiCall;
  }

  (0, _createClass2.default)(Overrides, [{
    key: "upsert",
    value: function upsert(overrideId, params) {
      return this._apiCall.put(this._endpointPath(overrideId), params);
    }
  }, {
    key: "retrieve",
    value: function retrieve() {
      return this._apiCall.get(this._endpointPath());
    }
  }, {
    key: "_endpointPath",
    value: function _endpointPath(operation) {
      return "".concat(_Collections.default.RESOURCEPATH, "/").concat(this._collectionName).concat(Overrides.RESOURCEPATH).concat(operation === undefined ? '' : '/' + operation);
    }
  }], [{
    key: "RESOURCEPATH",
    get: function get() {
      return RESOURCEPATH;
    }
  }]);
  return Overrides;
}();

exports.default = Overrides;
//# sourceMappingURL=Overrides.js.map
