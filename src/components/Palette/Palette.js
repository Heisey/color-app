import React, { Component } from 'react';
import './Palette.css';

// Components
import ColorBox from '../ColorBox/ColorBox';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';

class Palette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: 500,
      format: 'hex'
    }

    this.changeLevel = this.changeLevel.bind(this);
    this.changeFormat = this.changeFormat.bind(this);
  }

  changeLevel(newLevel) {
    this.setState({
      level: newLevel
    })
  }

  changeFormat(val) {
    this.setState({ format: val })
  }

  render() {
    const { colors, emoji, id, paletteName } = this.props.palette;
    const { level, format } = this.state;
    const colorBoxes = colors[level].map(color => (
      <ColorBox background={color[format]}
                name={color.name}
                key={color.id}
                id={color.id}
                paletteID={id}
                showLink={true}
      />
    ))
    return (
      <div className="Palette">
        <NavBar level={level}
                changeLevel={this.changeLevel}
                handleChange={this.changeFormat}
                showSlider={true}
        />
        <div className="Palette-colors">
          {colorBoxes}
        </div>
        <Footer paletteName={paletteName}
                emoji={emoji}
        />
      </div>
    )
  }
}

export default Palette;
