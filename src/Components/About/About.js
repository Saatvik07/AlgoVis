import React from "react";
import "./About.css";
import Loader from "react-loader";
import help from "./help.png";
export class About extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false };
  }
  render() {
    return (
      <div className='about-option-container' id='about-option-container'>
        <div className='about-option-one'>
          <h3>AlgoVis</h3>
          <Loader loaded={this.state.loaded} color='#f0f3bd'></Loader>
          <img
            src={help}
            width='150px'
            height='auto'
            onLoad={() => {
              this.setState({ loaded: true });
            }}
          />
          <p>
            AlgoVis is an algorithm visualizer to help the user visualize algorithms , the user is recommended to read the instructions on
            each card before selecting it and let the visualization be complete before moving on to the next one{" "}
          </p>
        </div>
        <div className='about-option-two'>
          <h3>Credits</h3>
          <p>Developed By: Saatvik Bhatnagar</p>
          <p>
            Logo and Icon Credits
            <br />
            <ol>
              <li>
                <div>
                  Icons made by{" "}
                  <a href='https://www.flaticon.com/authors/bqlqn' title='bqlqn'>
                    bqlqn
                  </a>{" "}
                  <a href='https://www.flaticon.com/authors/surang' title='surang'>
                    surang
                  </a>
                  <a href='https://www.flaticon.com/authors/pixel-perfect' title='Pixel perfect'>
                    Pixel perfect
                  </a>
                  <a href='https://www.flaticon.com/authors/freepik' title='Freepik'>
                    Freepik
                  </a>
                  <a href='https://www.flaticon.com/authors/becris' title='Becris'>
                    Becris
                  </a>
                  from{" "}
                  <a href='https://www.flaticon.com/' title='Flaticon'>
                    www.flaticon.com
                  </a>
                </div>
              </li>
              <li>
                <a href='https://pngtree.com/so/abstract'>abstract png from pngtree.com</a> <a href='https://favpng.com/'>FavPNG</a>{" "}
              </li>
              <li>
                <a target='_blank' href='https://icons8.com/icons/set/tree-structure'>
                  Tree Structure icon
                </a>{" "}
                icon by{" "}
                <a target='_blank' href='https://icons8.com'>
                  Icons8
                </a>
              </li>
              <li>
                Image by{" "}
                <a href='https://pixabay.com/users/NDV-2997446/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1601158'>
                  Nicolás Damián Visceglio
                </a>{" "}
                from{" "}
                <a href='https://pixabay.com/?utm_source=link-attribution&amp;utm_medium=referral&amp;utm_campaign=image&amp;utm_content=1601158'>
                  Pixabay
                </a>
              </li>
              <li>
                Logo made using <a href='https://www.freelogodesign.org/'>Free Logo Design</a>
              </li>
            </ol>
          </p>
        </div>
      </div>
    );
  }
}
