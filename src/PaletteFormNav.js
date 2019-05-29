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
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

class PaletteFormNav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newPaletteName: ''
    };
  }
  componentDidMount() {
    ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
      this.props.palettes.every(({ paletteName }) => {
        console.log(paletteName, value);

        return paletteName.toLowerCase() !== value.toLowerCase();
      })
    );
  }
  handlePaletteNameChange = e => {
    this.setState({ newPaletteName: e.target.value });
  };
  render() {
    const {
      classes,
      open,
      handleNewPaletteSubmit,
      handleDrawerOpen
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
              Persistent drawer
            </Typography>
            <ValidatorForm
              onSubmit={() => handleNewPaletteSubmit(this.state.newPaletteName)}
            >
              <TextValidator
                label="Palette Name"
                value={this.state.newPaletteName}
                name="newPaletteName"
                onChange={this.handlePaletteNameChange}
                validators={['required', 'isPaletteNameUnique']}
                errorMessages={[
                  'palette name must be given',
                  'palette name must be unique'
                ]}
              />
              <Button variant="contained" color="primary" type="submit">
                Save palette
              </Button>
              <Link to="/">
                <Button variant="contained" color="secondary">
                  Go Back
                </Button>
              </Link>
            </ValidatorForm>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
export default PaletteFormNav;
