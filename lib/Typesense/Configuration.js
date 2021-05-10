'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _loglevel = _interopRequireDefault(require("loglevel"));

var _Errors = require("./Errors");

var Configuration = /*#__PURE__*/function () {
  function Configuration() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2.default)(this, Configuration);
    this.nodes = options.nodes || [];
    this.nodes = this.nodes.map(function (node) {
      return _this._setDefaultPathInNode(node);
    }).map(function (node) {
      return _this._setDefaultPortInNode(node);
    });
    this.nearestNode = options.nearestNode || null;
    this.nearestNode = this._setDefaultPathInNode(this.nearestNode);
    this.nearestNode = this._setDefaultPortInNode(this.nearestNode);
    this.connectionTimeoutSeconds = options.connectionTimeoutSeconds || options.timeoutSeconds || 10;
    this.healthcheckIntervalSeconds = options.healthcheckIntervalSeconds || 15;
    this.numRetries = options.numRetries || this.nodes.length + (this.nearestNode == null ? 0 : 1) || 3;
    this.retryIntervalSeconds = options.retryIntervalSeconds || 0.1;
    this.apiKey = options.apiKey;
    this.sendApiKeyAsQueryParam = options.sendApiKeyAsQueryParam || false;
    this.cacheSearchResultsForSeconds = options.cacheSearchResultsForSeconds || 0; // Disable client-side cache by default

    this.useServerSideSearchCache = options.useServerSideSearchCache || false;
    this.logger = options.logger || _loglevel.default;
    this.logLevel = options.logLevel || 'warn';
    this.logger.setLevel(this.logLevel);

    this._showDeprecationWarnings(options);

    this.validate();
  }

  (0, _createClass2.default)(Configuration, [{
    key: "validate",
    value: function validate() {
      if (this.nodes == null || this.nodes.length === 0 || this._validateNodes()) {
        throw new _Errors.MissingConfigurationError('Ensure that nodes[].protocol, nodes[].host and nodes[].port are set');
      }

      if (this.nearestNode != null && this._isNodeMissingAnyParameters(this.nearestNode)) {
        throw new _Errors.MissingConfigurationError('Ensure that nearestNodes.protocol, nearestNodes.host and nearestNodes.port are set');
      }

      if (this.apiKey == null) {
        throw new _Errors.MissingConfigurationError('Ensure that apiKey is set');
      }

      return true;
    }
  }, {
    key: "_validateNodes",
    value: function _validateNodes() {
      var _this2 = this;

      return this.nodes.some(function (node) {
        return _this2._isNodeMissingAnyParameters(node);
      });
    }
  }, {
    key: "_isNodeMissingAnyParameters",
    value: function _isNodeMissingAnyParameters(node) {
      return !['protocol', 'host', 'port', 'path'].every(function (key) {
        return node.hasOwnProperty(key);
      });
    }
  }, {
    key: "_setDefaultPathInNode",
    value: function _setDefaultPathInNode(node) {
      if (node != null && !node.hasOwnProperty('path')) {
        node.path = '';
      }

      return node;
    }
  }, {
    key: "_setDefaultPortInNode",
    value: function _setDefaultPortInNode(node) {
      if (node != null && !node.hasOwnProperty('port') && node.hasOwnProperty('protocol')) {
        switch (node.protocol) {
          case 'https':
            node.port = 443;
            break;

          case 'http':
            node.port = 80;
            break;
        }
      }

      return node;
    }
  }, {
    key: "_showDeprecationWarnings",
    value: function _showDeprecationWarnings(options) {
      if (options.timeoutSeconds) {
        this.logger.warn('Deprecation warning: timeoutSeconds is now renamed to connectionTimeoutSeconds');
      }

      if (options.masterNode) {
        this.logger.warn('Deprecation warning: masterNode is now consolidated to nodes, starting with Typesense Server v0.12');
      }

      if (options.readReplicaNodes) {
        this.logger.warn('Deprecation warning: readReplicaNodes is now consolidated to nodes, starting with Typesense Server v0.12');
      }
    }
  }]);
  return Configuration;
}();

exports.default = Configuration;
//# sourceMappingURL=Configuration.js.map
