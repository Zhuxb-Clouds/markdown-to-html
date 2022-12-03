"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reg = _interopRequireDefault(require("../regExp/reg.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * 解析: 将 成对出现的某种符号 转为 特定的标签
 *
 * @param {string} symbol 成对出现的某种符号
 * @param {string} tag 特定的标签
 * @return {Array} 返回一个形似 vnode 的对象
 */
function pairSymbol(l, symbol, tag) {
  var type = l.split(symbol);
  var nodeList = [];
  if (!type || type.length < 3) return l;

  if (type.length % 2 == 0) {
    var last = type.splice(type.length - 2, 2).join(symbol);
    type.push(last);
  }

  for (var i = 1; i < type.length + 1; i++) {
    if (i % 2 != 0) {
      nodeList.push(type[i - 1]);
    } else {
      nodeList.push({
        type: tag,
        children: type[i - 1]
      });
    }
  }

  return {
    type: "template",
    children: nodeList
  };
}
/**
 * @class 生成解析类
 */


var Parser =
/*#__PURE__*/
function () {
  function Parser() {
    _classCallCheck(this, Parser);
  }

  _createClass(Parser, [{
    key: "hParser",

    /**
     * 解析: # 转为 \<h1\>-\<h4\> 标签
     *
     * @param {string} line 行内字符串
     * @return {Object} 返回一个形似 vnode 的对象
     */
    value: function hParser(l) {
      var type = _reg["default"].h.exec(l);

      if (!type) {
        return l;
      }

      var children = l.replace(_reg["default"].h, "");
      return {
        type: "h".concat(type[0].length - 1),
        children: children
      };
    }
    /**
     * 解析: `...` 转为 \<code\> 标签
     *
     * @param {string} line 行内字符串
     * @return {Object} 返回一个形似 vnode 的对象
     */

  }, {
    key: "codeParser",
    value: function codeParser(line) {
      if (!line) return;
      if (!_reg["default"].code.exec(line)) return line;
      return pairSymbol(line, "`", "code");
    }
    /**
     * 解析: `**` 转为 \<strong\> 标签
     *
     * @param {string} line 行内字符串
     * @return {Object} 返回一个形似 vnode 的对象
     */

  }, {
    key: "strongParser",
    value: function strongParser(line) {
      if (!line) return;
      if (!_reg["default"].strong.exec(line)) return;
      return pairSymbol(line, "**", "strong");
    }
    /**
     * 解析: `- ` 转为 \<li\> 标签(ul)
     *
     * @param {string} line 行内字符串
     * @return {Object} 返回一个形似 vnode 的对象
     */

  }, {
    key: "ulParser",
    value: function ulParser(line) {
      var type = _reg["default"].ul.exec(line);

      if (!type) {
        return line;
      }

      var children = line.replace(_reg["default"].ul, "");
      return {
        type: "li",
        children: children
      };
    }
    /**
     * 解析: `[0-9]. ` 转为 \<li\> 标签(ol)
     *
     * @param {string} line 行内字符串
     * @return {Object} 返回一个形似 vnode 的对象
     */

  }, {
    key: "olParser",
    value: function olParser(line) {
      var type = _reg["default"].ol.exec(line);

      if (!type) {
        return line;
      }

      var children = line;
      return {
        type: "li",
        children: children
      };
    }
  }]);

  return Parser;
}();

exports["default"] = Parser;