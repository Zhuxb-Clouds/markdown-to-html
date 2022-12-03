"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.conversion = conversion;

var _reg = _interopRequireDefault(require("../regExp/reg.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 *
 * @param {String} line 输入行数据
 * @returns {Array} 返回匹配的模式列表
 */
function regesMatch(line) {
  var patten = [];
  if (!line) return;

  for (var regKey in _reg["default"]) {
    console.log("reg[regKey].exec(line)", regKey, line, _reg["default"][regKey].exec(line));
    line.match(_reg["default"][regKey]) ? patten.push(regKey) : null;
  }

  return patten;
}
/**
 * @param {String} data 输入 md data
 * @return {Array}
 */


function conversion(data) {
  return data.toString().split(/\r?\n/).map(function (i) {
    return {
      content: i,
      pattens: regesMatch(i)
    };
  });
}