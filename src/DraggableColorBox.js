import React from 'react';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { SortableElement } from 'react-sortable-hoc';
const styles = {
  root: {
    width: '20%',
    height: '25%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-3.5px',
    '&:hover svg': {
      color: 'white',
      transform: 'scale(1.5)'
    }
  },
  boxContent: {
    position: 'absolute',
    width: '100%',
    left: '0',
    bottom: '0',
    padding: '10px',
    color: 'rgba(0, 0, 0, 0.5)',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  icon: {
    transition: 'all 0.3s ease-in-out'
  }
};

const DraggableColorBox = SortableElement(
  ({ classes, color, handleRemoveColor }) => {
    return (
      <div className={classes.root} style={{ backgroundColor: color.color }}>
        <div className={classes.boxContent}>
          <span>{color.name}</span>
          <DeleteIcon
            onClick={() => handleRemoveColor(color.name)}
            className={classes.icon}
          />
        </div>
      </div>
    );
  }
);
export default withStyles(styles)(DraggableColorBox);