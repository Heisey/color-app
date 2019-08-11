import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles'

// Components
import ColorBox from '../ColorBox/ColorBox';

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
    this._shades = this.gatherShades();
    this.gatherShades = this.gatherShades.bind(this);
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
    const colorBoxes = this._shades.map(color => (
      <ColorBox key={color.id}
                name={color.name}
                background={color.hex}
                showLink={false}
      />
    ))

    const { classes } = this.props
    return (
      <div className={classes.SingleColorPalette}>
        <h1>Yo</h1>
        <div className={classes.colorBoxes}>
          {colorBoxes}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(SingleColorPalette);
