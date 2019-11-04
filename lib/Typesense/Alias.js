'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Aliases = require('./Aliases');

var _Aliases2 = _interopRequireDefault(_Aliases);

var _ApiCall = require('./ApiCall');

var _ApiCall2 = _interopRequireDefault(_ApiCall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Alias = function () {
  function Alias(configuration, name) {
    _classCallCheck(this, Alias);

    this._configuration = configuration;
    this._name = name;
  }

  _createClass(Alias, [{
    key: 'retrieve',
    value: function retrieve() {
      return new _ApiCall2.default(this._configuration).get(this._endpointPath());
    }
  }, {
    key: 'delete',
    value: function _delete() {
      return new _ApiCall2.default(this._configuration).delete(this._endpointPath());
    }
  }, {
    key: '_endpointPath',
    value: function _endpointPath() {
      return _Aliases2.default.RESOURCEPATH + '/' + this._name;
    }
  }]);

  return Alias;
}();

module.exports = Alias;
//# sourceMappingURL=Alias.js.map
