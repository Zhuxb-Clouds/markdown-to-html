// 暴露一个对象，提供方法。

// const obj = {
//   toAST: () => {},
//   toHtml: () => {},
// };

// export default obj;
import fs from "fs";
import core from "./core/core.js";

const res = fs.readFileSync("./src/md/HTML：语义化标签.md");
fs.writeFile("./src/vnode/res.json", JSON.stringify(core(res)), () => {});
