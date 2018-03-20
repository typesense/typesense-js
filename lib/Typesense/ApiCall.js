'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var APIKEYHEADERNAME = 'X-TYPESENSE-API-KEY';

var ApiCall = function () {
  function ApiCall(configuration) {
    _classCallCheck(this, ApiCall);

    this._configuration = configuration;
    this._defaultNode = 'master';
    this._defaultNodeIndex = 0;
  }

  _createClass(ApiCall, [{
    key: '_uriFor',
    value: function _uriFor(endpoint) {
      var node = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._defaultNode;
      var nodeIndex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this._defaultNodeIndex;

      if (node === 'readReplica') {
        return this._configuration.readReplicaNodes[nodeIndex].protocol + '://' + this._configuration.readReplicaNodes[nodeIndex].host + ':' + this._configuration.readReplicaNodes[nodeIndex].port + endpoint;
      } else {
        return this._configuration.masterNode.protocol + '://' + this._configuration.masterNode.host + ':' + this._configuration.masterNode.port + endpoint;
      }
    }
  }, {
    key: '_apiKey',
    value: function _apiKey() {
      var node = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._defaultNode;
      var nodeIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._defaultNodeIndex;

      if (node === 'readReplica') {
        return this._configuration.readReplicaNodes[nodeIndex].apiKey;
      } else {
        return this._configuration.masterNode.apiKey;
      }
    }
  }, {
    key: '_defaultHeaders',
    value: function _defaultHeaders() {
      var node = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._defaultNode;
      var nodeIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this._defaultNodeIndex;

      var defaultHeaders = {};
      defaultHeaders[APIKEYHEADERNAME] = this._apiKey(node, nodeIndex);
      defaultHeaders['Content-Type'] = 'application/json';
      defaultHeaders['Accept'] = 'application/json';
      return defaultHeaders;
    }
  }, {
    key: 'get',
    value: function get(endpoint) {
      var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var node = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this._defaultNode;
      var nodeIndex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this._defaultNodeIndex;

      return this.performRequest('get', endpoint, parameters, undefined, undefined, node, nodeIndex);
    }
  }, {
    key: 'delete',
    value: function _delete(endpoint) {
      var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var node = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this._defaultNode;
      var nodeIndex = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : this._defaultNodeIndex;

      return this.performRequest('delete', endpoint, parameters, undefined, undefined, node, nodeIndex);
    }
  }, {
    key: 'post',
    value: function post(endpoint) {
      var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return this.performRequest('post', endpoint, undefined, parameters, undefined, 'master');
    }
  }, {
    key: 'performRequest',
    value: function performRequest(requestType, endpoint) {
      var queryParameters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var bodyParameters = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var additionalHeaders = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

      var _this = this;

      var node = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : this._defaultNode;
      var nodeIndex = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : this._defaultNodeIndex;

      this._configuration.validate();

      var requestOptions = {
        method: requestType,
        url: this._uriFor(endpoint, node, nodeIndex),
        headers: Object.assign({}, this._defaultHeaders(node, nodeIndex), additionalHeaders),
        params: queryParameters,
        data: bodyParameters
      };

      return (0, _axios2.default)(requestOptions).then(function (response) {
        return Promise.resolve(response.data);
      }).catch(function (error) {
        if (requestType === 'get') {
          if (node === 'master' && _this._configuration.readReplicaNodes.length > 0) {
            return _this.performRequest(requestType, endpoint, queryParameters, bodyParameters, additionalHeaders, 'readReplica', 0);
          } else if (node === 'readReplica') {
            if (nodeIndex >= _this._configuration.readReplicaNodes.length - 1) {
              // error, but we'll let the code outside the if...else return the error
            } else {
              return _this.performRequest(requestType, endpoint, queryParameters, bodyParameters, additionalHeaders, node, nodeIndex + 1);
            }
          }
        }

        var responseMessage = '';
        if (error.response !== undefined) {
          responseMessage = ' - ' + error.response.request.path + ' - ' + error.response.data.message;
        }
        return Promise.reject(new Error('' + error.message + responseMessage));
      });
    }
  }]);

  return ApiCall;
}();

module.exports = ApiCall;
//# sourceMappingURL=ApiCall.js.map
