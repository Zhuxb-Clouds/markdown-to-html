"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var reg = {
  h: /^[#]+\s+/,
  ul: /^-\s+/,
  ol: /^[0-9]+.\s+/,
  code: /`/,
  strong: /\*\*/
};
var _default = reg;
exports["default"] = _default;