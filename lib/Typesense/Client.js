'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Configuration = require('./Configuration');

var _Configuration2 = _interopRequireDefault(_Configuration);

var _Collections = require('./Collections');

var _Collections2 = _interopRequireDefault(_Collections);

var _Collection = require('./Collection');

var _Collection2 = _interopRequireDefault(_Collection);

var _Aliases = require('./Aliases');

var _Aliases2 = _interopRequireDefault(_Aliases);

var _Alias = require('./Alias');

var _Alias2 = _interopRequireDefault(_Alias);

var _Debug = require('./Debug');

var _Debug2 = _interopRequireDefault(_Debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Client = function () {
  function Client(options) {
    _classCallCheck(this, Client);

    this.configuration = new _Configuration2.default(options);
    this.debug = new _Debug2.default(this.configuration);
    this._collections = new _Collections2.default(this.configuration);
    this._individualCollections = {};
    this._aliases = new _Aliases2.default(this.configuration);
    this._individualAliases = {};
  }

  _createClass(Client, [{
    key: 'collections',
    value: function collections(collectionName) {
      if (collectionName === undefined) {
        return this._collections;
      } else {
        if (this._individualCollections[collectionName] === undefined) {
          this._individualCollections[collectionName] = new _Collection2.default(this.configuration, collectionName);
        }
        return this._individualCollections[collectionName];
      }
    }
  }, {
    key: 'aliases',
    value: function aliases(aliasName) {
      if (aliasName === undefined) {
        return this._aliases;
      } else {
        if (this._individualAliases[aliasName] === undefined) {
          this._individualAliases[aliasName] = new _Alias2.default(this.configuration, aliasName);
        }
        return this._individualAliases[aliasName];
      }
    }
  }]);

  return Client;
}();

module.exports = Client;
//# sourceMappingURL=Client.js.map
