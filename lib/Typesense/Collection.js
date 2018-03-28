'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Collections = require('./Collections');

var _Collections2 = _interopRequireDefault(_Collections);

var _Documents = require('./Documents');

var _Documents2 = _interopRequireDefault(_Documents);

var _Document = require('./Document');

var _Document2 = _interopRequireDefault(_Document);

var _ApiCall = require('./ApiCall');

var _ApiCall2 = _interopRequireDefault(_ApiCall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Collection = function () {
  function Collection(configuration, name) {
    _classCallCheck(this, Collection);

    this._configuration = configuration;
    this._name = name;
    this._documents = new _Documents2.default(this._configuration, this._name);
    this._individualDocuments = {};
  }

  _createClass(Collection, [{
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
    key: 'documents',
    value: function documents(documentId) {
      if (documentId === undefined) {
        return this._documents;
      } else {
        if (this._individualDocuments[documentId] === undefined) {
          this._individualDocuments[documentId] = new _Document2.default(this._configuration, this._name, documentId);
        }
        return this._individualDocuments[documentId];
      }
    }
  }, {
    key: '_endpointPath',
    value: function _endpointPath() {
      return _Collections2.default.RESOURCEPATH + '/' + this._name;
    }
  }]);

  return Collection;
}();

module.exports = Collection;
//# sourceMappingURL=Collection.js.map
