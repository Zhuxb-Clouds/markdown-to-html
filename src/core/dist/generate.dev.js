"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _parser = _interopRequireDefault(require("./parser.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var parser = new _parser["default"]();
var root = {
  type: "div",
  props: {
    id: "root"
  },
  children: [
    /* 更多 vnode */
  ]
};
/**
 * 功能: 分配不同的解析方式
 *
 * @param {String|Object} content 字符串
 * @param {String} patten 解析方式
 * @return {Object} vnode
 */

function generateParser(content, patten) {
  if (typeof content == "string") {
    var svnode = stringParser(content, patten);
    return svnode;
  } else if (_typeof(content) == "object" && content.children) {
    content.children = vnodeParser(content.children, patten);
    return content;
  }
}
/**
 * 功能: 将字符串转为vnode
 *
 * @param {String} content 字符串
 * @param {String} patten 解析方式
 * @return {Object} vnode
 */


function stringParser(content, patten) {
  return parser["".concat(patten, "Parser")](content);
}
/**
 * 功能: 将vnode.children转为vnode
 *
 * @param {String|Array} children 字符vnode 或 嵌套vnode
 * @param {String} patten 解析方式
 * @return {Array} vnode列表
 */


function vnodeParser(children, patten) {
  if (typeof children == "string") {
    return [stringParser(children, patten)];
  } else if (Array.isArray(children)) {
    return children.map(function (c) {
      return generateParser(c, patten);
    });
  }
}
/**
 * 功能: 将预读取的行对象转为vnode
 *
 * @param {String} content 字符串
 * @param {String} pattens 解析方式列表
 * @return {Object} vnode
 */


function parserByLine(_ref) {
  var content = _ref.content,
      pattens = _ref.pattens;

  if (!content) {
    return;
  } else if (!pattens.length) {
    return {
      type: "p",
      children: content
    };
  } else {
    var vnode = content;
    pattens.map(function (p) {
      vnode = generateParser(vnode, p);
    });
    return vnode;
  }
}

var _default = {
  getRootNode: function getRootNode() {
    return root;
  },
  parserByFile: function parserByFile(conData) {
    console.log("conData", conData);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = conData[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var l = _step.value;
        var vnode = parserByLine(l);

        if (vnode) {
          console.log("vnode", vnode);
          root.children.push(vnode);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return root;
  }
};
exports["default"] = _default;