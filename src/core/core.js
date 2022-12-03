// import generate from "./generate.js";

import { conversion } from "./conversion.js";
import generate from "./generate.js";

const core = (data) => {
  let conData = conversion(data);
  return generate.parserByFile(conData);
};

export default core;
