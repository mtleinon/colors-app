import React from 'react';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { SortableElement } from 'react-sortable-hoc';
import styles from './styles/DraggableColorBoxStyles';

function DraggableColorBox({ classes, color, handleRemoveColor }) {
  const h2 = () => {
    handleRemoveColor(color.name);
  };

  return (
    <div className={classes.root} style={{ backgroundColor: color.color }}>
      <div className={classes.boxContent}>
        <span>{color.name}</span>
        <div onClick={h2}>
          <DeleteIcon className={classes.icon} />
        </div>
      </div>
    </div>
  );
}
export default SortableElement(withStyles(styles)(DraggableColorBox));
