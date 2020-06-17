'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var RESOURCEPATH = '/aliases';

var Aliases = /*#__PURE__*/function () {
  function Aliases(apiCall) {
    (0, _classCallCheck2.default)(this, Aliases);
    this._apiCall = apiCall;
  }

  (0, _createClass2.default)(Aliases, [{
    key: "upsert",
    value: function upsert(name, mapping) {
      return this._apiCall.put(this._endpointPath(name), mapping);
    }
  }, {
    key: "retrieve",
    value: function retrieve(schema) {
      return this._apiCall.get(RESOURCEPATH);
    }
  }, {
    key: "_endpointPath",
    value: function _endpointPath(aliasName) {
      return "".concat(Aliases.RESOURCEPATH, "/").concat(aliasName);
    }
  }], [{
    key: "RESOURCEPATH",
    get: function get() {
      return RESOURCEPATH;
    }
  }]);
  return Aliases;
}();

exports.default = Aliases;
//# sourceMappingURL=Aliases.js.map
