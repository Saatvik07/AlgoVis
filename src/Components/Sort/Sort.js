import React from "react";
import "./Sort.css";
import SelectionImage from "./select.png";
import BubbleImage from "./bubbleImage.png";
import MergeImage from "./merge.png";
import QuickImage from "./quick.png";
import Loader from "react-loader";
let height = [],
  board,
  exchange = 0,
  called = 0;
let length = 100,
  width = 10,
  lenButtons = ["len50", "len100", "len200", "len300", "len400", "len500"],
  speedButtons = ["x0.25", "x0.5", "x1", "x2", "x5"];
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export class Sort extends React.Component {
  constructor(props) {
    super(props);
    this.state = { svgArray: [], speed: 1, loaded: false };
    this.clickAlgo = this.clickAlgo.bind(this);
    this.mainBubbleBody = this.mainBubbleBody.bind(this);
    this.mainSelectionBody = this.mainSelectionBody.bind(this);
    this.createBoard = this.createBoard.bind(this);
    this.setLength = this.setLength.bind(this);
    this.setSpeed = this.setSpeed.bind(this);
    this.mainSelectionBody = this.mainSelectionBody.bind(this);
  }
  clickAlgo(event) {
    called = 0;
    this.createBoard();
    this.props.onOptionClick(event.target.id);
  }
  setLength(event) {
    let rectWidth = 2;
    if (event.target.id === "len50") {
      rectWidth = 12;
    } else if (event.target.id === "len100") {
      rectWidth = 10;
    } else if (event.target.id === "len200") {
      rectWidth = 5;
    } else if (event.target.id === "len300") {
      rectWidth = 3;
    } else if (event.target.id === "len400") {
      rectWidth = 2.5;
    } else if (event.target.id === "len500") {
      rectWidth = 2;
    }
    length = Number.parseInt(event.target.id.slice(3), 10);
    width = rectWidth;

    this.createBoard();
  }
  setSpeed(event) {
    const speed = Number.parseFloat(event.target.id.slice(1));
    this.setState({ speed: speed });
  }
  bubbleCaller() {
    if (called === 0) {
      called = 1;
      this.bubble();
    }
  }
  selectionCaller() {
    if (called === 0) {
      called = 1;
      this.createBoard();
      this.selection();
    }
  }
  mergeCaller() {
    if (called === 0) {
      called = 1;
      this.createBoard();
      this.mergeRecur(0, length - 1);
    }
  }
  quickCaller() {
    if (called === 0) {
      called = 1;
      this.createBoard();
      this.quickRecur(0, length - 1);
    }
  }
  async mainBubbleBody(i, j, last) {
    if (height[i] > height[j]) {
      exchange++;
      console.log(i, j);
      const arr = this.state.svgArray;
      arr[i] = (
        <svg width={width} height={height[j]}>
          <rect width={width} height={height[j]} className='rectangle' id={String(j)}></rect>;
        </svg>
      );
      if (j === last) {
        arr[j] = (
          <svg width={width} height={height[i]}>
            <rect width={width} height={height[i]} className='rectangle' id={String(i)}></rect>;
          </svg>
        );
      } else {
        arr[j] = (
          <svg width={width} height={height[i]}>
            <rect width={width} height={height[i]} className='rectangle' id={String(i)}></rect>;
          </svg>
        );
      }

      let temp = height[i];
      height[i] = height[j];
      height[j] = temp;
      this.setState({ svgArray: arr });
    }
    await sleep(5 / this.state.speed);
  }
  async mainSelectionBody(a, b) {
    const arr = this.state.svgArray;
    arr[a] = (
      <svg width={width} height={height[b]}>
        <rect width={width} height={height[b]} className='rectangle' id={String(b)}></rect>;
      </svg>
    );
    arr[b] = (
      <svg width={width} height={height[a]}>
        <rect width={width} height={height[a]} className='rectangle' id={String(a)}></rect>;
      </svg>
    );
    let temp = height[a];
    height[a] = height[b];
    height[b] = temp;
    await sleep(20 / this.state.speed);
    this.setState({ svgArray: arr });
  }
  async bubble() {
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        await this.mainBubbleBody(j, j + 1, length - i - 1);
      }
    }
  }
  async selection() {
    for (let i = 0; i < length; i++) {
      let min = height[i],
        min_index = i;
      for (let j = i + 1; j < length; j++) {
        if (height[j] < min) {
          min = height[j];
          min_index = j;
        }
      }
      await this.mainSelectionBody(min_index, i);
    }
  }
  async mergeHelper(beg, last, mid) {
    let lenLeft = mid - beg + 1,
      name,
      lenRight = last - mid;
    let tempLeft = [];
    let tempRight = [];
    const arr = this.state.svgArray;
    for (let i = 0; i < lenLeft; i++) {
      tempLeft.push(height[beg + i]);
    }
    for (let i = 0; i < lenRight; i++) {
      tempRight.push(height[mid + 1 + i]);
    }
    if (lenLeft + lenRight !== length) {
      name = "rectangle-inProg";
    } else {
      name = "rectangle-final";
    }
    let x = 0,
      y = 0,
      height_beg = beg;
    while (x < lenLeft && y < lenRight) {
      if (tempLeft[x] < tempRight[y]) {
        height[height_beg] = tempLeft[x];
        arr[height_beg] = (
          <svg width={width} height={tempLeft[x]}>
            <rect width={width} height={tempLeft[x]} className={name} id={String(height_beg)}></rect>;
          </svg>
        );
        x++;
      } else {
        height[height_beg] = tempRight[y];
        arr[height_beg] = (
          <svg width={width} height={tempRight[y]}>
            <rect width={width} height={tempRight[y]} className={name} id={String(height_beg)}></rect>;
          </svg>
        );
        y++;
      }
      height_beg++;
      await sleep(10 / this.state.speed);
      this.setState({ svgArray: arr });
    }
    while (x < lenLeft) {
      height[height_beg] = tempLeft[x];
      arr[height_beg] = (
        <svg width={width} height={tempLeft[x]}>
          <rect width={width} height={tempLeft[x]} className={name} id={String(height_beg)}></rect>;
        </svg>
      );
      x++;
      height_beg++;
      await sleep(10 / this.state.speed);
      this.setState({ svgArray: arr });
    }
    while (y < lenRight) {
      height[height_beg] = tempRight[y];
      arr[height_beg] = (
        <svg width={width} height={tempLeft[y]}>
          <rect width={width} height={tempLeft[y]} className={name} id={String(height_beg)}></rect>;
        </svg>
      );
      y++;
      height_beg++;
      await sleep(5 / this.state.speed);
      this.setState({ svgArray: arr });
    }
  }
  async mergeRecur(beg, last) {
    if (beg < last) {
      let mid = Math.floor((beg + last) / 2);
      await this.mergeRecur(beg, mid);
      await this.mergeRecur(mid + 1, last);
      await this.mergeHelper(beg, last, mid);
    }
  }
  async quickPartition(beg, last) {
    let pivot = height[last];
    let i = beg - 1,
      temp;
    const arr = this.state.svgArray;
    arr[last] = (
      <svg width={width} height={height[last]}>
        <rect width={width} height={height[last]} className='rectangle-pivot' id={String(height[last])}></rect>;
      </svg>
    );
    for (let j = beg; j < last + 1; j++) {
      if (height[j] < pivot) {
        i++;
        arr[i] = (
          <svg width={width} height={height[j]}>
            <rect width={width} height={height[j]} className='rectangle' id={String(height[j])}></rect>;
          </svg>
        );
        arr[j] = (
          <svg width={width} height={height[i]}>
            <rect width={width} height={height[i]} className='rectangle' id={String(height[i])}></rect>;
          </svg>
        );
        temp = height[j];
        height[j] = height[i];
        height[i] = temp;
        await sleep(10 / this.state.speed);
        this.setState({ svgArray: arr });
      }
    }
    arr[last] = (
      <svg width={width} height={height[i + 1]}>
        <rect width={width} height={height[i + 1]} className='rectangle' id={String(height[i + 1])}></rect>;
      </svg>
    );
    arr[i + 1] = (
      <svg width={width} height={height[last]}>
        <rect width={width} height={height[last]} className='rectangle' id={String(height[last])}></rect>;
      </svg>
    );
    temp = height[last];
    height[last] = height[i + 1];
    height[i + 1] = temp;
    await sleep(10 / this.state.speed);
    this.setState({ svgArray: arr });
    return i + 1;
  }
  async quickRecur(beg, last) {
    let part;
    if (beg < last) {
      part = await this.quickPartition(beg, last);
      await this.quickRecur(beg, part - 1);
      await this.quickRecur(part + 1, last);
    }
  }
  createBoard() {
    console.log(length, width);
    height = [];
    for (let i = 0; i < length; i++) {
      height.push(Math.floor(Math.random() * 500));
    }
    let svgArray = [];
    for (let i = 0; i < length; i++) {
      svgArray.push(
        <svg width={width} height={height[i]} key={i}>
          <rect width={width} height={height[i]} className='rectangle' id={String(i)}></rect>
        </svg>
      );
    }
    console.log("created new board");
    this.setState({ svgArray: svgArray, start: false });
  }
  componentDidMount() {
    this.createBoard();
  }
  componentDidUpdate() {
    lenButtons.forEach((id) => {
      const element = document.getElementById(id);
      if (id !== `len${length}` && element) {
        element.style = "";
      } else if (element) {
        element.style = "background-color:#d30000;color:#f9c74f";
      }
    });
    speedButtons.forEach((id) => {
      const element = document.getElementById(id);
      if (id !== `x${this.state.speed}` && element) {
        element.style = "";
      } else if (element) {
        element.style = "background-color:#d30000;color:#f9c74f";
      }
    });
  }
  render() {
    let options, button, radio;
    if (this.props.algo.length !== 0) {
      radio = (
        <div className='radio-div'>
          <div className='length-div'>
            <h3>Length of the Array</h3>
            <button onClick={this.setLength} id='len50'>
              50
            </button>
            <button onClick={this.setLength} id='len100'>
              100
            </button>
            <button onClick={this.setLength} id='len200'>
              200
            </button>
            <button onClick={this.setLength} id='len300'>
              300
            </button>
            <button onClick={this.setLength} id='len400'>
              400
            </button>
            <button onClick={this.setLength} id='len500'>
              500
            </button>
          </div>
          <div className='speed-div'>
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
            <button onClick={this.setSpeed} id='x5'>
              5X
            </button>
          </div>
        </div>
      );

      if (this.props.algo === "bubble") {
        options = <div></div>;
        board = this.state.svgArray;
        if (this.props.start) {
          radio = <div></div>;
          this.bubbleCaller();
        }
      } else if (this.props.algo === "selection") {
        options = <div></div>;
        board = this.state.svgArray;

        if (this.props.start) {
          radio = <div></div>;
          this.selectionCaller();
        }
      } else if (this.props.algo === "merge") {
        options = <div></div>;
        board = this.state.svgArray;
        if (this.props.start) {
          radio = <div></div>;
          this.mergeCaller();
        }
      } else if (this.props.algo === "quick") {
        options = <div></div>;
        board = this.state.svgArray;
        if (this.props.start) {
          radio = <div></div>;
          this.quickCaller();
        }
      }
    } else {
      board = <div></div>;
      button = <div></div>;
      options = (
        <div className='sort-option-container'>
          <div onClick={this.clickAlgo} id='quick' className='sort-option'>
            <h3 onClick={this.clickAlgo} id='quick'>
              Quick Sort
            </h3>
            <Loader loaded={this.state.loaded} color='#f0f3bd'></Loader>
            <img
              src={QuickImage}
              width='100px'
              height='auto'
              onClick={this.clickAlgo}
              id='quick'
              onLoad={() => {
                this.setState({ loaded: true });
              }}
            />
            <p onClick={this.clickAlgo} id='quick'>
              This section visualizes a comparison based sort in which a partition is made and the then the elements to the left and right
              of the partition are sorted separately
              <span>Time Complexity: O(n*log(n)) </span>
            </p>
          </div>
          <div onClick={this.clickAlgo} id='merge' className='sort-option'>
            <h3 onClick={this.clickAlgo} id='merge'>
              Merge Sort
            </h3>
            <Loader loaded={this.state.loaded} color='#f0f3bd'></Loader>
            <img
              src={MergeImage}
              width='100px'
              height='auto'
              onClick={this.clickAlgo}
              id='merge'
              onLoad={() => {
                this.setState({ loaded: true });
              }}
            />
            <p onClick={this.clickAlgo} id='merge'>
              This section visualizes a comparison based sort in which the array is divided into two parts recursively and merged at every
              point
              <span>Time Complexity: O(n*log(n)) </span>
            </p>
          </div>
          <div onClick={this.clickAlgo} id='bubble' className='sort-option'>
            <h3 onClick={this.clickAlgo} id='bubble'>
              Bubble Sort
            </h3>
            <Loader loaded={this.state.loaded} color='#f0f3bd'></Loader>
            <img
              src={BubbleImage}
              width='100px'
              height='auto'
              onClick={this.clickAlgo}
              id='bubble'
              onLoad={() => {
                this.setState({ loaded: true });
              }}
            />
            <p onClick={this.clickAlgo} id='bubble'>
              This section visualizes a comparison based sort in which the largest element bubbles to the top{" "}
              <span>Time Complexity: O(n^2) </span>
            </p>
          </div>
          <div onClick={this.clickAlgo} id='selection' className='sort-option'>
            <h3 onClick={this.clickAlgo} id='selection'>
              Selection Sort
            </h3>
            <Loader loaded={this.state.loaded} color='#f0f3bd'></Loader>
            <img
              src={SelectionImage}
              width='100px'
              height='auto'
              onClick={this.clickAlgo}
              id='selection'
              onLoad={() => {
                this.setState({ loaded: true });
              }}
            />
            <p onClick={this.clickAlgo} id='selection'>
              This section visualizes a comparison based sort in which one element is selected and placed at the right position in a single
              iteration<span>Time Complexity: O(n^2) </span>
            </p>
          </div>
        </div>
      );
    }
    return (
      <div className='board-container' id='sort-board'>
        {options}
        <div className='sort-container'>{board}</div>
        {radio}
      </div>
    );
  }
}
