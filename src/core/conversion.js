import reg from "../regExp/reg.js";
/**
 *
 * @param {String} line 输入行数据
 * @returns {Array} 返回匹配的模式列表
 */
function regesMatch(line) {
  const patten = [];
  if (!line) return;
  for (let regKey in reg) {
    console.log("reg[regKey].exec(line)", regKey, line, reg[regKey].exec(line));
    line.match(reg[regKey]) ? patten.push(regKey) : null;
  }

  return patten;
}
/**
 * @param {String} data 输入 md data
 * @return {Array}
 */
export function conversion(data) {
  return data
    .toString()
    .split(/\r?\n/)
    .map((i) => {
      return { content: i, pattens: regesMatch(i) };
    });
}
