'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Aliases = _interopRequireDefault(require("./Aliases"));

var Alias = /*#__PURE__*/function () {
  function Alias(name, apiCall) {
    (0, _classCallCheck2.default)(this, Alias);
    this._apiCall = apiCall;
    this._name = name;
  }

  (0, _createClass2.default)(Alias, [{
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
      return "".concat(_Aliases.default.RESOURCEPATH, "/").concat(this._name);
    }
  }]);
  return Alias;
}();

exports.default = Alias;
//# sourceMappingURL=Alias.js.map
