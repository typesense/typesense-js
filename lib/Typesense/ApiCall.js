'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

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
    this._nodes = JSON.parse(JSON.stringify(this._configuration.nodes)); // Make a copy, since we'll be adding additional metadata to the nodes

    this._nearestNode = JSON.parse(JSON.stringify(this._configuration.nearestNode));
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
            requestNumber,
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

                requestNumber = Date.now();

                this._logger.debug("Request #".concat(requestNumber, ": Performing ").concat(requestType.toUpperCase(), " request: ").concat(endpoint));

                numTries = 1;

              case 7:
                if (!(numTries <= this._numRetriesPerRequest + 1)) {
                  _context.next = 35;
                  break;
                }

                node = this._getNextNode(requestNumber);

                this._logger.debug("Request #".concat(requestNumber, ": Attempting ").concat(requestType.toUpperCase(), " request Try #").concat(numTries, " to Node ").concat(node.index));

                _context.prev = 10;
                requestOptions = {
                  method: requestType,
                  url: this._uriFor(endpoint, node),
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

                    if (headers !== undefined && typeof data === 'string' && headers['content-type'].startsWith('application/json')) {
                      transformedData = JSON.parse(data);
                    }

                    return transformedData;
                  }]
                };
                _context.next = 14;
                return (0, _axios.default)(requestOptions);

              case 14:
                response = _context.sent;

                this._setNodeHealthcheck(node, HEALTHY);

                this._logger.debug("Request #".concat(requestNumber, ": Request to Node ").concat(node.index, " was successfully made. Response Code was ").concat(response.status, ".")); // If response is 2xx return a resolved promise, else reject


                if (!(response.status >= 200 && response.status < 300)) {
                  _context.next = 21;
                  break;
                }

                return _context.abrupt("return", Promise.resolve(response.data));

              case 21:
                return _context.abrupt("return", Promise.reject(new Error("".concat(response.request.path, " - ").concat(response.data.message))));

              case 22:
                _context.next = 32;
                break;

              case 24:
                _context.prev = 24;
                _context.t0 = _context["catch"](10);

                // This block handles HTTPStatus < 0, HTTPStatus > 500 and network layer issues like connection timeouts
                this._setNodeHealthcheck(node, UNHEALTHY);

                lastException = _context.t0;

                this._logger.warn("Request #".concat(requestNumber, ": Request to Node ").concat(node.index, " failed due to \"").concat(_context.t0.code, " ").concat(_context.t0.message).concat(_context.t0.response == null ? '' : ' - ' + JSON.stringify(_context.t0.response.data), "\"")); // this._logger.debug(error.stack)


                this._logger.warn("Request #".concat(requestNumber, ": Sleeping for ").concat(this._retryIntervalSeconds, "s and then retrying request..."));

                _context.next = 32;
                return this._timer(this._retryIntervalSeconds);

              case 32:
                numTries++;
                _context.next = 7;
                break;

              case 35:
                this._logger.debug("Request #".concat(requestNumber, ": No retries left. Raising last error"));

                return _context.abrupt("return", Promise.reject(lastException));

              case 37:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[10, 24]]);
      }));

      function performRequest(_x, _x2) {
        return _performRequest.apply(this, arguments);
      }

      return performRequest;
    }() // Attempts to find the next healthy node, looping through the list of nodes once.
    //   But if no healthy nodes are found, it will just return the next node, even if it's unhealthy
    //     so we can try the request for good measure, in case that node has become healthy since

  }, {
    key: "_getNextNode",
    value: function _getNextNode() {
      var requestNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      // Check if nearestNode is set and is healthy, if so return it
      if (this._nearestNode != null) {
        this._logger.debug("Request #".concat(requestNumber, ": Nodes Health: Node ").concat(this._nearestNode.index, " is ").concat(this._nearestNode.isHealthy === true ? 'Healthy' : 'Unhealthy'));

        if (this._nearestNode.isHealthy === true || this._nodeDueForHealthcheck(this._nearestNode, requestNumber)) {
          this._logger.debug("Request #".concat(requestNumber, ": Updated current node to Node ").concat(this._nearestNode.index));

          return this._nearestNode;
        }

        this._logger.debug("Request #".concat(requestNumber, ": Falling back to individual nodes"));
      } // Fallback to nodes as usual


      this._logger.debug("Request #".concat(requestNumber, ": Nodes Health: ").concat(this._nodes.map(function (node) {
        return "Node ".concat(node.index, " is ").concat(node.isHealthy === true ? 'Healthy' : 'Unhealthy');
      }).join(' || ')));

      var candidateNode;

      for (var i = 0; i <= this._nodes.length; i++) {
        this._currentNodeIndex = (this._currentNodeIndex + 1) % this._nodes.length;
        candidateNode = this._nodes[this._currentNodeIndex];

        if (candidateNode.isHealthy === true || this._nodeDueForHealthcheck(candidateNode, requestNumber)) {
          this._logger.debug("Request #".concat(requestNumber, ": Updated current node to Node ").concat(candidateNode.index));

          return candidateNode;
        }
      } // None of the nodes are marked healthy, but some of them could have become healthy since last health check.
      //  So we will just return the next node.


      this._logger.debug("Request #".concat(requestNumber, ": No healthy nodes were found. Returning the next node, Node ").concat(candidateNode.index));

      return candidateNode;
    }
  }, {
    key: "_nodeDueForHealthcheck",
    value: function _nodeDueForHealthcheck(node) {
      var requestNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var isDueForHealthcheck = Date.now() - node.lastAccessTimestamp > this._healthcheckIntervalSeconds * 1000;

      if (isDueForHealthcheck) {
        this._logger.debug("Request #".concat(requestNumber, ": Node ").concat(node.index, " has exceeded healtcheckIntervalSeconds of ").concat(this._healthcheckIntervalSeconds, ". Adding it back into rotation."));
      }

      return isDueForHealthcheck;
    }
  }, {
    key: "_initializeMetadataForNodes",
    value: function _initializeMetadataForNodes() {
      var _this = this;

      if (this._nearestNode != null) {
        this._nearestNode.index = 'nearestNode';

        this._setNodeHealthcheck(this._nearestNode, HEALTHY);
      }

      this._nodes.forEach(function (node, i) {
        node.index = i;

        _this._setNodeHealthcheck(node, HEALTHY);
      });
    }
  }, {
    key: "_setNodeHealthcheck",
    value: function _setNodeHealthcheck(node, isHealthy) {
      node.isHealthy = isHealthy;
      node.lastAccessTimestamp = Date.now();
    }
  }, {
    key: "_uriFor",
    value: function _uriFor(endpoint, node) {
      return "".concat(node.protocol, "://").concat(node.host, ":").concat(node.port).concat(node.path).concat(endpoint);
    }
  }, {
    key: "_defaultHeaders",
    value: function _defaultHeaders() {
      var defaultHeaders = {};
      defaultHeaders[APIKEYHEADERNAME] = this._apiKey;
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
