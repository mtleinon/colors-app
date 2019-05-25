import React, { Component } from 'react';
import './ColorBox.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';

export default class ColorBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      copied: false
    };
  }

  changeCopyState = () => {
    this.setState({ copied: true }, () => {
      setTimeout(() => this.setState({ copied: false }), 1500);
    });
  };

  render() {
    const { name, color, moreUrl, showLink } = this.props;
    const { copied } = this.state;
    const isDarkColor = chroma(color).luminance() <= 0.08;
    const isLightColor = chroma(color).luminance() > 0.5;
    return (
      <CopyToClipboard text={color} onCopy={this.changeCopyState}>
        <div style={{ background: color }} className="ColorBox">
          <div
            style={{ background: color }}
            className={`copy-overlay ${copied ? 'show' : ''}`}
          />
          <div className={`copy-msg ${copied ? 'show' : ''}`}>
            <h1 className={isLightColor ? ' dark-text' : ''}>Copied!</h1>
            <p className={isLightColor ? ' dark-text' : ''}>{color}</p>
          </div>
          <div className="copy-container">
            <div className="box-content">
              <span className={isDarkColor ? 'light-text' : ''}>{name}</span>
            </div>
            <button
              className={'copy-button' + (isLightColor ? ' dark-text' : '')}
            >
              Copy
            </button>
          </div>
          {showLink && (
            <Link to={moreUrl} onClick={e => e.stopPropagation()}>
              <span className={'see-more' + (isLightColor ? ' dark-text' : '')}>
                More
              </span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}
