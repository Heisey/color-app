import React, { Component } from 'react';
import styles from './MiniPaletteStyles';
import { withStyles } from '@material-ui/styles';


class MiniPalette extends Component {
  render() {
    const { classes, colors, emoji, paletteName } = this.props;
    const paletteColorBoxes =  colors.map(color => (
      <div className={classes.miniBox}
           style={{backgroundColor: color.color}}
           key={ color.name }
      ></div>
    ))
    return (
      <div className={classes.MiniPalette}
           onClick={this.props.handleClick}
      >
        <div className={classes.colors}>
          {paletteColorBoxes}
        </div>
        <h5 className={classes.title}>
          {paletteName} <span className={classes.emoji}>{emoji}</span>
        </h5>
      </div>
    )
  }
}

export default withStyles(styles)(MiniPalette);
