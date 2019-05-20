import React, { Component } from 'react';
// import './Palette.css';

export default class Palette extends Component {
  constructor(props) {
    super(props);

    this.state = {
      palette: ''
    };
  }

  render() {
    return (
      <div className="Palette">
        {/* Navbar goes here */}
        <div className="Palette-colors">{/* color boxes here ... */}</div>
        {/* Footer here */}
      </div>
    );
  }
}
