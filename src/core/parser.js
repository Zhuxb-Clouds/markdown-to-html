// 传入md文件，生成AST抽象语法树

import reg from "../regExp/reg.js";

/**
 * 解析: 将 成对出现的某种符号 转为 特定的标签
 *
 * @param {string} symbol 成对出现的某种符号
 * @param {string} tag 特定的标签
 * @return {Array} 返回一个形似 vnode 的对象
 */
function pairSymbol(l, symbol, tag) {
  const type = l.split(symbol);
  const nodeList = [];

  if (!type || type.length < 3) return l;

  if (type.length % 2 == 0) {
    let last = type.splice(type.length - 2, 2).join(symbol);
    type.push(last);
  }
  for (let i = 1; i < type.length + 1; i++) {
    if (i % 2 != 0) {
      nodeList.push(type[i - 1]);
    } else {
      nodeList.push({
        type: tag,
        children: type[i - 1],
      });
    }
  }
  return {
    type: "template",
    children: nodeList,
  };
}

/**
 * @class 生成解析类
 */

export default class Parser {
  /**
   * 解析: # 转为 \<h1\>-\<h4\> 标签
   *
   * @param {string} line 行内字符串
   * @return {Object} 返回一个形似 vnode 的对象
   */
  hParser(l) {
    const type = reg.h.exec(l);
    if (!type) {
      return l;
    }
    const children = l.replace(reg.h, "");

    return {
      type: `h${type[0].length - 1}`,
      children,
    };
  }
  /**
   * 解析: `...` 转为 \<code\> 标签
   *
   * @param {string} line 行内字符串
   * @return {Object} 返回一个形似 vnode 的对象
   */
  codeParser(line) {
    if (!line) return;
    if (!reg.code.exec(line)) return line;
    return pairSymbol(line, "`", "code");
  }

  /**
   * 解析: `**` 转为 \<strong\> 标签
   *
   * @param {string} line 行内字符串
   * @return {Object} 返回一个形似 vnode 的对象
   */
  strongParser(line) {
    if (!line) return;
    if (!reg.strong.exec(line)) return;
    return pairSymbol(line, "**", "strong");
  }

  /**
   * 解析: `- ` 转为 \<li\> 标签(ul)
   *
   * @param {string} line 行内字符串
   * @return {Object} 返回一个形似 vnode 的对象
   */
  ulParser(line) {
    const type = reg.ul.exec(line);
    if (!type) {
      return line;
    }
    const children = line.replace(reg.ul, "");

    return {
      type: `li`,
      children,
    };
  }
  /**
   * 解析: `[0-9]. ` 转为 \<li\> 标签(ol)
   *
   * @param {string} line 行内字符串
   * @return {Object} 返回一个形似 vnode 的对象
   */
  olParser(line) {
    const type = reg.ol.exec(line);
    if (!type) {
      return line;
    }
    const children = line;

    return {
      type: `li`,
      children,
    };
  }
}
