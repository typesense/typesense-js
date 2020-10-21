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
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this._apiCall.post(this._endpointPath(), document, options);
    }
  }, {
    key: "createMany",
    value: function () {
      var _createMany = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(documents) {
        var options,
            documentsInJSONLFormat,
            resultsInJSONLFormat,
            _args = arguments;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                documentsInJSONLFormat = documents.map(function (document) {
                  return JSON.stringify(document);
                }).join('\n');
                _context.next = 4;
                return this.import(documentsInJSONLFormat, options);

              case 4:
                resultsInJSONLFormat = _context.sent;
                return _context.abrupt("return", resultsInJSONLFormat.split('\n').map(function (r) {
                  return JSON.parse(r);
                }));

              case 6:
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
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this._apiCall.performRequest('post', this._endpointPath('import'), options, documentsInJSONLFormat, {
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
