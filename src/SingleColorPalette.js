import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';
import Navbar from './Navbar';
import styles from './styles/SingleColorPaletteStyles';

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this._shades = this.gatherShades(
      this.props.palette,
      this.props.match.params.colorId
    );
    this.state = {
      format: 'hex'
    };
  }

  changeFormat = format => {
    this.setState({ format });
  };

  gatherShades(palette, colorId) {
    let shades = [];
    const allColors = palette.colors;

    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter(color => color.id === colorId)
      );
    }

    return shades.slice(1);
  }

  render() {
    const { format } = this.state;
    const { paletteName, emoji, id } = this.props.palette;
    const { classes } = this.props;
    const colorBoxes = this._shades.map(color => (
      <ColorBox
        key={color.name}
        name={color.name}
        color={color[format]}
        showLink={false}
        showFullPalette={false}
      />
    ));
    return (
      <div className={classes.palette}>
        <Navbar
          showLevelSlider={false}
          format={format}
          changeFormat={this.changeFormat}
        />
        <div className={classes.paletteColors}>
          {colorBoxes}
          <div className={classes.backBox}>
            <Link to={`/palette/${id}`} className={classes.backButton}>
              GO BACK
            </Link>
          </div>
        </div>

        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}

export default withStyles(styles)(SingleColorPalette);
