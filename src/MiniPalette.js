import React from 'react';
import { withStyles } from '@material-ui/styles';
import { FormHelperText } from '@material-ui/core';

const styles = {
  root: {
    backgroundColor: 'white',
    border: '1px solid black',
    borderRadius: '5px',
    padding: '0.5rem',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  colors: {
    // display: 'flex',
    // flexWrap: 'wrap',
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
  }
};

function MiniPalette(props) {
  console.log(props);
  const { classes, palette } = props;

  const colorBoxes = palette.colors.map(color => (
    <div
      className={classes.miniColor}
      style={{ backgroundColor: color.color }}
    />
  ));
  return (
    <div
      className={classes.root}
      onClick={() => props.setPaletteRoute(palette.id)}
    >
      <div className={classes.colors}>{colorBoxes}</div>
      <h5 className={classes.title}>
        {palette.paletteName}
        <span className={classes.emoji}>{palette.emoji}</span>
      </h5>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);
