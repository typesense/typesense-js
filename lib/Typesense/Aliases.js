'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ApiCall = require('./ApiCall');

var _ApiCall2 = _interopRequireDefault(_ApiCall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RESOURCEPATH = '/aliases';

var Aliases = function () {
  function Aliases(configuration) {
    _classCallCheck(this, Aliases);

    this._configuration = configuration;
  }

  _createClass(Aliases, [{
    key: 'upsert',
    value: function upsert(name, mapping) {
      return new _ApiCall2.default(this._configuration).put(this._endpointPath(name), mapping);
    }
  }, {
    key: 'retrieve',
    value: function retrieve(schema) {
      return new _ApiCall2.default(this._configuration).get(RESOURCEPATH);
    }
  }, {
    key: '_endpointPath',
    value: function _endpointPath(aliasName) {
      return Aliases.RESOURCEPATH + '/' + aliasName;
    }
  }], [{
    key: 'RESOURCEPATH',
    get: function get() {
      return RESOURCEPATH;
    }
  }]);

  return Aliases;
}();

module.exports = Aliases;
//# sourceMappingURL=Aliases.js.map
