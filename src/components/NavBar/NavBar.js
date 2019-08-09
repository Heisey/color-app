import React, { Component } from 'react';
import 'rc-slider/assets/index.css';
import './NavBar.css';
import Slider from 'rc-slider';

class NavBar extends Component {
  render() {
    const { level, changeLevel } = this.props
    return(
      <nav className="NavBar">
        <div className="logo">
          <a href="/">HMG Color Picker</a>
        </div>
        <div className="slider-container">
          <span>Level: {level}</span>
          <div className='slider'>
            <Slider defaultValue={level}
                    min={100}
                    max={900}
                    step={100}
                    onAfterChange={changeLevel}
            />
          </div>
        </div>
      </nav>
    )
  }
}

export default NavBar;
