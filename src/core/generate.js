import Parser from "./parser.js";
const parser = new Parser();

const root = {
  type: "div",
  props: {
    id: "root",
  },
  children: [
    /* 更多 vnode */
  ],
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
    let svnode = stringParser(content, patten);
    return svnode;
  } else if (typeof content == "object" && content.children) {
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
  return parser[`${patten}Parser`](content);
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
    return children.map((c) => generateParser(c, patten));
  }
}

/**
 * 功能: 将预读取的行对象转为vnode
 *
 * @param {String} content 字符串
 * @param {String} pattens 解析方式列表
 * @return {Object} vnode
 */
function parserByLine({ content, pattens }) {
  if (!content) {
    return;
  } else if (!pattens.length) {
    return { type: "p", children: content };
  } else {
    let vnode = content;
    pattens.map((p) => {
      vnode = generateParser(vnode, p);
    });
    return vnode;
  }
}

export default {
  getRootNode: () => root,

  parserByFile: (conData) => {
    console.log("conData", conData);
    for (const l of conData) {
      let vnode = parserByLine(l);
      if (vnode) {
        console.log("vnode", vnode);
        root.children.push(vnode);
      }
    }
    return root;
  },
};
