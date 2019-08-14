import React from 'react';
import { withStyles } from '@material-ui/styles';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import styles from './DraggableColorBoxStyles';



function DraggableColorBox(props)  {
  const { classes, color, name } = props;
  return (
    <div className={classes.DraggableColorBox} style={{ backgroundColor: color}} >
      <div className={classes.boxContent}>
        <span>{name}</span>
        <DeleteForeverOutlinedIcon className={classes.deleteIcon}
                                   onClick={props.deleteColor}
        />
      </div>
    </div>
  )
}

export default withStyles(styles)(DraggableColorBox);
