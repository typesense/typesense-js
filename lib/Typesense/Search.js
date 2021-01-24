'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var RESOURCEPATH = '/search';

var Search = /*#__PURE__*/function () {
  function Search(apiCall) {
    var useTextContentType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    (0, _classCallCheck2.default)(this, Search);
    this._apiCall = apiCall;
    this._useTextContentType = useTextContentType; // To avoid OPTIONS request
  }

  (0, _createClass2.default)(Search, [{
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
  return Search;
}();

exports.default = Search;
//# sourceMappingURL=Search.js.map
