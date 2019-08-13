import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './PaletteListStyles';
import { withStyles } from '@material-ui/styles';

// Components
import MiniPalette from '../MiniPalette/MiniPalette';


class PaletteList extends Component {
  goToPalette(id) {
    this.props.history.push(`/palette/${id}`)
  }
  render() {
    const { palettes, classes } = this.props
    return (
      <div className={classes.PaletteList}>
        <div className={classes.container}>
          <nav className={classes.nav}>
            <h1 className={classes.title}>My Palettes</h1>
            <Link to='./palette/create'>Creae Palette</Link>
          </nav>
          <div className={classes.palettes}>
            {palettes.map(palette => (
              <MiniPalette className={classes.palette}
                           handleClick={() => this.goToPalette(palette.id)}
                           {...palette} />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(PaletteList);
