import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
  MiniPalette: {
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: "5px",
    padding: "0.5rem",
    position: "relative",
    overflow: "hidden",
    "&:hover": {
      cursor: "pointer"
    }
  },
  colors: {
    width: "100%",
    height: "150px",
    borderRadius: "5px",
    overflow: "hidden"
  },
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0",
    color: "black",
    paddingTop: "0.5rem",
    fontSize: "1rem",
    position: "relative"
  },
  emoji: {
    marginLeft: "0.5rem",
    fontSize: "1.5rem"
  },
  miniBox: {
    height: "25%",
    width: "20%",
    display: "inline-block",
    margin: "0 auto",
    position: "relative",
    marginBottom: "-3.5px"
  }
}

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
