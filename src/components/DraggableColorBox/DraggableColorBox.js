import React from 'react';

// Assets
import { SortableElement } from 'react-sortable-hoc';
import { withStyles } from '@material-ui/styles';

// Material-UI Components
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';

// Styles
import styles from './DraggableColorBoxStyles';



const DraggableColorBox = SortableElement((props) => {
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
})

export default withStyles(styles)(DraggableColorBox);
