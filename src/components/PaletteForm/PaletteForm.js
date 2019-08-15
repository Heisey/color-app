import React, { Component } from 'react';

// Assets
import { arrayMove } from 'react-sortable-hoc';
import chroma from 'chroma-js';
import { withStyles } from '@material-ui/core/styles';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

// Material-ui Components
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';

// Components
import DraggableColorList from '../DraggableColorList/DraggableColorList';
import NavBarCreate from '../NavBarCreate/NavBarCreate';


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
      count: this.props.palettes[0].colors.length,
      colors: this.props.palettes[0].colors
    }

    this.addColor = this.addColor.bind(this);
    this.clearColors = this.clearColors.bind(this);
    this.deleteColor = this.deleteColor.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.randomColor = this.randomColor.bind(this);
    this.savePalette = this.savePalette.bind(this);
  }

  componentDidMount() {
    ValidatorForm.addValidationRule("uniqueColorName", value => (
      this.state.colors.every(({ name }) => (
        name.toLowerCase() !== value.toLowerCase()
      ))
    ))

    ValidatorForm.addValidationRule("uniqueColor", value => (
      this.state.colors.every(({ color }) => (
        color !== this.state.currentColor
      ))
    ))
  }

  addColor() {
      const newColor = {color: this.state.currentColor, name: this.state.colorName}
      let count = this.state.count + 1
      this.setState({
        colors: [...this.state.colors, newColor],
        colorName: "",
        count: count})
  }

  clearColors() {
    this.setState({colors: [], count: 0})
  }

  deleteColor(colorName) {
    let count = this.state.count - 1;
    this.setState({
      colors: this.state.colors.filter(color => color.name !== colorName),
      count: count
    })
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
      [e.target.name]: e.target.value
    })
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({colors}) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  };

  randomColor() {
    let count = this.state.count + 1;
    let generate = chroma.random();
    let array = generate._rgb.slice(0, 3)
    const RGB = `rgb(${array[0]}, ${array[1]}, ${array[2]})`
    const newColor = {
      color: RGB,
      name: RGB
    }
    this.setState({ colors: [...this.state.colors, newColor], count: count})
  }

  savePalette(newPaletteName) {
    const newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g, "-"),
      colors: this.state.colors
    }
    this.props.savePalette(newPalette);
    this.props.history.push('/')
  }

  render() {
    const { classes, palettes } = this.props;
    const { open } = this.state;
    let paletteIsFull = this.state.count === 20

    return (
      <div className={classes.root}>
        <NavBarCreate open={open}
                      handleDrawerClose={this.handleDrawerClose}
                      handleDrawerOpen={this.handleDrawerOpen}
                      handleSubmit={this.savePalette}
                      palettes={palettes}
        />
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
            <Button variant='contained'
                    color='secondary'
                    onClick={this.clearColors}
            >
              Clear Palette
            </Button>
            <Button variant='contained'
                    color='primary'
                    disabled={paletteIsFull}
                    onClick={this.randomColor}>
              Random Color
            </Button>
          </div>
          <Divider />

          <ChromePicker color={this.state.currentColor}
                        onChangeComplete={this.handleColorChange}
          />
        <ValidatorForm onSubmit={this.addColor}>
            <TextValidator name="colorName"
                           value={this.state.colorName}
                           onChange={this.handleNameChange}
                           validators={["required", "uniqueColorName", "uniqueColor"]}
                           errorMessages={["Enter a Name", "Name in use, select another name!", "You already selected that color"]}
            />
            <Button variant='contained'
                    type="submit"
                    color='primary'
                    disabled={paletteIsFull}
                    style={{ backgroundColor: paletteIsFull ? "grey" : this.state.currentColor}}
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
          <DraggableColorList colors={this.state.colors}
                              deleteColor={this.deleteColor}
                              axis='xy'
                              onSortEnd={this.onSortEnd}
          />
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PaletteForm);
