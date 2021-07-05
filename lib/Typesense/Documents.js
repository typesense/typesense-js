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

var _RequestWithCache = _interopRequireDefault(require("./RequestWithCache"));

var _Errors = require("./Errors");

var RESOURCEPATH = '/documents';

var Documents = /*#__PURE__*/function () {
  function Documents(collectionName, apiCall, configuration) {
    (0, _classCallCheck2.default)(this, Documents);
    this._collectionName = collectionName;
    this._apiCall = apiCall;
    this._configuration = configuration;
    this._requestWithCache = new _RequestWithCache.default();
  }

  (0, _createClass2.default)(Documents, [{
    key: "create",
    value: function create(document) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this._apiCall.post(this._endpointPath(), document, options);
    }
  }, {
    key: "upsert",
    value: function upsert(document) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this._apiCall.post(this._endpointPath(), document, Object.assign({}, options, {
        action: 'upsert'
      }));
    }
  }, {
    key: "update",
    value: function update(document) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this._apiCall.post(this._endpointPath(), document, Object.assign({}, options, {
        action: 'update'
      }));
    }
  }, {
    key: "delete",
    value: function _delete() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this._apiCall.delete(this._endpointPath(), options);
    }
  }, {
    key: "createMany",
    value: function () {
      var _createMany = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(documents) {
        var options,
            _args = arguments;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};

                this._apiCall.logger.warn('createMany is deprecated and will be removed in a future version. Use import instead, which now takes both an array of documents or a JSONL string of documents');

                return _context.abrupt("return", this.import(documents, options));

              case 3:
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
    /**
     * Import a set of documents in a batch.
     * @param {string|Array} documents - Can be a JSONL string of documents or an array of document objects.
     * @return {string|Array} Returns a JSONL string if the input was a JSONL string, otherwise it returns an array of results.
     */

  }, {
    key: "import",
    value: function () {
      var _import2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(documents) {
        var options,
            documentsInJSONLFormat,
            resultsInJSONLFormat,
            resultsInJSONFormat,
            failedItems,
            _args2 = arguments;
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};

                if (Array.isArray(documents)) {
                  documentsInJSONLFormat = documents.map(function (document) {
                    return JSON.stringify(document);
                  }).join('\n');
                } else {
                  documentsInJSONLFormat = documents;
                }

                _context2.next = 4;
                return this._apiCall.performRequest('post', this._endpointPath('import'), {
                  queryParameters: options,
                  bodyParameters: documentsInJSONLFormat,
                  additionalHeaders: {
                    'Content-Type': 'text/plain'
                  }
                });

              case 4:
                resultsInJSONLFormat = _context2.sent;

                if (!Array.isArray(documents)) {
                  _context2.next = 15;
                  break;
                }

                resultsInJSONFormat = resultsInJSONLFormat.split('\n').map(function (r) {
                  return JSON.parse(r);
                });
                failedItems = resultsInJSONFormat.filter(function (r) {
                  return r.success === false;
                });

                if (!(failedItems.length > 0)) {
                  _context2.next = 12;
                  break;
                }

                throw new _Errors.ImportError("".concat(resultsInJSONFormat.length - failedItems.length, " documents imported successfully, ").concat(failedItems.length, " documents failed during import. Use `error.importResults` from the raised exception to get a detailed error reason for each document."), resultsInJSONFormat);

              case 12:
                return _context2.abrupt("return", resultsInJSONFormat);

              case 13:
                _context2.next = 16;
                break;

              case 15:
                return _context2.abrupt("return", resultsInJSONLFormat);

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function _import(_x2) {
        return _import2.apply(this, arguments);
      }

      return _import;
    }()
  }, {
    key: "export",
    value: function _export() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this._apiCall.get(this._endpointPath('export'), options);
    }
  }, {
    key: "search",
    value: function search(searchParameters) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$cacheSearchResul = _ref.cacheSearchResultsForSeconds,
          cacheSearchResultsForSeconds = _ref$cacheSearchResul === void 0 ? this._configuration.cacheSearchResultsForSeconds : _ref$cacheSearchResul;

      var additionalQueryParams = {};

      if (this._configuration.useServerSideSearchCache === true) {
        additionalQueryParams['use_cache'] = true;
      }

      var queryParams = Object.assign({}, searchParameters, additionalQueryParams);
      return this._requestWithCache.perform(this._apiCall, this._apiCall.get, [this._endpointPath('search'), queryParams], {
        cacheResponseForSeconds: cacheSearchResultsForSeconds
      });
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
