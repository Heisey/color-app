import React from 'react';
import { withStyles } from '@material-ui/styles'

const styles = {
  DraggableColorBox: {
    width: "20%",
    margin: "0",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    height: "25%"
  }
}

function DraggableColorBox(props)  {
  // const { classes } = this.props;
  return (
    <div className={props.classes.DraggableColorBox} style={{ backgroundColor: props.color}} >
      {props.name}
    </div>
  )
}

export default withStyles(styles)(DraggableColorBox);
