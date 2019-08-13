import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';

// Components Material-UI
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Select from "@material-ui/core/Select";
import Snackbar from '@material-ui/core/Snackbar';

// Components rc-Slider
import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';

// Custom Styles
import styles from './NavBarStyles';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      format: 'hex',
      open: false
    }

    this.closeSnackBar = this.closeSnackBar.bind(this);
    this.handleFormatChange = this.handleFormatChange.bind(this);
  }

  closeSnackBar() {
    this.setState({ open: false })
  }

  handleFormatChange(e) {
    this.setState({
      format: e.target.value,
      open: true
    })
    this.props.handleChange(e.target.value)
  }

  render() {
    const { changeLevel, classes, level, showSlider } = this.props;
    const { format, open } = this.state;
    const slider =  <div>
                      <span>Level: {level}</span>
                      <div className={classes.slider}>
                        <Slider defaultValue={level}
                                min={100}
                                max={900}
                                step={100}
                                onAfterChange={changeLevel}
                        />
                      </div>
                    </div>
    return(
      <nav className={classes.NavBar}>
        <div className={classes.logo}>
          <Link to="/">
            HMG Color Picker
          </Link>
        </div>
        {showSlider && slider }

        <div className={classes.selectContainer}>
          <Select onChange={this.handleFormatChange}
                  value={format}
          >
            <MenuItem value="hex">HEX = #ffffff</MenuItem>
            <MenuItem value="rgb">RGB = rgb(255, 255, 255)</MenuItem>
            <MenuItem value="rgba">RGBA = rgba(255, 255, 255, 1.0)</MenuItem>
          </Select>
        </div>
        <Snackbar anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'center'
                    }}
                  open={open}
                  autoHideDuration={3000}
                  onClose={this.closeSnackBar}
                  message={
                      <span id='messge-id'>
                        Format Changed to {format.toUpperCase()}!
                      </span>
                    }
                  ContentProps={{
                      "aria-describedby": "messge-id"
                    }}
                  action={[
                    <IconButton onClick={this.closeSnackBar}
                                color='inherit'
                                key='close'
                                aria-label='close'
                    >
                      <CloseIcon />
                    </IconButton>
                  ]}
        />
      </nav>
    )
  }
}

export default withStyles(styles)(NavBar);
