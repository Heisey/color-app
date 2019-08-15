import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Assets
import chroma from 'chroma-js';
import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

// Material-ui Components
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';

const styles = {}

class NavBarCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paletteName: '',
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("checkName", value => (
      this.props.palettes.every(({ paletteName }) => (
        paletteName.toLowerCase() !== value.toLowerCase()
      ))
    ))
  }

  handleNameChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit() {
    this.props.handleSubmit(this.state.paletteName)
  }

  render() {

    const { classes, handleDrawerClose, handleDrawerOpen, open } = this.props

    return (
      <div>
        <CssBaseline />
        <AppBar
          position="fixed"
          color="default"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.props.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Persistent drawer
            </Typography>
            <ValidatorForm onSubmit={this.handleSubmit}>
              <TextValidator name="paletteName"
                             value={this.state.paletteName}
                             label="Palette Name"
                             onChange={this.handleNameChange}
                             validators={["required", "checkName"]}
                             errorMessages={["Please enter a name", "That name is in use"]}
              />
              <Button variant="contained"
                      color="primary"
                      type="submit"
              >
                Save Palette
              </Button>
              <Link to="/">
                <Button variant="contained"
                        color="secondary"
                >
                  Go Back
                </Button>
              </Link>
            </ValidatorForm>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

export default withStyles(styles)(NavBarCreate)
