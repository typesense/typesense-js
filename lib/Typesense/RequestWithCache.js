'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var RequestWithCache = /*#__PURE__*/function () {
  function RequestWithCache() {
    (0, _classCallCheck2.default)(this, RequestWithCache);
    this._responseCache = {};
  }

  (0, _createClass2.default)(RequestWithCache, [{
    key: "perform",
    value: function () {
      var _perform = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(requestContext, requestFunction, requestFunctionArguments) {
        var _ref,
            _ref$cacheResponseFor,
            cacheResponseForSeconds,
            requestFunctionArgumentsJSON,
            cacheEntry,
            response,
            _args = arguments;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _ref = _args.length > 3 && _args[3] !== undefined ? _args[3] : {}, _ref$cacheResponseFor = _ref.cacheResponseForSeconds, cacheResponseForSeconds = _ref$cacheResponseFor === void 0 ? 2 * 60 : _ref$cacheResponseFor;

                if (!(cacheResponseForSeconds <= 0)) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt("return", requestFunction.call.apply(requestFunction, [requestContext].concat((0, _toConsumableArray2.default)(requestFunctionArguments))));

              case 3:
                requestFunctionArgumentsJSON = JSON.stringify(requestFunctionArguments);
                cacheEntry = this._responseCache[requestFunctionArgumentsJSON];

                if (!cacheEntry) {
                  _context.next = 11;
                  break;
                }

                if (!(Date.now() - cacheEntry.requestTimestamp < cacheResponseForSeconds * 1000)) {
                  _context.next = 10;
                  break;
                }

                return _context.abrupt("return", Promise.resolve(cacheEntry.response));

              case 10:
                // Cache entry has expired, so delete it explicitly
                delete this._responseCache[requestFunctionArgumentsJSON];

              case 11:
                _context.next = 13;
                return requestFunction.call.apply(requestFunction, [requestContext].concat((0, _toConsumableArray2.default)(requestFunctionArguments)));

              case 13:
                response = _context.sent;
                this._responseCache[requestFunctionArgumentsJSON] = {
                  requestTimestamp: Date.now(),
                  response: response
                };
                return _context.abrupt("return", response);

              case 16:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function perform(_x, _x2, _x3) {
        return _perform.apply(this, arguments);
      }

      return perform;
    }()
  }]);
  return RequestWithCache;
}();

exports.default = RequestWithCache;
//# sourceMappingURL=RequestWithCache.js.map
