import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles'

// Components
import ColorBox from '../ColorBox/ColorBox';
import Footer from '../Footer/Footer';
import NavBar from '../NavBar/NavBar';

const styles = {
  SingleColorPalette: {
    height: "95vh",
    display: "flex",
    flexDirection: "column"
  },
  colorBoxes: {
    height: "90%"
  }
}

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this.state = {
      format: 'hex'
    }
    this._shades = this.gatherShades();
    this.changeFormat = this.changeFormat.bind(this);
    this.gatherShades = this.gatherShades.bind(this);
  }

  changeFormat(val) {
    this.setState({ format: val })
  }

  gatherShades() {
    let shades = [];
    let allColors = this.props.palette.colors;
    for(let key in allColors) {
      shades = shades.concat(
        allColors[key].filter(color => color.id === this.props.colorId)
      )
    }
    return shades.slice(1);
  }
  render() {
    const { format } = this.state;
    const { classes } = this.props;
    const { emoji, paletteName} = this.props.palette

    const colorBoxes = this._shades.map(color => (
      <ColorBox key={color.id}
                name={color.name}
                background={color[format]}
                showLink={false}
      />
    ))

    return (
      <div className={classes.SingleColorPalette}>
        <NavBar handleChange={this.changeFormat}
                showSlider={false}
        />
        <div className={classes.colorBoxes}>
          {colorBoxes}
        </div>
        <Footer paletteName={paletteName}
                emoji={emoji}
        />
      </div>
    )
  }
}

export default withStyles(styles)(SingleColorPalette);
