import React, { Component } from 'react';
import './Palette.css';
import ColorBox from './ColorBox';
export default class Palette extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     palette: ''
  //   };
  // }

  render() {
    return (
      <div className="Palette">
        {/* Navbar goes here */}
        <div className="Palette-colors">
          {this.props.palette.colors.map(color => (
            <ColorBox color={color} />
          ))}
        </div>
        {/* Footer here */}
      </div>
    );
  }
}
