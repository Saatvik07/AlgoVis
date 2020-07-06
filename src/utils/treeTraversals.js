function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const getNumber = (str) => {
  return str.slice(4);
};
const change = (pNode, val) => {
  if (val) {
    pNode.className = "visited";
  } else {
    pNode.className = "printed";
    const resultDiv = document.getElementById("result-traversal");
    const add = document.createElement("div");
    add.className = "result-node";
    add.innerHTML = getNumber(pNode.id);
    resultDiv.appendChild(add);
  }
};
export const inorderTraversal = async (parent, tree, speed) => {
  if (tree[parent]) {
    const pNode = document.getElementById(parent);
    change(pNode, 1);
    await sleep(1000 / speed);
    await inorderTraversal(tree[parent]["left"], tree, speed);
    await sleep(1000 / speed);
    change(pNode, 0);
    await inorderTraversal(tree[parent]["right"], tree, speed);
  }
};
export const preorderTraversal = async (parent, tree, speed) => {
  if (tree[parent]) {
    const pNode = document.getElementById(parent);
    change(pNode, 1);
    await sleep(1000);
    change(pNode, 0);
    await preorderTraversal(tree[parent]["left"], tree, speed);
    await sleep(1000);
    await preorderTraversal(tree[parent]["right"], tree, speed);
  }
};
export const postorderTraversal = async (parent, tree, speed) => {
  if (tree[parent]) {
    const pNode = document.getElementById(parent);
    change(pNode, 1);
    await sleep(1000);
    await postorderTraversal(tree[parent]["left"], tree, speed);
    await postorderTraversal(tree[parent]["right"], tree, speed);
    await sleep(1000 / speed);
    change(pNode, 0);
  }
};
