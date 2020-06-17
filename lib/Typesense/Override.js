'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Collections = _interopRequireDefault(require("./Collections"));

var _Overrides = _interopRequireDefault(require("./Overrides"));

var Override = /*#__PURE__*/function () {
  function Override(collectionName, overrideId, apiCall) {
    (0, _classCallCheck2.default)(this, Override);
    this._collectionName = collectionName;
    this._overrideId = overrideId;
    this._apiCall = apiCall;
  }

  (0, _createClass2.default)(Override, [{
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
      return "".concat(_Collections.default.RESOURCEPATH, "/").concat(this._collectionName).concat(_Overrides.default.RESOURCEPATH, "/").concat(this._overrideId);
    }
  }]);
  return Override;
}();

exports.default = Override;
//# sourceMappingURL=Override.js.map
