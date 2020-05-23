'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var RESOURCEPATH = '/collections';

var Collections = /*#__PURE__*/function () {
  function Collections(apiCall) {
    (0, _classCallCheck2.default)(this, Collections);
    this._apiCall = apiCall;
  }

  (0, _createClass2.default)(Collections, [{
    key: "create",
    value: function create(schema) {
      return this._apiCall.post(RESOURCEPATH, schema);
    }
  }, {
    key: "retrieve",
    value: function retrieve(schema) {
      return this._apiCall.get(RESOURCEPATH);
    }
  }], [{
    key: "RESOURCEPATH",
    get: function get() {
      return RESOURCEPATH;
    }
  }]);
  return Collections;
}();

module.exports = Collections;
//# sourceMappingURL=Collections.js.map
