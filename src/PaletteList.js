import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import MiniPalette from './MiniPalette';
import styles from './styles/PaletteListStyles';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class PaletteList extends Component {
  setPaletteRoute = paletteId => {
    this.props.routeProps.history.push('/palette/' + paletteId);
  };
  render() {
    const { palettes, classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <dir className={classes.nav}>
            <h1>React Colors</h1>
            <Link to="/palette/new">CREATE NEW PALETTE</Link>
          </dir>
          <TransitionGroup className={classes.palettes}>
            {palettes.map((palette, i) => (
              <CSSTransition key={palette.id} timeout={500} classNames="fade">
                <MiniPalette
                  key={palette.id}
                  palette={palette}
                  deletePalette={this.props.deletePalette}
                  setPaletteRoute={this.setPaletteRoute}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
