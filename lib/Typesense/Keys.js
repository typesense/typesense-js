'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _crypto = _interopRequireDefault(require("crypto"));

var RESOURCEPATH = '/keys';

var Keys = /*#__PURE__*/function () {
  function Keys(apiCall) {
    (0, _classCallCheck2.default)(this, Keys);
    this._apiCall = apiCall;
  }

  (0, _createClass2.default)(Keys, [{
    key: "create",
    value: function create(params) {
      return this._apiCall.post(Keys.RESOURCEPATH, params);
    }
  }, {
    key: "retrieve",
    value: function retrieve() {
      return this._apiCall.get(RESOURCEPATH);
    }
  }, {
    key: "generateScopedSearchKey",
    value: function generateScopedSearchKey(searchKey, parameters) {
      // Note: only a key generated with the `documents:search` action will be
      // accepted by the server, when usined with the search endpoint.
      var paramsJSON = JSON.stringify(parameters);
      var digest = Buffer.from(_crypto.default.createHmac('sha256', searchKey).update(paramsJSON).digest('base64'));
      var keyPrefix = searchKey.substr(0, 4);
      var rawScopedKey = "".concat(digest).concat(keyPrefix).concat(paramsJSON);
      return Buffer.from(rawScopedKey).toString('base64');
    }
  }], [{
    key: "RESOURCEPATH",
    get: function get() {
      return RESOURCEPATH;
    }
  }]);
  return Keys;
}();

module.exports = Keys;
//# sourceMappingURL=Keys.js.map
