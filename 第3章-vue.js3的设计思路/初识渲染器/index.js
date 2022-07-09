/**
 * @FileDescription:实现书中提到的vuejs渲染函数效果
 * @Author: 潘旭敏
 * @Date:
 * @LastEditors: 潘旭敏
 * @LastEditTime:
 */
// 根据前面提到的内容，我们可以知道dom都可以通过对象的形式来表示，我们可以通过遍历对象来生成dom
/*
 * 描述：假设当前我们有一个虚拟dom
 * 其他说明：tagName表示当前元素的标签名 props表示标签中存在的属性，包括属性和方法 children表示标签内容
 */
const vnode = {
  tagName: "div",
  props: {
    onClick: () => alert("click"),
  },
  children: "click me",
};
/**
 * 描述：渲染方法，将传入的虚拟dom进行渲染
 * @param { Object } vnode 当前需要渲染的虚拟dom
 * @param { HTMLElement} container 需要将元素插入的容器
 * @return undefined
 */
const renderer = (vnode, container) => {
  const tagEle = document.createElement(vnode.tagName);
  for (let key in vnode.props) {
    if (/^on/.test(key)) {
      tagEle.addEventListener(key.substr(2).toLowerCase(), vnode.props[key]);
    }
  }
  if (typeof vnode.children === "string") {
    tagEle.appendChild(document.createTextNode(vnode.children));
  } else if (Array.isArray(vnode.children)) {
    vnode.children.forEach((element) => {
      renderer(element, tagEle);
    });
  }
  container.appendChild(tagEle);
};
/*
 * 描述：查找到body元素
 * 其他说明：暂无
 */
const bodyEle = document.getElementsByTagName("body");
renderer(vnode, bodyEle[0]);
