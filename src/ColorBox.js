import React, { Component } from 'react';
import './ColorBox.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import chroma from 'chroma-js';
import { withStyles } from '@material-ui/styles';

const styles = {
  colorBox: {
    width: '20%',
    height: props => (props.showFullPalette ? '25%' : '50%'),
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-4px',
    /* position: absolute below causes space between color boxes. 
       Negative margin removes it */
    '&:hover button': {
      opacity: '1'
    }
  },
  copyText: {
    color: props => (chroma(props.color).luminance() > 0.5 ? 'black' : 'white')
  },
  colorName: {
    color: props => (chroma(props.color).luminance() < 0.08 ? 'white' : 'black')
  },
  seeMore: {
    color: props =>
      chroma(props.color).luminance() < 0.08 ? 'white' : 'black',
    background: 'rgba(255,255,255,.2)',
    position: 'absolute',
    right: '0',
    bottom: '0',
    width: '60px',
    height: '30px',
    textAlign: 'center',
    lineHeight: '30px',
    textTransform: 'uppercase'
  },
  copyButton: {
    color: props =>
      chroma(props.color).luminance() < 0.08 ? 'white' : 'black',
    width: '100px',
    height: '30px',
    position: 'absolute',
    display: 'inline-block',
    top: '50%',
    left: '50%',
    marginLeft: '-50px',
    marginTop: '-15px',
    textAlign: 'center',
    outline: 'none',
    background: 'rgba(255,255,255,.2)',
    fontSize: '1rem',
    lineHeight: '30px',
    textTransform: 'uppercase',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    opacity: '0'
  }
};

class ColorBox extends Component {
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
    const {
      name,
      color,
      moreUrl,
      showLink,
      showFullPalette,
      classes
    } = this.props;
    const { copied } = this.state;
    const isDarkColor = chroma(color).luminance() <= 0.08;
    const isLightColor = chroma(color).luminance() > 0.5;
    return (
      <CopyToClipboard text={color} onCopy={this.changeCopyState}>
        <div style={{ background: color }} className={classes.colorBox}>
          <div
            style={{ background: color }}
            className={`copy-overlay ${copied ? 'show' : ''}`}
          />
          <div className={`copy-msg ${copied ? 'show' : ''}`}>
            <h1 className={isLightColor ? ' dark-text' : ''}>Copied!</h1>
            <p className={classes.copyText}>{color}</p>
          </div>
          <div className="copy-container">
            <div className="box-content">
              <span className={classes.colorName}>{name}</span>
            </div>
            <button className={classes.copyButton}>Copy</button>
          </div>
          {showLink && (
            <Link to={moreUrl} onClick={e => e.stopPropagation()}>
              <span className={classes.seeMore}>More</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox);
