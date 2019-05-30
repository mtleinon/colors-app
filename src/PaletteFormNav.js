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
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 400;
const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '64px'
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  navButtons: {
    display: 'flex'
  }
});

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
            </ValidatorForm>
          </div>
          <Link to="/">
            <Button variant="contained" color="secondary">
              Go Back
            </Button>
          </Link>
        </AppBar>
      </div>
    );
  }
}
export default withStyles(styles, { withTheme: true })(PaletteFormNav);
