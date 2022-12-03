"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _core = _interopRequireDefault(require("./core/core.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// 暴露一个对象，提供方法。
// const obj = {
//   toAST: () => {},
//   toHtml: () => {},
// };
// export default obj;
var res = _fs["default"].readFileSync("./src/md/HTML：语义化标签.md");

_fs["default"].writeFile("./src/vnode/res.json", JSON.stringify((0, _core["default"])(res)), function () {});