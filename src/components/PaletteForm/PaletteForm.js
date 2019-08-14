import React, { Component } from 'react';

// Assets
import { withStyles } from '@material-ui/core/styles';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

// Material-ui Components
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';

// Components
import DraggableColorBox from '../DraggableColorBox/DraggableColorBox';


const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    height: "calc(100vh - 64px)"
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});











class PaletteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      currentColor: '',
      colorName: '',
      colors: [
        {color: 'lime', name: 'Lime'}
      ]
    }

    this.addColor = this.addColor.bind(this)
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("uniqueColorName", value => (
      this.state.colors.every(({name}) => (
        name.toLowerCase() !== value.toLowerCase()
      ))
    ))

    ValidatorForm.addValidationRule("uniqueColor", value => (
      this.state.colors.every(({color}) => (
        color !== this.state.currentColor
      ))
    ))
  }
  addColor() {
    const newColor = {color: this.state.currentColor, name: this.state.colorName}
    this.setState({ colors: [...this.state.colors, newColor], colorName: ""})
  }

  handleColorChange(newColor) {
    this.setState({currentColor: newColor.hex})
  }

  handleDrawerClose () {
    this.setState({ open: false });
  }

  handleDrawerOpen () {
    this.setState({ open: true });
  }

  handleNameChange(e) {
    this.setState({
      colorName: e.target.value
    })
  }

  render() {
    const { classes } = this.props;
    const { open } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Persistent drawer
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>



          <Divider />

          <Typography variant="h4" color="inherit" noWrap>
            Create New Palette
          </Typography>
          <div>
            <Button variant='contained' color='secondary'>
              Clear Palette
            </Button>
            <Button variant='contained' color='primary'>
              Random Color
            </Button>
          </div>
          <Divider />

          <ChromePicker color={this.state.currentColor}
                        onChangeComplete={this.handleColorChange}
          />
        <ValidatorForm onSubmit={this.addColor}>
            <TextValidator value={this.state.colorName}
                           onChange={this.handleNameChange}
                           validators={["required", "uniqueColorName", "uniqueColor"]}
                           errorMessages={["Enter a Name", "Name in use, select another name!", "You already selected that color"]}
            />
            <Button variant='contained'
                    type="submit"
                    color='mute'
                    style={{ backgroundColor: this.state.currentColor}}
            >
              Add Color
            </Button>
          </ValidatorForm>


        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          {this.state.colors.map(color => (
            <DraggableColorBox color={color.color} name={color.name} />
          ))}
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PaletteForm);
