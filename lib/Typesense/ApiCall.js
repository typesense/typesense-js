'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _axios = _interopRequireDefault(require("axios"));

var APIKEYHEADERNAME = 'X-TYPESENSE-API-KEY';
var HEALTHY = true;
var UNHEALTHY = false;

var ApiCall = /*#__PURE__*/function () {
  function ApiCall(configuration) {
    (0, _classCallCheck2.default)(this, ApiCall);
    this._configuration = configuration;
    this._apiKey = this._configuration.apiKey;
    this._nodes = (0, _toConsumableArray2.default)(this._configuration.nodes); // Make a copy, since we'll be adding additional metadata to the nodes

    this._connectionTimeoutSeconds = this._configuration.connectionTimeoutSeconds;
    this._healthcheckIntervalSeconds = this._configuration.healthcheckIntervalSeconds;
    this._numRetriesPerRequest = this._configuration.numRetries;
    this._retryIntervalSeconds = this._configuration.retryIntervalSeconds;
    this._logger = this._configuration.logger;

    this._initializeMetadataForNodes();

    this._currentNodeIndex = -1;
  }

  (0, _createClass2.default)(ApiCall, [{
    key: "get",
    value: function get(endpoint) {
      var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.performRequest('get', endpoint, parameters);
    }
  }, {
    key: "delete",
    value: function _delete(endpoint) {
      var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.performRequest('delete', endpoint, parameters);
    }
  }, {
    key: "post",
    value: function post(endpoint) {
      var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.performRequest('post', endpoint, undefined, parameters);
    }
  }, {
    key: "put",
    value: function put(endpoint) {
      var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.performRequest('put', endpoint, undefined, parameters);
    }
  }, {
    key: "performRequest",
    value: function () {
      var _performRequest = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(requestType, endpoint) {
        var queryParameters,
            bodyParameters,
            additionalHeaders,
            lastException,
            numTries,
            node,
            requestOptions,
            response,
            _args = arguments;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                queryParameters = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
                bodyParameters = _args.length > 3 && _args[3] !== undefined ? _args[3] : {};
                additionalHeaders = _args.length > 4 && _args[4] !== undefined ? _args[4] : {};

                this._configuration.validate();

                this._logger.debug("Performing ".concat(requestType.toUpperCase(), " request: ").concat(endpoint));

                numTries = 1;

              case 6:
                if (!(numTries <= this._numRetriesPerRequest + 1)) {
                  _context.next = 34;
                  break;
                }

                node = this._updateCurrentNode();

                this._logger.debug("Attempting ".concat(requestType.toUpperCase(), " request Try #").concat(numTries, " to Node ").concat(node.index));

                _context.prev = 9;
                requestOptions = {
                  method: requestType,
                  url: this._uriFor(endpoint, node.index),
                  headers: Object.assign({}, this._defaultHeaders(), additionalHeaders),
                  params: queryParameters,
                  data: bodyParameters,
                  timeout: this._connectionTimeoutSeconds * 1000,
                  validateStatus: function validateStatus(status) {
                    /* Override default validateStatus, which only considers 2xx a success.
                        In our case, anything below 500 should be considered a "success" and not retried.
                        We will handle anything not 2xx, but below 500 as a custom exception below.
                     */
                    return status > 0 && status < 500;
                  },
                  transformResponse: [function (data, headers) {
                    var transformedData = data;

                    if (headers['content-type'].startsWith('application/json') && typeof data === 'string') {
                      transformedData = JSON.parse(data);
                    }

                    return transformedData;
                  }]
                };
                _context.next = 13;
                return (0, _axios.default)(requestOptions);

              case 13:
                response = _context.sent;

                this._setNodeHealthcheck(node, HEALTHY);

                this._logger.debug("Request to Node ".concat(node.index, " was successfully made. Response Code was ").concat(response.status, ".")); // If response is 2xx return a resolved promise, else reject


                if (!(response.status >= 200 && response.status < 300)) {
                  _context.next = 20;
                  break;
                }

                return _context.abrupt("return", Promise.resolve(response.data));

              case 20:
                return _context.abrupt("return", Promise.reject(new Error("".concat(response.request.path, " - ").concat(response.data.message))));

              case 21:
                _context.next = 31;
                break;

              case 23:
                _context.prev = 23;
                _context.t0 = _context["catch"](9);

                // This block handles HTTPStatus < 0, HTTPStatus > 500 and network layer issues like connection timeouts
                this._setNodeHealthcheck(node, UNHEALTHY);

                lastException = _context.t0;

                this._logger.warn("Request to Node ".concat(node.index, " failed due to \"").concat(_context.t0.message).concat(_context.t0.response == null ? '' : ' - ' + JSON.stringify(_context.t0.response.data), "\""));

                this._logger.warn("Sleeping for ".concat(this._retryIntervalSeconds, "s and then retrying request..."));

                _context.next = 31;
                return this._timer(this._retryIntervalSeconds);

              case 31:
                numTries++;
                _context.next = 6;
                break;

              case 34:
                this._logger.debug("No retries left. Raising last error");

                return _context.abrupt("return", Promise.reject(lastException));

              case 36:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[9, 23]]);
      }));

      function performRequest(_x, _x2) {
        return _performRequest.apply(this, arguments);
      }

      return performRequest;
    }()
  }, {
    key: "_updateCurrentNode",
    value: function _updateCurrentNode() {
      this._logger.debug("Nodes Health: ".concat(this._nodes.map(function (node) {
        return "Node ".concat(node.index, " is ").concat(node.isHealthy === true ? 'Healthy' : 'Unhealthy');
      }).join(' || ')));

      var candidateNodeIndex = this._currentNodeIndex;

      for (var i = 0; i <= this._nodes.length; i++) {
        candidateNodeIndex = (candidateNodeIndex + 1) % this._nodes.length;

        this._resetNodeHealthcheckIfExpired(this._nodes[candidateNodeIndex]);

        if (this._nodes[candidateNodeIndex].isHealthy === true) {
          break;
        }

        if (i === this._nodes.length) {
          this._logger.debug("No healthy nodes were found. Returning the next node, Node ".concat(candidateNodeIndex));
        }
      }

      this._logger.debug("Updated current node to Node ".concat(candidateNodeIndex));

      this._currentNodeIndex = candidateNodeIndex;
      return this._nodes[candidateNodeIndex];
    }
  }, {
    key: "_resetNodeHealthcheckIfExpired",
    value: function _resetNodeHealthcheckIfExpired(node) {
      // this._logger.debug(`Checking if Node ${node.index} healthcheck needs to be reset`)
      if (node.isHealthy === true || Date.now() - node.lastHealthcheckTimestamp < this._healthcheckIntervalSeconds * 1000) {
        // this._logger.debug(`Healthcheck reset not required for Node ${node.index}. It is currently marked as ${node.isHealthy === true ? 'Healthy' : 'Unhealthy'}. Difference between current time and last healthcheck timestamp is ${Date.now() - node.lastHealthcheckTimestamp}`)
        return null;
      }

      this._logger.debug("Node ".concat(node.index, " has exceeded healthcheckIntervalSeconds of ").concat(this._healthcheckIntervalSeconds, "s. Adding it back into rotation."));

      this._setNodeHealthcheck(node, HEALTHY);

      this._logger.debug("Nodes Health: ".concat(this._nodes.map(function (node) {
        return "Node ".concat(node.index, " is ").concat(node.isHealthy === true ? 'Healthy' : 'Unhealthy');
      }).join(' || ')));
    }
  }, {
    key: "_initializeMetadataForNodes",
    value: function _initializeMetadataForNodes() {
      var _this = this;

      this._nodes.forEach(function (node, i) {
        node.index = i;

        _this._setNodeHealthcheck(node, HEALTHY);
      });
    }
  }, {
    key: "_setNodeHealthcheck",
    value: function _setNodeHealthcheck(node, isHealthy) {
      node.isHealthy = isHealthy;
      node.lastHealthcheckTimestamp = Date.now();
    }
  }, {
    key: "_uriFor",
    value: function _uriFor(endpoint) {
      var nodeIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._currentNodeIndex;
      return "".concat(this._nodes[nodeIndex].protocol, "://").concat(this._nodes[nodeIndex].host, ":").concat(this._nodes[nodeIndex].port).concat(this._nodes[nodeIndex].path).concat(endpoint);
    }
  }, {
    key: "_defaultHeaders",
    value: function _defaultHeaders() {
      var defaultHeaders = {};
      defaultHeaders[APIKEYHEADERNAME] = this._apiKey; // TODO: Might need to update this for import endpoint, since it requires non-json

      defaultHeaders['Content-Type'] = 'application/json';
      return defaultHeaders;
    }
  }, {
    key: "_timer",
    value: function () {
      var _timer2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(seconds) {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", new Promise(function (resolve) {
                  return setTimeout(resolve, seconds * 1000);
                }));

              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function _timer(_x3) {
        return _timer2.apply(this, arguments);
      }

      return _timer;
    }()
  }]);
  return ApiCall;
}();

module.exports = ApiCall;
//# sourceMappingURL=ApiCall.js.map
