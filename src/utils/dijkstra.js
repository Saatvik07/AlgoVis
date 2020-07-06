export const nodeNumber = (str) => {
  const nums = str.split(",");
  const ans = 35 * parseInt(nums[0], 10) + parseInt(nums[1], 10);
  return ans;
};
export const nodeId = (id) => {
  let x = Math.floor(id / 35),
    y = id % 35;
  if (y == 0) {
    x -= 1;
    y = 35;
  }
  return `${x},${y}`;
};
let curr_parent;
const minimum = (dist, path) => {
  let min = Number.MAX_VALUE,
    min_index = -1;
  for (let i = 0; i <= 420; i++) {
    if (path[i] === 0 && dist[i] <= min && dist[i] != Number.MAX_VALUE) {
      min = dist[i];
      min_index = i;
    }
  }
  return min_index;
};

const dijkstraMain = (path, dist, grid, i, parent, endId, startId) => {
  setTimeout(() => {
    let minIndex = minimum(dist, path);
    if (i >= 1 && minIndex !== -1) {
      curr_parent = minIndex;
      console.log(curr_parent, minIndex);
      if (nodeId(minIndex) !== endId) {
        path[minIndex] = 1;
        const newlyAdded = document.getElementById(nodeId(minIndex));
        newlyAdded.className = "board-col added";
        grid[minIndex].forEach((adj) => {
          if (path[adj] == 0 && dist[minIndex] != Number.MAX_VALUE && dist[minIndex] + 1 < dist[adj]) {
            dist[adj] = dist[minIndex] + 1;
            parent[adj] = minIndex;
          }
        });
      } else {
        let i = nodeNumber(endId);
        if (document.getElementById(startId)) document.getElementById(startId).className = "board-col inPath";
        while (parent[i] !== -1) {
          const newlyAdded = document.getElementById(nodeId(i));
          newlyAdded.className = "board-col inPath";
          i = parent[i];
        }
      }
    } else {
      return;
    }
  }, 10 * i);
};

export const startDijkstra = (startId, endId, blocked, stop) => {
  if (stop) {
    return;
  } else {
    curr_parent = nodeNumber(startId);
    const grid = {};
    for (let i = 0; i < 12; i++) {
      for (let j = 1; j <= 35; j++) {
        const nodeId = `${i},${j}`;
        const adjVertices = [];
        let canBe;
        if (i === 0) {
          canBe = [nodeNumber(`${i + 1},${j}`), nodeNumber(`${i},${j + 1}`), nodeNumber(`${i},${j - 1}`)];
        } else if (j === 1) {
          canBe = [nodeNumber(`${i + 1},${j}`), nodeNumber(`${i - 1},${j}`), nodeNumber(`${i},${j + 1}`)];
        } else if (j === 35) {
          canBe = [nodeNumber(`${i + 1},${j}`), nodeNumber(`${i - 1},${j}`), nodeNumber(`${i},${j - 1}`)];
        } else if (i === 11) {
          canBe = [nodeNumber(`${i - 1},${j}`), nodeNumber(`${i},${j + 1}`), nodeNumber(`${i},${j - 1}`)];
        } else if (i === 0 && j === 1) {
          canBe = [nodeNumber(`${i + 1},${j}`), nodeNumber(`${i},${j + 1}`)];
        } else if (i === 11 && j === 35) {
          canBe = [nodeNumber(`${i - 1},${j}`), nodeNumber(`${i},${j - 1}`)];
        } else if (i === 0 && j === 35) {
          canBe = [nodeNumber(`${i + 1},${j}`), nodeNumber(`${i},${j - 1}`)];
        } else if (i === 11 && j === 1) {
          canBe = [nodeNumber(`${i - 1},${j}`), nodeNumber(`${i},${j + 1}`)];
        } else {
          canBe = [nodeNumber(`${i + 1},${j}`), nodeNumber(`${i - 1},${j}`), nodeNumber(`${i},${j + 1}`), nodeNumber(`${i},${j - 1}`)];
        }
        canBe.forEach((vert) => {
          if (!blocked.includes(vert) && vert >= 1 && vert <= 420) {
            adjVertices.push(vert);
          }
        });
        grid[nodeNumber(nodeId)] = adjVertices;
      }
    }
    let dist = [],
      path = [],
      parent = [];
    for (let i = 0; i <= 450; i++) {
      parent.push(-1);
      dist.push(Number.MAX_VALUE);
      path.push(0);
    }
    dist[nodeNumber(startId)] = 0;
    for (let i = 1; i <= 450; i++) {
      dijkstraMain(path, dist, grid, i, parent, endId, startId);
    }
  }
};
