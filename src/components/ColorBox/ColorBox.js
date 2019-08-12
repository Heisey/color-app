import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import './ColorBox.css';
import { withStyles } from '@material-ui/styles';

// Utilities
import { CopyToClipboard } from 'react-copy-to-clipboard';

const luminanceTest = (area, light, test) => {
    const lightTest = chroma(area).luminance()
    let outcome;
    if (test === 'less') {
      if(lightTest <= light) {
        outcome = 'white'
      } else {
        outcome = 'black'
      }
    } else {
      if(lightTest >= light) {
        outcome = 'black'
      } else {
        outcome = 'white'
      }
    }
    return outcome
}

const styles = {

  copyText: {
    color: props => luminanceTest(props.background, 0.4, 'greater')
  },

  colorName: {
    color: props => luminanceTest(props.background, 0.4, 'less')
  }
}

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
    const { background, classes, id, name, paletteID, showLink } = this.props;
    const { copied } = this.state;

    const link = <Link to={`/palette/${paletteID}/${id}`} onClick={(e) => e.stopPropagation()}>
                   <span className={`see-more ${classes.copyText}`}>MORE</span>
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
            <h1 className={classes.colorName}>copied!</h1>
            <p className={classes.copyText}>{ background }</p>
          </div>

          <div className="copy-container">
            <div className={`box-content`}>
              <span className={classes.copyText}>{name}</span>
            </div>
            <button className={`copy-button ${classes.copyText}`}>Copy</button>
          </div>
          {showLink ? link : "" }
        </div>
      </CopyToClipboard>
    )
  }
}

export default withStyles(styles)(ColorBox);
