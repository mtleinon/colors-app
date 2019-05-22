import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';

export default class PaletteList extends Component {
  render() {
    return (
      <div>
        <MiniPalette />
        {this.props.palettes.map((palette, i) => (
          <p key={i}>
            <Link to={`/palette/${palette.id}`}>{palette.paletteName}</Link>
          </p>
        ))}
      </div>
    );
  }
}
