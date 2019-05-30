import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import MiniPalette from './MiniPalette';
import styles from './styles/PaletteListStyles';
import { Link } from 'react-router-dom';

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
          <div className={classes.palettes}>
            {palettes.map((palette, i) => (
              <MiniPalette
                key={palette.id}
                palette={palette}
                deletePalette={this.props.deletePalette}
                setPaletteRoute={this.setPaletteRoute}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
