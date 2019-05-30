import React from 'react';
import { ChromePicker } from 'react-color';
import Button from '@material-ui/core/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/styles';
import styles from './styles/ColorPickerFormStyles';

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
          className={classes.picker}
        />
        <ValidatorForm onSubmit={() => addNewColor(newColorName, currentColor)}>
          <TextValidator
            value={newColorName}
            name="newColorName"
            onChange={this.handleColorNameChange}
            className={classes.colorNameInput}
            placeholder="Color Name"
            variant="filled"
            margin="normal"
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
            className={classes.addColor}
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
export default withStyles(styles)(ColorPickerForm);
