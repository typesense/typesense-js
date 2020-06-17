'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var RESOURCEPATH = '/metrics.json';

var Metrics = /*#__PURE__*/function () {
  function Metrics(apiCall) {
    (0, _classCallCheck2.default)(this, Metrics);
    this._apiCall = apiCall;
  }

  (0, _createClass2.default)(Metrics, [{
    key: "retrieve",
    value: function retrieve() {
      return this._apiCall.get(RESOURCEPATH);
    }
  }]);
  return Metrics;
}();

exports.default = Metrics;
//# sourceMappingURL=Metrics.js.map
