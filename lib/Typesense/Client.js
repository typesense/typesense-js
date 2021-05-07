'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Configuration = _interopRequireDefault(require("./Configuration"));

var _ApiCall = _interopRequireDefault(require("./ApiCall"));

var _Collections = _interopRequireDefault(require("./Collections"));

var _Collection = _interopRequireDefault(require("./Collection"));

var _Aliases = _interopRequireDefault(require("./Aliases"));

var _Alias = _interopRequireDefault(require("./Alias"));

var _Keys = _interopRequireDefault(require("./Keys"));

var _Key = _interopRequireDefault(require("./Key"));

var _Debug = _interopRequireDefault(require("./Debug"));

var _Metrics = _interopRequireDefault(require("./Metrics"));

var _Health = _interopRequireDefault(require("./Health"));

var _Operations = _interopRequireDefault(require("./Operations"));

var _MultiSearch = _interopRequireDefault(require("./MultiSearch"));

var Client = /*#__PURE__*/function () {
  function Client(options) {
    (0, _classCallCheck2.default)(this, Client);
    this.configuration = new _Configuration.default(options);
    this._apiCall = new _ApiCall.default(this.configuration);
    this.debug = new _Debug.default(this._apiCall);
    this.metrics = new _Metrics.default(this._apiCall);
    this.health = new _Health.default(this._apiCall);
    this.operations = new _Operations.default(this._apiCall);
    this.multiSearch = new _MultiSearch.default(this._apiCall, this.configuration);
    this._collections = new _Collections.default(this._apiCall);
    this._individualCollections = {};
    this._aliases = new _Aliases.default(this._apiCall);
    this._individualAliases = {};
    this._keys = new _Keys.default(this._apiCall);
    this._individualKeys = {};
  }

  (0, _createClass2.default)(Client, [{
    key: "collections",
    value: function collections(collectionName) {
      if (collectionName === undefined) {
        return this._collections;
      } else {
        if (this._individualCollections[collectionName] === undefined) {
          this._individualCollections[collectionName] = new _Collection.default(collectionName, this._apiCall, this.configuration);
        }

        return this._individualCollections[collectionName];
      }
    }
  }, {
    key: "aliases",
    value: function aliases(aliasName) {
      if (aliasName === undefined) {
        return this._aliases;
      } else {
        if (this._individualAliases[aliasName] === undefined) {
          this._individualAliases[aliasName] = new _Alias.default(aliasName, this._apiCall);
        }

        return this._individualAliases[aliasName];
      }
    }
  }, {
    key: "keys",
    value: function keys(id) {
      if (id === undefined) {
        return this._keys;
      } else {
        if (this._individualKeys[id] === undefined) {
          this._individualKeys[id] = new _Key.default(id, this._apiCall);
        }

        return this._individualKeys[id];
      }
    }
  }]);
  return Client;
}();

exports.default = Client;
//# sourceMappingURL=Client.js.map
