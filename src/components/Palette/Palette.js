import React, { Component } from 'react';
import './Palette.css';
import { generatePalette } from '../../assets/colorHelpers';
import seedColors from '../../assets/seedColors';

// Components
import ColorBox from '../ColorBox/ColorBox';

class Palette extends Component {
  render() {
    console.log(generatePalette(seedColors[4]))
    const colorBoxes = this.props.colors.map(color => (
      <ColorBox background={color.color} name={color.name} />
    ))
    return (
      <div className="Palette">
        <div className="Palette-colors">
          {colorBoxes}
        </div>
      </div>
    )
  }
}

export default Palette;
