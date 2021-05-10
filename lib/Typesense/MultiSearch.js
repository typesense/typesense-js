'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _RequestWithCache = _interopRequireDefault(require("./RequestWithCache"));

var RESOURCEPATH = '/multi_search';

var MultiSearch = /*#__PURE__*/function () {
  function MultiSearch(apiCall, configuration) {
    var useTextContentType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    (0, _classCallCheck2.default)(this, MultiSearch);
    this._apiCall = apiCall;
    this._configuration = configuration;
    this._useTextContentType = useTextContentType; // To avoid OPTIONS request

    this._requestWithCache = new _RequestWithCache.default();
  }

  (0, _createClass2.default)(MultiSearch, [{
    key: "perform",
    value: function perform(searchRequests) {
      var commonParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          _ref$cacheSearchResul = _ref.cacheSearchResultsForSeconds,
          cacheSearchResultsForSeconds = _ref$cacheSearchResul === void 0 ? this._configuration.cacheSearchResultsForSeconds : _ref$cacheSearchResul;

      var additionalHeaders = {};

      if (this._useTextContentType) {
        additionalHeaders['content-type'] = 'text/plain';
      }

      var additionalQueryParams = {};

      if (this._configuration.useServerSideSearchCache === true) {
        additionalQueryParams['use_cache'] = true;
      }

      var queryParams = Object.assign({}, commonParams, additionalQueryParams);
      return this._requestWithCache.perform(this._apiCall, this._apiCall.post, [RESOURCEPATH, searchRequests, queryParams, additionalHeaders], {
        cacheResponseForSeconds: cacheSearchResultsForSeconds
      });
    }
  }]);
  return MultiSearch;
}();

exports.default = MultiSearch;
//# sourceMappingURL=MultiSearch.js.map
