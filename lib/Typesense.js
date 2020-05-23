"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Client = _interopRequireDefault(require("./Typesense/Client"));

var Client = _Client.default;

var Typesense = /*#__PURE__*/function () {
  function Typesense() {
    (0, _classCallCheck2.default)(this, Typesense);
  }

  (0, _createClass2.default)(Typesense, null, [{
    key: "Client",
    get: function get() {
      return Client;
    }
  }]);
  return Typesense;
}();

module.exports = Typesense;
//# sourceMappingURL=Typesense.js.map
