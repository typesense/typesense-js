'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Collections = _interopRequireDefault(require("./Collections"));

var RESOURCEPATH = '/documents';

var Documents = /*#__PURE__*/function () {
  function Documents(collectionName, apiCall) {
    (0, _classCallCheck2.default)(this, Documents);
    this._collectionName = collectionName;
    this._apiCall = apiCall;
  }

  (0, _createClass2.default)(Documents, [{
    key: "create",
    value: function create(document) {
      return this._apiCall.post(this._endpointPath(), document);
    }
  }, {
    key: "createMany",
    value: function () {
      var _createMany = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(documents) {
        var documentsInJSONLFormat, resultsInJSONLFormat;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                documentsInJSONLFormat = documents.map(function (document) {
                  return JSON.stringify(document);
                }).join('\n');
                _context.next = 3;
                return this.import(documentsInJSONLFormat);

              case 3:
                resultsInJSONLFormat = _context.sent;
                return _context.abrupt("return", resultsInJSONLFormat.split('\n').map(function (r) {
                  return JSON.parse(r);
                }));

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createMany(_x) {
        return _createMany.apply(this, arguments);
      }

      return createMany;
    }()
  }, {
    key: "import",
    value: function _import(documentsInJSONLFormat) {
      return this._apiCall.performRequest('post', this._endpointPath('import'), undefined, documentsInJSONLFormat, {
        'Content-Type': 'text/plain'
      });
    }
  }, {
    key: "export",
    value: function _export() {
      return this._apiCall.get(this._endpointPath('export'));
    }
  }, {
    key: "search",
    value: function search(searchParameters) {
      return this._apiCall.get(this._endpointPath('search'), searchParameters);
    }
  }, {
    key: "_endpointPath",
    value: function _endpointPath(operation) {
      return "".concat(_Collections.default.RESOURCEPATH, "/").concat(this._collectionName).concat(Documents.RESOURCEPATH).concat(operation === undefined ? '' : '/' + operation);
    }
  }], [{
    key: "RESOURCEPATH",
    get: function get() {
      return RESOURCEPATH;
    }
  }]);
  return Documents;
}();

exports.default = Documents;
//# sourceMappingURL=Documents.js.map
