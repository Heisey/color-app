import React, { Component } from 'react';
import styles from './FooterStyles';
import { withStyles } from '@material-ui/styles';



class Footer extends Component {
  render() {
    const { classes, emoji, paletteName } = this.props;
    return(
      <footer className={classes.Footer}>
        {paletteName}
        <span className={classes.emoji}>
          {emoji}
        </span>
      </footer>
    )
  }
}

export default withStyles(styles)(Footer);
