"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _conversion = require("./conversion.js");

var _generate = _interopRequireDefault(require("./generate.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import generate from "./generate.js";
var core = function core(data) {
  var conData = (0, _conversion.conversion)(data);
  return _generate["default"].parserByFile(conData);
};

var _default = core;
exports["default"] = _default;