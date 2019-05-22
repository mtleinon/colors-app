import React from 'react';
import { withStyles } from '@material-ui/styles';

const styles = {
  main: {
    backgroundColor: 'purple',
    border: '3px solid teal'
  },
  secondary: {
    backgroundColor: 'pink',
    '& h1': {
      color: 'red',
      '& span': {
        backgroundColor: 'green'
      }
    }
  }
};

function MiniPalette({ classes }) {
  return (
    <div className={classes.main}>
      <h1>Minipalette</h1>
      <span>Span1</span>
      <section className={classes.secondary}>
        <h1>
          ABC<span>DEF</span>
        </h1>
      </section>
    </div>
  );
}

export default withStyles(styles)(MiniPalette);
