import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './ColorBoxStyles';
import { withStyles } from '@material-ui/styles';

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
    const { background, classes, id, name, paletteID, showLink } = this.props;
    const { copied } = this.state;

    const link = <Link to={`/palette/${paletteID}/${id}`} onClick={(e) => e.stopPropagation()}>
                   <span className={classes.seeMore}>MORE</span>
                 </Link>

    return (
      <CopyToClipboard text={background}
                       onCopy={this.changeCopyState}
      >
        <div className={classes.ColorBox}
             style={{
               background: background
             }}

        >

          <div className={`${classes.copyOverlay} ${copied && classes.showOverlay}`}
               style={{
                 background: background
               }}
          ></div>

        <div className={`${classes.copyMsg} ${copied && classes.showMsg}`}>
            <h1 className={classes.colorName}>copied!</h1>
            <p className={classes.colorPar}>{ background }</p>
          </div>

          <div className="copy-container">
            <div className={classes.boxContent}>
              <span className={classes.copyText}>{name}</span>
            </div>
            <button className={classes.copyButton}>Copy</button>
          </div>
          {showLink ? link : "" }
        </div>
      </CopyToClipboard>
    )
  }
}

export default withStyles(styles)(ColorBox);
