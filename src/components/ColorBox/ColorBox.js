import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import './ColorBox.css';

// Utilities
import { CopyToClipboard } from 'react-copy-to-clipboard';

class ColorBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      copied: false,
      tall: this.props.tall
    }

    this.changeCopyState = this.changeCopyState.bind(this);
  }

  changeCopyState() {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500)
    })
  }

  render() {
    const { name, background, id, paletteID, showLink } = this.props;
    const { copied } = this.state;
    const isDarkColor = chroma(background).luminance() <= 0.5;
    const isLightColor = chroma(background).luminance() >= 0.4;

    const link = <Link to={`/palette/${paletteID}/${id}`} onClick={(e) => e.stopPropagation()}>
                   <span className={`see-more ${isLightColor ? "darkText" : "lightText"}`}>MORE</span>
                 </Link>

    return (
      <CopyToClipboard text={background}
                       onCopy={this.changeCopyState}
      >
        <div className={this.state.tall ? "ColorBox tall" : "ColorBox small"}
             style={{
               background: background
             }}

        >

          <div className={`copy-overlay ${copied ? "show" : ""}`}
               style={{
                 background: background
               }}
          ></div>

        <div className={`copy-msg ${copied ? "show" : ""}`}>
            <h1 className={isLightColor ? "darkText" : "lightText"}>copied!</h1>
            <p className={isLightColor ? "darkText" : "lightText"}>{ background }</p>
          </div>

          <div className="copy-container">
            <div className={`box-content ${isDarkColor && "lightText"}`}>
              <span>{name}</span>
            </div>
            <button className={`copy-button ${isLightColor ? "darkText" : "lightText"}`}>Copy</button>
          </div>
          {showLink ? link : "" }
        </div>
      </CopyToClipboard>
    )
  }
}

export default ColorBox;
