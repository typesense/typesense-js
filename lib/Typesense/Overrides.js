'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ApiCall = require('./ApiCall');

var _ApiCall2 = _interopRequireDefault(_ApiCall);

var _Collections = require('./Collections');

var _Collections2 = _interopRequireDefault(_Collections);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RESOURCEPATH = '/overrides';

var Overrides = function () {
  function Overrides(configuration, collectionName) {
    _classCallCheck(this, Overrides);

    this._configuration = configuration;
    this._collectionName = collectionName;
  }

  _createClass(Overrides, [{
    key: 'create',
    value: function create(params) {
      return new _ApiCall2.default(this._configuration).put(this._endpointPath(), params);
    }
  }, {
    key: 'retrieve',
    value: function retrieve() {
      return new _ApiCall2.default(this._configuration).get(this._endpointPath());
    }
  }, {
    key: '_endpointPath',
    value: function _endpointPath(operation) {
      return _Collections2.default.RESOURCEPATH + '/' + this._collectionName + Overrides.RESOURCEPATH;
    }
  }], [{
    key: 'RESOURCEPATH',
    get: function get() {
      return RESOURCEPATH;
    }
  }]);

  return Overrides;
}();

module.exports = Overrides;
//# sourceMappingURL=Overrides.js.map
