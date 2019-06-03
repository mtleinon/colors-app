import React from 'react';
import { withStyles } from '@material-ui/styles';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {
  root: {
    backgroundColor: 'white',
    boxShadow: '10px 10px 2px -1px rgba(0,0,0,0.32)',
    border: '1px solid black',
    borderRadius: '5px',
    padding: '0.5rem',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    '&:hover svg': {
      opacity: 1,
      transform: 'scale(1.3)'
    }
  },
  colors: {
    backgroundColor: '#dae1e4',
    height: '150px',
    width: '100%',
    borderRadius: '5px',
    overflow: 'hidden'
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0',
    color: 'black',
    paddingTop: '0.5rem',
    fontSize: '1rem',
    position: 'relative'
  },
  emoji: {
    marginLeft: '0.5rem',
    fontSize: '1.5rem'
  },
  miniColor: {
    height: '25%',
    width: '20%',
    display: 'inline-block',
    position: 'relative',
    margin: '0 auto',
    marginBottom: '-3.5px'
  },
  delete: {
    width: '40px',
    height: '40px',
    padding: '10px',
    position: 'absolute',
    right: '3px',
    top: '0',
    zIndex: 30,
    color: 'white'
  },

  deleteIcon: {
    backgroundColor: '#eb3d30',
    borderRadius: '3px',
    opacity: 0
  }
};

class MiniPalette extends React.PureComponent {
  deletePalette = e => {
    e.stopPropagation();
    this.props.deletePalette(this.props.palette.id);
  };
  render() {
    const { classes, palette, setPaletteRoute } = this.props;

    const colorBoxes = palette.colors.map(color => (
      <div
        key={color.name}
        className={classes.miniColor}
        style={{ backgroundColor: color.color }}
      />
    ));

    return (
      <div className={classes.root} onClick={() => setPaletteRoute(palette.id)}>
        <div className={classes.delete}>
          <DeleteIcon
            onClick={this.deletePalette}
            className={classes.deleteIcon}
            style={{ transition: 'all 0.3s ease-in-out' }}
          />
        </div>
        <div className={classes.colors}>{colorBoxes}</div>
        <h5 className={classes.title}>
          {palette.paletteName}
          <span className={classes.emoji}>{palette.emoji}</span>
        </h5>
      </div>
    );
  }
}

export default withStyles(styles)(MiniPalette);
