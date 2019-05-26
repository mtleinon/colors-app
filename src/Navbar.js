import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { withStyles } from '@material-ui/styles';
import styles from './styles/NavbarStyles';

class Navbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      snackBarOpen: false
    };
  }
  closeSnackbar = () => {
    this.setState({ snackBarOpen: false });
  };
  changeFormat = e => {
    this.setState({ snackBarOpen: true });
    this.props.changeFormat(e.target.value);
  };
  render() {
    const { format, level, changeLevel, showLevelSlider, classes } = this.props;
    return (
      <header className={classes.Navbar}>
        <div className={classes.logo}>
          <Link to="/">reactcolorpicker</Link>
        </div>
        {showLevelSlider && (
          <div>
            <span className={classes.level}>Level: {level}</span>
            <div className={classes.slider}>
              <Slider
                defaultValue={level}
                min={100}
                max={900}
                step={100}
                onAfterChange={changeLevel}
              />
            </div>
          </div>
        )}
        <div className={classes.selectContainer}>
          <Select value={format} onChange={this.changeFormat}>
            <MenuItem value="hex">HEX - #ffffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255,255,255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255,255,255,1.0)</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
          open={this.state.snackBarOpen}
          autoHideDuration={3000}
          message={
            <span id="message-id">
              Format Changed to {format.toUpperCase()}
            </span>
          }
          ContentProps={{
            'aria-describedby': 'message-id'
          }}
          onClose={this.closeSnackbar}
          action={[
            <IconButton
              onClick={this.closeSnackbar}
              color="inherit"
              key="close"
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </header>
    );
  }
}
export default withStyles(styles)(Navbar);
