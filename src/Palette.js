import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Navbar from './Navbar';
import './Palette.css';

export default class Palette extends Component {
  constructor(props) {
    super(props);

    this.state = {
      level: 500
    };
  }
  changeLevel = level => {
    this.setState({ level });
  };
  render() {
    const { colors } = this.props.palette;
    const { level } = this.state;
    const colorBoxes = colors[level].map(color => (
      <ColorBox color={color.hex} key={color.name} name={color.name} />
    ));
    return (
      <div className="Palette">
        <Navbar level={level} changeLevel={this.changeLevel} />
        <div className="Palette-colors">{colorBoxes}</div>
        {/* Footer here */}
      </div>
    );
  }
}
