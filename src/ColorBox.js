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
    color: props => (chroma(props.color).luminance() < 0.3 ? 'white' : 'black')
  },
  colorName: {
    color: props => (chroma(props.color).luminance() < 0.3 ? 'white' : 'black')
  },
  seeMore: {
    color: props => (chroma(props.color).luminance() < 0.3 ? 'white' : 'black'),
    background: props =>
      chroma(props.color).luminance() < 0.3
        ? 'rgba(255,255,255,.2)'
        : 'rgba(0,0,0,.1)',
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
    color: props => (chroma(props.color).luminance() < 0.3 ? 'white' : 'black'),
    background: props =>
      chroma(props.color).luminance() < 0.3
        ? 'rgba(255,255,255,.2)'
        : 'rgba(0,0,0,.1)',
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
    fontSize: '1rem',
    lineHeight: '30px',
    textTransform: 'uppercase',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none',
    opacity: '0'
  },
  boxContent: {
    position: 'absolute',
    width: '100%',
    left: '0',
    bottom: '0',
    padding: '10px',
    color: 'black',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px'
  },
  copyOverlay: {
    opacity: '0',
    zIndex: '0',
    width: '100%',
    height: '100%',
    transform: 'scale(.1)',
    transition: 'transform 0.6s ease-in-out'
  },
  showOverlay: {
    opacity: '1',
    transform: 'scale(50)',
    zIndex: '10',
    position: 'absolute'
  },
  copyMsg: {
    position: 'fixed',
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    fontSize: '4rem',
    transform: 'scale(.1)',
    opacity: '0',
    // color: 'white',
    color: props =>
      chroma(props.color).luminance() < 0.08 ? 'white' : 'black',
    background: props =>
      chroma(props.color).luminance() < 0.08
        ? 'rgba(255,255,255,.2)'
        : 'rgba(0,0,0,.1)',

    '& h1': {
      fontWeight: '400',
      textShadow: '1px 2px black',
      background: 'rgba(255,255,255, 0.2)',
      width: '100%',
      textAlign: 'center',
      marginBottom: '0',
      padding: '1rem',
      textTransform: 'uppercase'
    },
    '& p': {
      fontSize: '2rem',
      fontWeight: '100'
    }
  },
  showMessage: {
    opacity: '1',
    transform: 'scale(1)',
    zIndex: '25',
    transition: 'all 0.4s ease-in-out',
    transitionDelay: '0.3s'
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
            className={
              classes.copyOverlay + ' ' + (copied ? classes.showOverlay : '')
            }
          />
          <div
            className={
              classes.copyMsg + ' ' + (copied ? classes.showMessage : '')
            }
          >
            <h1>Copied!</h1>
            <p>{color}</p>
          </div>
          <div>
            <div className={classes.boxContent}>
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
