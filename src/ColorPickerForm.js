import React from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';
// import { withStyles } from '@material-ui/core/styles';
// import Drawer from '@material-ui/core/Drawer';
// import Typography from '@material-ui/core/Typography';
// import Divider from '@material-ui/core/Divider';
// import IconButton from '@material-ui/core/IconButton';
// import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ChromePicker } from 'react-color';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
// import DraggableColorList from './DraggableColorList';
// import arrayMove from 'array-move';
// import PaletteFormNav from './PaletteFormNav';

class ColorPickerForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentColor: 'green',
      newColorName: ''
    };
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isColorNameUnique', value =>
      this.props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule('isColorUnique', value =>
      this.props.colors.every(({ color }) => color !== this.state.currentColor)
    );
  }

  handleColorNameChange = e => {
    this.setState({ newColorName: e.target.value });
  };
  setCurrentColor = color => this.setState({ currentColor: color.hex });

  render() {
    const { classes, paletteIsFull, addNewColor } = this.props;
    const { currentColor, newColorName } = this.state;
    return (
      <div>
        <ChromePicker
          color={currentColor}
          onChangeComplete={this.setCurrentColor}
        />
        <ValidatorForm onSubmit={() => addNewColor(newColorName, currentColor)}>
          <TextValidator
            value={newColorName}
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
              backgroundColor: paletteIsFull ? 'lightGray' : currentColor
            }}
          >
            {paletteIsFull ? 'Palette Full' : 'Add Color'}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}
export default ColorPickerForm;
