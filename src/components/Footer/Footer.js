import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  render() {
    const { emoji, paletteName } = this.props;
    return(
      <footer className="Footer">
        {paletteName}
        <span className="emoji">
          {emoji}
        </span>
      </footer>
    )
  }
}

export default Footer;
