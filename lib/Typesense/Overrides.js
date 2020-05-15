'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

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
    key: "create",
    value: function create(params) {
      return this._apiCall.put(this._endpointPath(), params);
    }
  }, {
    key: "retrieve",
    value: function retrieve() {
      return this._apiCall.get(this._endpointPath());
    }
  }, {
    key: "_endpointPath",
    value: function _endpointPath(operation) {
      return "".concat(_Collections.default.RESOURCEPATH, "/").concat(this._collectionName).concat(Overrides.RESOURCEPATH);
    }
  }], [{
    key: "RESOURCEPATH",
    get: function get() {
      return RESOURCEPATH;
    }
  }]);
  return Overrides;
}();

module.exports = Overrides;
//# sourceMappingURL=Overrides.js.map
