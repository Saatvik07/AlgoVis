import React from "react";
import { Range } from "react-range";
import "./Recur.css";
import FibImage from "./fibo.png";
import FactImage from "./factorial.png";
import Loader from "react-loader";
let exchange,
  called = 0,
  loaded = true;
const fact = (n) => {
  if (n === 0) {
    return 1;
  } else {
    return n * fact(n - 1);
  }
};
const fib = (n) => {
  if (n === 0 || n === 1) {
    return n;
  } else {
    return fib(n - 1) + fib(n - 2);
  }
};
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export class Recur extends React.Component {
  constructor(props) {
    super(props);
    this.state = { values: [10], loaded: false };
    this.setRecurType = this.setRecurType.bind(this);
  }
  setRecurType(event) {
    called = 0;
    this.props.onOptionClick(event.target.id);
  }
  async factCaller() {
    if (called === 0) {
      called = 1;
      const a = document.getElementById(`recur-div`);
      a.innerHTML = "";
      exchange = 0;
      await this.factorial(this.state.values);
      await sleep(500);
      await this.removeFactorial(this.state.values);
    }
  }
  async fibCaller() {
    if (called === 0) {
      called = 1;
      await this.fibonacci(1);
      await sleep(300);
      await this.fibonacci(0);
    }
  }
  async factorial(n) {
    exchange++;
    if (n === 0) {
      await sleep(500);
      return n;
    } else {
      const a = document.getElementById(`recur-div`);
      let div = document.createElement("div");
      div.id = n;
      div.className = "recur-individual-fact";
      div.innerHTML = `${n} * factorial(${n - 1})`;
      a.appendChild(div);
      await sleep(500);
      return n * (await this.factorial(n - 1));
    }
  }
  async removeFactorial(n) {
    const parent = document.getElementById(`recur-div`);
    for (let i = 1; i <= n; i++) {
      const remove = document.getElementById(`${i}`);
      remove.innerHTML = `return ${fact(i)}`;
      remove.className = "recur-individual-leaving";
      await sleep(500);
    }
    await sleep(1000);
    let div = document.createElement("div");
    div.id = exchange + 1;
    div.className = "recur-individual-fact";
    div.innerHTML = `Factorial(${n})=${fact(n)}`;
    parent.innerHTML = "";
    parent.appendChild(div);
  }
  async fibonacci(add) {
    if (add === 1) {
      document.getElementById("fibTree-container").style.display = "block";
      for (let i = 1; i <= 17; i++) {
        if (i !== 14 && i !== 15) {
          document.getElementById(`fibNode${i}`).style = "visibility:visible;animation: appear 0.5s linear;";
          if (document.getElementById(`fibSvg${Math.floor(i / 2)}-${i}`)) {
            document.getElementById(`fibSvg${Math.floor(i / 2)}-${i}`).style = "visibility:visible;animation: appear 0.5s linear;";
          }
          await sleep(500);
        }
      }
    } else {
      for (let i = 17; i >= 1; i--) {
        if (i !== 14 && i !== 15) {
          const node = document.getElementById(`fibNode${i}`);
          const num = Number.parseInt(node.innerText.slice(4, -1), 10);
          node.innerText = fib(num);
          node.style = "visibility:visible;background-color:green;color:yellow;font-weight:bold;animation: disappearFib 0.5s linear;";
          /*if (document.getElementById(`fibSvg${Math.floor(i / 2)}-${i}`)) {
            document.getElementById(`fibSvg${Math.floor(i / 2)}-${i}`).style = "visibility:hidden;animation:disappearSvg 1s linear;";
          }*/
          await sleep(700);
        }
      }
    }
  }
  render() {
    let options, recurDiv, radio;
    if (this.props.algo === "fact") {
      options = <div></div>;
      exchange = 0;
      recurDiv = <div className='recur-div' id='recur-div'></div>;
      radio = (
        <div className='factSlider-div'>
          <h3>Choose n for Factorial(n)</h3>
          <Range
            step={1}
            min={1}
            max={20}
            values={this.state.values}
            onChange={(values) => this.setState({ values })}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "10px",
                  width: "30%",
                  backgroundColor: "#5500a6",
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "30px",
                  width: "30px",
                  backgroundColor: "#240046",
                }}
              />
            )}
          />
          <h3>{this.state.values}</h3>
        </div>
      );
      if (this.props.start) {
        radio = <div></div>;
        this.factCaller(10);
      }
    } else if (this.props.algo === "fib") {
      options = <div></div>;
      radio = <div></div>;
      recurDiv = (
        <div className='fibTree-container' id='fibTree-container'>
          <div className='fibTree-level' id='fibDepth0'>
            <div className='fibNode' id='fibNode1'>
              fib(5)
            </div>
          </div>
          <svg width='220' height='80' id='fibSvg1-2'>
            <line x1='210' y1='5' x2='10' y2='75' />
          </svg>
          <svg width='220' height='80' id='fibSvg1-3'>
            <line x1='10' y1='5' x2='210' y2='75' />
          </svg>
          <div className='fibTree-level' id='fibDepth1'>
            <div className='fibNode' id='fibNode2'>
              fib(4)
            </div>
            <div className='fibNode' id='fibNode3'>
              fib(3)
            </div>
          </div>
          <svg width='100' height='50' id='fibSvg2-4'>
            <line x1='95' y1='5' x2='5' y2='45' />
          </svg>
          <svg width='100' height='50' className='fibSvg4' id='fibSvg2-5'>
            <line x1='5' y1='5' x2='95' y2='45' />
          </svg>
          <svg width='100' height='50' className='fibSvg5' id='fibSvg3-6'>
            <line x1='95' y1='5' x2='5' y2='45' />
          </svg>
          <svg width='100' height='50' id='fibSvg3-7'>
            <line x1='5' y1='5' x2='95' y2='45' />
          </svg>
          <div className='fibTree-level' id='fibDepth2'>
            <div className='fibNode' id='fibNode4'>
              fib(3)
            </div>
            <div className='fibNode' id='fibNode5'>
              fib(2)
            </div>
            <div className='fibNode' id='fibNode6'>
              fib(2)
            </div>
            <div className='fibNode' id='fibNode7'>
              fib(1)
            </div>
          </div>
          <div className='fibConnector489'>
            <svg width='50' height='35' id='fibSvg4-8'>
              <line x1='45' y1='5' x2='5' y2='30' />
            </svg>
            <svg width='50' height='35' id='fibSvg4-9'>
              <line x1='5' y1='5' x2='45' y2='30' />
            </svg>
          </div>
          <div className='fibConnector51011'>
            <svg width='50' height='35' id='fibSvg5-10'>
              <line x1='45' y1='5' x2='5' y2='30' />
            </svg>
            <svg width='50' height='35' id='fibSvg5-11'>
              <line x1='5' y1='5' x2='45' y2='30' />
            </svg>
          </div>
          <div className='fibConnector61213'>
            <svg width='50' height='35' id='fibSvg6-12'>
              <line x1='45' y1='5' x2='5' y2='30' />
            </svg>
            <svg width='50' height='35' id='fibSvg6-13'>
              <line x1='5' y1='5' x2='45' y2='30' />
            </svg>
          </div>
          <div className='fibConnector71415'>
            <svg width='50' height='35' id='fibSvg7-14'>
              <line x1='45' y1='5' x2='5' y2='30' />
            </svg>
            <svg width='50' height='35' id='fibSvg7-15'>
              <line x1='5' y1='5' x2='45' y2='30' />
            </svg>
          </div>

          <div className='fibTree-level' id='fibDepth3'>
            <div className='fibNode' id='fibNode8'>
              fib(2)
            </div>
            <div className='fibNode' id='fibNode9'>
              fib(1)
            </div>
            <div className='fibNode' id='fibNode10'>
              fib(1)
            </div>
            <div className='fibNode' id='fibNode11'>
              fib(0)
            </div>
            <div className='fibNode' id='fibNode12'>
              fib(1)
            </div>
            <div className='fibNode' id='fibNode13'>
              fib(0)
            </div>
            <div className='fibNode' id='fibNode14'>
              9
            </div>
            <div className='fibNode' id='fibNode15'>
              9
            </div>
          </div>
          <div className='fibConnector81617'>
            <svg width='50' height='35' id='fibSvg8-16'>
              <line x1='45' y1='5' x2='5' y2='30' />
            </svg>
            <svg width='50' height='35' id='fibSvg8-17'>
              <line x1='5' y1='5' x2='45' y2='30' />
            </svg>
          </div>
          <div className='fibTree-level' id='fibDepth4'>
            <div className='fibNode' id='fibNode16'>
              fib(1)
            </div>
            <div className='fibNode' id='fibNode17'>
              fib(0)
            </div>
          </div>
        </div>
      );
      if (this.props.start) {
        this.fibCaller();
      }
    } else {
      if (document.getElementById("recur-div")) {
        document.getElementById("recur-div").innerHTML = "";
      }
      radio = <div></div>;
      options = (
        <div className='recur-option-container' id='recur-option-container'>
          <div onClick={this.setRecurType} id='fib' className='recur-option'>
            <h3 onClick={this.setRecurType} id='fib'>
              Fibonacci
            </h3>
            <Loader loaded={this.state.loaded} color='#f0f3bd'></Loader>
            <img
              src={FibImage}
              width='175px'
              height='auto'
              onClick={this.setRecurType}
              id='fib'
              onLoad={() => {
                this.setState({ loaded: true });
              }}
            />

            <p onClick={this.setRecurType} id='fib'>
              This section visualizes a fundamental recursive function given by f(n) = f(n-1) + f(n-2) <span>Time Complexity: O(2^n) </span>
            </p>
          </div>
          <div onClick={this.setRecurType} id='fact' className='recur-option'>
            <h3 onClick={this.setRecurType} id='fact'>
              Factorial
            </h3>
            <Loader loaded={this.state.loaded} color='#f0f3bd'></Loader>
            <img
              src={FactImage}
              width='100px'
              height='auto'
              onClick={this.setRecurType}
              id='fact'
              onLoad={() => {
                this.setState({ loaded: true });
              }}
            />
            <p onClick={this.setRecurType} id='fact'>
              This section visualizes another fundamental recursive function given by f(n) = n*f(n-1) iteration
              <span>Time Complexity: O(n) </span>
            </p>
          </div>
        </div>
      );
    }
    return (
      <div className='recur-container' id='recur-container'>
        {options}
        {recurDiv}
        {radio}
      </div>
    );
  }
}
