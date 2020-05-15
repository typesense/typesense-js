'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var RESOURCEPATH = '/debug';

var Collections = /*#__PURE__*/function () {
  function Collections(apiCall) {
    (0, _classCallCheck2.default)(this, Collections);
    this._apiCall = apiCall;
  }

  (0, _createClass2.default)(Collections, [{
    key: "retrieve",
    value: function retrieve() {
      return this._apiCall.get(RESOURCEPATH);
    }
  }]);
  return Collections;
}();

module.exports = Collections;
//# sourceMappingURL=Debug.js.map
