import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
// import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';
import PaletteMetaForm from './PaletteMetaForm';
import styles from './styles/PaletteFormNavStyles';

class PaletteFormNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      saveFormShowing: false
    };
  }

  showSaveForm = () => {
    this.setState({ saveFormShowing: true });
  };

  hideSaveForm = () => {
    this.setState({ saveFormShowing: false });
  };

  // componentDidMount() {
  //   ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
  //     this.props.palettes.every(({ paletteName }) => {
  //       console.log(paletteName, value);

  //       return paletteName.toLowerCase() !== value.toLowerCase();
  //     })
  //   );
  // }
  // handlePaletteNameChange = e => {
  //   this.setState({ newPaletteName: e.target.value });
  // };
  render() {
    const {
      open,
      handleNewPaletteSubmit,
      handleDrawerOpen,
      classes
    } = this.props;

    return (
      <div>
        <CssBaseline />
        <AppBar
          position="fixed"
          color="default"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Create A Palette
            </Typography>
          </Toolbar>
          <div className={classes.navButtons}>
            <Button
              variant="contained"
              color="primary"
              onClick={this.showSaveForm}
              className={classes.navButton}
            >
              Save
            </Button>
            <Link to="/" className={classes.link}>
              <Button
                variant="contained"
                color="secondary"
                className={classes.navButton}
              >
                Go Back
              </Button>
            </Link>
          </div>
        </AppBar>
        {this.state.saveFormShowing && (
          <PaletteMetaForm
            handleNewPaletteSubmit={handleNewPaletteSubmit}
            palettes={this.props.palettes}
            hideSaveForm={this.hideSaveForm}
          />
        )}
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(PaletteFormNav);
