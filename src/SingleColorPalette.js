import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';
//import './SingleColorPalette.css';
import Navbar from './Navbar';
export default class SingleColorPalette extends Component {
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

    const colorBoxes = this._shades.map(color => (
      <ColorBox
        key={color.name}
        name={color.name}
        color={color[format]}
        showLink={false}
      />
    ));
    return (
      <div className="Palette">
        <Navbar
          showLevelSlider={false}
          format={format}
          changeFormat={this.changeFormat}
        />
        <div className="SingleColorPalette Palette-colors">
          {colorBoxes}
          <div className="ColorBox go-back">
            <Link to={`/palette/${id}`} className="back-button">
              GO BACK
            </Link>
          </div>
        </div>

        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    );
  }
}
