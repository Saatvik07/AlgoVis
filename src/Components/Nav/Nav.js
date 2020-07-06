import React from "react";
import "./Nav.css";
import logo from "./logo.png";
const arr = ["path", "sort", "recursion", "about"];
export class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.onClickOption = this.onClickOption.bind(this);
  }
  onClickOption(event) {
    this.props.setType(event.target.id);
  }
  render() {
    if (document.getElementById(this.props.type)) {
      if (this.props.type === "path") {
        document.getElementById("nav-container").style.backgroundColor = "#028090";
        arr.forEach((type) => {
          if (type !== this.props.type) {
            document.getElementById(type).style.backgroundColor = "#028090";
          } else {
            document.getElementById(type).style.backgroundColor = "#015762";
          }
        });
      }
      if (this.props.type === "sort") {
        document.getElementById("nav-container").style.backgroundColor = "#6a040f";
        arr.forEach((type) => {
          if (type !== this.props.type) {
            document.getElementById(type).style.backgroundColor = "#6a040f";
          } else {
            document.getElementById(type).style.backgroundColor = "#58030c";
          }
        });
      }
      if (this.props.type === "recursion") {
        document.getElementById("nav-container").style.backgroundColor = "#240046";
        arr.forEach((type) => {
          if (type !== this.props.type) {
            document.getElementById(type).style.backgroundColor = "#240046";
          } else {
            document.getElementById(type).style.backgroundColor = "#16002b";
          }
        });
      }
      if (this.props.type === "about") {
        document.getElementById("nav-container").style.backgroundColor = "#007f5f";
        arr.forEach((type) => {
          if (type !== this.props.type) {
            document.getElementById(type).style.backgroundColor = "#007f5f";
          } else {
            document.getElementById(type).style.backgroundColor = "#52796f";
          }
        });
      }
    }
    return (
      <div class='nav-container' id='nav-container'>
        <div class='path-option'>
          <button onClick={this.onClickOption} className='path-btn' id='path'>
            Path Finding Algorithms{" "}
          </button>
        </div>
        <div class='path-option'>
          <button onClick={this.onClickOption} className='path-btn' id='sort'>
            Sorting Algorithms{" "}
          </button>
        </div>
        <div class='path-option'>
          <button onClick={this.onClickOption} className='path-btn' id='recursion'>
            Recursion{" "}
          </button>
        </div>
        <div class='path-option'>
          <button onClick={this.onClickOption} className='path-btn' id='about'>
            About{" "}
          </button>
        </div>
        <div className='logo-div'>
          <img src={logo} width='80px' height='auto' className='logo' />
        </div>
      </div>
    );
  }
}
