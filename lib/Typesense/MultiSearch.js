'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var RESOURCEPATH = '/multi_search';

var MultiSearch = /*#__PURE__*/function () {
  function MultiSearch(apiCall) {
    var useTextContentType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    (0, _classCallCheck2.default)(this, MultiSearch);
    this._apiCall = apiCall;
    this._useTextContentType = useTextContentType; // To avoid OPTIONS request
  }

  (0, _createClass2.default)(MultiSearch, [{
    key: "perform",
    value: function perform(searchRequests) {
      var commonParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var additionalHeaders = {};

      if (this._useTextContentType) {
        additionalHeaders['content-type'] = 'text/plain';
      }

      return this._apiCall.post(RESOURCEPATH, searchRequests, commonParams, additionalHeaders);
    }
  }]);
  return MultiSearch;
}();

exports.default = MultiSearch;
//# sourceMappingURL=MultiSearch.js.map
