import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Link } from 'react-router-dom';
import styles from './styles/ColorBoxStyles';
import { withStyles } from '@material-ui/styles';

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
    // const isDarkColor = chroma(color).luminance() <= 0.08;
    // const isLightColor = chroma(color).luminance() > 0.5;
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
