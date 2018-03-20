'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ApiCall = require('./ApiCall');

var _ApiCall2 = _interopRequireDefault(_ApiCall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RESOURCEPATH = '/collections';

var Collections = function () {
  function Collections(configuration) {
    _classCallCheck(this, Collections);

    this._configuration = configuration;
  }

  _createClass(Collections, [{
    key: 'create',
    value: function create(schema) {
      return new _ApiCall2.default(this._configuration).post(RESOURCEPATH, schema);
    }
  }, {
    key: 'retrieve',
    value: function retrieve(schema) {
      return new _ApiCall2.default(this._configuration).get(RESOURCEPATH);
    }
  }], [{
    key: 'RESOURCEPATH',
    get: function get() {
      return RESOURCEPATH;
    }
  }]);

  return Collections;
}();

module.exports = Collections;
//# sourceMappingURL=Collections.js.map
