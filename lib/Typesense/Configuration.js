'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Configuration = function () {
  function Configuration() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Configuration);

    this.masterNode = options.masterNode || {
      host: 'localhost',
      port: '8108',
      protocol: 'http'
    };

    this.readReplicaNodes = options.readReplicaNodes || [];
    this.timeoutSeconds = options.timeoutSeconds || 10;
  }

  _createClass(Configuration, [{
    key: 'validate',
    value: function validate() {
      if (this._isNodeMissingAnyParameters(this.masterNode)) {
        throw new Error('Missing required parameters in masterNode');
      }

      if (this._validateReadReplicaNodes()) {
        throw new Error('Missing required parameters in one of readReplicaNodes');
      }
    }
  }, {
    key: '_validateReadReplicaNodes',
    value: function _validateReadReplicaNodes() {
      var _this = this;

      return this.readReplicaNodes.some(function (node) {
        return _this._isNodeMissingAnyParameters(node);
      });
    }
  }, {
    key: '_isNodeMissingAnyParameters',
    value: function _isNodeMissingAnyParameters(node) {
      return !['protocol', 'host', 'port', 'apiKey'].every(function (key) {
        return node.hasOwnProperty(key);
      });
    }
  }]);

  return Configuration;
}();

module.exports = Configuration;
//# sourceMappingURL=Configuration.js.map
