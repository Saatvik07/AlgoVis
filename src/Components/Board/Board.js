import React from "react";
import "./Board.css";
import Loader from "react-loader";
import Target from "./target.png";
import Start from "./start.png";
import Graph from "./graph.png";
import Tree from "./tree.png";
import { nodeNumber, nodeId, startDijkstra } from "../../utils/dijkstra";
import { inorderTraversal, preorderTraversal, postorderTraversal } from "../../utils/treeTraversals.js";
import { bfs, dfs } from "../../utils/graphTraversals";
let boardArr = [],
  speedButtons = ["x0.25", "x0.5", "x1", "x2", "x5"],
  graph,
  graph2,
  tree = {},
  graphNodes = {},
  visited = [],
  queue = [],
  called = 0;
let endId = `7,24`,
  startId = `7,4`;
export class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = { blocked: [], loaded: false, speed: 1 };
    this.onClickBox = this.onClickBox.bind(this);
    this.clickAlgo = this.clickAlgo.bind(this);
    this.dragStart = this.dragStart.bind(this);
    this.dragEnter = this.dragEnter.bind(this);
    this.dragOver = this.dragEnter.bind(this);
    this.dragDrop = this.dragDrop.bind(this);
    this.setSpeed = this.setSpeed.bind(this);
  }
  dragStart(ev) {
    console.log(ev.target.id);
    ev.dataTransfer.setData("text", ev.target.id);
  }
  dragEnter(ev) {
    ev.preventDefault();
    return true;
  }
  dragOver(ev) {
    ev.preventDefault();
  }
  dragDrop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    if (data === "target-image") {
      endId = ev.target.id;
    } else {
      startId = ev.target.id;
    }
  }
  clickAlgo(event) {
    this.props.onOptionClick(event.target.id);
    endId = `7,24`;
    startId = `7,4`;
    called = 0;
  }
  onClickBox(event) {
    const idToAdd = event.target.id;
    const arr = this.state.blocked;
    const num = nodeNumber(idToAdd);
    if (!this.state.blocked.includes(num)) {
      arr.push(num);
      this.setState({ blocked: arr });
    } else {
      const n_arr = arr.filter((node) => {
        return num != node;
      });
      const normal = document.getElementById(idToAdd);
      normal.className = "board-col";
      this.setState({ blocked: n_arr });
    }
  }
  setSpeed(event) {
    const speed = Number.parseFloat(event.target.id.slice(1));
    this.setState({ speed: speed });
  }
  remove(event) {
    const svgs = ["1-2", "1-3", "2-4", "2-5", "3-6", "3-7", "4-8", "4-9", "5-10", "5-11", "6-12", "6-13", "7-14", "7-15"];
    const Gsvgs = ["1-2", "1-3", "2-4", "3-5", "4-6", "5-6", "6-7", "6-8", "6-9", "7-8"];
    const divRemove = document.getElementById(event.target.id);

    if (divRemove.className === "node") {
      const num = event.target.id.slice(4);
      const lines = svgs.filter((str) => {
        let nums = str.split("-");
        return nums.includes(num);
      });
      divRemove.className = "node-removed";
      lines.forEach((line) => {
        const svgLine = document.getElementById(`svg${line}`);
        svgLine.style = "opacity:0.4;animation-name:fadeOut; animation-duration:0.5s";
      });
    } else if (divRemove.className === "node-removed") {
      const num = event.target.id.slice(4);
      const lines = svgs.filter((str) => {
        let nums = str.split("-");
        return nums.includes(num);
      });
      divRemove.className = "node";
      lines.forEach((line) => {
        const svgLine = document.getElementById(`svg${line}`);
        svgLine.style = "animation-name:fadeIn; animation-duration:0.5s";
      });
    } else if (divRemove.className === "Gnode") {
      const num = event.target.id.slice(5);
      const lines = Gsvgs.filter((str) => {
        let nums = str.split("-");
        return nums.includes(num);
      });
      divRemove.className = "Gnode-removed";
      lines.forEach((line) => {
        const svgLine = document.getElementById(`Gsvg${line}`);
        svgLine.style = "opacity:0.4;animation-name:fadeOut; animation-duration:0.5s";
      });
    } else if (divRemove.className === "Gnode-removed") {
      const num = event.target.id.slice(5);
      const lines = Gsvgs.filter((str) => {
        let nums = str.split("-");
        return nums.includes(num);
      });
      divRemove.className = "Gnode";
      lines.forEach((line) => {
        const svgLine = document.getElementById(`Gsvg${line}`);
        svgLine.style = "animation-name:fadeIn; animation-duration:0.5s";
      });
    }
  }
  inordCaller() {
    if (called === 0) {
      called = 1;

      inorderTraversal("node1", tree, this.state.speed);
    }
  }
  preordCaller() {
    if (called === 0) {
      called = 1;
      preorderTraversal("node1", tree, this.state.speed);
    }
  }
  postordCaller() {
    if (called === 0) {
      called = 1;
      postorderTraversal("node1", tree, this.state.speed);
    }
  }
  bfsCaller() {
    if (called === 0) {
      called = 1;
      for (let i = 0; i < 9; i++) {
        visited[i] = 0;
      }
      bfs(graphNodes, visited, queue, this.state.speed);
    }
  }
  dfsCaller() {
    if (called === 0) {
      called = 1;
      for (let i = 0; i < 9; i++) {
        visited[i] = 0;
      }
      dfs(graphNodes, visited, queue, this.state.speed);
    }
  }
  createTree() {
    for (let i = 1; i <= 15; i++) {
      const parent = document.getElementById(`node${i}`).className;
      tree[`node${i}`] = {};
      if (2 * i + 1 <= 15) {
        const leftChild = document.getElementById(`node${2 * i}`).className;
        const rightChild = document.getElementById(`node${2 * i + 1}`).className;
        if (leftChild === "node") {
          tree[`node${i}`]["left"] = `node${2 * i}`;
        } else {
          tree[`node${i}`]["left"] = null;
        }
        if (rightChild === "node") {
          tree[`node${i}`]["right"] = `node${2 * i + 1}`;
        } else {
          tree[`node${i}`]["right"] = null;
        }
      } else {
        tree[`node${i}`]["left"] = null;
        tree[`node${i}`]["right"] = null;
      }
    }
    console.log(tree);
  }
  createGraph() {
    for (let i = 1; i <= 9; i++) {
      graphNodes[`Gnode${i}`] = [];
      visited.push(0);
      const arr = [];
      switch (i) {
        case 1:
          if (document.getElementById("Gnode2").className === "Gnode") {
            arr.push("Gnode2");
          }
          if (document.getElementById("Gnode3").className === "Gnode") {
            arr.push("Gnode3");
          }
          graphNodes[`Gnode${i}`] = arr;
          break;
        case 2:
          if (document.getElementById("Gnode4").className === "Gnode") {
            arr.push("Gnode4");
          }
          if (document.getElementById("Gnode1").className === "Gnode") {
            arr.push("Gnode1");
          }
          graphNodes[`Gnode${i}`] = arr;
          break;
        case 3:
          if (document.getElementById("Gnode5").className === "Gnode") {
            arr.push("Gnode5");
          }
          if (document.getElementById("Gnode1").className === "Gnode") {
            arr.push("Gnode1");
          }
          graphNodes[`Gnode${i}`] = arr;
          break;
        case 4:
          if (document.getElementById("Gnode2").className === "Gnode") {
            arr.push("Gnode2");
          }
          if (document.getElementById("Gnode6").className === "Gnode") {
            arr.push("Gnode6");
          }
          graphNodes[`Gnode${i}`] = arr;
          break;
        case 5:
          if (document.getElementById("Gnode3").className === "Gnode") {
            arr.push("Gnode3");
          }
          if (document.getElementById("Gnode6").className === "Gnode") {
            arr.push("Gnode6");
          }
          graphNodes[`Gnode${i}`] = arr;
          break;
        case 6:
          if (document.getElementById("Gnode4").className === "Gnode") {
            arr.push("Gnode4");
          }
          if (document.getElementById("Gnode5").className === "Gnode") {
            arr.push("Gnode5");
          }
          if (document.getElementById("Gnode7").className === "Gnode") {
            arr.push("Gnode7");
          }
          if (document.getElementById("Gnode8").className === "Gnode") {
            arr.push("Gnode8");
          }
          if (document.getElementById("Gnode9").className === "Gnode") {
            arr.push("Gnode9");
          }
          graphNodes[`Gnode${i}`] = arr;
          break;
        case 7:
          if (document.getElementById("Gnode6").className === "Gnode") {
            arr.push("Gnode6");
          }
          if (document.getElementById("Gnode8").className === "Gnode") {
            arr.push("Gnode8");
          }
          graphNodes[`Gnode${i}`] = arr;
          break;
        case 8:
          if (document.getElementById("Gnode6").className === "Gnode") {
            arr.push("Gnode6");
          }
          if (document.getElementById("Gnode7").className === "Gnode") {
            arr.push("Gnode7");
          }
          graphNodes[`Gnode${i}`] = arr;
          break;
        case 9:
          if (document.getElementById("Gnode6").className === "Gnode") {
            arr.push("Gnode6");
          }
          graphNodes[`Gnode${i}`] = arr;
          break;
      }
    }
  }
  createBoard() {
    let boardArr = [];
    for (let i = 0; i < 12; i++) {
      let rowId = `row${i}`,
        colArr = [];
      for (let j = 1; j <= 35; j++) {
        const colId = `${i},${j}`;
        if (j === 4 && i === 7) {
          colArr.push(
            <td id={`${colId}`} className='board-col start'>
              <img src={Start} className='target-image' id='start-image' draggable='true' onDragStart={(event) => this.dragStart(event)} />
            </td>
          );
        } else if (j === 24 && i === 7) {
          colArr.push(
            <td id={`${colId}`} className='board-col end'>
              <img
                src={Target}
                className='target-image'
                id='target-image'
                draggable='true'
                onDragStart={(event) => this.dragStart(event)}
              />
            </td>
          );
        } else {
          colArr.push(
            <td
              id={`${colId}`}
              className='board-col'
              onClick={this.onClickBox}
              onDragOver={(event) => this.dragOver(event)}
              onDrop={(event) => this.dragDrop(event)}
            ></td>
          );
        }
      }
      boardArr.push(
        <tr id={`${rowId}`} className='board-row'>
          {colArr}
        </tr>
      );
    }
    return boardArr;
  }
  componentDidUpdate() {
    if (this.props.algo === "dijkstra") {
      this.state.blocked.forEach((id) => {
        const node = nodeId(id);
        const box = document.getElementById(node);
        box.className = "board-col crossed";
      });
    }
    speedButtons.forEach((id) => {
      const element = document.getElementById(id);
      if (id !== `x${this.state.speed}` && element) {
        element.style = "";
      } else if (element) {
        element.style = "background-color:#00515b;color:yellow";
      }
    });
  }
  render() {
    let radio, options;
    if (this.props.algo === "dijkstra") {
      boardArr = this.createBoard();
      graph = <div></div>;
      if (this.props.start) startDijkstra(startId, endId, this.state.blocked, 0);
      else startDijkstra(startId, endId, this.state.blocked, 1);
    } else if (this.props.algo.split(" ")[0] === "graph") {
      boardArr = <div></div>;
      radio = (
        <div className='speedBoard-div'>
          <h3>Speed of the transition</h3>
          <button onClick={this.setSpeed} id='x0.25'>
            0.25X
          </button>
          <button onClick={this.setSpeed} id='x0.5'>
            0.5X
          </button>
          <button onClick={this.setSpeed} id='x1'>
            1X
          </button>
          <button onClick={this.setSpeed} id='x2'>
            2X
          </button>
        </div>
      );
      graph = (
        <div className='graph-container'>
          <div className='tree-level' id='depth0'>
            <div className='node' id='node1'>
              1
            </div>
          </div>
          <svg width='220' height='80' id='svg1-2'>
            <line x1='210' y1='5' x2='10' y2='75' />
          </svg>
          <svg width='220' height='80' id='svg1-3'>
            <line x1='10' y1='5' x2='210' y2='75' id='1 2' />
          </svg>

          <div className='tree-level' id='depth1'>
            <div className='node' id='node2' onClick={this.remove}>
              2
            </div>
            <div className='node' id='node3' onClick={this.remove}>
              3
            </div>
          </div>
          <svg width='100' height='50' id='svg2-4'>
            <line x1='95' y1='5' x2='5' y2='45' />
          </svg>
          <svg width='100' height='50' className='svg4' id='svg2-5'>
            <line x1='5' y1='5' x2='95' y2='45' />
          </svg>
          <svg width='100' height='50' className='svg5' id='svg3-6'>
            <line x1='95' y1='5' x2='5' y2='45' />
          </svg>
          <svg width='100' height='50' id='svg3-7'>
            <line x1='5' y1='5' x2='95' y2='45' />
          </svg>
          <div className='tree-level' id='depth2'>
            <div className='node' id='node4' onClick={this.remove}>
              4
            </div>
            <div className='node' id='node5' onClick={this.remove}>
              5
            </div>
            <div className='node' id='node6' onClick={this.remove}>
              6
            </div>
            <div className='node' id='node7' onClick={this.remove}>
              7
            </div>
          </div>
          <div className='connector489'>
            <svg width='50' height='35' id='svg4-8'>
              <line x1='45' y1='5' x2='5' y2='30' />
            </svg>
            <svg width='50' height='35' id='svg4-9'>
              <line x1='5' y1='5' x2='45' y2='30' />
            </svg>
          </div>
          <div className='connector51011'>
            <svg width='50' height='35' id='svg5-10'>
              <line x1='45' y1='5' x2='5' y2='30' />
            </svg>
            <svg width='50' height='35' id='svg5-11'>
              <line x1='5' y1='5' x2='45' y2='30' />
            </svg>
          </div>
          <div className='connector61213'>
            <svg width='50' height='35' id='svg6-12'>
              <line x1='45' y1='5' x2='5' y2='30' />
            </svg>
            <svg width='50' height='35' id='svg6-13'>
              <line x1='5' y1='5' x2='45' y2='30' />
            </svg>
          </div>
          <div className='connector71415'>
            <svg width='50' height='35' id='svg7-14'>
              <line x1='45' y1='5' x2='5' y2='30' />
            </svg>
            <svg width='50' height='35' id='svg7-15'>
              <line x1='5' y1='5' x2='45' y2='30' />
            </svg>
          </div>

          <div className='tree-level' id='depth3'>
            <div className='node' id='node8' onClick={this.remove}>
              8
            </div>
            <div className='node' id='node9' onClick={this.remove}>
              9
            </div>
            <div className='node' id='node10' onClick={this.remove}>
              10
            </div>
            <div className='node' id='node11' onClick={this.remove}>
              11
            </div>
            <div className='node' id='node12' onClick={this.remove}>
              12
            </div>
            <div className='node' id='node13' onClick={this.remove}>
              13
            </div>
            <div className='node' id='node14' onClick={this.remove}>
              14
            </div>
            <div className='node' id='node15' onClick={this.remove}>
              15
            </div>
          </div>
          <div className='result-traversal' id='result-traversal'></div>
        </div>
      );
      if (this.props.start && this.props.algo === "graph 1") {
        radio = <div></div>;
        this.createTree();
        this.inordCaller();
      } else if (this.props.start && this.props.algo === "graph 2") {
        radio = <div></div>;
        this.createTree();
        this.preordCaller();
      } else if (this.props.start && this.props.algo === "graph 3") {
        radio = <div></div>;
        this.createTree();
        this.postordCaller();
      }
    } else if (this.props.algo.split(" ")[0] === "trav") {
      boardArr = <div></div>;
      radio = (
        <div className='speedBoard-div'>
          <h3>Speed of the transition</h3>
          <button onClick={this.setSpeed} id='x0.25'>
            0.25X
          </button>
          <button onClick={this.setSpeed} id='x0.5'>
            0.5X
          </button>
          <button onClick={this.setSpeed} id='x1'>
            1X
          </button>
          <button onClick={this.setSpeed} id='x2'>
            2X
          </button>
        </div>
      );
      graph = <div></div>;
      graph2 = (
        <div className='graph-container'>
          <div className='graph-slice1'>
            <div className='Gnode' id='Gnode1'>
              1
            </div>
          </div>
          <div className='graph-svg'>
            <svg width='100' height='100' className='svg4' id='Gsvg1-2'>
              <line x1='95' y1='5' x2='5' y2='95' />
            </svg>
            <svg width='100' height='100' className='svg4' id='Gsvg1-3'>
              <line x1='5' y1='5' x2='95' y2='95' />
            </svg>
          </div>
          <div className='graph-slice2'>
            <div className='Gnode' id='Gnode2' onClick={this.remove}>
              2
            </div>
            <div className='Gnode' id='Gnode3' onClick={this.remove}>
              3
            </div>
          </div>
          <div className='graph-svg'>
            <svg width='100' height='200' className='svg4' id='Gsvg2-4'>
              <line x1='5' y1='25' x2='95' y2='25' />
            </svg>
            <svg width='100' height='100' className='svg4' id='Gsvg3-5'>
              <line x1='5' y1='75' x2='95' y2='75' />
            </svg>
          </div>
          <div className='graph-slice3'>
            <div className='Gnode' id='Gnode4' onClick={this.remove}>
              4
            </div>
            <div className='Gnode' id='Gnode5' onClick={this.remove}>
              5
            </div>
          </div>
          <div className='graph-svg'>
            <svg width='100' height='100' className='svg4' id='Gsvg4-6'>
              <line x1='5' y1='5' x2='95' y2='95' />
            </svg>
            <svg width='100' height='100' className='svg4' id='Gsvg5-6'>
              <line x1='95' y1='5' x2='5' y2='95' />
            </svg>
          </div>
          <div className='graph-slice4'>
            <div className='Gnode' id='Gnode6' onClick={this.remove}>
              6
            </div>
          </div>
          <div className='graph-svg'>
            <svg width='100' height='80' className='svg4' id='Gsvg6-7'>
              <line x1='95' y1='5' x2='5' y2='80' />
            </svg>
            <svg width='100' height='50' className='svg4' id='Gsvg6-8'>
              <line x1='5' y1='25' x2='95' y2='25' />
            </svg>
            <svg width='100' height='80' className='svg4' id='Gsvg6-9'>
              <line x1='5' y1='5' x2='95' y2='80' />
            </svg>
          </div>
          <div className='graph-slice5'>
            <div className='Gnode' id='Gnode7' onClick={this.remove}>
              7
            </div>
            <svg width='10' height='45' className='svg4' id='Gsvg7-8'>
              <line x1='5' y1='0' x2='5' y2='45' />
            </svg>
            <div className='Gnode' id='Gnode8' onClick={this.remove}>
              8
            </div>
            <div className='Gnode' id='Gnode9' onClick={this.remove}>
              9
            </div>
          </div>
          <div className='bfs-traversal' id='bfs-traversal'></div>
        </div>
      );
      if (this.props.start && this.props.algo === "trav bfs") {
        radio = <div></div>;
        this.createGraph();
        this.bfsCaller();
      } else if (this.props.start && this.props.algo === "trav dfs") {
        radio = <div></div>;
        this.createGraph();
        this.dfsCaller();
      }
    } else {
      boardArr = <div></div>;
      graph = <div></div>;
      graph2 = <div></div>;
      options = (
        <div className='graph-option-container'>
          <div onClick={this.clickAlgo} id='dijkstra' className='graph-option'>
            <h3 onClick={this.clickAlgo} id='dijkstra'>
              Dijkstra's Algorithm
            </h3>
            <Loader loaded={this.state.loaded} color='#f0f3bd'></Loader>
            <img
              src={Graph}
              width='100px'
              height='auto'
              onClick={this.clickAlgo}
              id='dijkstra'
              onLoad={() => {
                this.setState({ loaded: true });
              }}
            />
            <p onClick={this.clickAlgo} id='dijkstra'>
              This section visualizes Dijkstra's algorithm for Single Source Shortest Path , you can drag and choose the Source box and the
              destination Box and you can add obstacles by click on boxes (black boxes denote obstacles)
            </p>
          </div>
          <div onClick={this.clickAlgo} id='trav bfs' className='graph-option'>
            <h3 onClick={this.clickAlgo} id='trav bfs'>
              Breath First Search
            </h3>
            <Loader loaded={this.state.loaded} color='#f0f3bd'></Loader>
            <img src={Graph} width='100px' height='auto' onClick={this.clickAlgo} id='trav bfs' />
            <p onClick={this.clickAlgo} id='trav bfs'>
              This section visualizes Breadth First Search in a graph where each vertex is explored completely and then the next vertex is
              visited, you can add/delete nodes by clicking on them
            </p>
          </div>
          <div onClick={this.clickAlgo} id='trav dfs' className='graph-option'>
            <h3 onClick={this.clickAlgo} id='trav dfs'>
              Depth First Search
            </h3>
            <Loader loaded={this.state.loaded} color='#f0f3bd'></Loader>
            <img src={Graph} width='100px' height='auto' onClick={this.clickAlgo} id='trav dfs' />
            <p onClick={this.clickAlgo} id='trav dfs'>
              This section visualizes Depth First Search in a graph where the child of each vertex is explored first till we reach a vertex
              that has no children , you can add/delete nodes by clicking on them
            </p>
          </div>
          <div onClick={this.clickAlgo} id='graph 1' className='graph-option'>
            <h3 onClick={this.clickAlgo} id='graph 1'>
              Inorder Tree Traversal
            </h3>
            <Loader loaded={this.state.loaded} color='#f0f3bd'></Loader>
            <img src={Tree} width='100px' height='auto' onClick={this.clickAlgo} id='graph 1' />
            <p onClick={this.clickAlgo} id='graph 1'>
              This section visualizes one of the three tree traversal methods (left child , parent , right child), you can add/delete a node
              by clicking on it
            </p>
          </div>
          <div onClick={this.clickAlgo} id='graph 2' className='graph-option'>
            <h3 onClick={this.clickAlgo} id='graph 2'>
              PreOrder Tree Traversal
            </h3>
            <Loader loaded={this.state.loaded} color='#f0f3bd'></Loader>
            <img src={Tree} width='100px' height='auto' onClick={this.clickAlgo} id='graph 2' />
            <p onClick={this.clickAlgo} id='graph 2'>
              This section visualizes one of the three tree traversal methods (parent,left child,rightchild) ,you can add/delete a node by
              clicking on it
            </p>
          </div>
          <div onClick={this.clickAlgo} id='graph 3' className='graph-option'>
            <h3 onClick={this.clickAlgo} id='graph 3'>
              PostOrder Tree Traversal
            </h3>
            <Loader loaded={this.state.loaded} color='#f0f3bd'></Loader>
            <img src={Tree} width='100px' height='auto' onClick={this.clickAlgo} id='graph 3' />
            <p onClick={this.clickAlgo} id='graph 3'>
              This section visualizes one of the three tree traversal methods (left child,right child,parent), you can add/delete a node by
              clicking on it
            </p>
          </div>
        </div>
      );
    }

    return (
      <div className='board-container' id='board'>
        {options}
        <table className='board-table'>
          {boardArr}
          {graph}
          {graph2}
          {radio}
        </table>
      </div>
    );
  }
}
