'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Keys = _interopRequireDefault(require("./Keys"));

var Key = /*#__PURE__*/function () {
  function Key(id, apiCall) {
    (0, _classCallCheck2.default)(this, Key);
    this._apiCall = apiCall;
    this._id = id;
  }

  (0, _createClass2.default)(Key, [{
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
      return "".concat(_Keys.default.RESOURCEPATH, "/").concat(this._id);
    }
  }]);
  return Key;
}();

exports.default = Key;
//# sourceMappingURL=Key.js.map
