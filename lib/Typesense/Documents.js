'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ApiCall = require('./ApiCall');

var _ApiCall2 = _interopRequireDefault(_ApiCall);

var _Collections = require('./Collections');

var _Collections2 = _interopRequireDefault(_Collections);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RESOURCEPATH = '/documents';

var Documents = function () {
  function Documents(configuration, collectionName) {
    _classCallCheck(this, Documents);

    this._configuration = configuration;
    this._collectionName = collectionName;
  }

  _createClass(Documents, [{
    key: 'create',
    value: function create(document) {
      return new _ApiCall2.default(this._configuration).post(this._endpointPath(), document);
    }
  }, {
    key: 'export',
    value: function _export() {
      return new _ApiCall2.default(this._configuration).get(this._endpointPath('export')).then(function (result) {
        return Promise.resolve(result.split('\n'));
      });
    }
  }, {
    key: 'search',
    value: function search(searchParameters) {
      return new _ApiCall2.default(this._configuration).get(this._endpointPath('search'), searchParameters);
    }
  }, {
    key: '_endpointPath',
    value: function _endpointPath(operation) {
      return _Collections2.default.RESOURCEPATH + '/' + this._collectionName + Documents.RESOURCEPATH + (operation === undefined ? '' : '/' + operation);
    }
  }], [{
    key: 'RESOURCEPATH',
    get: function get() {
      return RESOURCEPATH;
    }
  }]);

  return Documents;
}();

module.exports = Documents;
//# sourceMappingURL=Documents.js.map
