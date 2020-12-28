'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var RESOURCEPATH = '/operations';

var Operations = /*#__PURE__*/function () {
  function Operations(apiCall) {
    (0, _classCallCheck2.default)(this, Operations);
    this._apiCall = apiCall;
  }

  (0, _createClass2.default)(Operations, [{
    key: "perform",
    value: function perform(operationName) {
      var queryParameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this._apiCall.post("".concat(RESOURCEPATH, "/").concat(operationName), {}, queryParameters);
    }
  }]);
  return Operations;
}();

exports.default = Operations;
//# sourceMappingURL=Operations.js.map
