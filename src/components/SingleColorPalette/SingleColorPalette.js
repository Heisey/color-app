import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
    height: "90%",
    position: "relative"
  },
  goBack: {
    width: "20%",
    height: "50%",
    margin: "0",
    display: "inline-block",
    position: "absolute",
    cursor: "pointer",
    marginBottom: "-3.5px",
    backgroundColor: "black"
  },

  backButton: {
    width: "100px",
    height: "30px",
    position: "absolute",
    display: "inline-block",
    top: "50%",
    left: "50%",
    marginLeft: "-50px",
    marginTop: "-15px",
    textAlign: "center",
    outline: "none",
    fontSize: "1rem",
    lineHeight: "30px",
    color: "white",
    textTransform: "uppercase",
    border: "none",
    background: "rgba(255, 255, 255, 0.3)"
  },

  buttonText: {
    textDecoration: "none",
    color: "white"
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
    const { emoji, id, paletteName} = this.props.palette

    const colorBoxes = this._shades.map(color => (
      <ColorBox key={color.name}
                name={color.name}
                background={color[format]}
                showLink={false}
                tall={true}
      />
    ))

    return (
      <div className={classes.SingleColorPalette}>
        <NavBar handleChange={this.changeFormat}
                showSlider={false}
        />
        <div className={classes.colorBoxes}>
          {colorBoxes}
          <div className={classes.goBack}>
            <div className={classes.backButton}>
              <Link className={classes.buttonText}
                    to={`/palette/${id}`}
              >
                Go Back
              </Link>
            </div>
          </div>
        </div>
        <Footer paletteName={paletteName}
                emoji={emoji}
        />
      </div>
    )
  }
}

export default withStyles(styles)(SingleColorPalette);
