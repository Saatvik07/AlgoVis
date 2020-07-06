import React from "react";
import { Nav } from "./Components/Nav/Nav";
import { Board } from "./Components/Board/Board";
import { Sort } from "./Components/Sort/Sort";
import { Recur } from "./Components/Recur/Recurs";
import { About } from "./Components/About/About";
import beginPath from "./Components/Board/beginPath.png";
import beginSort from "./Components/Board/beginSort.png";
import beginRecur from "./Components/Board/beginRecur.png";
import backPath from "./Components/Board/backPath.png";
import backSort from "./Components/Board/backSort.png";
import backRecur from "./Components/Board/backRecur.png";
import mob from "./Components/Board/sorry.png";
import logo from "./Components/Nav/logo.png";
import "./App.css";
let path, sort, recursion, start, mobile, nav, x, footer, about;
export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { type: "about", algo: "", start: false };
    this.onNavBarClick = this.onNavBarClick.bind(this);
    this.onOptionClick = this.onOptionClick.bind(this);
    this.onClickStart = this.onClickStart.bind(this);
    this.onClickBack = this.onClickBack.bind(this);
    this.screenSize = this.screenSize.bind(this);
  }
  onNavBarClick(typeName) {
    this.setState({ type: typeName, algo: "", start: false });
  }
  onOptionClick(optionName) {
    this.setState({ algo: optionName, start: false });
  }
  onClickStart() {
    this.setState({ start: true });
  }
  onClickBack() {
    this.setState({ start: false, algo: "" });
  }
  screenSize(x) {
    if (!x.matches) {
      path = sort = recursion = start = about = <div></div>;
      footer = (
        <footer className='mobile-footer'>
          <p>
            &copy; Copyright 2020 <a href='mailto:saatvik19097@iiitd.ac.in?subject = Feedback&body = Message'>Saatvik Bhatnagar</a>
          </p>
        </footer>
      );
      return (
        <div className='info'>
          <img src={mob} height='200px' width='auto' />
          <div>
            <h3>For better presentation and utility this web app can only be accessed on a PC</h3>
          </div>
          <div className='mobile-logo'>
            <img src={logo} width='200px' height='auto' />
          </div>
        </div>
      );
    } else {
      nav = (
        <div className='navbar' id='navbar'>
          <Nav setType={this.onNavBarClick} type={this.state.type} />
        </div>
      );
    }
  }
  componentDidMount() {
    document.onreadystatechange = function () {
      if (document.readyState !== "complete") {
        document.querySelector("body").style.visibility = "hidden";
        document.querySelector("#loader").style.visibility = "visible";
      } else {
        document.querySelector("#loader").style.display = "none";
        document.querySelector("body").style.visibility = "visible";
      }
    };
  }
  render() {
    if (!this.state.start && this.state.algo !== "") {
      if (this.state.type === "path") {
        start = (
          <img onClick={this.onClickStart} src={beginPath} width='100px' height='100px' style={{ cursor: "pointer", margin: "30px" }} />
        );
      } else if (this.state.type === "sort") {
        start = (
          <img onClick={this.onClickStart} src={beginSort} width='100px' height='100px' style={{ cursor: "pointer", margin: "30px" }} />
        );
      } else if (this.state.type === "recursion") {
        start = (
          <img onClick={this.onClickStart} src={beginRecur} width='100px' height='100px' style={{ cursor: "pointer", margin: "30px" }} />
        );
      }
    } else if (this.state.algo !== "") {
      if (this.state.type === "path") {
        start = (
          <img onClick={this.onClickBack} src={backPath} width='100px' height='100px' style={{ cursor: "pointer", margin: "30px" }} />
        );
      } else if (this.state.type === "sort") {
        start = (
          <img onClick={this.onClickBack} src={backSort} width='100px' height='100px' style={{ cursor: "pointer", margin: "30px" }} />
        );
      } else if (this.state.type === "recursion") {
        start = (
          <img onClick={this.onClickBack} src={backRecur} width='100px' height='100px' style={{ cursor: "pointer", margin: "30px" }} />
        );
      }
    } else {
      start = <div></div>;
    }
    if (this.state.type === "path") {
      about = <div></div>;
      path = <Board start={this.state.start} onOptionClick={this.onOptionClick} algo={this.state.algo} />;
      sort = <div></div>;
      recursion = <div></div>;
      footer = (
        <footer className='path-footer'>
          <p>
            &copy; Copyright 2020 <a href='mailto:saatvik19097@iiitd.ac.in?subject = Feedback&body = Message'>Saatvik Bhatnagar</a>
          </p>
        </footer>
      );
    } else if (this.state.type === "sort") {
      about = <div></div>;
      sort = <Sort start={this.state.start} onOptionClick={this.onOptionClick} algo={this.state.algo} />;
      path = <div></div>;
      recursion = <div></div>;
      footer = (
        <footer className='sort-footer'>
          <p>
            &copy; Copyright 2020 <a href='mailto:saatvik19097@iiitd.ac.in?subject = Feedback&body = Message'>Saatvik Bhatnagar</a>
          </p>
        </footer>
      );
    } else if (this.state.type === "recursion") {
      about = <div></div>;
      recursion = <Recur start={this.state.start} onOptionClick={this.onOptionClick} algo={this.state.algo} />;
      sort = <div></div>;
      path = <div></div>;
      footer = (
        <footer className='recursion-footer'>
          <p>
            &copy; Copyright 2020 <a href='mailto:saatvik19097@iiitd.ac.in?subject = Feedback&body = Message'>Saatvik Bhatnagar</a>
          </p>
        </footer>
      );
    } else {
      recursion = <div></div>;
      sort = <div></div>;
      path = <div></div>;
      about = <About />;
      footer = (
        <footer className='about-footer'>
          <p>
            &copy; Copyright 2020 <a href='mailto:saatvik19097@iiitd.ac.in?subject = Feedback&body = Message'>Saatvik Bhatnagar</a>
          </p>
        </footer>
      );
    }
    x = window.matchMedia("(min-width: 1024px)");
    mobile = this.screenSize(x);
    x.addListener(this.screenSize);
    return (
      <div className='App'>
        {mobile}
        <div>
          {nav}
          {path}
          {sort}
          {recursion}
          {start}
          {about}
        </div>
        {footer}
      </div>
    );
  }
}

export default App;
//<div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
//<div>Icons made by <a href="http://www.dariusdan.com/" title="Darius Dan">Darius Dan</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
//<div>Icons made by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
