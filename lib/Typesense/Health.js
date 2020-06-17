'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var RESOURCEPATH = '/health';

var Health = /*#__PURE__*/function () {
  function Health(apiCall) {
    (0, _classCallCheck2.default)(this, Health);
    this._apiCall = apiCall;
  }

  (0, _createClass2.default)(Health, [{
    key: "retrieve",
    value: function retrieve() {
      return this._apiCall.get(RESOURCEPATH);
    }
  }]);
  return Health;
}();

exports.default = Health;
//# sourceMappingURL=Health.js.map
