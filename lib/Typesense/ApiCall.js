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

var _axios = _interopRequireDefault(require("axios"));

var _Errors = require("./Errors");

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
    this._sendApiKeyAsQueryParam = this._configuration.sendApiKeyAsQueryParam;
    this.logger = this._configuration.logger;

    this._initializeMetadataForNodes();

    this._currentNodeIndex = -1;
  }

  (0, _createClass2.default)(ApiCall, [{
    key: "get",
    value: function get(endpoint) {
      var queryParameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.performRequest('get', endpoint, {
        queryParameters: queryParameters
      });
    }
  }, {
    key: "delete",
    value: function _delete(endpoint) {
      var queryParameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.performRequest('delete', endpoint, {
        queryParameters: queryParameters
      });
    }
  }, {
    key: "post",
    value: function post(endpoint) {
      var bodyParameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var queryParameters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var additionalHeaders = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      return this.performRequest('post', endpoint, {
        queryParameters: queryParameters,
        bodyParameters: bodyParameters,
        additionalHeaders: additionalHeaders
      });
    }
  }, {
    key: "put",
    value: function put(endpoint) {
      var bodyParameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var queryParameters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.performRequest('put', endpoint, {
        queryParameters: queryParameters,
        bodyParameters: bodyParameters
      });
    }
  }, {
    key: "patch",
    value: function patch(endpoint) {
      var bodyParameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var queryParameters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.performRequest('patch', endpoint, {
        queryParameters: queryParameters,
        bodyParameters: bodyParameters
      });
    }
  }, {
    key: "performRequest",
    value: function () {
      var _performRequest = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(requestType, endpoint, _ref) {
        var _ref$queryParameters, queryParameters, _ref$bodyParameters, bodyParameters, _ref$additionalHeader, additionalHeaders, requestNumber, lastException, numTries, node, requestOptions, response;

        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _ref$queryParameters = _ref.queryParameters, queryParameters = _ref$queryParameters === void 0 ? null : _ref$queryParameters, _ref$bodyParameters = _ref.bodyParameters, bodyParameters = _ref$bodyParameters === void 0 ? null : _ref$bodyParameters, _ref$additionalHeader = _ref.additionalHeaders, additionalHeaders = _ref$additionalHeader === void 0 ? {} : _ref$additionalHeader;

                this._configuration.validate();

                requestNumber = Date.now();
                this.logger.debug("Request #".concat(requestNumber, ": Performing ").concat(requestType.toUpperCase(), " request: ").concat(endpoint));
                numTries = 1;

              case 5:
                if (!(numTries <= this._numRetriesPerRequest + 1)) {
                  _context.next = 40;
                  break;
                }

                node = this._getNextNode(requestNumber);
                this.logger.debug("Request #".concat(requestNumber, ": Attempting ").concat(requestType.toUpperCase(), " request Try #").concat(numTries, " to Node ").concat(node.index));
                _context.prev = 8;
                requestOptions = {
                  method: requestType,
                  url: this._uriFor(endpoint, node),
                  headers: Object.assign({}, this._defaultHeaders(), additionalHeaders),
                  timeout: this._connectionTimeoutSeconds * 1000,
                  maxContentLength: Infinity,
                  maxBodyLength: Infinity,
                  validateStatus: function validateStatus(status) {
                    /* Override default validateStatus, which only considers 2xx a success.
                        In our case, if the server returns any HTTP code, we will handle it below.
                        We do this to be able to raise custom errors based on response code.
                     */
                    return status > 0;
                  },
                  transformResponse: [function (data, headers) {
                    var transformedData = data;

                    if (headers !== undefined && typeof data === 'string' && headers['content-type'] && headers['content-type'].startsWith('application/json')) {
                      transformedData = JSON.parse(data);
                    }

                    return transformedData;
                  }]
                };

                if (queryParameters && Object.keys(queryParameters).length !== 0) {
                  requestOptions.params = queryParameters;
                }

                if (this._sendApiKeyAsQueryParam) {
                  requestOptions.params = requestOptions.params || {};
                  requestOptions.params['x-typesense-api-key'] = this._apiKey;
                }

                if (bodyParameters && Object.keys(bodyParameters).length !== 0) {
                  requestOptions.data = bodyParameters;
                }

                _context.next = 15;
                return (0, _axios.default)(requestOptions);

              case 15:
                response = _context.sent;

                if (response.status >= 1 && response.status <= 499) {
                  // Treat any status code > 0 and < 500 to be an indication that node is healthy
                  // We exclude 0 since some clients return 0 when request fails
                  this._setNodeHealthcheck(node, HEALTHY);
                }

                this.logger.debug("Request #".concat(requestNumber, ": Request to Node ").concat(node.index, " was made. Response Code was ").concat(response.status, "."));

                if (!(response.status >= 200 && response.status < 300)) {
                  _context.next = 22;
                  break;
                }

                return _context.abrupt("return", Promise.resolve(response.data));

              case 22:
                if (!(response.status < 500)) {
                  _context.next = 26;
                  break;
                }

                return _context.abrupt("return", Promise.reject(this._customErrorForResponse(response, response.data.message)));

              case 26:
                throw this._customErrorForResponse(response, response.data.message);

              case 27:
                _context.next = 37;
                break;

              case 29:
                _context.prev = 29;
                _context.t0 = _context["catch"](8);

                // This block handles retries for HTTPStatus > 500 and network layer issues like connection timeouts
                this._setNodeHealthcheck(node, UNHEALTHY);

                lastException = _context.t0;
                this.logger.warn("Request #".concat(requestNumber, ": Request to Node ").concat(node.index, " failed due to \"").concat(_context.t0.code, " ").concat(_context.t0.message).concat(_context.t0.response == null ? '' : ' - ' + JSON.stringify(_context.t0.response.data), "\"")); // this.logger.debug(error.stack)

                this.logger.warn("Request #".concat(requestNumber, ": Sleeping for ").concat(this._retryIntervalSeconds, "s and then retrying request..."));
                _context.next = 37;
                return this._timer(this._retryIntervalSeconds);

              case 37:
                numTries++;
                _context.next = 5;
                break;

              case 40:
                this.logger.debug("Request #".concat(requestNumber, ": No retries left. Raising last error"));
                return _context.abrupt("return", Promise.reject(lastException));

              case 42:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[8, 29]]);
      }));

      function performRequest(_x, _x2, _x3) {
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
        this.logger.debug("Request #".concat(requestNumber, ": Nodes Health: Node ").concat(this._nearestNode.index, " is ").concat(this._nearestNode.isHealthy === true ? 'Healthy' : 'Unhealthy'));

        if (this._nearestNode.isHealthy === true || this._nodeDueForHealthcheck(this._nearestNode, requestNumber)) {
          this.logger.debug("Request #".concat(requestNumber, ": Updated current node to Node ").concat(this._nearestNode.index));
          return this._nearestNode;
        }

        this.logger.debug("Request #".concat(requestNumber, ": Falling back to individual nodes"));
      } // Fallback to nodes as usual


      this.logger.debug("Request #".concat(requestNumber, ": Nodes Health: ").concat(this._nodes.map(function (node) {
        return "Node ".concat(node.index, " is ").concat(node.isHealthy === true ? 'Healthy' : 'Unhealthy');
      }).join(' || ')));
      var candidateNode;

      for (var i = 0; i <= this._nodes.length; i++) {
        this._currentNodeIndex = (this._currentNodeIndex + 1) % this._nodes.length;
        candidateNode = this._nodes[this._currentNodeIndex];

        if (candidateNode.isHealthy === true || this._nodeDueForHealthcheck(candidateNode, requestNumber)) {
          this.logger.debug("Request #".concat(requestNumber, ": Updated current node to Node ").concat(candidateNode.index));
          return candidateNode;
        }
      } // None of the nodes are marked healthy, but some of them could have become healthy since last health check.
      //  So we will just return the next node.


      this.logger.debug("Request #".concat(requestNumber, ": No healthy nodes were found. Returning the next node, Node ").concat(candidateNode.index));
      return candidateNode;
    }
  }, {
    key: "_nodeDueForHealthcheck",
    value: function _nodeDueForHealthcheck(node) {
      var requestNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var isDueForHealthcheck = Date.now() - node.lastAccessTimestamp > this._healthcheckIntervalSeconds * 1000;

      if (isDueForHealthcheck) {
        this.logger.debug("Request #".concat(requestNumber, ": Node ").concat(node.index, " has exceeded healtcheckIntervalSeconds of ").concat(this._healthcheckIntervalSeconds, ". Adding it back into rotation."));
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

      if (!this._sendApiKeyAsQueryParam) {
        defaultHeaders[APIKEYHEADERNAME] = this._apiKey;
      }

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

      function _timer(_x4) {
        return _timer2.apply(this, arguments);
      }

      return _timer;
    }()
  }, {
    key: "_customErrorForResponse",
    value: function _customErrorForResponse(response, messageFromServer) {
      var CustomErrorKlass;

      if (response.status === 400) {
        CustomErrorKlass = _Errors.RequestMalformed;
      } else if (response.status === 401) {
        CustomErrorKlass = _Errors.RequestUnauthorized;
      } else if (response.status === 404) {
        CustomErrorKlass = _Errors.ObjectNotFound;
      } else if (response.status === 409) {
        CustomErrorKlass = _Errors.ObjectAlreadyExists;
      } else if (response.status === 422) {
        CustomErrorKlass = _Errors.ObjectUnprocessable;
      } else if (response.status >= 500 && response.status <= 599) {
        CustomErrorKlass = _Errors.ServerError;
      } else {
        CustomErrorKlass = _Errors.HTTPError;
      }

      var errorMessage = "Request failed with HTTP code ".concat(response.status);

      if (typeof messageFromServer === 'string' && messageFromServer.trim() !== '') {
        errorMessage += " | Server said: ".concat(messageFromServer);
      }

      var customErrror = new CustomErrorKlass(errorMessage);
      customErrror.httpStatus = response.status;
      return customErrror;
    }
  }]);
  return ApiCall;
}();

exports.default = ApiCall;
//# sourceMappingURL=ApiCall.js.map
