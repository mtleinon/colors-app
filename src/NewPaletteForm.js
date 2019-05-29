import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ChromePicker } from 'react-color';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import DraggableColorList from './DraggableColorList';
import arrayMove from 'array-move';
import PaletteFormNav from './PaletteFormNav';

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
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
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
});

class NewPaletteForm extends React.Component {
  static defaultProps = {
    maxColors: 20
  };
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      currentColor: 'blue',
      colors: props.palettes[0].colors,
      newColorName: ''
      // newPaletteName: ''
    };
  }
  handleColorNameChange = e => {
    this.setState({ newColorName: e.target.value });
  };
  // handlePaletteNameChange = e => {
  //   this.setState({ newPaletteName: e.target.value });
  // };
  handleRemoveColor = colorName => {
    this.setState(state => ({
      colors: state.colors.filter(color => color.name !== colorName)
    }));
  };
  componentDidMount() {
    ValidatorForm.addValidationRule('isColorNameUnique', value =>
      this.state.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );
    // ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
    //   this.props.palettes.every(
    //     ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
    //   )
    // );
    ValidatorForm.addValidationRule('isColorUnique', value =>
      this.state.colors.every(({ color }) => color !== this.state.currentColor)
    );
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex)
    }));
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  setCurrentColor = color => this.setState({ currentColor: color.hex });

  handleClearPalette = () => this.setState({ colors: [] });

  handleAddRandomColor = () => {
    const allColors = this.props.palettes.map(palette => palette.colors).flat();
    let randomColor;
    const colorIsInPalette = newColor => {
      return this.state.colors.find(color => color.name === newColor.name);
    };
    do {
      randomColor = allColors[Math.floor(Math.random() * allColors.length)];
    } while (colorIsInPalette(randomColor));
    this.setState(({ colors }) => ({ colors: [...colors, randomColor] }));
  };

  addNewColor = () => {
    const newColor = {
      name: this.state.newColorName,
      color: this.state.currentColor
    };
    this.setState(state => ({
      colors: [...state.colors, newColor],
      newColorName: ''
    }));
  };

  handleNewPaletteSubmit = newPaletteName => {
    const newPalette = {
      id: newPaletteName.toLowerCase().replace(/ /g, '-'),
      paletteName: newPaletteName,
      colors: this.state.colors,
      emoji: 'TEST'
    };
    this.props.savePalette(newPalette);
    this.props.history.push('/');
  };
  render() {
    const { classes, maxColors } = this.props;
    const { open, colors } = this.state;
    const paletteIsFull = colors.length >= maxColors;
    return (
      <div className={classes.root}>
        <PaletteFormNav
          classes={classes}
          handleNewPaletteSubmit={this.handleNewPaletteSubmit}
          handleDrawerOpen={this.handleDrawerOpen}
          palettes={this.props.palettes}
          newPaletteName={this.state.newPaletteName}
          open={open}
        />
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <Typography variant="h4">Design Your Palette</Typography>
          <div>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={this.handleClearPalette}
            >
              Clear Palette
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={paletteIsFull}
              className={classes.button}
              onClick={this.handleAddRandomColor}
            >
              {paletteIsFull ? 'Palette Full' : 'Random Color'}
            </Button>
          </div>
          <ChromePicker
            color={this.state.currentColor}
            onChangeComplete={this.setCurrentColor}
          />
          <ValidatorForm onSubmit={this.addNewColor}>
            <TextValidator
              value={this.state.newColorName}
              name="newColorName"
              onChange={this.handleColorNameChange}
              validators={['required', 'isColorNameUnique', 'isColorUnique']}
              errorMessages={[
                'color name must be given',
                'color name must be unique',
                'color must be unique'
              ]}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={paletteIsFull}
              className={classes.button}
              style={{
                backgroundColor: paletteIsFull
                  ? 'lightGray'
                  : this.state.currentColor
              }}
            >
              {paletteIsFull ? 'Palette Full' : 'Add Color'}
            </Button>
          </ValidatorForm>
          {/* <Divider /> */}
        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />
          <DraggableColorList
            colors={this.state.colors}
            handleRemoveColor={this.handleRemoveColor}
            axis="xy"
            onSortEnd={this.onSortEnd}
          />
        </main>
      </div>
    );
  }
}

NewPaletteForm.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
