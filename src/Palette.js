import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import './Palette.css';

export default class Palette extends Component {
  constructor(props) {
    super(props);

    this.state = {
      level: 500,
      format: 'hex'
    };
  }
  changeLevel = level => {
    this.setState({ level });
  };
  changeFormat = format => {
    this.setState({ format });
  };
  render() {
    const { colors, paletteName, emoji, id } = this.props.palette;
    const { format, level } = this.state;
    const colorBoxes = colors[level].map(color => (
      <ColorBox
        color={color[format]}
        key={color.name}
        name={color.name}
        colorId={color.id}
        paletteId={id}
      />
    ));
    return (
      <div className="Palette">
        <Navbar
          format={format}
          level={level}
          changeFormat={this.changeFormat}
          changeLevel={this.changeLevel}
        />
        <div className="Palette-colors">{colorBoxes}</div>
        <footer className="Palette-footer">
          {paletteName}
          <span className="emoji">{emoji}</span>
        </footer>
      </div>
    );
  }
}
