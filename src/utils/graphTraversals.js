function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const bfsHelper = async (i, graphNodes, visited, queue, speed) => {
  graphNodes[`Gnode${i}`].forEach(async (child) => {
    const c = Number.parseInt(child.slice(5), 10);
    if (!visited[c]) {
      queue.push(c);
      visited[c] = 1;
      document.getElementById(child).className = "Gvisited";
    }
  });
  await sleep(1000 / speed);
};

export const bfs = async (graphNodes, visited, queue, speed) => {
  queue.push(1);
  while (queue.length != 0) {
    const i = queue.shift();
    visited[i] = 1;
    document.getElementById(`Gnode${i}`).className = "Gprinted";
    const resultDiv = document.getElementById("bfs-traversal");
    const add = document.createElement("div");
    add.className = "result-node";
    add.innerHTML = `${i}`;
    resultDiv.appendChild(add);
    await bfsHelper(i, graphNodes, visited, queue, speed);
  }
};
const dfsHelper = async (i, graphNodes, visited, queue, speed) => {
  graphNodes[`Gnode${i}`].forEach(async (child) => {
    const c = Number.parseInt(child.slice(5), 10);
    if (!visited[c]) {
      queue.push(c);
      visited[c] = 1;
      document.getElementById(child).className = "Gvisited";
    }
  });
  await sleep(1000 / speed);
};
export const dfs = async (graphNodes, visited, queue, speed) => {
  queue.push(1);
  while (queue.length != 0) {
    const i = queue.pop();
    visited[i] = 1;
    document.getElementById(`Gnode${i}`).className = "Gprinted";
    const resultDiv = document.getElementById("bfs-traversal");
    const add = document.createElement("div");
    add.className = "result-node";
    add.innerHTML = `${i}`;
    resultDiv.appendChild(add);
    await dfsHelper(i, graphNodes, visited, queue, speed);
  }
};
