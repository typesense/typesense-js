var Typesense;
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Typesense/Alias.ts"
/*!********************************!*\
  !*** ./src/Typesense/Alias.ts ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Alias)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Aliases__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Aliases */ "./src/Typesense/Aliases.ts");





var Alias = /*#__PURE__*/function () {
  function Alias(name, apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Alias);
    this.name = name;
    this.apiCall = apiCall;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Alias, [{
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.apiCall.get(this.endpointPath()));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function retrieve() {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this.apiCall.delete(this.endpointPath()));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function _delete() {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
  }, {
    key: "endpointPath",
    value: function endpointPath() {
      return "".concat(_Aliases__WEBPACK_IMPORTED_MODULE_4__["default"].RESOURCEPATH, "/").concat(encodeURIComponent(this.name));
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/Aliases.ts"
/*!**********************************!*\
  !*** ./src/Typesense/Aliases.ts ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Aliases)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);




var RESOURCEPATH = "/aliases";
var Aliases = /*#__PURE__*/function () {
  function Aliases(apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Aliases);
    this.apiCall = apiCall;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Aliases, [{
    key: "upsert",
    value: function () {
      var _upsert = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee(name, mapping) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.apiCall.put(this.endpointPath(name), mapping));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function upsert(_x, _x2) {
        return _upsert.apply(this, arguments);
      }
      return upsert;
    }()
  }, {
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this.apiCall.get(RESOURCEPATH));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function retrieve() {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }, {
    key: "endpointPath",
    value: function endpointPath(aliasName) {
      return "".concat(Aliases.RESOURCEPATH, "/").concat(encodeURIComponent(aliasName));
    }
  }], [{
    key: "RESOURCEPATH",
    get: function get() {
      return RESOURCEPATH;
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/Analytics.ts"
/*!************************************!*\
  !*** ./src/Typesense/Analytics.ts ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Analytics)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _AnalyticsRules__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AnalyticsRules */ "./src/Typesense/AnalyticsRules.ts");
/* harmony import */ var _AnalyticsRule__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AnalyticsRule */ "./src/Typesense/AnalyticsRule.ts");
/* harmony import */ var _AnalyticsEvents__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AnalyticsEvents */ "./src/Typesense/AnalyticsEvents.ts");






var RESOURCEPATH = "/analytics";
var Analytics = /*#__PURE__*/function () {
  function Analytics(apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Analytics);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "individualAnalyticsRules", {});
    this.apiCall = apiCall;
    this.apiCall = apiCall;
    this._analyticsRules = new _AnalyticsRules__WEBPACK_IMPORTED_MODULE_3__["default"](this.apiCall);
    this._analyticsEvents = new _AnalyticsEvents__WEBPACK_IMPORTED_MODULE_5__["default"](this.apiCall);
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Analytics, [{
    key: "rules",
    value: function rules(id) {
      if (id === undefined) {
        return this._analyticsRules;
      } else {
        if (this.individualAnalyticsRules[id] === undefined) {
          this.individualAnalyticsRules[id] = new _AnalyticsRule__WEBPACK_IMPORTED_MODULE_4__["default"](id, this.apiCall);
        }
        return this.individualAnalyticsRules[id];
      }
    }
  }, {
    key: "events",
    value: function events() {
      return this._analyticsEvents;
    }
  }], [{
    key: "RESOURCEPATH",
    get: function get() {
      return RESOURCEPATH;
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/AnalyticsEvents.ts"
/*!******************************************!*\
  !*** ./src/Typesense/AnalyticsEvents.ts ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AnalyticsEvents)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);




var RESOURCEPATH = "/analytics/events";
var AnalyticsEvents = /*#__PURE__*/function () {
  function AnalyticsEvents(apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, AnalyticsEvents);
    this.apiCall = apiCall;
    this.apiCall = apiCall;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(AnalyticsEvents, [{
    key: "create",
    value: function () {
      var _create = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee(params) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.apiCall.post(this.endpointPath(), params));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function create(_x) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
  }, {
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee2(params) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this.apiCall.get(this.endpointPath(), params));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function retrieve(_x2) {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }, {
    key: "endpointPath",
    value: function endpointPath(operation) {
      return "".concat(AnalyticsEvents.RESOURCEPATH).concat(operation === undefined ? "" : "/" + encodeURIComponent(operation));
    }
  }], [{
    key: "RESOURCEPATH",
    get: function get() {
      return RESOURCEPATH;
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/AnalyticsRule.ts"
/*!****************************************!*\
  !*** ./src/Typesense/AnalyticsRule.ts ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AnalyticsRule)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _AnalyticsRules__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AnalyticsRules */ "./src/Typesense/AnalyticsRules.ts");





var AnalyticsRule = /*#__PURE__*/function () {
  function AnalyticsRule(name, apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, AnalyticsRule);
    this.name = name;
    this.apiCall = apiCall;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(AnalyticsRule, [{
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.apiCall.get(this.endpointPath()));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function retrieve() {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this.apiCall.delete(this.endpointPath()));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function _delete() {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
  }, {
    key: "endpointPath",
    value: function endpointPath() {
      return "".concat(_AnalyticsRules__WEBPACK_IMPORTED_MODULE_4__["default"].RESOURCEPATH, "/").concat(encodeURIComponent(this.name));
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/AnalyticsRuleV1.ts"
/*!******************************************!*\
  !*** ./src/Typesense/AnalyticsRuleV1.ts ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AnalyticsRuleV1)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _AnalyticsRulesV1__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AnalyticsRulesV1 */ "./src/Typesense/AnalyticsRulesV1.ts");





var AnalyticsRuleV1 = /*#__PURE__*/function () {
  function AnalyticsRuleV1(name, apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, AnalyticsRuleV1);
    this.name = name;
    this.apiCall = apiCall;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(AnalyticsRuleV1, [{
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.apiCall.get(this.endpointPath()));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function retrieve() {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this.apiCall.delete(this.endpointPath()));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function _delete() {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
  }, {
    key: "endpointPath",
    value: function endpointPath() {
      return "".concat(_AnalyticsRulesV1__WEBPACK_IMPORTED_MODULE_4__["default"].RESOURCEPATH, "/").concat(encodeURIComponent(this.name));
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/AnalyticsRules.ts"
/*!*****************************************!*\
  !*** ./src/Typesense/AnalyticsRules.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AnalyticsRules)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);




var RESOURCEPATH = "/analytics/rules";
var AnalyticsRules = /*#__PURE__*/function () {
  function AnalyticsRules(apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, AnalyticsRules);
    this.apiCall = apiCall;
    this.apiCall = apiCall;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(AnalyticsRules, [{
    key: "create",
    value: function () {
      var _create = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee(params) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.apiCall.post(this.endpointPath(), params, {}, {}));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function create(_x) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
  }, {
    key: "upsert",
    value: function () {
      var _upsert = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee2(name, params) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this.apiCall.put(this.endpointPath(name), params));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function upsert(_x2, _x3) {
        return _upsert.apply(this, arguments);
      }
      return upsert;
    }()
  }, {
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee3(ruleTag) {
        var query;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              query = {};
              if (ruleTag) {
                query["rule_tag"] = ruleTag;
              }
              return _context3.abrupt("return", this.apiCall.get(this.endpointPath(), query));
            case 1:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function retrieve(_x4) {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }, {
    key: "endpointPath",
    value: function endpointPath(operation) {
      return "".concat(AnalyticsRules.RESOURCEPATH).concat(operation === undefined ? "" : "/" + encodeURIComponent(operation));
    }
  }], [{
    key: "RESOURCEPATH",
    get: function get() {
      return RESOURCEPATH;
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/AnalyticsRulesV1.ts"
/*!*******************************************!*\
  !*** ./src/Typesense/AnalyticsRulesV1.ts ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AnalyticsRulesV1)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);




var RESOURCEPATH = "/analytics/rules";
var AnalyticsRulesV1 = /*#__PURE__*/function () {
  function AnalyticsRulesV1(apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, AnalyticsRulesV1);
    this.apiCall = apiCall;
    this.apiCall = apiCall;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(AnalyticsRulesV1, [{
    key: "upsert",
    value: function () {
      var _upsert = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee(name, params) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.apiCall.put(this.endpointPath(name), params));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function upsert(_x, _x2) {
        return _upsert.apply(this, arguments);
      }
      return upsert;
    }()
  }, {
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this.apiCall.get(this.endpointPath()));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function retrieve() {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }, {
    key: "endpointPath",
    value: function endpointPath(operation) {
      return "".concat(AnalyticsRulesV1.RESOURCEPATH).concat(operation === undefined ? "" : "/" + encodeURIComponent(operation));
    }
  }], [{
    key: "RESOURCEPATH",
    get: function get() {
      return RESOURCEPATH;
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/AnalyticsV1.ts"
/*!**************************************!*\
  !*** ./src/Typesense/AnalyticsV1.ts ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AnalyticsV1)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _AnalyticsRulesV1__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./AnalyticsRulesV1 */ "./src/Typesense/AnalyticsRulesV1.ts");
/* harmony import */ var _AnalyticsRuleV1__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AnalyticsRuleV1 */ "./src/Typesense/AnalyticsRuleV1.ts");
/* harmony import */ var _AnalyticsEvents__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AnalyticsEvents */ "./src/Typesense/AnalyticsEvents.ts");






var RESOURCEPATH = "/analytics";

/**
 * @deprecated Deprecated starting with Typesense Server v30. Please migrate to `client.analytics` (new Analytics APIs).
 */
var AnalyticsV1 = /*#__PURE__*/function () {
  function AnalyticsV1(apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, AnalyticsV1);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "individualAnalyticsRules", {});
    this.apiCall = apiCall;
    this.apiCall = apiCall;
    this._analyticsRules = new _AnalyticsRulesV1__WEBPACK_IMPORTED_MODULE_3__["default"](this.apiCall);
    this._analyticsEvents = new _AnalyticsEvents__WEBPACK_IMPORTED_MODULE_5__["default"](this.apiCall);
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(AnalyticsV1, [{
    key: "rules",
    value: function rules(id) {
      if (!AnalyticsV1.hasWarnedDeprecation) {
        // eslint-disable-next-line no-console
        console.warn("[typesense] 'analyticsV1' is deprecated starting with Typesense Server v30 and will be removed in a future release. Please use 'analytics' instead.");
        AnalyticsV1.hasWarnedDeprecation = true;
      }
      if (id === undefined) {
        return this._analyticsRules;
      } else {
        if (this.individualAnalyticsRules[id] === undefined) {
          this.individualAnalyticsRules[id] = new _AnalyticsRuleV1__WEBPACK_IMPORTED_MODULE_4__["default"](id, this.apiCall);
        }
        return this.individualAnalyticsRules[id];
      }
    }
  }, {
    key: "events",
    value: function events() {
      return this._analyticsEvents;
    }
  }], [{
    key: "RESOURCEPATH",
    get: function get() {
      return RESOURCEPATH;
    }
  }]);
}();
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(AnalyticsV1, "hasWarnedDeprecation", false);


/***/ },

/***/ "./src/Typesense/ApiCall.ts"
/*!**********************************!*\
  !*** ./src/Typesense/ApiCall.ts ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ApiCall)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_readOnlyError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/readOnlyError */ "./node_modules/@babel/runtime/helpers/esm/readOnlyError.js");
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _Errors__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Errors */ "./src/Typesense/Errors/index.ts");
/* harmony import */ var _Errors_TypesenseError__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Errors/TypesenseError */ "./src/Typesense/Errors/TypesenseError.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Utils */ "./src/Typesense/Utils.ts");
/* harmony import */ var _Transport__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Transport */ "./src/Typesense/Transport.ts");







function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }





var APIKEYHEADERNAME = "X-TYPESENSE-API-KEY";
var HEALTHY = true;
var UNHEALTHY = false;
var ApiCall = /*#__PURE__*/function () {
  function ApiCall(configuration) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5__["default"])(this, ApiCall);
    this.configuration = configuration;
    this.apiKey = this.configuration.apiKey;
    this.nodes = this.configuration.nodes == null ? this.configuration.nodes : JSON.parse(JSON.stringify(this.configuration.nodes)); // Make a copy, since we'll be adding additional metadata to the nodes
    this.nearestNode = this.configuration.nearestNode == null ? this.configuration.nearestNode : JSON.parse(JSON.stringify(this.configuration.nearestNode));
    this.connectionTimeoutSeconds = this.configuration.connectionTimeoutSeconds;
    this.healthcheckIntervalSeconds = this.configuration.healthcheckIntervalSeconds;
    this.numRetriesPerRequest = this.configuration.numRetries;
    this.retryIntervalSeconds = this.configuration.retryIntervalSeconds;
    this.sendApiKeyAsQueryParam = this.configuration.sendApiKeyAsQueryParam;
    this.additionalUserHeaders = this.configuration.additionalHeaders;
    this.logger = this.configuration.logger;
    this.transport = new _Transport__WEBPACK_IMPORTED_MODULE_11__["default"]({
      fetch: this.configuration.fetch,
      paramsSerializer: this.configuration.paramsSerializer,
      dispatcher: this.configuration.dispatcher,
      requestHooks: this.configuration.requestHooks,
      responseHooks: this.configuration.responseHooks,
      errorHooks: this.configuration.errorHooks,
      connectionTimeoutSeconds: this.connectionTimeoutSeconds
    });
    this.initializeMetadataForNodes();
    this.currentNodeIndex = -1;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_6__["default"])(ApiCall, [{
    key: "get",
    value: function () {
      var _get = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().mark(function _callee(endpoint) {
        var queryParameters,
          _ref,
          _ref$abortSignal,
          abortSignal,
          _ref$responseType,
          responseType,
          _ref$streamConfig,
          streamConfig,
          isStreamingRequest,
          _args = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              queryParameters = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
              _ref = _args.length > 2 && _args[2] !== undefined ? _args[2] : {}, _ref$abortSignal = _ref.abortSignal, abortSignal = _ref$abortSignal === void 0 ? null : _ref$abortSignal, _ref$responseType = _ref.responseType, responseType = _ref$responseType === void 0 ? undefined : _ref$responseType, _ref$streamConfig = _ref.streamConfig, streamConfig = _ref$streamConfig === void 0 ? undefined : _ref$streamConfig, isStreamingRequest = _ref.isStreamingRequest;
              return _context.abrupt("return", this.performRequest("get", endpoint, {
                queryParameters: queryParameters,
                abortSignal: abortSignal,
                responseType: responseType,
                streamConfig: streamConfig,
                isStreamingRequest: isStreamingRequest
              }));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function get(_x) {
        return _get.apply(this, arguments);
      }
      return get;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().mark(function _callee2(endpoint) {
        var queryParameters,
          _args2 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              queryParameters = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
              return _context2.abrupt("return", this.performRequest("delete", endpoint, {
                queryParameters: queryParameters,
                isStreamingRequest: false
              }));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function _delete(_x2) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
  }, {
    key: "post",
    value: function () {
      var _post = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().mark(function _callee3(endpoint) {
        var bodyParameters,
          queryParameters,
          additionalHeaders,
          _ref2,
          _ref2$abortSignal,
          abortSignal,
          _ref2$responseType,
          responseType,
          _ref2$streamConfig,
          streamConfig,
          isStreamingRequest,
          _args3 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().wrap(function (_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              bodyParameters = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
              queryParameters = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : {};
              additionalHeaders = _args3.length > 3 && _args3[3] !== undefined ? _args3[3] : {};
              _ref2 = _args3.length > 4 && _args3[4] !== undefined ? _args3[4] : {}, _ref2$abortSignal = _ref2.abortSignal, abortSignal = _ref2$abortSignal === void 0 ? null : _ref2$abortSignal, _ref2$responseType = _ref2.responseType, responseType = _ref2$responseType === void 0 ? undefined : _ref2$responseType, _ref2$streamConfig = _ref2.streamConfig, streamConfig = _ref2$streamConfig === void 0 ? undefined : _ref2$streamConfig, isStreamingRequest = _ref2.isStreamingRequest;
              return _context3.abrupt("return", this.performRequest("post", endpoint, {
                queryParameters: queryParameters,
                bodyParameters: bodyParameters,
                additionalHeaders: additionalHeaders,
                abortSignal: abortSignal,
                responseType: responseType,
                streamConfig: streamConfig,
                isStreamingRequest: isStreamingRequest
              }));
            case 1:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function post(_x3) {
        return _post.apply(this, arguments);
      }
      return post;
    }()
  }, {
    key: "put",
    value: function () {
      var _put = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().mark(function _callee4(endpoint) {
        var bodyParameters,
          queryParameters,
          _args4 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().wrap(function (_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              bodyParameters = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
              queryParameters = _args4.length > 2 && _args4[2] !== undefined ? _args4[2] : {};
              return _context4.abrupt("return", this.performRequest("put", endpoint, {
                queryParameters: queryParameters,
                bodyParameters: bodyParameters,
                isStreamingRequest: false
              }));
            case 1:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function put(_x4) {
        return _put.apply(this, arguments);
      }
      return put;
    }()
  }, {
    key: "patch",
    value: function () {
      var _patch = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().mark(function _callee5(endpoint) {
        var bodyParameters,
          queryParameters,
          _args5 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().wrap(function (_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              bodyParameters = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
              queryParameters = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};
              return _context5.abrupt("return", this.performRequest("patch", endpoint, {
                queryParameters: queryParameters,
                bodyParameters: bodyParameters,
                isStreamingRequest: false
              }));
            case 1:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function patch(_x5) {
        return _patch.apply(this, arguments);
      }
      return patch;
    }()
  }, {
    key: "performRequest",
    value: function () {
      var _performRequest = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().mark(function _callee6(requestType, endpoint, _ref3) {
        var _ref3$queryParameters, queryParameters, _ref3$bodyParameters, bodyParameters, _ref3$additionalHeade, additionalHeaders, _ref3$abortSignal, abortSignal, _ref3$responseType, responseType, _ref3$skipConnectionT, skipConnectionTimeout, _ref3$enableKeepAlive, enableKeepAlive, _ref3$streamConfig, streamConfig, isStreamingRequest, requestNumber, lastException, numTries, node, requestHeaders, requestQueryParameters, request, response, error, _error, _error$code, _error$response, wasAborted, _t;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().wrap(function (_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _ref3$queryParameters = _ref3.queryParameters, queryParameters = _ref3$queryParameters === void 0 ? null : _ref3$queryParameters, _ref3$bodyParameters = _ref3.bodyParameters, bodyParameters = _ref3$bodyParameters === void 0 ? null : _ref3$bodyParameters, _ref3$additionalHeade = _ref3.additionalHeaders, additionalHeaders = _ref3$additionalHeade === void 0 ? {} : _ref3$additionalHeade, _ref3$abortSignal = _ref3.abortSignal, abortSignal = _ref3$abortSignal === void 0 ? null : _ref3$abortSignal, _ref3$responseType = _ref3.responseType, responseType = _ref3$responseType === void 0 ? undefined : _ref3$responseType, _ref3$skipConnectionT = _ref3.skipConnectionTimeout, skipConnectionTimeout = _ref3$skipConnectionT === void 0 ? false : _ref3$skipConnectionT, _ref3$enableKeepAlive = _ref3.enableKeepAlive, enableKeepAlive = _ref3$enableKeepAlive === void 0 ? undefined : _ref3$enableKeepAlive, _ref3$streamConfig = _ref3.streamConfig, streamConfig = _ref3$streamConfig === void 0 ? undefined : _ref3$streamConfig, isStreamingRequest = _ref3.isStreamingRequest;
              this.configuration.validate();
              if (isStreamingRequest) {
                this.logger.debug("Request: Performing streaming request to ".concat(endpoint));
                responseType = "stream";
              }
              requestNumber = Date.now();
              this.logger.debug("Request #".concat(requestNumber, ": Performing ").concat(requestType.toUpperCase(), " request: ").concat(endpoint));
              numTries = 1;
            case 1:
              if (!(numTries <= this.numRetriesPerRequest + 1)) {
                _context6.next = 15;
                break;
              }
              node = this.getNextNode(requestNumber);
              this.logger.debug("Request #".concat(requestNumber, ": Attempting ").concat(requestType.toUpperCase(), " request Try #").concat(numTries, " to Node ").concat(node.index));
              if (!(abortSignal && abortSignal.aborted)) {
                _context6.next = 2;
                break;
              }
              return _context6.abrupt("return", Promise.reject(new Error("Request aborted by caller.")));
            case 2:
              _context6.prev = 2;
              if (this.configuration.dispatcher) {
                this.logger.debug("Request #".concat(requestNumber, ": Using custom fetch dispatcher"));
              } else if (enableKeepAlive === true) {
                this.logger.debug("Request #".concat(requestNumber, ": Native fetch manages connection pooling; pass a dispatcher for custom keep-alive behavior"));
              }
              requestHeaders = this.mergeHeaders(this.defaultHeaders(), isStreamingRequest ? {
                Accept: "text/event-stream"
              } : {}, additionalHeaders, this.additionalUserHeaders);
              requestQueryParameters = queryParameters && Object.keys(queryParameters).length !== 0 ? _objectSpread({}, queryParameters) : {};
              if (this.sendApiKeyAsQueryParam) {
                requestQueryParameters["x-typesense-api-key"] = this.apiKey;
              }
              if (this.configuration.paramsSerializer) {
                this.logger.debug("Request #".concat(requestNumber, ": Using custom paramsSerializer"));
              }
              request = {
                method: requestType,
                url: this.uriFor(endpoint, node),
                headers: requestHeaders,
                queryParameters: requestQueryParameters,
                bodyParameters: bodyParameters,
                responseType: responseType,
                isStreamingRequest: isStreamingRequest
              };
              _context6.next = 3;
              return this.transport.perform(request, {
                abortSignal: abortSignal,
                skipConnectionTimeout: skipConnectionTimeout,
                requestNumber: requestNumber,
                attemptNumber: numTries,
                nodeIndex: node.index
              });
            case 3:
              response = _context6.sent;
              if (response.status >= 1 && response.status <= 499) {
                // Treat any status code > 0 and < 500 to be an indication that node is healthy
                // We exclude 0 since some clients return 0 when request fails
                this.setNodeHealthcheck(node, HEALTHY);
              }
              this.logger.debug("Request #".concat(requestNumber, ": Request to Node ").concat(node.index, " was made. Response Code was ").concat(response.status, "."));
              if (!(response.status >= 200 && response.status < 300)) {
                _context6.next = 5;
                break;
              }
              if (!isStreamingRequest) {
                _context6.next = 4;
                break;
              }
              return _context6.abrupt("return", this.handleStreamingResponse(response, streamConfig));
            case 4:
              return _context6.abrupt("return", Promise.resolve(response.data));
            case 5:
              if (!(response.status < 500)) {
                _context6.next = 7;
                break;
              }
              // Next, if response is anything but 5xx, don't retry, return a custom error
              error = this.customErrorForResponse(response, this.messageFromResponseData(response.data), this.httpBodyForError(response.request.body));
              _context6.next = 6;
              return this.transport.notifyError(error, "http", {
                abortSignal: abortSignal,
                skipConnectionTimeout: skipConnectionTimeout,
                requestNumber: requestNumber,
                attemptNumber: numTries,
                nodeIndex: node.index
              }, response);
            case 6:
              return _context6.abrupt("return", Promise.reject(error));
            case 7:
              // Retry all other HTTP errors (HTTPStatus > 500)
              // This will get caught by the catch block below
              _error = this.customErrorForResponse(response, this.messageFromResponseData(response.data), this.httpBodyForError(response.request.body));
              _context6.next = 8;
              return this.transport.notifyError(_error, "http", {
                abortSignal: abortSignal,
                skipConnectionTimeout: skipConnectionTimeout,
                requestNumber: requestNumber,
                attemptNumber: numTries,
                nodeIndex: node.index
              }, response);
            case 8:
              throw _error;
            case 9:
              _context6.next = 14;
              break;
            case 10:
              _context6.prev = 10;
              _t = _context6["catch"](2);
              // This block handles retries for HTTPStatus > 500 and network layer issues like connection timeouts
              wasAborted = this.isCallerAbortError(_t);
              if (!wasAborted) {
                this.setNodeHealthcheck(node, UNHEALTHY);
              }
              lastException = _t;
              this.logger.warn("Request #".concat(requestNumber, ": Request to Node ").concat(node.index, " failed due to \"").concat((_error$code = _t === null || _t === void 0 ? void 0 : _t.code) !== null && _error$code !== void 0 ? _error$code : "", " ").concat(_t.message).concat(_t.response == null ? "" : " - " + JSON.stringify((_error$response = _t.response) === null || _error$response === void 0 ? void 0 : _error$response.data), "\""));
              if (!wasAborted) {
                _context6.next = 11;
                break;
              }
              return _context6.abrupt("return", Promise.reject(new Error("Request aborted by caller.")));
            case 11:
              if (isStreamingRequest) {
                this.invokeOnErrorCallback(_t, streamConfig);
              }
              if (!(numTries < this.numRetriesPerRequest + 1)) {
                _context6.next = 12;
                break;
              }
              this.logger.warn("Request #".concat(requestNumber, ": Sleeping for ").concat(this.retryIntervalSeconds, "s and then retrying request..."));
              _context6.next = 13;
              break;
            case 12:
              this.logger.debug("Request #".concat(requestNumber, ": No retries left. Raising last error"));
              return _context6.abrupt("return", Promise.reject(lastException));
            case 13:
              _context6.next = 14;
              return this.timer(this.retryIntervalSeconds);
            case 14:
              numTries++;
              _context6.next = 1;
              break;
            case 15:
              this.logger.debug("Request #".concat(requestNumber, ": No retries left. Raising last error"));
              return _context6.abrupt("return", Promise.reject(lastException));
            case 16:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this, [[2, 10]]);
      }));
      function performRequest(_x6, _x7, _x8) {
        return _performRequest.apply(this, arguments);
      }
      return performRequest;
    }()
  }, {
    key: "processStreamingLine",
    value: function processStreamingLine(line) {
      if (!line.trim() || line === "data: [DONE]") {
        return null;
      }

      // Handle SSE format (data: {...})
      if (line.startsWith("data: ")) {
        return this.processDataLine(line.slice(6).trim());
      }

      // Try parsing as JSON if it starts with a brace
      if (line.trim().startsWith("{")) {
        try {
          var jsonData = JSON.parse(line.trim());
          if (jsonData && (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2__["default"])(jsonData) === "object") {
            if (!jsonData.conversation_id) {
              jsonData.conversation_id = "unknown";
            }
            if (!jsonData.message && jsonData.message !== "") {
              jsonData.message = "";
            }
            return jsonData;
          }
          return {
            conversation_id: "unknown",
            message: JSON.stringify(jsonData)
          };
        } catch (_unused) {
          return {
            conversation_id: "unknown",
            message: line.trim()
          };
        }
      }
      return {
        conversation_id: "unknown",
        message: line.trim()
      };
    }
  }, {
    key: "processDataLine",
    value: function processDataLine(dataContent) {
      if (!dataContent) {
        return null;
      }
      if (dataContent.startsWith("{")) {
        try {
          var jsonData = JSON.parse(dataContent);
          // Ensure the required fields exist
          if (jsonData && (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2__["default"])(jsonData) === "object") {
            if (!jsonData.conversation_id) {
              jsonData.conversation_id = "unknown";
            }
            if (!jsonData.message && jsonData.message !== "") {
              jsonData.message = "";
            }
            return jsonData;
          }
          return {
            conversation_id: "unknown",
            message: JSON.stringify(jsonData)
          };
        } catch (_unused2) {
          // Not valid JSON, use as plain text
          return {
            conversation_id: "unknown",
            message: dataContent
          };
        }
      }

      // For plain text
      return {
        conversation_id: "unknown",
        message: dataContent
      };
    }
  }, {
    key: "handleStreamingResponse",
    value: function () {
      var _handleStreamingResponse = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().mark(function _callee8(response, streamConfig) {
        var _this = this;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().wrap(function (_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              this.logger.debug("Handling streaming response");
              return _context8.abrupt("return", new Promise(/*#__PURE__*/function () {
                var _ref4 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().mark(function _callee7(resolve, reject) {
                  var _t2;
                  return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().wrap(function (_context7) {
                    while (1) switch (_context7.prev = _context7.next) {
                      case 0:
                        _context7.prev = 0;
                        if (!_this.isReadableStream(response.data)) {
                          _context7.next = 1;
                          break;
                        }
                        return _context7.abrupt("return", _this.handleReadableStream(response.data, resolve, reject, response, streamConfig));
                      case 1:
                        if (!(typeof response.data === "string")) {
                          _context7.next = 2;
                          break;
                        }
                        return _context7.abrupt("return", _this.handleStringStreamResponse(response.data, resolve, response, streamConfig));
                      case 2:
                        if (!((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2__["default"])(response.data) === "object" && response.data !== null)) {
                          _context7.next = 3;
                          break;
                        }
                        _this.logger.debug("No stream found, but data object is available");
                        _this.invokeOnCompleteCallback(response.data, streamConfig);
                        return _context7.abrupt("return", resolve(response.data));
                      case 3:
                        _this.logger.error("No usable data found in response");
                        return _context7.abrupt("return", reject(new Error("No usable data found in response")));
                      case 4:
                        _context7.prev = 4;
                        _t2 = _context7["catch"](0);
                        _this.logger.error("Error processing streaming response: ".concat(_t2));
                        _this.invokeOnErrorCallback(_t2, streamConfig);
                        reject(_t2);
                      case 5:
                      case "end":
                        return _context7.stop();
                    }
                  }, _callee7, null, [[0, 4]]);
                }));
                return function (_x1, _x10) {
                  return _ref4.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function handleStreamingResponse(_x9, _x0) {
        return _handleStreamingResponse.apply(this, arguments);
      }
      return handleStreamingResponse;
    }()
  }, {
    key: "handleReadableStream",
    value: function () {
      var _handleReadableStream = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().mark(function _callee9(stream, resolve, reject, response, streamConfig) {
        var reader, allChunks, buffer, _yield$reader$read, done, value, _lines, chunk, lines, _t3;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().wrap(function (_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              this.logger.debug("Found ReadableStream in response.data");
              reader = stream.getReader();
              allChunks = [];
              buffer = "";
              _context9.prev = 1;
            case 2:
              if (false) // removed by dead control flow
{}
              _context9.next = 3;
              return reader.read();
            case 3:
              _yield$reader$read = _context9.sent;
              done = _yield$reader$read.done;
              value = _yield$reader$read.value;
              if (!done) {
                _context9.next = 4;
                break;
              }
              this.logger.debug("Stream reading complete");
              if (buffer.trim()) {
                _lines = buffer.split("\n");
                this.processStreamLines(_lines, allChunks, streamConfig);
              }
              return _context9.abrupt("continue", 5);
            case 4:
              chunk = new TextDecoder().decode(value);
              this.logger.debug("Received chunk: ".concat(chunk.length, " bytes"));
              buffer += chunk;
              lines = buffer.split("\n");
              buffer = lines.pop() || "";
              this.processStreamLines(lines, allChunks, streamConfig);
              _context9.next = 2;
              break;
            case 5:
              this.finalizeStreamResult(allChunks, resolve, response, streamConfig);
              _context9.next = 7;
              break;
            case 6:
              _context9.prev = 6;
              _t3 = _context9["catch"](1);
              this.logger.error("Stream error: ".concat(_t3));
              this.invokeOnErrorCallback(_t3, streamConfig);
              reject(_t3);
            case 7:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this, [[1, 6]]);
      }));
      function handleReadableStream(_x11, _x12, _x13, _x14, _x15) {
        return _handleReadableStream.apply(this, arguments);
      }
      return handleReadableStream;
    }()
  }, {
    key: "handleStringStreamResponse",
    value: function handleStringStreamResponse(data, resolve, response, streamConfig) {
      this.logger.debug("Processing text response as stream data");
      var allChunks = [];
      var lines = data.split("\n");
      this.processStreamLines(lines, allChunks, streamConfig);
      if (allChunks.length > 0) {
        var finalResult = this.combineStreamingChunks(allChunks);
        this.invokeOnCompleteCallback(finalResult, streamConfig);
        resolve(finalResult);
      } else {
        // If no chunks were processed, use the original response
        this.logger.debug("No chunks processed, returning original API response");
        this.invokeOnCompleteCallback(response.data, streamConfig);
        resolve(response.data);
      }
    }
  }, {
    key: "isReadableStream",
    value: function isReadableStream(data) {
      return (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2__["default"])(data) === "object" && data !== null && "getReader" in data && typeof data.getReader === "function";
    }
  }, {
    key: "processStreamLines",
    value: function processStreamLines(lines, allChunks, streamConfig) {
      var _iterator = _createForOfIteratorHelper(lines),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var line = _step.value;
          if (line.trim() && line !== "data: [DONE]") {
            var processed = this.processStreamingLine(line);
            if (processed !== null) {
              this.invokeOnChunkCallback(processed, streamConfig);
              allChunks.push(processed);
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "finalizeStreamResult",
    value: function finalizeStreamResult(allChunks, resolve, response, streamConfig) {
      if (allChunks.length > 0) {
        var finalResult = this.combineStreamingChunks(allChunks);
        this.logger.debug("Stream processing complete");
        this.invokeOnCompleteCallback(finalResult, streamConfig);
        resolve(finalResult);
      } else {
        this.logger.debug("No chunks processed, returning original API response");
        this.invokeOnCompleteCallback(response.data, streamConfig);
        resolve(response.data);
      }
    }

    /**
     * Combines multiple streaming chunks into a single coherent result
     * This is critical for ensuring we return the complete data rather than just the last chunk
     */
  }, {
    key: "combineStreamingChunks",
    value: function combineStreamingChunks(chunks) {
      if (chunks.length === 0) return {};
      if (chunks.length === 1) return chunks[0];

      // For conversation streams with message chunks
      var messagesChunks = this.getMessageChunks(chunks);
      if (messagesChunks.length > 0) {
        return this.combineMessageChunks(chunks, messagesChunks);
      }

      // For regular search responses
      var lastChunk = chunks[chunks.length - 1];
      if (!this.isCompleteSearchResponse(lastChunk)) {
        throw new Error("Last chunk is not a complete search response");
      }
      return lastChunk;
    }
  }, {
    key: "getMessageChunks",
    value: function getMessageChunks(chunks) {
      return chunks.filter(this.isChunkMessage);
    }
  }, {
    key: "isChunkMessage",
    value: function isChunkMessage(chunk) {
      return (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2__["default"])(chunk) === "object" && chunk !== null && "message" in chunk && "conversation_id" in chunk;
    }
  }, {
    key: "combineMessageChunks",
    value: function combineMessageChunks(chunks, messagesChunks) {
      this.logger.debug("Found ".concat(messagesChunks.length, " message chunks to combine"));
      var lastChunk = chunks[chunks.length - 1];
      if (this.isCompleteSearchResponse(lastChunk)) {
        return lastChunk;
      }
      var metadataChunk = chunks.find(this.isCompleteSearchResponse);
      if (!metadataChunk) {
        throw new Error("No metadata chunk found");
      }
      return metadataChunk;
    }
  }, {
    key: "isCompleteSearchResponse",
    value: function isCompleteSearchResponse(chunk) {
      if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2__["default"])(chunk) === "object" && chunk !== null && Object.keys(chunk).length > 0) {
        return "results" in chunk || "found" in chunk || "hits" in chunk || "page" in chunk || "search_time_ms" in chunk;
      }
      return false;
    }

    // Attempts to find the next healthy node, looping through the list of nodes once.
    //   But if no healthy nodes are found, it will just return the next node, even if it's unhealthy
    //     so we can try the request for good measure, in case that node has become healthy since
  }, {
    key: "getNextNode",
    value: function getNextNode() {
      var requestNumber = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      // Check if nearestNode is set and is healthy, if so return it
      if (this.nearestNode != null) {
        this.logger.debug("Request #".concat(requestNumber, ": Nodes Health: Node ").concat(this.nearestNode.index, " is ").concat(this.nearestNode.isHealthy === true ? "Healthy" : "Unhealthy"));
        if (this.nearestNode.isHealthy === true || this.nodeDueForHealthcheck(this.nearestNode, requestNumber)) {
          this.logger.debug("Request #".concat(requestNumber, ": Updated current node to Node ").concat(this.nearestNode.index));
          return this.nearestNode;
        }
        this.logger.debug("Request #".concat(requestNumber, ": Falling back to individual nodes"));
      }

      // Fallback to nodes as usual
      this.logger.debug("Request #".concat(requestNumber, ": Nodes Health: ").concat(this.nodes.map(function (node) {
        return "Node ".concat(node.index, " is ").concat(node.isHealthy === true ? "Healthy" : "Unhealthy");
      }).join(" || ")));
      var candidateNode = this.nodes[0];
      for (var i = 0; i <= this.nodes.length; i++) {
        this.currentNodeIndex = (this.currentNodeIndex + 1) % this.nodes.length;
        candidateNode = this.nodes[this.currentNodeIndex];
        if (candidateNode.isHealthy === true || this.nodeDueForHealthcheck(candidateNode, requestNumber)) {
          this.logger.debug("Request #".concat(requestNumber, ": Updated current node to Node ").concat(candidateNode.index));
          return candidateNode;
        }
      }

      // None of the nodes are marked healthy, but some of them could have become healthy since last health check.
      //  So we will just return the next node.
      this.logger.debug("Request #".concat(requestNumber, ": No healthy nodes were found. Returning the next node, Node ").concat(candidateNode.index));
      return candidateNode;
    }
  }, {
    key: "nodeDueForHealthcheck",
    value: function nodeDueForHealthcheck(node) {
      var requestNumber = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var isDueForHealthcheck = Date.now() - node.lastAccessTimestamp > this.healthcheckIntervalSeconds * 1000;
      if (isDueForHealthcheck) {
        this.logger.debug("Request #".concat(requestNumber, ": Node ").concat(node.index, " has exceeded healtcheckIntervalSeconds of ").concat(this.healthcheckIntervalSeconds, ". Adding it back into rotation."));
      }
      return isDueForHealthcheck;
    }
  }, {
    key: "initializeMetadataForNodes",
    value: function initializeMetadataForNodes() {
      var _this2 = this;
      if (this.nearestNode != null) {
        this.nearestNode.index = "nearestNode";
        this.setNodeHealthcheck(this.nearestNode, HEALTHY);
      }
      this.nodes.forEach(function (node, i) {
        node.index = i;
        _this2.setNodeHealthcheck(node, HEALTHY);
      });
    }
  }, {
    key: "setNodeHealthcheck",
    value: function setNodeHealthcheck(node, isHealthy) {
      node.isHealthy = isHealthy;
      node.lastAccessTimestamp = Date.now();
    }
  }, {
    key: "uriFor",
    value: function uriFor(endpoint, node) {
      if (node.url != null) {
        return "".concat(node.url).concat(endpoint);
      }
      return "".concat(node.protocol, "://").concat(node.host, ":").concat(node.port).concat(node.path).concat(endpoint);
    }
  }, {
    key: "defaultHeaders",
    value: function defaultHeaders() {
      var defaultHeaders = {};
      defaultHeaders["Accept"] = "application/json, text/plain, */*";
      if (!this.sendApiKeyAsQueryParam) {
        defaultHeaders[APIKEYHEADERNAME] = this.apiKey;
      }
      defaultHeaders["Content-Type"] = "application/json";
      return defaultHeaders;
    }
  }, {
    key: "mergeHeaders",
    value: function mergeHeaders() {
      var result = {};
      var headerNamesByLowercaseName = {};
      for (var _len = arguments.length, headerSources = new Array(_len), _key = 0; _key < _len; _key++) {
        headerSources[_key] = arguments[_key];
      }
      headerSources.forEach(function (headers) {
        Object.entries(headers || {}).forEach(function (_ref5) {
          var _ref6 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref5, 2),
            headerName = _ref6[0],
            headerValue = _ref6[1];
          var lowercaseHeaderName = headerName.toLowerCase();
          var existingHeaderName = headerNamesByLowercaseName[lowercaseHeaderName];
          if (existingHeaderName !== undefined) {
            delete result[existingHeaderName];
          }
          result[headerName] = headerValue;
          headerNamesByLowercaseName[lowercaseHeaderName] = headerName;
        });
      });
      return result;
    }
  }, {
    key: "isCallerAbortError",
    value: function isCallerAbortError(error) {
      return error instanceof _Transport__WEBPACK_IMPORTED_MODULE_11__.FetchTransportError && error.type === "abort" && error.message === "Request aborted by caller.";
    }
  }, {
    key: "messageFromResponseData",
    value: function messageFromResponseData(data) {
      return (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_2__["default"])(data) === "object" && data !== null && "message" in data && typeof data.message === "string" ? data.message : "";
    }
  }, {
    key: "httpBodyForError",
    value: function httpBodyForError(body) {
      if (typeof body === "string") {
        return body;
      }
      if (body === undefined || body === null) {
        return undefined;
      }
      try {
        return JSON.stringify(body);
      } catch (_unused3) {
        return String(body);
      }
    }
  }, {
    key: "timer",
    value: function () {
      var _timer = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_4__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().mark(function _callee0(seconds) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().wrap(function (_context0) {
          while (1) switch (_context0.prev = _context0.next) {
            case 0:
              return _context0.abrupt("return", new Promise(function (resolve) {
                return setTimeout(resolve, seconds * 1000);
              }));
            case 1:
            case "end":
              return _context0.stop();
          }
        }, _callee0);
      }));
      function timer(_x16) {
        return _timer.apply(this, arguments);
      }
      return timer;
    }()
  }, {
    key: "customErrorForResponse",
    value: function customErrorForResponse(response, messageFromServer, httpBody) {
      var errorMessage = "Request failed with HTTP code ".concat(response.status);
      if (typeof messageFromServer === "string" && messageFromServer.trim() !== "") {
        errorMessage += " | Server said: ".concat(messageFromServer);
      }
      var error = new _Errors_TypesenseError__WEBPACK_IMPORTED_MODULE_9__["default"](errorMessage, httpBody, response.status);
      if (response.status === 400) {
        error = new _Errors__WEBPACK_IMPORTED_MODULE_8__.RequestMalformed(errorMessage, httpBody, response.status);
      } else if (response.status === 401) {
        error = new _Errors__WEBPACK_IMPORTED_MODULE_8__.RequestUnauthorized(errorMessage, httpBody, response.status);
      } else if (response.status === 404) {
        error = new _Errors__WEBPACK_IMPORTED_MODULE_8__.ObjectNotFound(errorMessage, httpBody, response.status);
      } else if (response.status === 409) {
        error = new _Errors__WEBPACK_IMPORTED_MODULE_8__.ObjectAlreadyExists(errorMessage, httpBody, response.status);
      } else if (response.status === 422) {
        error = new _Errors__WEBPACK_IMPORTED_MODULE_8__.ObjectUnprocessable(errorMessage, httpBody, response.status);
      } else if (response.status >= 500 && response.status <= 599) {
        error = new _Errors__WEBPACK_IMPORTED_MODULE_8__.ServerError(errorMessage, httpBody, response.status);
      } else {
        error = new _Errors__WEBPACK_IMPORTED_MODULE_8__.HTTPError(errorMessage, httpBody, response.status);
      }
      return error;
    }
  }, {
    key: "invokeOnChunkCallback",
    value: function invokeOnChunkCallback(data, streamConfig) {
      if (streamConfig !== null && streamConfig !== void 0 && streamConfig.onChunk) {
        try {
          streamConfig.onChunk(data);
        } catch (error) {
          this.logger.warn("Error in onChunk callback: ".concat(error));
        }
      }
    }
  }, {
    key: "invokeOnCompleteCallback",
    value: function invokeOnCompleteCallback(data, streamConfig) {
      if (streamConfig !== null && streamConfig !== void 0 && streamConfig.onComplete) {
        try {
          streamConfig.onComplete(data);
        } catch (error) {
          this.logger.warn("Error in onComplete callback: ".concat(error));
        }
      }
    }
  }, {
    key: "invokeOnErrorCallback",
    value: function invokeOnErrorCallback(error, streamConfig) {
      if (streamConfig !== null && streamConfig !== void 0 && streamConfig.onError) {
        var errorObj = (0,_Utils__WEBPACK_IMPORTED_MODULE_10__.toErrorWithMessage)(error);
        try {
          streamConfig.onError(errorObj);
        } catch (callbackError) {
          this.logger.warn("Error in onError callback: ".concat(callbackError));
        }
      }
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/Client.ts"
/*!*********************************!*\
  !*** ./src/Typesense/Client.ts ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Client)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _Configuration__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Configuration */ "./src/Typesense/Configuration.ts");
/* harmony import */ var _ApiCall__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ApiCall */ "./src/Typesense/ApiCall.ts");
/* harmony import */ var _Collections__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Collections */ "./src/Typesense/Collections.ts");
/* harmony import */ var _Collection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Collection */ "./src/Typesense/Collection.ts");
/* harmony import */ var _Aliases__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Aliases */ "./src/Typesense/Aliases.ts");
/* harmony import */ var _Alias__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Alias */ "./src/Typesense/Alias.ts");
/* harmony import */ var _Keys__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Keys */ "./src/Typesense/Keys.ts");
/* harmony import */ var _Key__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Key */ "./src/Typesense/Key.ts");
/* harmony import */ var _Debug__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Debug */ "./src/Typesense/Debug.ts");
/* harmony import */ var _Metrics__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Metrics */ "./src/Typesense/Metrics.ts");
/* harmony import */ var _Stats__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Stats */ "./src/Typesense/Stats.ts");
/* harmony import */ var _Health__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./Health */ "./src/Typesense/Health.ts");
/* harmony import */ var _Operations__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Operations */ "./src/Typesense/Operations.ts");
/* harmony import */ var _MultiSearch__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./MultiSearch */ "./src/Typesense/MultiSearch.ts");
/* harmony import */ var _Presets__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./Presets */ "./src/Typesense/Presets.ts");
/* harmony import */ var _Preset__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./Preset */ "./src/Typesense/Preset.ts");
/* harmony import */ var _AnalyticsV1__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./AnalyticsV1 */ "./src/Typesense/AnalyticsV1.ts");
/* harmony import */ var _Analytics__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./Analytics */ "./src/Typesense/Analytics.ts");
/* harmony import */ var _Stopwords__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./Stopwords */ "./src/Typesense/Stopwords.ts");
/* harmony import */ var _Stopword__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./Stopword */ "./src/Typesense/Stopword.ts");
/* harmony import */ var _Conversations__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./Conversations */ "./src/Typesense/Conversations.ts");
/* harmony import */ var _Conversation__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./Conversation */ "./src/Typesense/Conversation.ts");
/* harmony import */ var _Stemming__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./Stemming */ "./src/Typesense/Stemming.ts");
/* harmony import */ var _NLSearchModels__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./NLSearchModels */ "./src/Typesense/NLSearchModels.ts");
/* harmony import */ var _NLSearchModel__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./NLSearchModel */ "./src/Typesense/NLSearchModel.ts");
/* harmony import */ var _SynonymSets__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./SynonymSets */ "./src/Typesense/SynonymSets.ts");
/* harmony import */ var _SynonymSet__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./SynonymSet */ "./src/Typesense/SynonymSet.ts");
/* harmony import */ var _CurationSets__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./CurationSets */ "./src/Typesense/CurationSets.ts");
/* harmony import */ var _CurationSet__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./CurationSet */ "./src/Typesense/CurationSet.ts");


/* eslint-disable no-dupe-class-members */






























var Client = /*#__PURE__*/function () {
  function Client(options) {
    var _options$sendApiKeyAs;
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Client);
    options.sendApiKeyAsQueryParam = (_options$sendApiKeyAs = options.sendApiKeyAsQueryParam) !== null && _options$sendApiKeyAs !== void 0 ? _options$sendApiKeyAs : false;
    this.configuration = new _Configuration__WEBPACK_IMPORTED_MODULE_2__["default"](options);
    this.apiCall = new _ApiCall__WEBPACK_IMPORTED_MODULE_3__["default"](this.configuration);
    this.debug = new _Debug__WEBPACK_IMPORTED_MODULE_10__["default"](this.apiCall);
    this.metrics = new _Metrics__WEBPACK_IMPORTED_MODULE_11__["default"](this.apiCall);
    this.stats = new _Stats__WEBPACK_IMPORTED_MODULE_12__["default"](this.apiCall);
    this.health = new _Health__WEBPACK_IMPORTED_MODULE_13__["default"](this.apiCall);
    this.operations = new _Operations__WEBPACK_IMPORTED_MODULE_14__["default"](this.apiCall);
    this.multiSearch = new _MultiSearch__WEBPACK_IMPORTED_MODULE_15__["default"](this.apiCall, this.configuration);
    this._collections = new _Collections__WEBPACK_IMPORTED_MODULE_4__["default"](this.apiCall);
    this.individualCollections = {};
    this._aliases = new _Aliases__WEBPACK_IMPORTED_MODULE_6__["default"](this.apiCall);
    this.individualAliases = {};
    this._keys = new _Keys__WEBPACK_IMPORTED_MODULE_8__["default"](this.apiCall);
    this.individualKeys = {};
    this._presets = new _Presets__WEBPACK_IMPORTED_MODULE_16__["default"](this.apiCall);
    this.individualPresets = {};
    this._stopwords = new _Stopwords__WEBPACK_IMPORTED_MODULE_20__["default"](this.apiCall);
    this.individualStopwords = {};
    this.analytics = new _Analytics__WEBPACK_IMPORTED_MODULE_19__["default"](this.apiCall);
    this.analyticsV1 = new _AnalyticsV1__WEBPACK_IMPORTED_MODULE_18__["default"](this.apiCall);
    this.stemming = new _Stemming__WEBPACK_IMPORTED_MODULE_24__["default"](this.apiCall);
    this._conversations = new _Conversations__WEBPACK_IMPORTED_MODULE_22__["default"](this.apiCall);
    this.individualConversations = {};
    this._nlSearchModels = new _NLSearchModels__WEBPACK_IMPORTED_MODULE_25__["default"](this.apiCall);
    this.individualNLSearchModels = {};
    this._synonymSets = new _SynonymSets__WEBPACK_IMPORTED_MODULE_27__["default"](this.apiCall);
    this.individualSynonymSets = {};
    this._curationSets = new _CurationSets__WEBPACK_IMPORTED_MODULE_29__["default"](this.apiCall);
    this.individualCurationSets = {};
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Client, [{
    key: "collections",
    value: function collections(collectionName) {
      if (collectionName === undefined) {
        return this._collections;
      } else {
        if (this.individualCollections[collectionName] === undefined) {
          this.individualCollections[collectionName] = new _Collection__WEBPACK_IMPORTED_MODULE_5__["default"](collectionName, this.apiCall, this.configuration);
        }
        return this.individualCollections[collectionName];
      }
    }
  }, {
    key: "aliases",
    value: function aliases(aliasName) {
      if (aliasName === undefined) {
        return this._aliases;
      } else {
        if (this.individualAliases[aliasName] === undefined) {
          this.individualAliases[aliasName] = new _Alias__WEBPACK_IMPORTED_MODULE_7__["default"](aliasName, this.apiCall);
        }
        return this.individualAliases[aliasName];
      }
    }
  }, {
    key: "keys",
    value: function keys(id) {
      if (id === undefined) {
        return this._keys;
      } else {
        if (this.individualKeys[id] === undefined) {
          this.individualKeys[id] = new _Key__WEBPACK_IMPORTED_MODULE_9__["default"](id, this.apiCall);
        }
        return this.individualKeys[id];
      }
    }
  }, {
    key: "presets",
    value: function presets(id) {
      if (id === undefined) {
        return this._presets;
      } else {
        if (this.individualPresets[id] === undefined) {
          this.individualPresets[id] = new _Preset__WEBPACK_IMPORTED_MODULE_17__["default"](id, this.apiCall);
        }
        return this.individualPresets[id];
      }
    }
  }, {
    key: "stopwords",
    value: function stopwords(id) {
      if (id === undefined) {
        return this._stopwords;
      } else {
        if (this.individualStopwords[id] === undefined) {
          this.individualStopwords[id] = new _Stopword__WEBPACK_IMPORTED_MODULE_21__["default"](id, this.apiCall);
        }
        return this.individualStopwords[id];
      }
    }
  }, {
    key: "conversations",
    value: function conversations(id) {
      if (id === undefined) {
        return this._conversations;
      } else {
        if (this.individualConversations[id] === undefined) {
          this.individualConversations[id] = new _Conversation__WEBPACK_IMPORTED_MODULE_23__["default"](id, this.apiCall);
        }
        return this.individualConversations[id];
      }
    }
  }, {
    key: "nlSearchModels",
    value: function nlSearchModels(id) {
      if (id === undefined) {
        return this._nlSearchModels;
      } else {
        if (this.individualNLSearchModels[id] === undefined) {
          this.individualNLSearchModels[id] = new _NLSearchModel__WEBPACK_IMPORTED_MODULE_26__["default"](id, this.apiCall);
        }
        return this.individualNLSearchModels[id];
      }
    }
  }, {
    key: "synonymSets",
    value: function synonymSets(synonymSetName) {
      if (synonymSetName === undefined) {
        return this._synonymSets;
      } else {
        if (this.individualSynonymSets[synonymSetName] === undefined) {
          this.individualSynonymSets[synonymSetName] = new _SynonymSet__WEBPACK_IMPORTED_MODULE_28__["default"](synonymSetName, this.apiCall);
        }
        return this.individualSynonymSets[synonymSetName];
      }
    }
  }, {
    key: "curationSets",
    value: function curationSets(name) {
      if (name === undefined) {
        return this._curationSets;
      } else {
        if (this.individualCurationSets[name] === undefined) {
          this.individualCurationSets[name] = new _CurationSet__WEBPACK_IMPORTED_MODULE_30__["default"](name, this.apiCall);
        }
        return this.individualCurationSets[name];
      }
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/Collection.ts"
/*!*************************************!*\
  !*** ./src/Typesense/Collection.ts ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Collection)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Collections__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Collections */ "./src/Typesense/Collections.ts");
/* harmony import */ var _Documents__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Documents */ "./src/Typesense/Documents.ts");
/* harmony import */ var _Errors__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Errors */ "./src/Typesense/Errors/index.ts");
/* harmony import */ var _Overrides__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Overrides */ "./src/Typesense/Overrides.ts");
/* harmony import */ var _Override__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Override */ "./src/Typesense/Override.ts");
/* harmony import */ var _Synonyms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Synonyms */ "./src/Typesense/Synonyms.ts");
/* harmony import */ var _Synonym__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Synonym */ "./src/Typesense/Synonym.ts");
/* harmony import */ var _Document__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./Document */ "./src/Typesense/Document.ts");













var Collection = /*#__PURE__*/function () {
  function Collection(name, apiCall, configuration) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Collection);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__["default"])(this, "individualDocuments", {});
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__["default"])(this, "individualOverrides", {});
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__["default"])(this, "individualSynonyms", {});
    this.name = name;
    this.apiCall = apiCall;
    this.configuration = configuration;
    this.name = name;
    this.apiCall = apiCall;
    this.configuration = configuration;
    this._documents = new _Documents__WEBPACK_IMPORTED_MODULE_6__["default"](this.name, this.apiCall, this.configuration);
    this._overrides = new _Overrides__WEBPACK_IMPORTED_MODULE_8__["default"](this.name, this.apiCall);
    this._synonyms = new _Synonyms__WEBPACK_IMPORTED_MODULE_10__["default"](this.name, this.apiCall);
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Collection, [{
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.apiCall.get(this.endpointPath()));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function retrieve() {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().mark(function _callee2(schema) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this.apiCall.patch(this.endpointPath(), schema));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function update(_x) {
        return _update.apply(this, arguments);
      }
      return update;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().mark(function _callee3() {
        var options,
          _args3 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().wrap(function (_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              options = _args3.length > 0 && _args3[0] !== undefined ? _args3[0] : {};
              return _context3.abrupt("return", this.apiCall.delete(this.endpointPath(), options));
            case 1:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function _delete() {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
  }, {
    key: "exists",
    value: function () {
      var _exists = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().mark(function _callee4() {
        var _t;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().wrap(function (_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 1;
              return this.retrieve();
            case 1:
              return _context4.abrupt("return", true);
            case 2:
              _context4.prev = 2;
              _t = _context4["catch"](0);
              if (!(_t instanceof _Errors__WEBPACK_IMPORTED_MODULE_7__.ObjectNotFound)) {
                _context4.next = 3;
                break;
              }
              return _context4.abrupt("return", false);
            case 3:
              throw _t;
            case 4:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this, [[0, 2]]);
      }));
      function exists() {
        return _exists.apply(this, arguments);
      }
      return exists;
    }()
  }, {
    key: "documents",
    value: function documents(documentId) {
      if (!documentId) {
        return this._documents;
      } else {
        if (this.individualDocuments[documentId] === undefined) {
          this.individualDocuments[documentId] = new _Document__WEBPACK_IMPORTED_MODULE_12__.Document(this.name, documentId, this.apiCall);
        }
        return this.individualDocuments[documentId];
      }
    }
  }, {
    key: "overrides",
    value: function overrides(overrideId) {
      if (overrideId === undefined) {
        return this._overrides;
      } else {
        if (this.individualOverrides[overrideId] === undefined) {
          this.individualOverrides[overrideId] = new _Override__WEBPACK_IMPORTED_MODULE_9__["default"](this.name, overrideId, this.apiCall);
        }
        return this.individualOverrides[overrideId];
      }
    }
  }, {
    key: "synonyms",
    value: function synonyms(synonymId) {
      if (synonymId === undefined) {
        return this._synonyms;
      } else {
        if (this.individualSynonyms[synonymId] === undefined) {
          this.individualSynonyms[synonymId] = new _Synonym__WEBPACK_IMPORTED_MODULE_11__["default"](this.name, synonymId, this.apiCall);
        }
        return this.individualSynonyms[synonymId];
      }
    }
  }, {
    key: "endpointPath",
    value: function endpointPath() {
      return "".concat(_Collections__WEBPACK_IMPORTED_MODULE_5__["default"].RESOURCEPATH, "/").concat(encodeURIComponent(this.name));
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/Collections.ts"
/*!**************************************!*\
  !*** ./src/Typesense/Collections.ts ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Collections)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);




/**
 * Defines the schema for creating a collection in Typesense.
 *
 * If the `src_name` property in `Options` is a string, the `fields` prop is optional, and only used for embedding fields.
 * Otherwise, `fields` will be required.
 */

var RESOURCEPATH = "/collections";
var Collections = /*#__PURE__*/function () {
  function Collections(apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Collections);
    this.apiCall = apiCall;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Collections, [{
    key: "create",
    value: function () {
      var _create = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee(schema, options) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.apiCall.post(RESOURCEPATH, schema, options));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function create(_x, _x2) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
  }, {
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee2() {
        var options,
          _args2 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              options = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {};
              return _context2.abrupt("return", this.apiCall.get(RESOURCEPATH, options));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function retrieve() {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }], [{
    key: "RESOURCEPATH",
    get: function get() {
      return RESOURCEPATH;
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/Configuration.ts"
/*!****************************************!*\
  !*** ./src/Typesense/Configuration.ts ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Configuration)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var loglevel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! loglevel */ "./node_modules/loglevel/lib/loglevel.js");
/* harmony import */ var loglevel__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(loglevel__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Errors__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Errors */ "./src/Typesense/Errors/index.ts");



function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }



/**
 * Configuration options for streaming responses
 */

/**
 * Stream configuration for standard search responses
 * For specialized responses like MultiSearch, extend BaseStreamConfig with the appropriate onComplete signature
 */
var Configuration = /*#__PURE__*/function () {
  function Configuration(options) {
    var _this = this;
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Configuration);
    this.nodes = options.nodes || [];
    this.nodes = this.nodes.map(function (node) {
      return _this.setDefaultPathInNode(node);
    }).map(function (node) {
      return _this.setDefaultPortInNode(node);
    }).map(function (node) {
      return _objectSpread({}, node);
    }); // Make a deep copy

    if (options.randomizeNodes == null) {
      options.randomizeNodes = true;
    }
    if (options.randomizeNodes === true) {
      this.shuffleArray(this.nodes);
    }
    this.nearestNode = options.nearestNode;
    this.nearestNode = this.setDefaultPathInNode(this.nearestNode);
    this.nearestNode = this.setDefaultPortInNode(this.nearestNode);
    this.connectionTimeoutSeconds = options.connectionTimeoutSeconds || options.timeoutSeconds || 5;
    this.healthcheckIntervalSeconds = options.healthcheckIntervalSeconds || 60;
    this.numRetries = (options.numRetries !== undefined && options.numRetries >= 0 ? options.numRetries : this.nodes.length + (this.nearestNode == null ? 0 : 1)) || 3;
    this.retryIntervalSeconds = options.retryIntervalSeconds || 0.1;
    this.apiKey = options.apiKey;
    this.sendApiKeyAsQueryParam = options.sendApiKeyAsQueryParam; // We will set a default for this in Client and SearchClient

    this.cacheSearchResultsForSeconds = options.cacheSearchResultsForSeconds || 0; // Disable client-side cache by default
    this.useServerSideSearchCache = options.useServerSideSearchCache || false;
    this.logger = options.logger || loglevel__WEBPACK_IMPORTED_MODULE_3__;
    this.logLevel = options.logLevel || "warn";
    this.logger.setLevel(this.logLevel);
    this.additionalHeaders = options.additionalHeaders;
    this.fetch = options.fetch;
    this.dispatcher = options.dispatcher;
    this.paramsSerializer = options.paramsSerializer;
    this.requestHooks = options.requestHooks;
    this.responseHooks = options.responseHooks;
    this.errorHooks = options.errorHooks;
    this.showDeprecationWarnings(options);
    this.validate();
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Configuration, [{
    key: "validate",
    value: function validate() {
      if (this.nodes == null || this.nodes.length === 0 || this.validateNodes()) {
        throw new _Errors__WEBPACK_IMPORTED_MODULE_4__.MissingConfigurationError("Ensure that nodes[].protocol, nodes[].host and nodes[].port are set");
      }
      if (this.nearestNode != null && this.isNodeMissingAnyParameters(this.nearestNode)) {
        throw new _Errors__WEBPACK_IMPORTED_MODULE_4__.MissingConfigurationError("Ensure that nearestNodes.protocol, nearestNodes.host and nearestNodes.port are set");
      }
      if (this.apiKey == null) {
        throw new _Errors__WEBPACK_IMPORTED_MODULE_4__.MissingConfigurationError("Ensure that apiKey is set");
      }
      return true;
    }
  }, {
    key: "validateNodes",
    value: function validateNodes() {
      var _this2 = this;
      return this.nodes.some(function (node) {
        return _this2.isNodeMissingAnyParameters(node);
      });
    }
  }, {
    key: "isNodeMissingAnyParameters",
    value: function isNodeMissingAnyParameters(node) {
      return !["protocol", "host", "port", "path"].every(function (key) {
        return node.hasOwnProperty(key);
      }) && node["url"] == null;
    }
  }, {
    key: "setDefaultPathInNode",
    value: function setDefaultPathInNode(node) {
      if (node != null && !node.hasOwnProperty("path")) {
        node["path"] = "";
      }
      return node;
    }
  }, {
    key: "setDefaultPortInNode",
    value: function setDefaultPortInNode(node) {
      if (node != null && !node.hasOwnProperty("port") && node.hasOwnProperty("protocol")) {
        switch (node["protocol"]) {
          case "https":
            node["port"] = 443;
            break;
          case "http":
            node["port"] = 80;
            break;
        }
      }
      return node;
    }
  }, {
    key: "showDeprecationWarnings",
    value: function showDeprecationWarnings(options) {
      if (options.timeoutSeconds) {
        this.logger.warn("Deprecation warning: timeoutSeconds is now renamed to connectionTimeoutSeconds");
      }
      if (options.masterNode) {
        this.logger.warn("Deprecation warning: masterNode is now consolidated to nodes, starting with Typesense Server v0.12");
      }
      if (options.readReplicaNodes) {
        this.logger.warn("Deprecation warning: readReplicaNodes is now consolidated to nodes, starting with Typesense Server v0.12");
      }
    }
  }, {
    key: "shuffleArray",
    value: function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var _ref = [array[j], array[i]];
        array[i] = _ref[0];
        array[j] = _ref[1];
      }
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/Conversation.ts"
/*!***************************************!*\
  !*** ./src/Typesense/Conversation.ts ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Conversation)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Conversations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Conversations */ "./src/Typesense/Conversations.ts");





var Conversation = /*#__PURE__*/function () {
  function Conversation(id, apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Conversation);
    this.id = id;
    this.apiCall = apiCall;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Conversation, [{
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.apiCall.get(this.endpointPath()));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function retrieve() {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee2(params) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this.apiCall.put(this.endpointPath(), params));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function update(_x) {
        return _update.apply(this, arguments);
      }
      return update;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee3() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", this.apiCall.delete(this.endpointPath()));
            case 1:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function _delete() {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
  }, {
    key: "endpointPath",
    value: function endpointPath() {
      return "".concat(_Conversations__WEBPACK_IMPORTED_MODULE_4__["default"].RESOURCEPATH, "/").concat(encodeURIComponent(this.id));
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/ConversationModel.ts"
/*!********************************************!*\
  !*** ./src/Typesense/ConversationModel.ts ***!
  \********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ConversationModel)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ConversationModels__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ConversationModels */ "./src/Typesense/ConversationModels.ts");





var ConversationModel = /*#__PURE__*/function () {
  function ConversationModel(id, apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, ConversationModel);
    this.id = id;
    this.apiCall = apiCall;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(ConversationModel, [{
    key: "update",
    value: function () {
      var _update = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee(params) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.apiCall.put(this.endpointPath(), params));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function update(_x) {
        return _update.apply(this, arguments);
      }
      return update;
    }()
  }, {
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this.apiCall.get(this.endpointPath()));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function retrieve() {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee3() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", this.apiCall.delete(this.endpointPath()));
            case 1:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function _delete() {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
  }, {
    key: "endpointPath",
    value: function endpointPath() {
      return "".concat(_ConversationModels__WEBPACK_IMPORTED_MODULE_4__["default"].RESOURCEPATH, "/").concat(encodeURIComponent(this.id));
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/ConversationModels.ts"
/*!*********************************************!*\
  !*** ./src/Typesense/ConversationModels.ts ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ConversationModels)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);




var RESOURCEPATH = "/conversations/models";
var ConversationModels = /*#__PURE__*/function () {
  function ConversationModels(apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, ConversationModels);
    this.apiCall = apiCall;
    this.apiCall = apiCall;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(ConversationModels, [{
    key: "create",
    value: function () {
      var _create = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee(params) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.apiCall.post(this.endpointPath(), params));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function create(_x) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
  }, {
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this.apiCall.get(this.endpointPath()));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function retrieve() {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }, {
    key: "endpointPath",
    value: function endpointPath(operation) {
      return "".concat(ConversationModels.RESOURCEPATH).concat(operation === undefined ? "" : "/" + encodeURIComponent(operation));
    }
  }], [{
    key: "RESOURCEPATH",
    get: function get() {
      return RESOURCEPATH;
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/Conversations.ts"
/*!****************************************!*\
  !*** ./src/Typesense/Conversations.ts ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Conversations)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ConversationModels__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ConversationModels */ "./src/Typesense/ConversationModels.ts");
/* harmony import */ var _ConversationModel__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ConversationModel */ "./src/Typesense/ConversationModel.ts");







var RESOURCEPATH = "/conversations";
var Conversations = /*#__PURE__*/function () {
  function Conversations(apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Conversations);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__["default"])(this, "individualConversationModels", {});
    this.apiCall = apiCall;
    this.apiCall = apiCall;
    this._conversationsModels = new _ConversationModels__WEBPACK_IMPORTED_MODULE_5__["default"](this.apiCall);
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Conversations, [{
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.apiCall.get(RESOURCEPATH));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function retrieve() {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }, {
    key: "models",
    value: function models(id) {
      if (id === undefined) {
        return this._conversationsModels;
      } else {
        if (this.individualConversationModels[id] === undefined) {
          this.individualConversationModels[id] = new _ConversationModel__WEBPACK_IMPORTED_MODULE_6__["default"](id, this.apiCall);
        }
        return this.individualConversationModels[id];
      }
    }
  }], [{
    key: "RESOURCEPATH",
    get: function get() {
      return RESOURCEPATH;
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/CurationSet.ts"
/*!**************************************!*\
  !*** ./src/Typesense/CurationSet.ts ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CurationSet)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _CurationSets__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./CurationSets */ "./src/Typesense/CurationSets.ts");
/* harmony import */ var _CurationSetItems__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./CurationSetItems */ "./src/Typesense/CurationSetItems.ts");
/* harmony import */ var _CurationSetItem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./CurationSetItem */ "./src/Typesense/CurationSetItem.ts");








var CurationSet = /*#__PURE__*/function () {
  function CurationSet(name, apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, CurationSet);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__["default"])(this, "individualItems", {});
    this.name = name;
    this.apiCall = apiCall;
    this._items = new _CurationSetItems__WEBPACK_IMPORTED_MODULE_6__["default"](this.name, apiCall);
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(CurationSet, [{
    key: "upsert",
    value: function () {
      var _upsert = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().mark(function _callee(params) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.apiCall.put(this.endpointPath(), params));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function upsert(_x) {
        return _upsert.apply(this, arguments);
      }
      return upsert;
    }()
  }, {
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this.apiCall.get(this.endpointPath()));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function retrieve() {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().mark(function _callee3() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().wrap(function (_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", this.apiCall.delete(this.endpointPath()));
            case 1:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function _delete() {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
  }, {
    key: "items",
    value: function items(itemId) {
      if (itemId === undefined) {
        return this._items;
      } else {
        if (this.individualItems[itemId] === undefined) {
          this.individualItems[itemId] = new _CurationSetItem__WEBPACK_IMPORTED_MODULE_7__["default"](this.name, itemId, this.apiCall);
        }
        return this.individualItems[itemId];
      }
    }
  }, {
    key: "endpointPath",
    value: function endpointPath() {
      return "".concat(_CurationSets__WEBPACK_IMPORTED_MODULE_5__["default"].RESOURCEPATH, "/").concat(encodeURIComponent(this.name));
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/CurationSetItem.ts"
/*!******************************************!*\
  !*** ./src/Typesense/CurationSetItem.ts ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CurationSetItem)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _CurationSets__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CurationSets */ "./src/Typesense/CurationSets.ts");





var CurationSetItem = /*#__PURE__*/function () {
  function CurationSetItem(name, itemId, apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, CurationSetItem);
    this.name = name;
    this.itemId = itemId;
    this.apiCall = apiCall;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(CurationSetItem, [{
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.apiCall.get(this.endpointPath()));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function retrieve() {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }, {
    key: "upsert",
    value: function () {
      var _upsert = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee2(params) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this.apiCall.put(this.endpointPath(), params));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function upsert(_x) {
        return _upsert.apply(this, arguments);
      }
      return upsert;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee3() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", this.apiCall.delete(this.endpointPath()));
            case 1:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function _delete() {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
  }, {
    key: "endpointPath",
    value: function endpointPath() {
      return "".concat(_CurationSets__WEBPACK_IMPORTED_MODULE_4__["default"].RESOURCEPATH, "/").concat(encodeURIComponent(this.name), "/items/").concat(encodeURIComponent(this.itemId));
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/CurationSetItems.ts"
/*!*******************************************!*\
  !*** ./src/Typesense/CurationSetItems.ts ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CurationSetItems)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _CurationSets__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./CurationSets */ "./src/Typesense/CurationSets.ts");





var CurationSetItems = /*#__PURE__*/function () {
  function CurationSetItems(name, apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, CurationSetItems);
    this.name = name;
    this.apiCall = apiCall;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(CurationSetItems, [{
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.apiCall.get(this.endpointPath()));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function retrieve() {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }, {
    key: "endpointPath",
    value: function endpointPath(operation) {
      return "".concat(_CurationSets__WEBPACK_IMPORTED_MODULE_4__["default"].RESOURCEPATH, "/").concat(encodeURIComponent(this.name), "/items").concat(operation === undefined ? "" : "/" + encodeURIComponent(operation));
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/CurationSets.ts"
/*!***************************************!*\
  !*** ./src/Typesense/CurationSets.ts ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ CurationSets)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__);





var CurationSets = /*#__PURE__*/function () {
  function CurationSets(apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, CurationSets);
    this.apiCall = apiCall;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(CurationSets, [{
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.apiCall.get(CurationSets.RESOURCEPATH));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function retrieve() {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }]);
}();
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__["default"])(CurationSets, "RESOURCEPATH", "/curation_sets");


/***/ },

/***/ "./src/Typesense/Debug.ts"
/*!********************************!*\
  !*** ./src/Typesense/Debug.ts ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Debug)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);




var RESOURCEPATH = "/debug";
var Debug = /*#__PURE__*/function () {
  function Debug(apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Debug);
    this.apiCall = apiCall;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Debug, [{
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.apiCall.get(RESOURCEPATH));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function retrieve() {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }]);
}();


/***/ },

/***/ "./src/Typesense/Document.ts"
/*!***********************************!*\
  !*** ./src/Typesense/Document.ts ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Document: () => (/* binding */ Document)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Collections__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Collections */ "./src/Typesense/Collections.ts");
/* harmony import */ var _Documents__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Documents */ "./src/Typesense/Documents.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Utils */ "./src/Typesense/Utils.ts");







var Document = /*#__PURE__*/function () {
  function Document(collectionName, documentId, apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Document);
    this.collectionName = collectionName;
    this.documentId = documentId;
    this.apiCall = apiCall;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Document, [{
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee(options) {
        var queryParams;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              queryParams = (0,_Utils__WEBPACK_IMPORTED_MODULE_6__.normalizeArrayableParams)(options !== null && options !== void 0 ? options : {});
              return _context.abrupt("return", this.apiCall.get(this.endpointPath(), queryParams));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function retrieve(_x) {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee2(options) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this.apiCall.delete(this.endpointPath(), options));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function _delete(_x2) {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee3(partialDocument) {
        var options,
          _args3 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
              return _context3.abrupt("return", this.apiCall.patch(this.endpointPath(), partialDocument, options));
            case 1:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function update(_x3) {
        return _update.apply(this, arguments);
      }
      return update;
    }()
  }, {
    key: "endpointPath",
    value: function endpointPath() {
      return "".concat(_Collections__WEBPACK_IMPORTED_MODULE_4__["default"].RESOURCEPATH, "/").concat(encodeURIComponent(this.collectionName)).concat(_Documents__WEBPACK_IMPORTED_MODULE_5__["default"].RESOURCEPATH, "/").concat(encodeURIComponent(this.documentId));
    }
  }]);
}();

/***/ },

/***/ "./src/Typesense/Documents.ts"
/*!************************************!*\
  !*** ./src/Typesense/Documents.ts ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Documents)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _Errors__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Errors */ "./src/Typesense/Errors/index.ts");
/* harmony import */ var _SearchOnlyDocuments__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./SearchOnlyDocuments */ "./src/Typesense/SearchOnlyDocuments.ts");







function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }

function _callSuper(t, o, e) { return o = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(o), (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }



// Todo: use generic to extract filter_by values

// Todo: we could infer whether this is a grouped response by adding the search params as a generic

var isNodeJSEnvironment = typeof process !== "undefined" && process.versions != null && process.versions.node != null;
var Documents = /*#__PURE__*/function (_SearchOnlyDocuments) {
  function Documents(collectionName, apiCall, configuration) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Documents);
    return _callSuper(this, Documents, [collectionName, apiCall, configuration]);
  }
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__["default"])(Documents, _SearchOnlyDocuments);
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(Documents, [{
    key: "create",
    value: function () {
      var _create = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().mark(function _callee(document) {
        var options,
          _args = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
              if (document) {
                _context.next = 1;
                break;
              }
              throw new Error("No document provided");
            case 1:
              return _context.abrupt("return", this.apiCall.post(this.endpointPath(), document, options));
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function create(_x) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
  }, {
    key: "upsert",
    value: function () {
      var _upsert = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().mark(function _callee2(document) {
        var options,
          _args2 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
              if (document) {
                _context2.next = 1;
                break;
              }
              throw new Error("No document provided");
            case 1:
              return _context2.abrupt("return", this.apiCall.post(this.endpointPath(), document, Object.assign({}, options, {
                action: "upsert"
              })));
            case 2:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function upsert(_x2) {
        return _upsert.apply(this, arguments);
      }
      return upsert;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().mark(function _callee3(document) {
        var options,
          _args3 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().wrap(function (_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
              if (document) {
                _context3.next = 1;
                break;
              }
              throw new Error("No document provided");
            case 1:
              if (!(options["filter_by"] != null)) {
                _context3.next = 2;
                break;
              }
              return _context3.abrupt("return", this.apiCall.patch(this.endpointPath(), document, Object.assign({}, options)));
            case 2:
              return _context3.abrupt("return", this.apiCall.post(this.endpointPath(), document, Object.assign({}, options, {
                action: "update"
              })));
            case 3:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function update(_x3) {
        return _update.apply(this, arguments);
      }
      return update;
    }()
  }, {
    key: "emplace",
    value: function () {
      var _emplace = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().mark(function _callee4(document) {
        var options,
          _args4 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().wrap(function (_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
              if (document) {
                _context4.next = 1;
                break;
              }
              throw new Error("No document provided");
            case 1:
              if (!(options["filter_by"] != null)) {
                _context4.next = 2;
                break;
              }
              return _context4.abrupt("return", this.apiCall.patch(this.endpointPath(), document, Object.assign({}, options)));
            case 2:
              return _context4.abrupt("return", this.apiCall.post(this.endpointPath(), document, Object.assign({}, options, {
                action: "emplace"
              })));
            case 3:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function emplace(_x4) {
        return _emplace.apply(this, arguments);
      }
      return emplace;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().mark(function _callee5() {
        var query,
          _args5 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().wrap(function (_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              query = _args5.length > 0 && _args5[0] !== undefined ? _args5[0] : {};
              return _context5.abrupt("return", this.apiCall.delete(this.endpointPath(), query));
            case 1:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function _delete() {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
  }, {
    key: "createMany",
    value: function () {
      var _createMany = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().mark(function _callee6(documents) {
        var options,
          _args6 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().wrap(function (_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
              this.configuration.logger.warn("createMany is deprecated and will be removed in a future version. Use import instead, which now takes both an array of documents or a JSONL string of documents");
              return _context6.abrupt("return", this.import(documents, options));
            case 1:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function createMany(_x5) {
        return _createMany.apply(this, arguments);
      }
      return createMany;
    }()
    /**
     * Import a set of documents in a batch.
     * @param {string|Array} documents - Can be a JSONL string of documents or an array of document objects.
     * @param options
     * @return {string|Array} Returns a JSONL string if the input was a JSONL string, otherwise it returns an array of results.
     */
  }, {
    key: "import",
    value: function () {
      var _import2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().mark(function _callee7(documents) {
        var options,
          finalOptions,
          documentsInJSONLFormat,
          resultsInJSONLFormat,
          resultsInJSONFormat,
          failedItems,
          _args7 = arguments,
          _t;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().wrap(function (_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              options = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {};
              // Set default value for throwOnFail if not provided
              finalOptions = _objectSpread({
                throwOnFail: true
              }, options);
              if (!Array.isArray(documents)) {
                _context7.next = 5;
                break;
              }
              if (!(documents.length === 0)) {
                _context7.next = 1;
                break;
              }
              throw new _Errors__WEBPACK_IMPORTED_MODULE_8__.RequestMalformed("No documents provided");
            case 1:
              _context7.prev = 1;
              documentsInJSONLFormat = documents.map(function (document) {
                return JSON.stringify(document);
              }).join("\n");
              _context7.next = 4;
              break;
            case 2:
              _context7.prev = 2;
              _t = _context7["catch"](1);
              if (!(_t instanceof RangeError && _t.message.includes("Too many properties to enumerate"))) {
                _context7.next = 3;
                break;
              }
              throw new Error("".concat(_t, "\n          It looks like you have reached a Node.js limit that restricts the number of keys in an Object: https://stackoverflow.com/questions/9282869/are-there-limits-to-the-number-of-properties-in-a-javascript-object\n\n         Please try reducing the number of keys in your document, or using CURL to import your data.\n          "));
            case 3:
              throw new Error(_t);
            case 4:
              _context7.next = 6;
              break;
            case 5:
              documentsInJSONLFormat = documents;
              if (!isEmptyString(documentsInJSONLFormat)) {
                _context7.next = 6;
                break;
              }
              throw new _Errors__WEBPACK_IMPORTED_MODULE_8__.RequestMalformed("No documents provided");
            case 6:
              _context7.next = 7;
              return this.apiCall.performRequest("post", this.endpointPath("import"), {
                queryParameters: finalOptions,
                bodyParameters: documentsInJSONLFormat,
                additionalHeaders: {
                  "Content-Type": "text/plain"
                },
                skipConnectionTimeout: true,
                // We never want to client-side-timeout on an import and retry, since imports are syncronous and we want to let them take as long as it takes to complete fully
                enableKeepAlive: isNodeJSEnvironment ? true : false
              });
            case 7:
              resultsInJSONLFormat = _context7.sent;
              if (!Array.isArray(documents)) {
                _context7.next = 10;
                break;
              }
              resultsInJSONFormat = resultsInJSONLFormat.split("\n").map(function (r) {
                return JSON.parse(r);
              });
              failedItems = resultsInJSONFormat.filter(function (r) {
                return r.success === false;
              });
              if (!(failedItems.length > 0 && finalOptions.throwOnFail)) {
                _context7.next = 8;
                break;
              }
              throw new _Errors__WEBPACK_IMPORTED_MODULE_8__.ImportError("".concat(resultsInJSONFormat.length - failedItems.length, " documents imported successfully, ").concat(failedItems.length, " documents failed during import. Use `error.importResults` from the raised exception to get a detailed error reason for each document."), resultsInJSONFormat, {
                documentsInJSONLFormat: documentsInJSONLFormat,
                options: finalOptions,
                failedItems: failedItems,
                successCount: resultsInJSONFormat.length - failedItems.length
              });
            case 8:
              return _context7.abrupt("return", resultsInJSONFormat);
            case 9:
              _context7.next = 11;
              break;
            case 10:
              return _context7.abrupt("return", resultsInJSONLFormat);
            case 11:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this, [[1, 2]]);
      }));
      function _import(_x6) {
        return _import2.apply(this, arguments);
      }
      return _import;
    }()
    /**
     * Imports documents from a NodeJS readable stream of JSONL.
     */
  }, {
    key: "importStream",
    value: (function () {
      var _importStream = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().mark(function _callee8(readableStream) {
        var options,
          finalOptions,
          resultsInJSONLFormat,
          resultsInJSONFormat,
          failedItems,
          _args8 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().wrap(function (_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              options = _args8.length > 1 && _args8[1] !== undefined ? _args8[1] : {};
              finalOptions = _objectSpread({
                throwOnFail: true
              }, options);
              _context8.next = 1;
              return this.apiCall.performRequest("post", this.endpointPath("import"), {
                queryParameters: finalOptions,
                bodyParameters: readableStream,
                additionalHeaders: {
                  "Content-Type": "text/plain"
                },
                skipConnectionTimeout: true,
                // We never want to client-side-timeout on an import and retry, since imports are syncronous and we want to let them take as long as it takes to complete fully
                enableKeepAlive: isNodeJSEnvironment ? true : false
              });
            case 1:
              resultsInJSONLFormat = _context8.sent;
              resultsInJSONFormat = resultsInJSONLFormat.split("\n").map(function (r) {
                return JSON.parse(r);
              });
              failedItems = resultsInJSONFormat.filter(function (r) {
                return r.success === false;
              });
              if (!(failedItems.length > 0 && finalOptions.throwOnFail)) {
                _context8.next = 2;
                break;
              }
              throw new _Errors__WEBPACK_IMPORTED_MODULE_8__.ImportError("".concat(resultsInJSONFormat.length - failedItems.length, " documents imported successfully, ").concat(failedItems.length, " documents failed during import. Use `error.importResults` from the raised exception to get a detailed error reason for each document."), resultsInJSONFormat, {
                documentsInJSONLFormat: readableStream,
                options: finalOptions,
                failedItems: failedItems,
                successCount: resultsInJSONFormat.length - failedItems.length
              });
            case 2:
              return _context8.abrupt("return", resultsInJSONFormat);
            case 3:
            case "end":
              return _context8.stop();
          }
        }, _callee8, this);
      }));
      function importStream(_x7) {
        return _importStream.apply(this, arguments);
      }
      return importStream;
    }()
    /**
     * Returns a JSONL string for all the documents in this collection
     */
    )
  }, {
    key: "export",
    value: (function () {
      var _export2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().mark(function _callee9() {
        var options,
          _args9 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().wrap(function (_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              options = _args9.length > 0 && _args9[0] !== undefined ? _args9[0] : {};
              return _context9.abrupt("return", this.apiCall.get(this.endpointPath("export"), options));
            case 1:
            case "end":
              return _context9.stop();
          }
        }, _callee9, this);
      }));
      function _export() {
        return _export2.apply(this, arguments);
      }
      return _export;
    }()
    /**
     * Returns a NodeJS readable stream of JSONL for all the documents in this collection.
     */
    )
  }, {
    key: "exportStream",
    value: (function () {
      var _exportStream = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().mark(function _callee0() {
        var options,
          _args0 = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_7___default().wrap(function (_context0) {
          while (1) switch (_context0.prev = _context0.next) {
            case 0:
              options = _args0.length > 0 && _args0[0] !== undefined ? _args0[0] : {};
              return _context0.abrupt("return", this.apiCall.get(this.endpointPath("export"), options, {
                responseType: "stream"
              }));
            case 1:
            case "end":
              return _context0.stop();
          }
        }, _callee0, this);
      }));
      function exportStream() {
        return _exportStream.apply(this, arguments);
      }
      return exportStream;
    }())
  }]);
}(_SearchOnlyDocuments__WEBPACK_IMPORTED_MODULE_9__.SearchOnlyDocuments);

function isEmptyString(str) {
  return str == null || str === "" || str.length === 0;
}

/**
 * @deprecated Import from './Types' instead
 */

/***/ },

/***/ "./src/Typesense/Errors/HTTPError.ts"
/*!*******************************************!*\
  !*** ./src/Typesense/Errors/HTTPError.ts ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HTTPError)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _TypesenseError__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TypesenseError */ "./src/Typesense/Errors/TypesenseError.ts");





function _callSuper(t, o, e) { return o = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(o), (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }

var HTTPError = /*#__PURE__*/function (_TypesenseError) {
  function HTTPError() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, HTTPError);
    return _callSuper(this, HTTPError, arguments);
  }
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(HTTPError, _TypesenseError);
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__["default"])(HTTPError);
}(_TypesenseError__WEBPACK_IMPORTED_MODULE_5__["default"]);


/***/ },

/***/ "./src/Typesense/Errors/ImportError.ts"
/*!*********************************************!*\
  !*** ./src/Typesense/Errors/ImportError.ts ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ImportError)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _TypesenseError__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TypesenseError */ "./src/Typesense/Errors/TypesenseError.ts");





function _callSuper(t, o, e) { return o = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(o), (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }

var ImportError = /*#__PURE__*/function (_TypesenseError) {
  function ImportError(message, importResults, payload) {
    var _this;
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, ImportError);
    _this = _callSuper(this, ImportError, [message]);
    _this.importResults = importResults;
    _this.payload = payload;
    return _this;
  }
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(ImportError, _TypesenseError);
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__["default"])(ImportError);
}(_TypesenseError__WEBPACK_IMPORTED_MODULE_5__["default"]);


/***/ },

/***/ "./src/Typesense/Errors/MissingConfigurationError.ts"
/*!***********************************************************!*\
  !*** ./src/Typesense/Errors/MissingConfigurationError.ts ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MissingConfigurationError)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _TypesenseError__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TypesenseError */ "./src/Typesense/Errors/TypesenseError.ts");





function _callSuper(t, o, e) { return o = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(o), (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }

var MissingConfigurationError = /*#__PURE__*/function (_TypesenseError) {
  function MissingConfigurationError() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, MissingConfigurationError);
    return _callSuper(this, MissingConfigurationError, arguments);
  }
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(MissingConfigurationError, _TypesenseError);
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__["default"])(MissingConfigurationError);
}(_TypesenseError__WEBPACK_IMPORTED_MODULE_5__["default"]);


/***/ },

/***/ "./src/Typesense/Errors/ObjectAlreadyExists.ts"
/*!*****************************************************!*\
  !*** ./src/Typesense/Errors/ObjectAlreadyExists.ts ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ObjectAlreadyExists)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _TypesenseError__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TypesenseError */ "./src/Typesense/Errors/TypesenseError.ts");





function _callSuper(t, o, e) { return o = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(o), (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }

var ObjectAlreadyExists = /*#__PURE__*/function (_TypesenseError) {
  function ObjectAlreadyExists() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, ObjectAlreadyExists);
    return _callSuper(this, ObjectAlreadyExists, arguments);
  }
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(ObjectAlreadyExists, _TypesenseError);
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__["default"])(ObjectAlreadyExists);
}(_TypesenseError__WEBPACK_IMPORTED_MODULE_5__["default"]);


/***/ },

/***/ "./src/Typesense/Errors/ObjectNotFound.ts"
/*!************************************************!*\
  !*** ./src/Typesense/Errors/ObjectNotFound.ts ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ObjectNotFound)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _TypesenseError__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TypesenseError */ "./src/Typesense/Errors/TypesenseError.ts");





function _callSuper(t, o, e) { return o = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(o), (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }

var ObjectNotFound = /*#__PURE__*/function (_TypesenseError) {
  function ObjectNotFound() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, ObjectNotFound);
    return _callSuper(this, ObjectNotFound, arguments);
  }
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(ObjectNotFound, _TypesenseError);
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__["default"])(ObjectNotFound);
}(_TypesenseError__WEBPACK_IMPORTED_MODULE_5__["default"]);


/***/ },

/***/ "./src/Typesense/Errors/ObjectUnprocessable.ts"
/*!*****************************************************!*\
  !*** ./src/Typesense/Errors/ObjectUnprocessable.ts ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ObjectUnprocessable)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _TypesenseError__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TypesenseError */ "./src/Typesense/Errors/TypesenseError.ts");





function _callSuper(t, o, e) { return o = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(o), (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }

var ObjectUnprocessable = /*#__PURE__*/function (_TypesenseError) {
  function ObjectUnprocessable() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, ObjectUnprocessable);
    return _callSuper(this, ObjectUnprocessable, arguments);
  }
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(ObjectUnprocessable, _TypesenseError);
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__["default"])(ObjectUnprocessable);
}(_TypesenseError__WEBPACK_IMPORTED_MODULE_5__["default"]);


/***/ },

/***/ "./src/Typesense/Errors/RequestMalformed.ts"
/*!**************************************************!*\
  !*** ./src/Typesense/Errors/RequestMalformed.ts ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RequestMalformed)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _TypesenseError__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TypesenseError */ "./src/Typesense/Errors/TypesenseError.ts");





function _callSuper(t, o, e) { return o = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(o), (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }

var RequestMalformed = /*#__PURE__*/function (_TypesenseError) {
  function RequestMalformed() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, RequestMalformed);
    return _callSuper(this, RequestMalformed, arguments);
  }
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(RequestMalformed, _TypesenseError);
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__["default"])(RequestMalformed);
}(_TypesenseError__WEBPACK_IMPORTED_MODULE_5__["default"]);


/***/ },

/***/ "./src/Typesense/Errors/RequestUnauthorized.ts"
/*!*****************************************************!*\
  !*** ./src/Typesense/Errors/RequestUnauthorized.ts ***!
  \*****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RequestUnauthorized)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _TypesenseError__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TypesenseError */ "./src/Typesense/Errors/TypesenseError.ts");





function _callSuper(t, o, e) { return o = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(o), (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }

var RequestUnauthorized = /*#__PURE__*/function (_TypesenseError) {
  function RequestUnauthorized() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, RequestUnauthorized);
    return _callSuper(this, RequestUnauthorized, arguments);
  }
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(RequestUnauthorized, _TypesenseError);
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__["default"])(RequestUnauthorized);
}(_TypesenseError__WEBPACK_IMPORTED_MODULE_5__["default"]);


/***/ },

/***/ "./src/Typesense/Errors/ServerError.ts"
/*!*********************************************!*\
  !*** ./src/Typesense/Errors/ServerError.ts ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ServerError)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _TypesenseError__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./TypesenseError */ "./src/Typesense/Errors/TypesenseError.ts");





function _callSuper(t, o, e) { return o = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(o), (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }

var ServerError = /*#__PURE__*/function (_TypesenseError) {
  function ServerError() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, ServerError);
    return _callSuper(this, ServerError, arguments);
  }
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(ServerError, _TypesenseError);
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__["default"])(ServerError);
}(_TypesenseError__WEBPACK_IMPORTED_MODULE_5__["default"]);


/***/ },

/***/ "./src/Typesense/Errors/TypesenseError.ts"
/*!************************************************!*\
  !*** ./src/Typesense/Errors/TypesenseError.ts ***!
  \************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ TypesenseError)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/wrapNativeSuper */ "./node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js");






function _callSuper(t, o, e) { return o = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(o), (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var TypesenseError = /*#__PURE__*/function (_Error) {
  // Source: https://stackoverflow.com/a/58417721/123545
  function TypesenseError(message, httpBody, httpStatus) {
    var _this;
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, TypesenseError);
    _this = _callSuper(this, TypesenseError, [message]);
    _this.name = (this instanceof TypesenseError ? this.constructor : void 0).name;
    _this.httpBody = httpBody;
    _this.httpStatus = httpStatus;
    Object.setPrototypeOf(_this, (this instanceof TypesenseError ? this.constructor : void 0).prototype);
    return _this;
  }
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(TypesenseError, _Error);
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_0__["default"])(TypesenseError);
}(/*#__PURE__*/(0,_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_5__["default"])(Error));


/***/ },

/***/ "./src/Typesense/Errors/index.ts"
/*!***************************************!*\
  !*** ./src/Typesense/Errors/index.ts ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HTTPError: () => (/* reexport safe */ _HTTPError__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   ImportError: () => (/* reexport safe */ _ImportError__WEBPACK_IMPORTED_MODULE_8__["default"]),
/* harmony export */   MissingConfigurationError: () => (/* reexport safe */ _MissingConfigurationError__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   ObjectAlreadyExists: () => (/* reexport safe */ _ObjectAlreadyExists__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   ObjectNotFound: () => (/* reexport safe */ _ObjectNotFound__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   ObjectUnprocessable: () => (/* reexport safe */ _ObjectUnprocessable__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   RequestMalformed: () => (/* reexport safe */ _RequestMalformed__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   RequestUnauthorized: () => (/* reexport safe */ _RequestUnauthorized__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   ServerError: () => (/* reexport safe */ _ServerError__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   TypesenseError: () => (/* reexport safe */ _TypesenseError__WEBPACK_IMPORTED_MODULE_9__["default"])
/* harmony export */ });
/* harmony import */ var _HTTPError__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HTTPError */ "./src/Typesense/Errors/HTTPError.ts");
/* harmony import */ var _MissingConfigurationError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MissingConfigurationError */ "./src/Typesense/Errors/MissingConfigurationError.ts");
/* harmony import */ var _ObjectAlreadyExists__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ObjectAlreadyExists */ "./src/Typesense/Errors/ObjectAlreadyExists.ts");
/* harmony import */ var _ObjectNotFound__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ObjectNotFound */ "./src/Typesense/Errors/ObjectNotFound.ts");
/* harmony import */ var _ObjectUnprocessable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ObjectUnprocessable */ "./src/Typesense/Errors/ObjectUnprocessable.ts");
/* harmony import */ var _RequestMalformed__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./RequestMalformed */ "./src/Typesense/Errors/RequestMalformed.ts");
/* harmony import */ var _RequestUnauthorized__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./RequestUnauthorized */ "./src/Typesense/Errors/RequestUnauthorized.ts");
/* harmony import */ var _ServerError__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ServerError */ "./src/Typesense/Errors/ServerError.ts");
/* harmony import */ var _ImportError__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ImportError */ "./src/Typesense/Errors/ImportError.ts");
/* harmony import */ var _TypesenseError__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./TypesenseError */ "./src/Typesense/Errors/TypesenseError.ts");












/***/ },

/***/ "./src/Typesense/Health.ts"
/*!*********************************!*\
  !*** ./src/Typesense/Health.ts ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Health)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);




var RESOURCEPATH = "/health";
var Health = /*#__PURE__*/function () {
  function Health(apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Health);
    this.apiCall = apiCall;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Health, [{
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.apiCall.get(RESOURCEPATH));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function retrieve() {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }]);
}();


/***/ },

/***/ "./src/Typesense/Key.ts"
/*!******************************!*\
  !*** ./src/Typesense/Key.ts ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Key)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Keys__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Keys */ "./src/Typesense/Keys.ts");





var Key = /*#__PURE__*/function () {
  function Key(id, apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Key);
    this.id = id;
    this.apiCall = apiCall;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Key, [{
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.apiCall.get(this.endpointPath()));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function retrieve() {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this.apiCall.delete(this.endpointPath()));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function _delete() {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
  }, {
    key: "endpointPath",
    value: function endpointPath() {
      return "".concat(_Keys__WEBPACK_IMPORTED_MODULE_4__["default"].RESOURCEPATH, "/").concat(encodeURIComponent(this.id));
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/Keys.ts"
/*!*******************************!*\
  !*** ./src/Typesense/Keys.ts ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Keys)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! crypto */ "?4bf0");
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Utils */ "./src/Typesense/Utils.ts");






var RESOURCEPATH = "/keys";
var Keys = /*#__PURE__*/function () {
  function Keys(apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Keys);
    this.apiCall = apiCall;
    this.apiCall = apiCall;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Keys, [{
    key: "create",
    value: function () {
      var _create = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee(params) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.apiCall.post(Keys.RESOURCEPATH, params));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function create(_x) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
  }, {
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this.apiCall.get(RESOURCEPATH));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function retrieve() {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }, {
    key: "generateScopedSearchKey",
    value: function generateScopedSearchKey(searchKey, parameters) {
      // Note: only a key generated with the `documents:search` action will be
      // accepted by the server, when used with the search endpoint.
      var normalizedParams = (0,_Utils__WEBPACK_IMPORTED_MODULE_5__.normalizeArrayableParams)(parameters);
      var paramsJSON = JSON.stringify(normalizedParams);
      var digest = Buffer.from((0,crypto__WEBPACK_IMPORTED_MODULE_4__.createHmac)("sha256", searchKey).update(paramsJSON).digest("base64"));
      var keyPrefix = searchKey.substr(0, 4);
      var rawScopedKey = "".concat(digest).concat(keyPrefix).concat(paramsJSON);
      return Buffer.from(rawScopedKey).toString("base64");
    }
  }], [{
    key: "RESOURCEPATH",
    get: function get() {
      return RESOURCEPATH;
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/Metrics.ts"
/*!**********************************!*\
  !*** ./src/Typesense/Metrics.ts ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Metrics)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);




var RESOURCEPATH = "/metrics.json";
var Metrics = /*#__PURE__*/function () {
  function Metrics(apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Metrics);
    this.apiCall = apiCall;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Metrics, [{
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.apiCall.get(RESOURCEPATH));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function retrieve() {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }]);
}();


/***/ },

/***/ "./src/Typesense/MultiSearch.ts"
/*!**************************************!*\
  !*** ./src/Typesense/MultiSearch.ts ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ MultiSearch)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _RequestWithCache__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./RequestWithCache */ "./src/Typesense/RequestWithCache.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Utils */ "./src/Typesense/Utils.ts");





var _excluded = ["streamConfig"];

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }


var RESOURCEPATH = "/multi_search";
var MultiSearch = /*#__PURE__*/function () {
  function MultiSearch(apiCall, configuration) {
    var useTextContentType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_3__["default"])(this, MultiSearch);
    this.apiCall = apiCall;
    this.configuration = configuration;
    this.useTextContentType = useTextContentType;
    this.requestWithCache = new _RequestWithCache__WEBPACK_IMPORTED_MODULE_6__["default"]();
    this.logger = this.apiCall.logger;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(MultiSearch, [{
    key: "clearCache",
    value: function clearCache() {
      this.requestWithCache.clearCache();
    }
  }, {
    key: "perform",
    value: function () {
      var _perform = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_2__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5___default().mark(function _callee(searchRequests, commonParams, options) {
        var _options$cacheSearchR;
        var params, cacheSearchResultsForSeconds, normalizedSearchRequests, streamConfig, paramsWithoutStream, normalizedQueryParams;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              params = commonParams ? _objectSpread({}, commonParams) : {};
              cacheSearchResultsForSeconds = (_options$cacheSearchR = options === null || options === void 0 ? void 0 : options.cacheSearchResultsForSeconds) !== null && _options$cacheSearchR !== void 0 ? _options$cacheSearchR : this.configuration.cacheSearchResultsForSeconds;
              if (this.configuration.useServerSideSearchCache === true) {
                params.use_cache = true;
              }
              if (searchRequests.union === true && this.hasAnySearchObjectPagination(searchRequests)) {
                this.logger.warn("Individual `searches` pagination parameters are ignored when `union: true` is set. Use a top-level pagination parameter instead. See https://typesense.org/docs/29.0/api/federated-multi-search.html#union-search");
              }
              normalizedSearchRequests = {
                union: searchRequests.union,
                searches: searchRequests.searches.map(_Utils__WEBPACK_IMPORTED_MODULE_7__.normalizeArrayableParams)
              };
              streamConfig = params.streamConfig, paramsWithoutStream = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__["default"])(params, _excluded);
              normalizedQueryParams = (0,_Utils__WEBPACK_IMPORTED_MODULE_7__.normalizeArrayableParams)(paramsWithoutStream);
              return _context.abrupt("return", this.requestWithCache.perform(this.apiCall, "post", {
                path: RESOURCEPATH,
                body: normalizedSearchRequests,
                queryParams: normalizedQueryParams,
                headers: this.useTextContentType ? {
                  "content-type": "text/plain"
                } : {},
                streamConfig: streamConfig,
                abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
                isStreamingRequest: this.isStreamingRequest(params)
              }, cacheSearchResultsForSeconds !== undefined ? {
                cacheResponseForSeconds: cacheSearchResultsForSeconds
              } : undefined));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function perform(_x, _x2, _x3) {
        return _perform.apply(this, arguments);
      }
      return perform;
    }()
  }, {
    key: "isStreamingRequest",
    value: function isStreamingRequest(commonParams) {
      return commonParams.streamConfig !== undefined;
    }
  }, {
    key: "hasAnySearchObjectPagination",
    value: function hasAnySearchObjectPagination(searchRequests) {
      return searchRequests.searches.some(function (search) {
        return search.page !== undefined || search.per_page !== undefined || search.offset !== undefined || search.limit !== undefined || search.limit_hits !== undefined;
      });
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/NLSearchModel.ts"
/*!****************************************!*\
  !*** ./src/Typesense/NLSearchModel.ts ***!
  \****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NLSearchModel)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _NLSearchModels__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./NLSearchModels */ "./src/Typesense/NLSearchModels.ts");





var NLSearchModel = /*#__PURE__*/function () {
  function NLSearchModel(id, apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, NLSearchModel);
    this.id = id;
    this.apiCall = apiCall;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(NLSearchModel, [{
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.apiCall.get(this.endpointPath()));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function retrieve() {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee2(schema) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this.apiCall.put(this.endpointPath(), schema));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function update(_x) {
        return _update.apply(this, arguments);
      }
      return update;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee3() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", this.apiCall.delete(this.endpointPath()));
            case 1:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function _delete() {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
  }, {
    key: "endpointPath",
    value: function endpointPath() {
      return "".concat(_NLSearchModels__WEBPACK_IMPORTED_MODULE_4__["default"].RESOURCEPATH, "/").concat(encodeURIComponent(this.id));
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/NLSearchModels.ts"
/*!*****************************************!*\
  !*** ./src/Typesense/NLSearchModels.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NLSearchModels)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);




var RESOURCEPATH = "/nl_search_models";

// Base schema with all possible fields
var NLSearchModels = /*#__PURE__*/function () {
  function NLSearchModels(apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, NLSearchModels);
    this.apiCall = apiCall;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(NLSearchModels, [{
    key: "create",
    value: function () {
      var _create = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee(schema) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.apiCall.post(this.endpointPath(), schema));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function create(_x) {
        return _create.apply(this, arguments);
      }
      return create;
    }()
  }, {
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this.apiCall.get(this.endpointPath()));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function retrieve() {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }, {
    key: "endpointPath",
    value: function endpointPath() {
      return NLSearchModels.RESOURCEPATH;
    }
  }], [{
    key: "RESOURCEPATH",
    get: function get() {
      return RESOURCEPATH;
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/Operations.ts"
/*!*************************************!*\
  !*** ./src/Typesense/Operations.ts ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Operations)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);




var RESOURCEPATH = "/operations";
var Operations = /*#__PURE__*/function () {
  function Operations(apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Operations);
    this.apiCall = apiCall;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Operations, [{
    key: "perform",
    value: function () {
      var _perform = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee(operationName) {
        var queryParameters,
          _args = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              queryParameters = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
              return _context.abrupt("return", this.apiCall.post("".concat(RESOURCEPATH, "/").concat(operationName), {}, queryParameters));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function perform(_x) {
        return _perform.apply(this, arguments);
      }
      return perform;
    }()
  }, {
    key: "getSchemaChanges",
    value: function () {
      var _getSchemaChanges = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this.apiCall.get("".concat(RESOURCEPATH, "/schema_changes")));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function getSchemaChanges() {
        return _getSchemaChanges.apply(this, arguments);
      }
      return getSchemaChanges;
    }()
  }]);
}();


/***/ },

/***/ "./src/Typesense/Override.ts"
/*!***********************************!*\
  !*** ./src/Typesense/Override.ts ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Override)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Collections__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Collections */ "./src/Typesense/Collections.ts");
/* harmony import */ var _Overrides__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Overrides */ "./src/Typesense/Overrides.ts");






var Override = /*#__PURE__*/function () {
  function Override(collectionName, overrideId, apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Override);
    this.collectionName = collectionName;
    this.overrideId = overrideId;
    this.apiCall = apiCall;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Override, [{
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.apiCall.get(this.endpointPath()));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function retrieve() {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this.apiCall.delete(this.endpointPath()));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function _delete() {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
  }, {
    key: "endpointPath",
    value: function endpointPath() {
      return "".concat(_Collections__WEBPACK_IMPORTED_MODULE_4__["default"].RESOURCEPATH, "/").concat(encodeURIComponent(this.collectionName)).concat(_Overrides__WEBPACK_IMPORTED_MODULE_5__["default"].RESOURCEPATH, "/").concat(encodeURIComponent(this.overrideId));
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/Overrides.ts"
/*!************************************!*\
  !*** ./src/Typesense/Overrides.ts ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Overrides)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Collections__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Collections */ "./src/Typesense/Collections.ts");





var RESOURCEPATH = "/overrides";
var Overrides = /*#__PURE__*/function () {
  function Overrides(collectionName, apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Overrides);
    this.collectionName = collectionName;
    this.apiCall = apiCall;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Overrides, [{
    key: "upsert",
    value: function () {
      var _upsert = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee(overrideId, params) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.apiCall.put(this.endpointPath(overrideId), params));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function upsert(_x, _x2) {
        return _upsert.apply(this, arguments);
      }
      return upsert;
    }()
  }, {
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this.apiCall.get(this.endpointPath()));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function retrieve() {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }, {
    key: "endpointPath",
    value: function endpointPath(operation) {
      return "".concat(_Collections__WEBPACK_IMPORTED_MODULE_4__["default"].RESOURCEPATH, "/").concat(this.collectionName).concat(Overrides.RESOURCEPATH).concat(operation === undefined ? "" : "/" + encodeURIComponent(operation));
    }
  }], [{
    key: "RESOURCEPATH",
    get: function get() {
      return RESOURCEPATH;
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/Preset.ts"
/*!*********************************!*\
  !*** ./src/Typesense/Preset.ts ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Preset)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Presets__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Presets */ "./src/Typesense/Presets.ts");





var Preset = /*#__PURE__*/function () {
  function Preset(presetId, apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Preset);
    this.presetId = presetId;
    this.apiCall = apiCall;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Preset, [{
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.apiCall.get(this.endpointPath()));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function retrieve() {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this.apiCall.delete(this.endpointPath()));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function _delete() {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
  }, {
    key: "endpointPath",
    value: function endpointPath() {
      return "".concat(_Presets__WEBPACK_IMPORTED_MODULE_4__["default"].RESOURCEPATH, "/").concat(encodeURIComponent(this.presetId));
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/Presets.ts"
/*!**********************************!*\
  !*** ./src/Typesense/Presets.ts ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Presets)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Utils */ "./src/Typesense/Utils.ts");






var RESOURCEPATH = "/presets";
var Presets = /*#__PURE__*/function () {
  function Presets(apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Presets);
    this.apiCall = apiCall;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(Presets, [{
    key: "upsert",
    value: function () {
      var _upsert = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().mark(function _callee(presetId, params) {
        var _normalizedParams, normalizedParams;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              if (!((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(params.value) === "object" && "searches" in params.value)) {
                _context.next = 1;
                break;
              }
              _normalizedParams = params.value.searches.map(function (search) {
                return (0,_Utils__WEBPACK_IMPORTED_MODULE_5__.normalizeArrayableParams)(search);
              });
              return _context.abrupt("return", this.apiCall.put(this.endpointPath(presetId), {
                value: {
                  searches: _normalizedParams
                }
              }));
            case 1:
              normalizedParams = (0,_Utils__WEBPACK_IMPORTED_MODULE_5__.normalizeArrayableParams)(params.value);
              return _context.abrupt("return", this.apiCall.put(this.endpointPath(presetId), {
                value: normalizedParams
              }));
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function upsert(_x, _x2) {
        return _upsert.apply(this, arguments);
      }
      return upsert;
    }()
  }, {
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this.apiCall.get(this.endpointPath()));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function retrieve() {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }, {
    key: "endpointPath",
    value: function endpointPath(operation) {
      return "".concat(Presets.RESOURCEPATH).concat(operation === undefined ? "" : "/" + encodeURIComponent(operation));
    }
  }], [{
    key: "RESOURCEPATH",
    get: function get() {
      return RESOURCEPATH;
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/RequestWithCache.ts"
/*!*******************************************!*\
  !*** ./src/Typesense/RequestWithCache.ts ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ RequestWithCache)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__);





var defaultCacheResponseForSeconds = 2 * 60;
var defaultMaxSize = 100;
var RequestWithCache = /*#__PURE__*/function () {
  function RequestWithCache() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, RequestWithCache);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__["default"])(this, "responseCache", new Map());
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__["default"])(this, "responsePromiseCache", new Map());
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(RequestWithCache, [{
    key: "clearCache",
    value: function clearCache() {
      this.responseCache = new Map();
      this.responsePromiseCache = new Map();
    }
  }, {
    key: "perform",
    value: function () {
      var _perform = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().mark(function _callee(requestContext, methodName, requestParams, cacheOptions) {
        var _ref, _ref$cacheResponseFor, cacheResponseForSeconds, _ref$maxSize, maxSize, isCacheDisabled, path, queryParams, body, headers, streamConfig, abortSignal, responseType, isStreamingRequest, requestParamsJSON, cacheEntry, now, isEntryValid, cachePromiseEntry, _isEntryValid, responsePromise, response, isCacheOverMaxSize, oldestEntry, isResponsePromiseCacheOverMaxSize, _oldestEntry;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _ref = cacheOptions || {}, _ref$cacheResponseFor = _ref.cacheResponseForSeconds, cacheResponseForSeconds = _ref$cacheResponseFor === void 0 ? defaultCacheResponseForSeconds : _ref$cacheResponseFor, _ref$maxSize = _ref.maxSize, maxSize = _ref$maxSize === void 0 ? defaultMaxSize : _ref$maxSize;
              isCacheDisabled = cacheOptions === undefined || cacheResponseForSeconds <= 0 || maxSize <= 0;
              path = requestParams.path, queryParams = requestParams.queryParams, body = requestParams.body, headers = requestParams.headers, streamConfig = requestParams.streamConfig, abortSignal = requestParams.abortSignal, responseType = requestParams.responseType, isStreamingRequest = requestParams.isStreamingRequest;
              if (!isCacheDisabled) {
                _context.next = 1;
                break;
              }
              return _context.abrupt("return", this.executeRequest(requestContext, methodName, path, queryParams, body, headers, {
                abortSignal: abortSignal,
                responseType: responseType,
                streamConfig: streamConfig,
                isStreamingRequest: isStreamingRequest
              }));
            case 1:
              requestParamsJSON = JSON.stringify(requestParams);
              cacheEntry = this.responseCache.get(requestParamsJSON);
              now = Date.now();
              if (!cacheEntry) {
                _context.next = 3;
                break;
              }
              isEntryValid = now - cacheEntry.requestTimestamp < cacheResponseForSeconds * 1000;
              if (!isEntryValid) {
                _context.next = 2;
                break;
              }
              this.responseCache.delete(requestParamsJSON);
              this.responseCache.set(requestParamsJSON, cacheEntry);
              return _context.abrupt("return", cacheEntry.response);
            case 2:
              this.responseCache.delete(requestParamsJSON);
            case 3:
              cachePromiseEntry = this.responsePromiseCache.get(requestParamsJSON);
              if (!cachePromiseEntry) {
                _context.next = 5;
                break;
              }
              _isEntryValid = now - cachePromiseEntry.requestTimestamp < cacheResponseForSeconds * 1000;
              if (!_isEntryValid) {
                _context.next = 4;
                break;
              }
              this.responsePromiseCache.delete(requestParamsJSON);
              this.responsePromiseCache.set(requestParamsJSON, cachePromiseEntry);
              return _context.abrupt("return", cachePromiseEntry.responsePromise);
            case 4:
              this.responsePromiseCache.delete(requestParamsJSON);
            case 5:
              responsePromise = this.executeRequest(requestContext, methodName, path, queryParams, body, headers, {
                abortSignal: abortSignal,
                responseType: responseType,
                streamConfig: streamConfig,
                isStreamingRequest: isStreamingRequest
              });
              this.responsePromiseCache.set(requestParamsJSON, {
                requestTimestamp: now,
                responsePromise: responsePromise
              });
              _context.next = 6;
              return responsePromise;
            case 6:
              response = _context.sent;
              this.responseCache.set(requestParamsJSON, {
                requestTimestamp: now,
                response: response
              });
              isCacheOverMaxSize = this.responseCache.size > maxSize;
              if (isCacheOverMaxSize) {
                oldestEntry = this.responseCache.keys().next().value;
                if (oldestEntry) {
                  this.responseCache.delete(oldestEntry);
                }
              }
              isResponsePromiseCacheOverMaxSize = this.responsePromiseCache.size > maxSize;
              if (isResponsePromiseCacheOverMaxSize) {
                _oldestEntry = this.responsePromiseCache.keys().next().value;
                if (_oldestEntry) {
                  this.responsePromiseCache.delete(_oldestEntry);
                }
              }
              return _context.abrupt("return", response);
            case 7:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function perform(_x, _x2, _x3, _x4) {
        return _perform.apply(this, arguments);
      }
      return perform;
    }()
  }, {
    key: "executeRequest",
    value: function executeRequest(context, methodName, path) {
      var queryParams = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var body = arguments.length > 4 ? arguments[4] : undefined;
      var headers = arguments.length > 5 ? arguments[5] : undefined;
      var options = arguments.length > 6 ? arguments[6] : undefined;
      var method = context[methodName];
      switch (methodName) {
        case "get":
          return method.call(context, path, queryParams, {
            abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
            responseType: options === null || options === void 0 ? void 0 : options.responseType,
            streamConfig: options === null || options === void 0 ? void 0 : options.streamConfig,
            isStreamingRequest: options === null || options === void 0 ? void 0 : options.isStreamingRequest
          });
        case "delete":
          return method.call(context, path, queryParams);
        case "post":
          return method.call(context, path, body, queryParams, headers || {}, {
            abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal,
            responseType: options === null || options === void 0 ? void 0 : options.responseType,
            streamConfig: options === null || options === void 0 ? void 0 : options.streamConfig,
            isStreamingRequest: options === null || options === void 0 ? void 0 : options.isStreamingRequest
          });
        case "put":
        case "patch":
          return method.call(context, path, body, queryParams);
        default:
          throw new Error("Unsupported method: ".concat(String(methodName)));
      }
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/SearchClient.ts"
/*!***************************************!*\
  !*** ./src/Typesense/SearchClient.ts ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SearchClient)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _Configuration__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Configuration */ "./src/Typesense/Configuration.ts");
/* harmony import */ var _ApiCall__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ApiCall */ "./src/Typesense/ApiCall.ts");
/* harmony import */ var _MultiSearch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./MultiSearch */ "./src/Typesense/MultiSearch.ts");
/* harmony import */ var _SearchOnlyCollection__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SearchOnlyCollection */ "./src/Typesense/SearchOnlyCollection.ts");







var SearchClient = /*#__PURE__*/function () {
  function SearchClient(options) {
    var _options$sendApiKeyAs;
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, SearchClient);
    options.sendApiKeyAsQueryParam = (_options$sendApiKeyAs = options.sendApiKeyAsQueryParam) !== null && _options$sendApiKeyAs !== void 0 ? _options$sendApiKeyAs : true;
    if (options.sendApiKeyAsQueryParam === true && (options.apiKey || "").length > 2000) {
      console.warn("[typesense] API Key is longer than 2000 characters which is over the allowed limit, so disabling sending it as a query parameter.");
      options.sendApiKeyAsQueryParam = false;
    }
    this.configuration = new _Configuration__WEBPACK_IMPORTED_MODULE_3__["default"](options);
    this.apiCall = new _ApiCall__WEBPACK_IMPORTED_MODULE_4__["default"](this.configuration);
    this.multiSearch = new _MultiSearch__WEBPACK_IMPORTED_MODULE_5__["default"](this.apiCall, this.configuration, true);
    this.individualCollections = {};
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(SearchClient, [{
    key: "clearCache",
    value: function clearCache() {
      this.multiSearch.clearCache();

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(this.individualCollections).forEach(function (_ref) {
        var _ref2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, 2),
          _ = _ref2[0],
          collection = _ref2[1];
        collection.documents().clearCache();
      });
    }
  }, {
    key: "collections",
    value: function collections(collectionName) {
      if (!collectionName) {
        throw new Error("Typesense.SearchClient only supports search operations, so the collectionName that needs to " + "be searched must be specified. Use Typesense.Client if you need to access the collection object.");
      } else {
        if (this.individualCollections[collectionName] === undefined) {
          this.individualCollections[collectionName] = new _SearchOnlyCollection__WEBPACK_IMPORTED_MODULE_6__.SearchOnlyCollection(collectionName, this.apiCall, this.configuration);
        }
        return this.individualCollections[collectionName];
      }
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/SearchOnlyCollection.ts"
/*!***********************************************!*\
  !*** ./src/Typesense/SearchOnlyCollection.ts ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchOnlyCollection: () => (/* binding */ SearchOnlyCollection)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _SearchOnlyDocuments__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SearchOnlyDocuments */ "./src/Typesense/SearchOnlyDocuments.ts");



var SearchOnlyCollection = /*#__PURE__*/function () {
  function SearchOnlyCollection(name, apiCall, configuration) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, SearchOnlyCollection);
    this.name = name;
    this.apiCall = apiCall;
    this.configuration = configuration;
    this._documents = new _SearchOnlyDocuments__WEBPACK_IMPORTED_MODULE_2__.SearchOnlyDocuments(this.name, this.apiCall, this.configuration);
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(SearchOnlyCollection, [{
    key: "documents",
    value: function documents() {
      return this._documents;
    }
  }]);
}();

/***/ },

/***/ "./src/Typesense/SearchOnlyDocuments.ts"
/*!**********************************************!*\
  !*** ./src/Typesense/SearchOnlyDocuments.ts ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SearchOnlyDocuments: () => (/* binding */ SearchOnlyDocuments)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _RequestWithCache__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./RequestWithCache */ "./src/Typesense/RequestWithCache.ts");
/* harmony import */ var _Collections__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Collections */ "./src/Typesense/Collections.ts");
/* harmony import */ var _Utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Utils */ "./src/Typesense/Utils.ts");





var _excluded = ["streamConfig"];

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }



var RESOURCEPATH = "/documents";
var SearchOnlyDocuments = /*#__PURE__*/function () {
  function SearchOnlyDocuments(collectionName, apiCall, configuration) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, SearchOnlyDocuments);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_4__["default"])(this, "requestWithCache", new _RequestWithCache__WEBPACK_IMPORTED_MODULE_6__["default"]());
    this.collectionName = collectionName;
    this.apiCall = apiCall;
    this.configuration = configuration;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(SearchOnlyDocuments, [{
    key: "clearCache",
    value: function clearCache() {
      this.requestWithCache.clearCache();
    }
  }, {
    key: "search",
    value: function () {
      var _search = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5___default().mark(function _callee(searchParameters) {
        var _ref,
          _ref$cacheSearchResul,
          cacheSearchResultsForSeconds,
          _ref$abortSignal,
          abortSignal,
          additionalQueryParams,
          _normalizeArrayablePa,
          streamConfig,
          rest,
          queryParams,
          isStreamingRequest,
          _args = arguments;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_5___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _ref = _args.length > 1 && _args[1] !== undefined ? _args[1] : {}, _ref$cacheSearchResul = _ref.cacheSearchResultsForSeconds, cacheSearchResultsForSeconds = _ref$cacheSearchResul === void 0 ? this.configuration.cacheSearchResultsForSeconds : _ref$cacheSearchResul, _ref$abortSignal = _ref.abortSignal, abortSignal = _ref$abortSignal === void 0 ? null : _ref$abortSignal;
              additionalQueryParams = {};
              if (this.configuration.useServerSideSearchCache === true) {
                additionalQueryParams["use_cache"] = true;
              }
              _normalizeArrayablePa = (0,_Utils__WEBPACK_IMPORTED_MODULE_8__.normalizeArrayableParams)(searchParameters), streamConfig = _normalizeArrayablePa.streamConfig, rest = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_0__["default"])(_normalizeArrayablePa, _excluded);
              queryParams = _objectSpread(_objectSpread({}, additionalQueryParams), rest);
              isStreamingRequest = queryParams.conversation_stream === true;
              return _context.abrupt("return", this.requestWithCache.perform(this.apiCall, "get", {
                path: this.endpointPath("search"),
                queryParams: queryParams,
                streamConfig: streamConfig,
                abortSignal: abortSignal,
                isStreamingRequest: isStreamingRequest
              }, {
                cacheResponseForSeconds: cacheSearchResultsForSeconds
              }));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function search(_x) {
        return _search.apply(this, arguments);
      }
      return search;
    }()
  }, {
    key: "endpointPath",
    value: function endpointPath(operation) {
      return "".concat(_Collections__WEBPACK_IMPORTED_MODULE_7__["default"].RESOURCEPATH, "/").concat(encodeURIComponent(this.collectionName)).concat(RESOURCEPATH).concat(operation === undefined ? "" : "/" + operation);
    }
  }], [{
    key: "RESOURCEPATH",
    get: function get() {
      return RESOURCEPATH;
    }
  }]);
}();

/***/ },

/***/ "./src/Typesense/Stats.ts"
/*!********************************!*\
  !*** ./src/Typesense/Stats.ts ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Metrics)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);




var RESOURCEPATH = "/stats.json";
var Metrics = /*#__PURE__*/function () {
  function Metrics(apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Metrics);
    this.apiCall = apiCall;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Metrics, [{
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.apiCall.get(RESOURCEPATH));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function retrieve() {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }]);
}();


/***/ },

/***/ "./src/Typesense/Stemming.ts"
/*!***********************************!*\
  !*** ./src/Typesense/Stemming.ts ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Stemming)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _StemmingDictionaries__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./StemmingDictionaries */ "./src/Typesense/StemmingDictionaries.ts");
/* harmony import */ var _StemmingDictionary__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./StemmingDictionary */ "./src/Typesense/StemmingDictionary.ts");





var RESOURCEPATH = "/stemming";
var Stemming = /*#__PURE__*/function () {
  function Stemming(apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Stemming);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(this, "individualStemmingDictionaries", {});
    this.apiCall = apiCall;
    this.apiCall = apiCall;
    this._stemmingDictionaries = new _StemmingDictionaries__WEBPACK_IMPORTED_MODULE_3__["default"](this.apiCall);
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Stemming, [{
    key: "dictionaries",
    value: function dictionaries(id) {
      if (id === undefined) {
        return this._stemmingDictionaries;
      } else {
        if (this.individualStemmingDictionaries[id] === undefined) {
          this.individualStemmingDictionaries[id] = new _StemmingDictionary__WEBPACK_IMPORTED_MODULE_4__["default"](id, this.apiCall);
        }
        return this.individualStemmingDictionaries[id];
      }
    }
  }], [{
    key: "RESOURCEPATH",
    get: function get() {
      return RESOURCEPATH;
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/StemmingDictionaries.ts"
/*!***********************************************!*\
  !*** ./src/Typesense/StemmingDictionaries.ts ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StemmingDictionaries)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);




var RESOURCEPATH = "/stemming/dictionaries";
var StemmingDictionaries = /*#__PURE__*/function () {
  function StemmingDictionaries(apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, StemmingDictionaries);
    this.apiCall = apiCall;
    this.apiCall = apiCall;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(StemmingDictionaries, [{
    key: "upsert",
    value: function () {
      var _upsert = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee(id, wordRootCombinations) {
        var wordRootCombinationsInJSONLFormat, resultsInJSONLFormat;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              wordRootCombinationsInJSONLFormat = Array.isArray(wordRootCombinations) ? wordRootCombinations.map(function (combo) {
                return JSON.stringify(combo);
              }).join("\n") : wordRootCombinations;
              _context.next = 1;
              return this.apiCall.performRequest("post", this.endpointPath("import"), {
                queryParameters: {
                  id: id
                },
                bodyParameters: wordRootCombinationsInJSONLFormat,
                additionalHeaders: {
                  "Content-Type": "text/plain"
                },
                skipConnectionTimeout: true
              });
            case 1:
              resultsInJSONLFormat = _context.sent;
              return _context.abrupt("return", Array.isArray(wordRootCombinations) ? resultsInJSONLFormat.split("\n").map(function (line) {
                return JSON.parse(line);
              }) : resultsInJSONLFormat);
            case 2:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function upsert(_x, _x2) {
        return _upsert.apply(this, arguments);
      }
      return upsert;
    }()
  }, {
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this.apiCall.get(this.endpointPath()));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function retrieve() {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }, {
    key: "endpointPath",
    value: function endpointPath(operation) {
      return operation === undefined ? "".concat(StemmingDictionaries.RESOURCEPATH) : "".concat(StemmingDictionaries.RESOURCEPATH, "/").concat(encodeURIComponent(operation));
    }
  }], [{
    key: "RESOURCEPATH",
    get: function get() {
      return RESOURCEPATH;
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/StemmingDictionary.ts"
/*!*********************************************!*\
  !*** ./src/Typesense/StemmingDictionary.ts ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StemmingDictionary)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _StemmingDictionaries__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./StemmingDictionaries */ "./src/Typesense/StemmingDictionaries.ts");





var StemmingDictionary = /*#__PURE__*/function () {
  function StemmingDictionary(id, apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, StemmingDictionary);
    this.id = id;
    this.apiCall = apiCall;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(StemmingDictionary, [{
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.apiCall.get(this.endpointPath()));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function retrieve() {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this.apiCall.delete(this.endpointPath()));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function _delete() {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
  }, {
    key: "endpointPath",
    value: function endpointPath() {
      return "".concat(_StemmingDictionaries__WEBPACK_IMPORTED_MODULE_4__["default"].RESOURCEPATH, "/").concat(encodeURIComponent(this.id));
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/Stopword.ts"
/*!***********************************!*\
  !*** ./src/Typesense/Stopword.ts ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Stopword)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _Stopwords__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Stopwords */ "./src/Typesense/Stopwords.ts");





var Stopword = /*#__PURE__*/function () {
  function Stopword(stopwordId, apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Stopword);
    this.stopwordId = stopwordId;
    this.apiCall = apiCall;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Stopword, [{
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.apiCall.get(this.endpointPath()));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function retrieve() {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this.apiCall.delete(this.endpointPath()));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function _delete() {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
  }, {
    key: "endpointPath",
    value: function endpointPath() {
      return "".concat(_Stopwords__WEBPACK_IMPORTED_MODULE_4__["default"].RESOURCEPATH, "/").concat(encodeURIComponent(this.stopwordId));
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/Stopwords.ts"
/*!************************************!*\
  !*** ./src/Typesense/Stopwords.ts ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Stopwords)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);




var RESOURCEPATH = "/stopwords";
var Stopwords = /*#__PURE__*/function () {
  function Stopwords(apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Stopwords);
    this.apiCall = apiCall;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Stopwords, [{
    key: "upsert",
    value: function () {
      var _upsert = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee(stopwordId, params) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.apiCall.put(this.endpointPath(stopwordId), params));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function upsert(_x, _x2) {
        return _upsert.apply(this, arguments);
      }
      return upsert;
    }()
  }, {
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this.apiCall.get(this.endpointPath()));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function retrieve() {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }, {
    key: "endpointPath",
    value: function endpointPath(operation) {
      return "".concat(Stopwords.RESOURCEPATH).concat(operation === undefined ? "" : "/" + encodeURIComponent(operation));
    }
  }], [{
    key: "RESOURCEPATH",
    get: function get() {
      return RESOURCEPATH;
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/Synonym.ts"
/*!**********************************!*\
  !*** ./src/Typesense/Synonym.ts ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Synonym)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Collections__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Collections */ "./src/Typesense/Collections.ts");
/* harmony import */ var _Synonyms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Synonyms */ "./src/Typesense/Synonyms.ts");







/**
 * @deprecated Deprecated starting with Typesense Server v30. Please migrate to `client.synonymSets` (new Synonym Sets APIs).
 */
var Synonym = /*#__PURE__*/function () {
  function Synonym(collectionName, synonymId, apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Synonym);
    this.collectionName = collectionName;
    this.synonymId = synonymId;
    this.apiCall = apiCall;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Synonym, [{
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.apiCall.get(this.endpointPath()));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function retrieve() {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this.apiCall.delete(this.endpointPath()));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function _delete() {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
  }, {
    key: "endpointPath",
    value: function endpointPath() {
      if (!Synonym.hasWarnedDeprecation) {
        // eslint-disable-next-line no-console
        console.warn("[typesense] 'synonym' APIs are deprecated starting with Typesense Server v30. Please migrate to synonym sets 'synonym_sets'.");
        Synonym.hasWarnedDeprecation = true;
      }
      return "".concat(_Collections__WEBPACK_IMPORTED_MODULE_5__["default"].RESOURCEPATH, "/").concat(encodeURIComponent(this.collectionName)).concat(_Synonyms__WEBPACK_IMPORTED_MODULE_6__["default"].RESOURCEPATH, "/").concat(encodeURIComponent(this.synonymId));
    }
  }]);
}();
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__["default"])(Synonym, "hasWarnedDeprecation", false);


/***/ },

/***/ "./src/Typesense/SynonymSet.ts"
/*!*************************************!*\
  !*** ./src/Typesense/SynonymSet.ts ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SynonymSet)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _SynonymSets__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SynonymSets */ "./src/Typesense/SynonymSets.ts");
/* harmony import */ var _SynonymSetItems__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SynonymSetItems */ "./src/Typesense/SynonymSetItems.ts");
/* harmony import */ var _SynonymSetItem__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SynonymSetItem */ "./src/Typesense/SynonymSetItem.ts");








var SynonymSet = /*#__PURE__*/function () {
  function SynonymSet(synonymSetName, apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, SynonymSet);
    (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__["default"])(this, "individualItems", {});
    this.synonymSetName = synonymSetName;
    this.apiCall = apiCall;
    this._items = new _SynonymSetItems__WEBPACK_IMPORTED_MODULE_6__["default"](this.synonymSetName, apiCall);
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(SynonymSet, [{
    key: "upsert",
    value: function () {
      var _upsert = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().mark(function _callee(params) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.apiCall.put(this.endpointPath(), params));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function upsert(_x) {
        return _upsert.apply(this, arguments);
      }
      return upsert;
    }()
  }, {
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this.apiCall.get(this.endpointPath()));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function retrieve() {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().mark(function _callee3() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().wrap(function (_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              return _context3.abrupt("return", this.apiCall.delete(this.endpointPath()));
            case 1:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function _delete() {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
  }, {
    key: "items",
    value: function items(itemId) {
      if (itemId === undefined) {
        return this._items;
      } else {
        if (this.individualItems[itemId] === undefined) {
          this.individualItems[itemId] = new _SynonymSetItem__WEBPACK_IMPORTED_MODULE_7__["default"](this.synonymSetName, itemId, this.apiCall);
        }
        return this.individualItems[itemId];
      }
    }
  }, {
    key: "endpointPath",
    value: function endpointPath() {
      return "".concat(_SynonymSets__WEBPACK_IMPORTED_MODULE_5__["default"].RESOURCEPATH, "/").concat(encodeURIComponent(this.synonymSetName));
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/SynonymSetItem.ts"
/*!*****************************************!*\
  !*** ./src/Typesense/SynonymSetItem.ts ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SynonymSetItem)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _SynonymSets__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SynonymSets */ "./src/Typesense/SynonymSets.ts");





var SynonymSetItem = /*#__PURE__*/function () {
  function SynonymSetItem(synonymSetName, itemId, apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, SynonymSetItem);
    this.synonymSetName = synonymSetName;
    this.itemId = itemId;
    this.apiCall = apiCall;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(SynonymSetItem, [{
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.apiCall.get(this.endpointPath()));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function retrieve() {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this.apiCall.delete(this.endpointPath()));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function _delete() {
        return _delete2.apply(this, arguments);
      }
      return _delete;
    }()
  }, {
    key: "endpointPath",
    value: function endpointPath() {
      return "".concat(_SynonymSets__WEBPACK_IMPORTED_MODULE_4__["default"].RESOURCEPATH, "/").concat(encodeURIComponent(this.synonymSetName), "/items/").concat(encodeURIComponent(this.itemId));
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/SynonymSetItems.ts"
/*!******************************************!*\
  !*** ./src/Typesense/SynonymSetItems.ts ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SynonymSetItems)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _SynonymSets__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SynonymSets */ "./src/Typesense/SynonymSets.ts");





var SynonymSetItems = /*#__PURE__*/function () {
  function SynonymSetItems(synonymSetName, apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, SynonymSetItems);
    this.synonymSetName = synonymSetName;
    this.apiCall = apiCall;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(SynonymSetItems, [{
    key: "upsert",
    value: function () {
      var _upsert = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee(itemId, params) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.apiCall.put(this.endpointPath(itemId), params));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function upsert(_x, _x2) {
        return _upsert.apply(this, arguments);
      }
      return upsert;
    }()
  }, {
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_3___default().wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this.apiCall.get(this.endpointPath()));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function retrieve() {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }, {
    key: "endpointPath",
    value: function endpointPath(operation) {
      return "".concat(_SynonymSets__WEBPACK_IMPORTED_MODULE_4__["default"].RESOURCEPATH, "/").concat(encodeURIComponent(this.synonymSetName), "/items").concat(operation === undefined ? "" : "/" + encodeURIComponent(operation));
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/SynonymSets.ts"
/*!**************************************!*\
  !*** ./src/Typesense/SynonymSets.ts ***!
  \**************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SynonymSets)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__);





var SynonymSets = /*#__PURE__*/function () {
  function SynonymSets(apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, SynonymSets);
    this.apiCall = apiCall;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(SynonymSets, [{
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().mark(function _callee() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.apiCall.get(SynonymSets.RESOURCEPATH));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function retrieve() {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }]);
}();
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__["default"])(SynonymSets, "RESOURCEPATH", "/synonym_sets");


/***/ },

/***/ "./src/Typesense/Synonyms.ts"
/*!***********************************!*\
  !*** ./src/Typesense/Synonyms.ts ***!
  \***********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Synonyms)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Collections__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Collections */ "./src/Typesense/Collections.ts");






var RESOURCEPATH = "/synonyms";
/**
 * @deprecated Deprecated starting with Typesense Server v30. Please migrate to `client.synonymSets` (new Synonym Sets APIs).
 */
var Synonyms = /*#__PURE__*/function () {
  function Synonyms(collectionName, apiCall) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Synonyms);
    this.collectionName = collectionName;
    this.apiCall = apiCall;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Synonyms, [{
    key: "upsert",
    value: function () {
      var _upsert = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().mark(function _callee(synonymId, params) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", this.apiCall.put(this.endpointPath(synonymId), params));
            case 1:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function upsert(_x, _x2) {
        return _upsert.apply(this, arguments);
      }
      return upsert;
    }()
  }, {
    key: "retrieve",
    value: function () {
      var _retrieve = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().mark(function _callee2() {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_4___default().wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", this.apiCall.get(this.endpointPath()));
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function retrieve() {
        return _retrieve.apply(this, arguments);
      }
      return retrieve;
    }()
  }, {
    key: "endpointPath",
    value: function endpointPath(operation) {
      if (!Synonyms.hasWarnedDeprecation) {
        // eslint-disable-next-line no-console
        console.warn("[typesense] 'synonyms' APIs are deprecated starting with Typesense Server v30. Please migrate to synonym sets ('synonym_sets').");
        Synonyms.hasWarnedDeprecation = true;
      }
      return "".concat(_Collections__WEBPACK_IMPORTED_MODULE_5__["default"].RESOURCEPATH, "/").concat(encodeURIComponent(this.collectionName)).concat(Synonyms.RESOURCEPATH).concat(operation === undefined ? "" : "/" + encodeURIComponent(operation));
    }
  }], [{
    key: "RESOURCEPATH",
    get: function get() {
      return RESOURCEPATH;
    }
  }]);
}();
(0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_3__["default"])(Synonyms, "hasWarnedDeprecation", false);


/***/ },

/***/ "./src/Typesense/Transport.ts"
/*!************************************!*\
  !*** ./src/Typesense/Transport.ts ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FetchTransportError: () => (/* binding */ FetchTransportError),
/* harmony export */   "default": () => (/* binding */ FetchTransport)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @babel/runtime/helpers/wrapNativeSuper */ "./node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10__);










function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }

function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_2__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _callSuper(t, o, e) { return o = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__["default"])(o), (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__["default"])(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__["default"])(t).constructor) : o.apply(t, e)); }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
var FetchTransportError = /*#__PURE__*/function (_Error) {
  function FetchTransportError(type, message) {
    var _this;
    var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      request = _ref.request,
      response = _ref.response,
      originalError = _ref.originalError;
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5__["default"])(this, FetchTransportError);
    _this = _callSuper(this, FetchTransportError, [message]);
    _this.name = "FetchTransportError";
    _this.type = type;
    _this.request = request;
    _this.response = response;
    _this.originalError = originalError;
    return _this;
  }
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_8__["default"])(FetchTransportError, _Error);
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(FetchTransportError);
}(/*#__PURE__*/(0,_babel_runtime_helpers_wrapNativeSuper__WEBPACK_IMPORTED_MODULE_9__["default"])(Error));
var isNodeJSEnvironment = typeof process !== "undefined" && process.versions != null && process.versions.node != null && typeof window === "undefined";
var FetchTransport = /*#__PURE__*/function () {
  function FetchTransport(options) {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_5__["default"])(this, FetchTransport);
    this.options = options;
  }
  return (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_4__["default"])(FetchTransport, [{
    key: "perform",
    value: function () {
      var _perform = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default().mark(function _callee(request, requestOptions) {
        var mutableRequest, abortController, abortType, timeoutHandle, abortListener, callerAbortSignal, fetchFn, url, body, init, rawResponse, _response, type, message, transportError, _t;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default().wrap(function (_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              mutableRequest = _objectSpread(_objectSpread({}, request), {}, {
                headers: _objectSpread({}, request.headers),
                queryParameters: _objectSpread({}, request.queryParameters)
              });
              _context.next = 1;
              return this.runRequestHooks(mutableRequest, requestOptions);
            case 1:
              abortController = new AbortController();
              callerAbortSignal = requestOptions.abortSignal;
              if (!(callerAbortSignal !== null && callerAbortSignal !== void 0 && callerAbortSignal.aborted)) {
                _context.next = 2;
                break;
              }
              throw new FetchTransportError("abort", "Request aborted by caller.", {
                request: mutableRequest
              });
            case 2:
              if (callerAbortSignal) {
                abortListener = function abortListener() {
                  abortType = "caller";
                  abortController.abort();
                };
                callerAbortSignal.addEventListener("abort", abortListener);
              }
              if (requestOptions.skipConnectionTimeout !== true) {
                timeoutHandle = setTimeout(function () {
                  abortType = "timeout";
                  abortController.abort();
                }, this.options.connectionTimeoutSeconds * 1000);
              }
              _context.prev = 3;
              fetchFn = this.fetchFn();
              url = this.urlWithQueryParameters(mutableRequest.url, mutableRequest.queryParameters);
              body = this.serializedBody(mutableRequest);
              mutableRequest.url = url;
              mutableRequest.body = body;
              init = {
                method: mutableRequest.method.toUpperCase(),
                headers: mutableRequest.headers,
                signal: abortController.signal
              };
              if (body !== undefined) {
                init.body = body;
                if (isNodeJSEnvironment) {
                  init.duplex = "half";
                }
              }
              if (this.options.dispatcher !== undefined) {
                init.dispatcher = this.options.dispatcher;
              }
              _context.next = 4;
              return fetchFn(url, init);
            case 4:
              rawResponse = _context.sent;
              _context.next = 5;
              return this.normalizedResponse(rawResponse, mutableRequest);
            case 5:
              _response = _context.sent;
              _context.next = 6;
              return this.runResponseHooks(_response, requestOptions);
            case 6:
              return _context.abrupt("return", _response);
            case 7:
              _context.prev = 7;
              _t = _context["catch"](3);
              if (!(_t instanceof FetchTransportError)) {
                _context.next = 9;
                break;
              }
              _context.next = 8;
              return this.runErrorHooks(_t, _t.type, requestOptions);
            case 8:
              throw _t;
            case 9:
              type = abortType === "caller" ? "abort" : abortType === "timeout" ? "timeout" : "network";
              message = type === "abort" ? "Request aborted by caller." : type === "timeout" ? "Request timed out after ".concat(this.options.connectionTimeoutSeconds, " seconds.") : _t instanceof Error ? _t.message : String(_t);
              transportError = new FetchTransportError(type, message, {
                request: mutableRequest,
                originalError: _t
              });
              _context.next = 10;
              return this.runErrorHooks(transportError, type, requestOptions);
            case 10:
              throw transportError;
            case 11:
              _context.prev = 11;
              if (timeoutHandle !== undefined) {
                clearTimeout(timeoutHandle);
              }
              if (callerAbortSignal && abortListener) {
                callerAbortSignal.removeEventListener("abort", abortListener);
              }
              return _context.finish(11);
            case 12:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[3, 7, 11, 12]]);
      }));
      function perform(_x, _x2) {
        return _perform.apply(this, arguments);
      }
      return perform;
    }()
  }, {
    key: "notifyError",
    value: function () {
      var _notifyError = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default().mark(function _callee2(error, type, requestOptions, response) {
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default().wrap(function (_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 1;
              return this.runErrorHooks(error, type, requestOptions, response);
            case 1:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function notifyError(_x3, _x4, _x5, _x6) {
        return _notifyError.apply(this, arguments);
      }
      return notifyError;
    }()
  }, {
    key: "fetchFn",
    value: function fetchFn() {
      if (this.options.fetch) {
        return this.options.fetch;
      }
      if (typeof globalThis.fetch !== "function") {
        throw new FetchTransportError("network", "No fetch implementation is available. Pass a custom fetch implementation in ConfigurationOptions.fetch.");
      }
      return globalThis.fetch.bind(globalThis);
    }
  }, {
    key: "normalizedResponse",
    value: function () {
      var _normalizedResponse = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default().mark(function _callee3(response, request) {
        var headers, responseType, data, _t2;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default().wrap(function (_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              headers = this.headersToObject(response.headers);
              responseType = request.isStreamingRequest ? "stream" : request.responseType;
              _context3.prev = 1;
              _context3.next = 2;
              return this.responseData(response, responseType);
            case 2:
              data = _context3.sent;
              return _context3.abrupt("return", {
                status: response.status,
                headers: headers,
                data: data,
                body: response.body,
                request: request,
                responseType: responseType
              });
            case 3:
              _context3.prev = 3;
              _t2 = _context3["catch"](1);
              throw new FetchTransportError("parse", "Failed to parse response body.", {
                request: request,
                originalError: _t2
              });
            case 4:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[1, 3]]);
      }));
      function normalizedResponse(_x7, _x8) {
        return _normalizedResponse.apply(this, arguments);
      }
      return normalizedResponse;
    }()
  }, {
    key: "responseData",
    value: function () {
      var _responseData = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default().mark(function _callee4(response, responseType) {
        var contentType, text;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default().wrap(function (_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              if (!(responseType === "stream")) {
                _context4.next = 1;
                break;
              }
              return _context4.abrupt("return", response.body);
            case 1:
              if (!(responseType === "arraybuffer")) {
                _context4.next = 2;
                break;
              }
              return _context4.abrupt("return", response.arrayBuffer());
            case 2:
              if (!(responseType === "blob")) {
                _context4.next = 3;
                break;
              }
              return _context4.abrupt("return", response.blob());
            case 3:
              contentType = response.headers.get("content-type") || "";
              _context4.next = 4;
              return response.text();
            case 4:
              text = _context4.sent;
              if (!(text === "")) {
                _context4.next = 5;
                break;
              }
              return _context4.abrupt("return", "");
            case 5:
              if (!(responseType === "json" || contentType.toLowerCase().startsWith("application/json"))) {
                _context4.next = 6;
                break;
              }
              return _context4.abrupt("return", JSON.parse(text));
            case 6:
              return _context4.abrupt("return", text);
            case 7:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      function responseData(_x9, _x0) {
        return _responseData.apply(this, arguments);
      }
      return responseData;
    }()
  }, {
    key: "urlWithQueryParameters",
    value: function urlWithQueryParameters(url, queryParameters) {
      if (Object.keys(queryParameters).length === 0) {
        return url;
      }
      var serializedQueryParameters = this.serializeQueryParameters(queryParameters);
      if (serializedQueryParameters === "") {
        return url;
      }
      var separator = url.includes("?") ? "&" : "?";
      return "".concat(url).concat(separator).concat(serializedQueryParameters);
    }
  }, {
    key: "serializeQueryParameters",
    value: function serializeQueryParameters(queryParameters) {
      var serializer = this.options.paramsSerializer;
      if (typeof serializer === "function") {
        return serializer(queryParameters);
      }
      if (serializer && typeof serializer.serialize === "function") {
        return serializer.serialize(queryParameters);
      }
      var urlSearchParams = new URLSearchParams();
      Object.entries(queryParameters).forEach(function (_ref2) {
        var _ref3 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__["default"])(_ref2, 2),
          key = _ref3[0],
          value = _ref3[1];
        if (value === undefined || value === null) {
          return;
        }
        if (Array.isArray(value)) {
          value.forEach(function (entry) {
            if (entry !== undefined && entry !== null) {
              urlSearchParams.append(key, String(entry));
            }
          });
          return;
        }
        urlSearchParams.append(key, String(value));
      });
      return urlSearchParams.toString();
    }
  }, {
    key: "serializedBody",
    value: function serializedBody(request) {
      var body = request.body !== undefined ? request.body : request.bodyParameters;
      if (body === undefined || body === null) {
        return undefined;
      }
      if (typeof body === "string") {
        return body.length === 0 ? undefined : body;
      }
      if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(body) === "object" && this.isPlainEmptyObject(body)) {
        return undefined;
      }
      if (this.shouldSerializeAsJSON(request.headers, body)) {
        return JSON.stringify(body);
      }
      return body;
    }
  }, {
    key: "shouldSerializeAsJSON",
    value: function shouldSerializeAsJSON(_headers, body) {
      if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(body) !== "object" || body === null) {
        return false;
      }
      if (this.isBodyInit(body)) {
        return false;
      }
      return true;
    }
  }, {
    key: "isBodyInit",
    value: function isBodyInit(body) {
      return typeof ArrayBuffer !== "undefined" && body instanceof ArrayBuffer || typeof Blob !== "undefined" && body instanceof Blob || typeof FormData !== "undefined" && body instanceof FormData || typeof URLSearchParams !== "undefined" && body instanceof URLSearchParams || typeof ReadableStream !== "undefined" && body instanceof ReadableStream || "pipe" in body && typeof body["pipe"] === "function";
    }
  }, {
    key: "isPlainEmptyObject",
    value: function isPlainEmptyObject(body) {
      return Object.prototype.toString.call(body) === "[object Object]" && Object.keys(body).length === 0;
    }
  }, {
    key: "headersToObject",
    value: function headersToObject(headers) {
      var result = {};
      headers.forEach(function (value, key) {
        result[key] = value;
      });
      return result;
    }
  }, {
    key: "runRequestHooks",
    value: function () {
      var _runRequestHooks = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default().mark(function _callee5(request, requestOptions) {
        var _iterator, _step, hook, _t3;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default().wrap(function (_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _iterator = _createForOfIteratorHelper(this.options.requestHooks || []);
              _context5.prev = 1;
              _iterator.s();
            case 2:
              if ((_step = _iterator.n()).done) {
                _context5.next = 4;
                break;
              }
              hook = _step.value;
              _context5.next = 3;
              return hook(request, this.hookContext(requestOptions));
            case 3:
              _context5.next = 2;
              break;
            case 4:
              _context5.next = 6;
              break;
            case 5:
              _context5.prev = 5;
              _t3 = _context5["catch"](1);
              _iterator.e(_t3);
            case 6:
              _context5.prev = 6;
              _iterator.f();
              return _context5.finish(6);
            case 7:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this, [[1, 5, 6, 7]]);
      }));
      function runRequestHooks(_x1, _x10) {
        return _runRequestHooks.apply(this, arguments);
      }
      return runRequestHooks;
    }()
  }, {
    key: "runResponseHooks",
    value: function () {
      var _runResponseHooks = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default().mark(function _callee6(response, requestOptions) {
        var _iterator2, _step2, hook, _t4;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default().wrap(function (_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _iterator2 = _createForOfIteratorHelper(this.options.responseHooks || []);
              _context6.prev = 1;
              _iterator2.s();
            case 2:
              if ((_step2 = _iterator2.n()).done) {
                _context6.next = 4;
                break;
              }
              hook = _step2.value;
              _context6.next = 3;
              return hook(response, this.hookContext(requestOptions));
            case 3:
              _context6.next = 2;
              break;
            case 4:
              _context6.next = 6;
              break;
            case 5:
              _context6.prev = 5;
              _t4 = _context6["catch"](1);
              _iterator2.e(_t4);
            case 6:
              _context6.prev = 6;
              _iterator2.f();
              return _context6.finish(6);
            case 7:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this, [[1, 5, 6, 7]]);
      }));
      function runResponseHooks(_x11, _x12) {
        return _runResponseHooks.apply(this, arguments);
      }
      return runResponseHooks;
    }()
  }, {
    key: "runErrorHooks",
    value: function () {
      var _runErrorHooks = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_3__["default"])(/*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default().mark(function _callee7(error, errorType, requestOptions, response) {
        var _iterator3, _step3, hook, _t5;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_10___default().wrap(function (_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _iterator3 = _createForOfIteratorHelper(this.options.errorHooks || []);
              _context7.prev = 1;
              _iterator3.s();
            case 2:
              if ((_step3 = _iterator3.n()).done) {
                _context7.next = 4;
                break;
              }
              hook = _step3.value;
              _context7.next = 3;
              return hook(error, _objectSpread(_objectSpread({}, this.hookContext(requestOptions)), {}, {
                errorType: errorType,
                response: response
              }));
            case 3:
              _context7.next = 2;
              break;
            case 4:
              _context7.next = 6;
              break;
            case 5:
              _context7.prev = 5;
              _t5 = _context7["catch"](1);
              _iterator3.e(_t5);
            case 6:
              _context7.prev = 6;
              _iterator3.f();
              return _context7.finish(6);
            case 7:
            case "end":
              return _context7.stop();
          }
        }, _callee7, this, [[1, 5, 6, 7]]);
      }));
      function runErrorHooks(_x13, _x14, _x15, _x16) {
        return _runErrorHooks.apply(this, arguments);
      }
      return runErrorHooks;
    }()
  }, {
    key: "hookContext",
    value: function hookContext(requestOptions) {
      return {
        requestNumber: requestOptions.requestNumber,
        attemptNumber: requestOptions.attemptNumber,
        nodeIndex: requestOptions.nodeIndex
      };
    }
  }]);
}();


/***/ },

/***/ "./src/Typesense/Types.ts"
/*!********************************!*\
  !*** ./src/Typesense/Types.ts ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   arrayableParams: () => (/* binding */ arrayableParams)
/* harmony export */ });
var arrayableParams = {
  query_by: "query_by",
  query_by_weights: "query_by_weights",
  facet_by: "facet_by",
  group_by: "group_by",
  include_fields: "include_fields",
  exclude_fields: "exclude_fields",
  highlight_fields: "highlight_fields",
  highlight_full_fields: "highlight_full_fields",
  pinned_hits: "pinned_hits",
  hidden_hits: "hidden_hits",
  infix: "infix",
  override_tags: "override_tags",
  num_typos: "num_typos",
  prefix: "prefix",
  synonym_sets: "synonym_sets",
  sort_by: "sort_by"
};

/***/ },

/***/ "./src/Typesense/Utils.ts"
/*!********************************!*\
  !*** ./src/Typesense/Utils.ts ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   normalizeArrayableParams: () => (/* binding */ normalizeArrayableParams),
/* harmony export */   toErrorWithMessage: () => (/* binding */ toErrorWithMessage)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _Types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Types */ "./src/Typesense/Types.ts");


function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }

function hasNoArrayValues(params) {
  return Object.keys(_Types__WEBPACK_IMPORTED_MODULE_2__.arrayableParams).filter(function (key) {
    return params[key] !== undefined;
  }).every(function (key) {
    return isNonArrayValue(params[key]);
  });
}
function normalizeArrayableParams(params) {
  var result = _objectSpread({}, params);
  var transformedValues = Object.keys(_Types__WEBPACK_IMPORTED_MODULE_2__.arrayableParams).filter(function (key) {
    return Array.isArray(result[key]);
  }).map(function (key) {
    result[key] = result[key].join(",");
    return key;
  });
  if (!transformedValues.length && hasNoArrayValues(result)) {
    return result;
  }
  if (!hasNoArrayValues(result)) {
    throw new Error("Failed to normalize arrayable params: ".concat(JSON.stringify(result)));
  }
  return result;
}
function isNonArrayValue(value) {
  return !Array.isArray(value);
}
function isErrorWithMessage(error) {
  return (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(error) === "object" && error !== null && "message" in error && typeof error.message === "string";
}
function toErrorWithMessage(couldBeError) {
  if (isErrorWithMessage(couldBeError)) return couldBeError;
  try {
    if (typeof couldBeError === "string") {
      return new Error(couldBeError);
    }
    return new Error(JSON.stringify(couldBeError));
  } catch (_unused) {
    return new Error(String(couldBeError));
  }
}

/***/ },

/***/ "./node_modules/loglevel/lib/loglevel.js"
/*!***********************************************!*\
  !*** ./node_modules/loglevel/lib/loglevel.js ***!
  \***********************************************/
(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
* loglevel - https://github.com/pimterry/loglevel
*
* Copyright (c) 2013 Tim Perry
* Licensed under the MIT license.
*/
(function (root, definition) {
    "use strict";
    if (true) {
        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
		__WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else // removed by dead control flow
{}
}(this, function () {
    "use strict";

    // Slightly dubious tricks to cut down minimized file size
    var noop = function() {};
    var undefinedType = "undefined";
    var isIE = (typeof window !== undefinedType) && (typeof window.navigator !== undefinedType) && (
        /Trident\/|MSIE /.test(window.navigator.userAgent)
    );

    var logMethods = [
        "trace",
        "debug",
        "info",
        "warn",
        "error"
    ];

    var _loggersByName = {};
    var defaultLogger = null;

    // Cross-browser bind equivalent that works at least back to IE6
    function bindMethod(obj, methodName) {
        var method = obj[methodName];
        if (typeof method.bind === 'function') {
            return method.bind(obj);
        } else {
            try {
                return Function.prototype.bind.call(method, obj);
            } catch (e) {
                // Missing bind shim or IE8 + Modernizr, fallback to wrapping
                return function() {
                    return Function.prototype.apply.apply(method, [obj, arguments]);
                };
            }
        }
    }

    // Trace() doesn't print the message in IE, so for that case we need to wrap it
    function traceForIE() {
        if (console.log) {
            if (console.log.apply) {
                console.log.apply(console, arguments);
            } else {
                // In old IE, native console methods themselves don't have apply().
                Function.prototype.apply.apply(console.log, [console, arguments]);
            }
        }
        if (console.trace) console.trace();
    }

    // Build the best logging method possible for this env
    // Wherever possible we want to bind, not wrap, to preserve stack traces
    function realMethod(methodName) {
        if (methodName === 'debug') {
            methodName = 'log';
        }

        if (typeof console === undefinedType) {
            return false; // No method possible, for now - fixed later by enableLoggingWhenConsoleArrives
        } else if (methodName === 'trace' && isIE) {
            return traceForIE;
        } else if (console[methodName] !== undefined) {
            return bindMethod(console, methodName);
        } else if (console.log !== undefined) {
            return bindMethod(console, 'log');
        } else {
            return noop;
        }
    }

    // These private functions always need `this` to be set properly

    function replaceLoggingMethods() {
        /*jshint validthis:true */
        var level = this.getLevel();

        // Replace the actual methods.
        for (var i = 0; i < logMethods.length; i++) {
            var methodName = logMethods[i];
            this[methodName] = (i < level) ?
                noop :
                this.methodFactory(methodName, level, this.name);
        }

        // Define log.log as an alias for log.debug
        this.log = this.debug;

        // Return any important warnings.
        if (typeof console === undefinedType && level < this.levels.SILENT) {
            return "No console available for logging";
        }
    }

    // In old IE versions, the console isn't present until you first open it.
    // We build realMethod() replacements here that regenerate logging methods
    function enableLoggingWhenConsoleArrives(methodName) {
        return function () {
            if (typeof console !== undefinedType) {
                replaceLoggingMethods.call(this);
                this[methodName].apply(this, arguments);
            }
        };
    }

    // By default, we use closely bound real methods wherever possible, and
    // otherwise we wait for a console to appear, and then try again.
    function defaultMethodFactory(methodName, _level, _loggerName) {
        /*jshint validthis:true */
        return realMethod(methodName) ||
               enableLoggingWhenConsoleArrives.apply(this, arguments);
    }

    function Logger(name, factory) {
      // Private instance variables.
      var self = this;
      /**
       * The level inherited from a parent logger (or a global default). We
       * cache this here rather than delegating to the parent so that it stays
       * in sync with the actual logging methods that we have installed (the
       * parent could change levels but we might not have rebuilt the loggers
       * in this child yet).
       * @type {number}
       */
      var inheritedLevel;
      /**
       * The default level for this logger, if any. If set, this overrides
       * `inheritedLevel`.
       * @type {number|null}
       */
      var defaultLevel;
      /**
       * A user-specific level for this logger. If set, this overrides
       * `defaultLevel`.
       * @type {number|null}
       */
      var userLevel;

      var storageKey = "loglevel";
      if (typeof name === "string") {
        storageKey += ":" + name;
      } else if (typeof name === "symbol") {
        storageKey = undefined;
      }

      function persistLevelIfPossible(levelNum) {
          var levelName = (logMethods[levelNum] || 'silent').toUpperCase();

          if (typeof window === undefinedType || !storageKey) return;

          // Use localStorage if available
          try {
              window.localStorage[storageKey] = levelName;
              return;
          } catch (ignore) {}

          // Use session cookie as fallback
          try {
              window.document.cookie =
                encodeURIComponent(storageKey) + "=" + levelName + ";";
          } catch (ignore) {}
      }

      function getPersistedLevel() {
          var storedLevel;

          if (typeof window === undefinedType || !storageKey) return;

          try {
              storedLevel = window.localStorage[storageKey];
          } catch (ignore) {}

          // Fallback to cookies if local storage gives us nothing
          if (typeof storedLevel === undefinedType) {
              try {
                  var cookie = window.document.cookie;
                  var cookieName = encodeURIComponent(storageKey);
                  var location = cookie.indexOf(cookieName + "=");
                  if (location !== -1) {
                      storedLevel = /^([^;]+)/.exec(
                          cookie.slice(location + cookieName.length + 1)
                      )[1];
                  }
              } catch (ignore) {}
          }

          // If the stored level is not valid, treat it as if nothing was stored.
          if (self.levels[storedLevel] === undefined) {
              storedLevel = undefined;
          }

          return storedLevel;
      }

      function clearPersistedLevel() {
          if (typeof window === undefinedType || !storageKey) return;

          // Use localStorage if available
          try {
              window.localStorage.removeItem(storageKey);
          } catch (ignore) {}

          // Use session cookie as fallback
          try {
              window.document.cookie =
                encodeURIComponent(storageKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
          } catch (ignore) {}
      }

      function normalizeLevel(input) {
          var level = input;
          if (typeof level === "string" && self.levels[level.toUpperCase()] !== undefined) {
              level = self.levels[level.toUpperCase()];
          }
          if (typeof level === "number" && level >= 0 && level <= self.levels.SILENT) {
              return level;
          } else {
              throw new TypeError("log.setLevel() called with invalid level: " + input);
          }
      }

      /*
       *
       * Public logger API - see https://github.com/pimterry/loglevel for details
       *
       */

      self.name = name;

      self.levels = { "TRACE": 0, "DEBUG": 1, "INFO": 2, "WARN": 3,
          "ERROR": 4, "SILENT": 5};

      self.methodFactory = factory || defaultMethodFactory;

      self.getLevel = function () {
          if (userLevel != null) {
            return userLevel;
          } else if (defaultLevel != null) {
            return defaultLevel;
          } else {
            return inheritedLevel;
          }
      };

      self.setLevel = function (level, persist) {
          userLevel = normalizeLevel(level);
          if (persist !== false) {  // defaults to true
              persistLevelIfPossible(userLevel);
          }

          // NOTE: in v2, this should call rebuild(), which updates children.
          return replaceLoggingMethods.call(self);
      };

      self.setDefaultLevel = function (level) {
          defaultLevel = normalizeLevel(level);
          if (!getPersistedLevel()) {
              self.setLevel(level, false);
          }
      };

      self.resetLevel = function () {
          userLevel = null;
          clearPersistedLevel();
          replaceLoggingMethods.call(self);
      };

      self.enableAll = function(persist) {
          self.setLevel(self.levels.TRACE, persist);
      };

      self.disableAll = function(persist) {
          self.setLevel(self.levels.SILENT, persist);
      };

      self.rebuild = function () {
          if (defaultLogger !== self) {
              inheritedLevel = normalizeLevel(defaultLogger.getLevel());
          }
          replaceLoggingMethods.call(self);

          if (defaultLogger === self) {
              for (var childName in _loggersByName) {
                _loggersByName[childName].rebuild();
              }
          }
      };

      // Initialize all the internal levels.
      inheritedLevel = normalizeLevel(
          defaultLogger ? defaultLogger.getLevel() : "WARN"
      );
      var initialLevel = getPersistedLevel();
      if (initialLevel != null) {
          userLevel = normalizeLevel(initialLevel);
      }
      replaceLoggingMethods.call(self);
    }

    /*
     *
     * Top-level API
     *
     */

    defaultLogger = new Logger();

    defaultLogger.getLogger = function getLogger(name) {
        if ((typeof name !== "symbol" && typeof name !== "string") || name === "") {
            throw new TypeError("You must supply a name when creating a logger.");
        }

        var logger = _loggersByName[name];
        if (!logger) {
            logger = _loggersByName[name] = new Logger(
                name,
                defaultLogger.methodFactory
            );
        }
        return logger;
    };

    // Grab the current global log variable in case of overwrite
    var _log = (typeof window !== undefinedType) ? window.log : undefined;
    defaultLogger.noConflict = function() {
        if (typeof window !== undefinedType &&
               window.log === defaultLogger) {
            window.log = _log;
        }

        return defaultLogger;
    };

    defaultLogger.getLoggers = function getLoggers() {
        return _loggersByName;
    };

    // ES6 default export, for compatibility
    defaultLogger['default'] = defaultLogger;

    return defaultLogger;
}));


/***/ },

/***/ "?4bf0"
/*!************************!*\
  !*** crypto (ignored) ***!
  \************************/
() {

/* (ignored) */

/***/ },

/***/ "./node_modules/@babel/runtime/helpers/OverloadYield.js"
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/OverloadYield.js ***!
  \**************************************************************/
(module) {

function _OverloadYield(e, d) {
  this.v = e, this.k = d;
}
module.exports = _OverloadYield, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ },

/***/ "./node_modules/@babel/runtime/helpers/regenerator.js"
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regenerator.js ***!
  \************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var regeneratorDefine = __webpack_require__(/*! ./regeneratorDefine.js */ "./node_modules/@babel/runtime/helpers/regeneratorDefine.js");
function _regenerator() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */
  var e,
    t,
    r = "function" == typeof Symbol ? Symbol : {},
    n = r.iterator || "@@iterator",
    o = r.toStringTag || "@@toStringTag";
  function i(r, n, o, i) {
    var c = n && n.prototype instanceof Generator ? n : Generator,
      u = Object.create(c.prototype);
    return regeneratorDefine(u, "_invoke", function (r, n, o) {
      var i,
        c,
        u,
        f = 0,
        p = o || [],
        y = !1,
        G = {
          p: 0,
          n: 0,
          v: e,
          a: d,
          f: d.bind(e, 4),
          d: function d(t, r) {
            return i = t, c = 0, u = e, G.n = r, a;
          }
        };
      function d(r, n) {
        for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) {
          var o,
            i = p[t],
            d = G.p,
            l = i[2];
          r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0));
        }
        if (o || r > 1) return a;
        throw y = !0, n;
      }
      return function (o, p, l) {
        if (f > 1) throw TypeError("Generator is already running");
        for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) {
          i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u);
          try {
            if (f = 2, i) {
              if (c || (o = "next"), t = i[o]) {
                if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object");
                if (!t.done) return t;
                u = t.value, c < 2 && (c = 0);
              } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1);
              i = e;
            } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break;
          } catch (t) {
            i = e, c = 1, u = t;
          } finally {
            f = 1;
          }
        }
        return {
          value: t,
          done: y
        };
      };
    }(r, o, i), !0), u;
  }
  var a = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  t = Object.getPrototypeOf;
  var c = [][n] ? t(t([][n]())) : (regeneratorDefine(t = {}, n, function () {
      return this;
    }), t),
    u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c);
  function f(e) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, regeneratorDefine(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e;
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, regeneratorDefine(u, "constructor", GeneratorFunctionPrototype), regeneratorDefine(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", regeneratorDefine(GeneratorFunctionPrototype, o, "GeneratorFunction"), regeneratorDefine(u), regeneratorDefine(u, o, "Generator"), regeneratorDefine(u, n, function () {
    return this;
  }), regeneratorDefine(u, "toString", function () {
    return "[object Generator]";
  }), (module.exports = _regenerator = function _regenerator() {
    return {
      w: i,
      m: f
    };
  }, module.exports.__esModule = true, module.exports["default"] = module.exports)();
}
module.exports = _regenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ },

/***/ "./node_modules/@babel/runtime/helpers/regeneratorAsync.js"
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorAsync.js ***!
  \*****************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var regeneratorAsyncGen = __webpack_require__(/*! ./regeneratorAsyncGen.js */ "./node_modules/@babel/runtime/helpers/regeneratorAsyncGen.js");
function _regeneratorAsync(n, e, r, t, o) {
  var a = regeneratorAsyncGen(n, e, r, t, o);
  return a.next().then(function (n) {
    return n.done ? n.value : a.next();
  });
}
module.exports = _regeneratorAsync, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ },

/***/ "./node_modules/@babel/runtime/helpers/regeneratorAsyncGen.js"
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorAsyncGen.js ***!
  \********************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var regenerator = __webpack_require__(/*! ./regenerator.js */ "./node_modules/@babel/runtime/helpers/regenerator.js");
var regeneratorAsyncIterator = __webpack_require__(/*! ./regeneratorAsyncIterator.js */ "./node_modules/@babel/runtime/helpers/regeneratorAsyncIterator.js");
function _regeneratorAsyncGen(r, e, t, o, n) {
  return new regeneratorAsyncIterator(regenerator().w(r, e, t, o), n || Promise);
}
module.exports = _regeneratorAsyncGen, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ },

/***/ "./node_modules/@babel/runtime/helpers/regeneratorAsyncIterator.js"
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorAsyncIterator.js ***!
  \*************************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var OverloadYield = __webpack_require__(/*! ./OverloadYield.js */ "./node_modules/@babel/runtime/helpers/OverloadYield.js");
var regeneratorDefine = __webpack_require__(/*! ./regeneratorDefine.js */ "./node_modules/@babel/runtime/helpers/regeneratorDefine.js");
function AsyncIterator(t, e) {
  function n(r, o, i, f) {
    try {
      var c = t[r](o),
        u = c.value;
      return u instanceof OverloadYield ? e.resolve(u.v).then(function (t) {
        n("next", t, i, f);
      }, function (t) {
        n("throw", t, i, f);
      }) : e.resolve(u).then(function (t) {
        c.value = t, i(c);
      }, function (t) {
        return n("throw", t, i, f);
      });
    } catch (t) {
      f(t);
    }
  }
  var r;
  this.next || (regeneratorDefine(AsyncIterator.prototype), regeneratorDefine(AsyncIterator.prototype, "function" == typeof Symbol && Symbol.asyncIterator || "@asyncIterator", function () {
    return this;
  })), regeneratorDefine(this, "_invoke", function (t, o, i) {
    function f() {
      return new e(function (e, r) {
        n(t, i, e, r);
      });
    }
    return r = r ? r.then(f, f) : f();
  }, !0);
}
module.exports = AsyncIterator, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ },

/***/ "./node_modules/@babel/runtime/helpers/regeneratorDefine.js"
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorDefine.js ***!
  \******************************************************************/
(module) {

function _regeneratorDefine(e, r, n, t) {
  var i = Object.defineProperty;
  try {
    i({}, "", {});
  } catch (e) {
    i = 0;
  }
  module.exports = _regeneratorDefine = function regeneratorDefine(e, r, n, t) {
    function o(r, n) {
      _regeneratorDefine(e, r, function (e) {
        return this._invoke(r, n, e);
      });
    }
    r ? i ? i(e, r, {
      value: n,
      enumerable: !t,
      configurable: !t,
      writable: !t
    }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2));
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _regeneratorDefine(e, r, n, t);
}
module.exports = _regeneratorDefine, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ },

/***/ "./node_modules/@babel/runtime/helpers/regeneratorKeys.js"
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorKeys.js ***!
  \****************************************************************/
(module) {

function _regeneratorKeys(e) {
  var n = Object(e),
    r = [];
  for (var t in n) r.unshift(t);
  return function e() {
    for (; r.length;) if ((t = r.pop()) in n) return e.value = t, e.done = !1, e;
    return e.done = !0, e;
  };
}
module.exports = _regeneratorKeys, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ },

/***/ "./node_modules/@babel/runtime/helpers/regeneratorRuntime.js"
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorRuntime.js ***!
  \*******************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var OverloadYield = __webpack_require__(/*! ./OverloadYield.js */ "./node_modules/@babel/runtime/helpers/OverloadYield.js");
var regenerator = __webpack_require__(/*! ./regenerator.js */ "./node_modules/@babel/runtime/helpers/regenerator.js");
var regeneratorAsync = __webpack_require__(/*! ./regeneratorAsync.js */ "./node_modules/@babel/runtime/helpers/regeneratorAsync.js");
var regeneratorAsyncGen = __webpack_require__(/*! ./regeneratorAsyncGen.js */ "./node_modules/@babel/runtime/helpers/regeneratorAsyncGen.js");
var regeneratorAsyncIterator = __webpack_require__(/*! ./regeneratorAsyncIterator.js */ "./node_modules/@babel/runtime/helpers/regeneratorAsyncIterator.js");
var regeneratorKeys = __webpack_require__(/*! ./regeneratorKeys.js */ "./node_modules/@babel/runtime/helpers/regeneratorKeys.js");
var regeneratorValues = __webpack_require__(/*! ./regeneratorValues.js */ "./node_modules/@babel/runtime/helpers/regeneratorValues.js");
function _regeneratorRuntime() {
  "use strict";

  var r = regenerator(),
    e = r.m(_regeneratorRuntime),
    t = (Object.getPrototypeOf ? Object.getPrototypeOf(e) : e.__proto__).constructor;
  function n(r) {
    var e = "function" == typeof r && r.constructor;
    return !!e && (e === t || "GeneratorFunction" === (e.displayName || e.name));
  }
  var o = {
    "throw": 1,
    "return": 2,
    "break": 3,
    "continue": 3
  };
  function a(r) {
    var e, t;
    return function (n) {
      e || (e = {
        stop: function stop() {
          return t(n.a, 2);
        },
        "catch": function _catch() {
          return n.v;
        },
        abrupt: function abrupt(r, e) {
          return t(n.a, o[r], e);
        },
        delegateYield: function delegateYield(r, o, a) {
          return e.resultName = o, t(n.d, regeneratorValues(r), a);
        },
        finish: function finish(r) {
          return t(n.f, r);
        }
      }, t = function t(r, _t, o) {
        n.p = e.prev, n.n = e.next;
        try {
          return r(_t, o);
        } finally {
          e.next = n.n;
        }
      }), e.resultName && (e[e.resultName] = n.v, e.resultName = void 0), e.sent = n.v, e.next = n.n;
      try {
        return r.call(this, e);
      } finally {
        n.p = e.prev, n.n = e.next;
      }
    };
  }
  return (module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return {
      wrap: function wrap(e, t, n, o) {
        return r.w(a(e), t, n, o && o.reverse());
      },
      isGeneratorFunction: n,
      mark: r.m,
      awrap: function awrap(r, e) {
        return new OverloadYield(r, e);
      },
      AsyncIterator: regeneratorAsyncIterator,
      async: function async(r, e, t, o, u) {
        return (n(e) ? regeneratorAsyncGen : regeneratorAsync)(a(r), e, t, o, u);
      },
      keys: regeneratorKeys,
      values: regeneratorValues
    };
  }, module.exports.__esModule = true, module.exports["default"] = module.exports)();
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ },

/***/ "./node_modules/@babel/runtime/helpers/regeneratorValues.js"
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorValues.js ***!
  \******************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

var _typeof = (__webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/typeof.js")["default"]);
function _regeneratorValues(e) {
  if (null != e) {
    var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"],
      r = 0;
    if (t) return t.call(e);
    if ("function" == typeof e.next) return e;
    if (!isNaN(e.length)) return {
      next: function next() {
        return e && r >= e.length && (e = void 0), {
          value: e && e[r++],
          done: !e
        };
      }
    };
  }
  throw new TypeError(_typeof(e) + " is not iterable");
}
module.exports = _regeneratorValues, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ },

/***/ "./node_modules/@babel/runtime/helpers/typeof.js"
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
(module) {

function _typeof(o) {
  "@babel/helpers - typeof";

  return module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof(o);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ },

/***/ "./node_modules/@babel/runtime/regenerator/index.js"
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
(module, __unused_webpack_exports, __webpack_require__) {

// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(/*! ../helpers/regeneratorRuntime */ "./node_modules/@babel/runtime/helpers/regeneratorRuntime.js")();
module.exports = runtime;

// Copied from https://github.com/facebook/regenerator/blob/main/packages/runtime/runtime.js#L736=
try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js"
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayLikeToArray)
/* harmony export */ });
function _arrayLikeToArray(r, a) {
  (null == a || a > r.length) && (a = r.length);
  for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
  return n;
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js"
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js ***!
  \*******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayWithHoles)
/* harmony export */ });
function _arrayWithHoles(r) {
  if (Array.isArray(r)) return r;
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js"
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js ***!
  \**************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _assertThisInitialized)
/* harmony export */ });
function _assertThisInitialized(e) {
  if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return e;
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js"
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _asyncToGenerator)
/* harmony export */ });
function asyncGeneratorStep(n, t, e, r, o, a, c) {
  try {
    var i = n[a](c),
      u = i.value;
  } catch (n) {
    return void e(n);
  }
  i.done ? t(u) : Promise.resolve(u).then(r, o);
}
function _asyncToGenerator(n) {
  return function () {
    var t = this,
      e = arguments;
    return new Promise(function (r, o) {
      var a = n.apply(t, e);
      function _next(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "next", n);
      }
      function _throw(n) {
        asyncGeneratorStep(a, r, o, _next, _throw, "throw", n);
      }
      _next(void 0);
    });
  };
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js"
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js ***!
  \*******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classCallCheck)
/* harmony export */ });
function _classCallCheck(a, n) {
  if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/construct.js"
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/construct.js ***!
  \**************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _construct)
/* harmony export */ });
/* harmony import */ var _isNativeReflectConstruct_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isNativeReflectConstruct.js */ "./node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js");
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");


function _construct(t, e, r) {
  if ((0,_isNativeReflectConstruct_js__WEBPACK_IMPORTED_MODULE_0__["default"])()) return Reflect.construct.apply(null, arguments);
  var o = [null];
  o.push.apply(o, e);
  var p = new (t.bind.apply(t, o))();
  return r && (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_1__["default"])(p, r.prototype), p;
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/createClass.js"
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/createClass.js ***!
  \****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _createClass)
/* harmony export */ });
/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPropertyKey.js */ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js");

function _defineProperties(e, r) {
  for (var t = 0; t < r.length; t++) {
    var o = r[t];
    o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, (0,_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o.key), o);
  }
}
function _createClass(e, r, t) {
  return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
    writable: !1
  }), e;
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js"
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _defineProperty)
/* harmony export */ });
/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPropertyKey.js */ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js");

function _defineProperty(e, r, t) {
  return (r = (0,_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__["default"])(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js"
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js ***!
  \*******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _getPrototypeOf)
/* harmony export */ });
function _getPrototypeOf(t) {
  return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) {
    return t.__proto__ || Object.getPrototypeOf(t);
  }, _getPrototypeOf(t);
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/inherits.js"
/*!*************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inherits.js ***!
  \*************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _inherits)
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

function _inherits(t, e) {
  if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
  t.prototype = Object.create(e && e.prototype, {
    constructor: {
      value: t,
      writable: !0,
      configurable: !0
    }
  }), Object.defineProperty(t, "prototype", {
    writable: !1
  }), e && (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(t, e);
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/isNativeFunction.js"
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/isNativeFunction.js ***!
  \*********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _isNativeFunction)
/* harmony export */ });
function _isNativeFunction(t) {
  try {
    return -1 !== Function.toString.call(t).indexOf("[native code]");
  } catch (n) {
    return "function" == typeof t;
  }
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js"
/*!*****************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js ***!
  \*****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _isNativeReflectConstruct)
/* harmony export */ });
function _isNativeReflectConstruct() {
  try {
    var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
  } catch (t) {}
  return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
    return !!t;
  })();
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js"
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js ***!
  \*************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _iterableToArrayLimit)
/* harmony export */ });
function _iterableToArrayLimit(r, l) {
  var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
  if (null != t) {
    var e,
      n,
      i,
      u,
      a = [],
      f = !0,
      o = !1;
    try {
      if (i = (t = t.call(r)).next, 0 === l) {
        if (Object(t) !== t) return;
        f = !1;
      } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
    } catch (r) {
      o = !0, n = r;
    } finally {
      try {
        if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
      } finally {
        if (o) throw n;
      }
    }
    return a;
  }
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js"
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js ***!
  \********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _nonIterableRest)
/* harmony export */ });
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"
/*!****************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js ***!
  \****************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _objectWithoutProperties)
/* harmony export */ });
/* harmony import */ var _objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./objectWithoutPropertiesLoose.js */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js");

function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var o,
    r,
    i = (0,_objectWithoutPropertiesLoose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js"
/*!*********************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/objectWithoutPropertiesLoose.js ***!
  \*********************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _objectWithoutPropertiesLoose)
/* harmony export */ });
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js"
/*!******************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js ***!
  \******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _possibleConstructorReturn)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assertThisInitialized.js */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");


function _possibleConstructorReturn(t, e) {
  if (e && ("object" == (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(e) || "function" == typeof e)) return e;
  if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
  return (0,_assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_1__["default"])(t);
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/readOnlyError.js"
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/readOnlyError.js ***!
  \******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _readOnlyError)
/* harmony export */ });
function _readOnlyError(r) {
  throw new TypeError('"' + r + '" is read-only');
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js"
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \*******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _setPrototypeOf)
/* harmony export */ });
function _setPrototypeOf(t, e) {
  return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) {
    return t.__proto__ = e, t;
  }, _setPrototypeOf(t, e);
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js ***!
  \******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _slicedToArray)
/* harmony export */ });
/* harmony import */ var _arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithHoles.js */ "./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js");
/* harmony import */ var _iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArrayLimit.js */ "./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableRest.js */ "./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js");




function _slicedToArray(r, e) {
  return (0,_arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(r) || (0,_iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__["default"])(r, e) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(r, e) || (0,_nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/toPrimitive.js"
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toPrimitive.js ***!
  \****************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toPrimitive)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");

function toPrimitive(t, r) {
  if ("object" != (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js"
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js ***!
  \******************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toPropertyKey)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toPrimitive.js */ "./node_modules/@babel/runtime/helpers/esm/toPrimitive.js");


function toPropertyKey(t) {
  var i = (0,_toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__["default"])(t, "string");
  return "symbol" == (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(i) ? i : i + "";
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/typeof.js"
/*!***********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _typeof)
/* harmony export */ });
function _typeof(o) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) {
    return typeof o;
  } : function (o) {
    return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
  }, _typeof(o);
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js"
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js ***!
  \*******************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _unsupportedIterableToArray)
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _unsupportedIterableToArray(r, a) {
  if (r) {
    if ("string" == typeof r) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(r, a);
    var t = {}.toString.call(r).slice(8, -1);
    return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(r, a) : void 0;
  }
}


/***/ },

/***/ "./node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js"
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/wrapNativeSuper.js ***!
  \********************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _wrapNativeSuper)
/* harmony export */ });
/* harmony import */ var _getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");
/* harmony import */ var _isNativeFunction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isNativeFunction.js */ "./node_modules/@babel/runtime/helpers/esm/isNativeFunction.js");
/* harmony import */ var _construct_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./construct.js */ "./node_modules/@babel/runtime/helpers/esm/construct.js");




function _wrapNativeSuper(t) {
  var r = "function" == typeof Map ? new Map() : void 0;
  return _wrapNativeSuper = function _wrapNativeSuper(t) {
    if (null === t || !(0,_isNativeFunction_js__WEBPACK_IMPORTED_MODULE_2__["default"])(t)) return t;
    if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function");
    if (void 0 !== r) {
      if (r.has(t)) return r.get(t);
      r.set(t, Wrapper);
    }
    function Wrapper() {
      return (0,_construct_js__WEBPACK_IMPORTED_MODULE_3__["default"])(t, arguments, (0,_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this).constructor);
    }
    return Wrapper.prototype = Object.create(t.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: !1,
        writable: !0,
        configurable: !0
      }
    }), (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_1__["default"])(Wrapper, t);
  }, _wrapNativeSuper(t);
}


/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!**************************!*\
  !*** ./src/Typesense.ts ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Client: () => (/* reexport safe */ _Typesense_Client__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   Errors: () => (/* reexport module object */ _Typesense_Errors__WEBPACK_IMPORTED_MODULE_2__),
/* harmony export */   SearchClient: () => (/* reexport safe */ _Typesense_SearchClient__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Typesense_Client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Typesense/Client */ "./src/Typesense/Client.ts");
/* harmony import */ var _Typesense_SearchClient__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Typesense/SearchClient */ "./src/Typesense/SearchClient.ts");
/* harmony import */ var _Typesense_Errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Typesense/Errors */ "./src/Typesense/Errors/index.ts");




/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  Client: _Typesense_Client__WEBPACK_IMPORTED_MODULE_0__["default"],
  SearchClient: _Typesense_SearchClient__WEBPACK_IMPORTED_MODULE_1__["default"],
  Errors: _Typesense_Errors__WEBPACK_IMPORTED_MODULE_2__
});
})();

Typesense = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=typesense.js.map