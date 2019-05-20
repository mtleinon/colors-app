import React, { Component } from 'react';
import './ColorBox.css';

export default class ColorBox extends Component {
  render() {
    return (
      <div style={{ background: this.props.color.color }} className="ColorBox">
        <span>{this.props.color.name}</span>
      </div>
    );
  }
}
