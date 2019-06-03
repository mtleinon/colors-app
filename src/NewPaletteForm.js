import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';
import uuid from 'uuid';
import DraggableColorList from './DraggableColorList';
import arrayMove from 'array-move';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import styles from './styles/NewPaletteFormStyles';
import seedColors from './seedColors';

class NewPaletteForm extends React.Component {
  static defaultProps = {
    maxColors: 20
  };
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      colors: seedColors[0].colors
    };
  }

  handleRemoveColor = colorName => {
    this.setState(state => ({
      colors: state.colors.filter(color => color.name !== colorName)
    }));
  };

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

  handleClearPalette = () => this.setState({ colors: [] });

  handleAddRandomColor = () => {
    const allColors = this.props.palettes.map(palette => palette.colors).flat();
    let randomColor;
    if (allColors.length > 0) {
      const colorIsInPalette = newColor => {
        return this.state.colors.find(color => color.name === newColor.name);
      };
      do {
        randomColor = allColors[Math.floor(Math.random() * allColors.length)];
      } while (colorIsInPalette(randomColor));
    } else {
      randomColor = { name: 'Grey_' + uuid(), color: '#aaa' };
    }

    this.setState(({ colors }) => ({ colors: [...colors, randomColor] }));
  };

  addNewColor = (name, color) => {
    const newColor = {
      name,
      color
    };
    this.setState(state => ({
      colors: [...state.colors, newColor],
      newColorName: ''
    }));
  };

  handleNewPaletteSubmit = newPaletteData => {
    const newPalette = {
      id: newPaletteData.paletteName.toLowerCase().replace(/ /g, '-'),
      paletteName: newPaletteData.paletteName,
      colors: this.state.colors,
      emoji: newPaletteData.emoji
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
          <div className={classes.container}>
            <Typography gutterBottom variant="h4">
              Design Your Palette
            </Typography>
            <div className={classes.buttons}>
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
            <ColorPickerForm
              // classes={classes}
              paletteIsFull={paletteIsFull}
              addNewColor={this.addNewColor}
              colors={colors}
            />
          </div>
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
            distance={10}
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
