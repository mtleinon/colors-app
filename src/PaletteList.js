import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MiniPalette from './MiniPalette';

export default class PaletteList extends Component {
  render() {
    return (
      <div>
        {this.props.palettes.map((palette, i) => (
          <MiniPalette palette={palette} />
          // <MiniPalette {...palette} />
        ))}
      </div>
    );
  }
}
