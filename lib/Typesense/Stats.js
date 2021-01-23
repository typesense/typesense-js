'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var RESOURCEPATH = '/stats.json';

var Stats = /*#__PURE__*/function () {
  function Stats(apiCall) {
    (0, _classCallCheck2.default)(this, Stats);
    this._apiCall = apiCall;
  }

  (0, _createClass2.default)(Stats, [{
    key: "retrieve",
    value: function retrieve() {
      return this._apiCall.get(RESOURCEPATH);
    }
  }]);
  return Stats;
}();

exports.default = Stats;
//# sourceMappingURL=Stats.js.map
