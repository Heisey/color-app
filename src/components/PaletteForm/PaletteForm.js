import React, { Component } from 'react';
import { withStyles } from "@material-ui/styles";

import styles from './PaletteFormStyles';

class PaletteForm extends Component {
  render() {

    const { classes } = this.props;

    return (
      <div className={classes.PaletteForm}>
        hello
      </div>
    )
  }
}

export default withStyles(styles)(PaletteForm);
