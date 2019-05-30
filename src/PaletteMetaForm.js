import React from 'react';
import Button from '@material-ui/core/Button';
// import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';

export default class PaletteMetaForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newPaletteName: '',
      stage: 'form'
      // open: true
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

  showEmojiPicker = () => {
    this.setState({ stage: 'emoji' });
  };

  handlePaletteNameChange = e => {
    this.setState({ newPaletteName: e.target.value });
  };

  savePalette = emoji => {
    this.props.handleNewPaletteSubmit({
      paletteName: this.state.newPaletteName,
      emoji: emoji.native
    });
  };
  // handleClickOpen = () => {
  //   this.setState({ open: true });
  // };

  // handleClose = () => {
  //   this.setState({ open: false });
  // };

  render() {
    const { stage } = this.state;
    return (
      <div>
        <Dialog open={stage === 'emoji'} onClose={this.props.hideSaveForm}>
          <DialogTitle id="form-dialog-title" margin="normal">
            Select Emoji for the palette
          </DialogTitle>
          <DialogContent>
            <Picker onSelect={this.savePalette} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.hideSaveForm} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={stage === 'form'}
          // open={this.state.open}
          onClose={this.props.hideSaveForm}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <ValidatorForm
            onSubmit={this.showEmojiPicker}
            // onSubmit={() => handleNewPaletteSubmit(this.state.newPaletteName)}
          >
            <DialogContent>
              <DialogContentText>
                To subscribe to this website, please enter your email address
                here. We will send updates occasionally.
              </DialogContentText>
              <TextValidator
                label="Palette Name"
                value={this.state.newPaletteName}
                name="newPaletteName"
                fullWidth
                margin="normal"
                onChange={this.handlePaletteNameChange}
                validators={['required', 'isPaletteNameUnique']}
                errorMessages={[
                  'palette name must be given',
                  'palette name must be unique'
                ]}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.props.hideSaveForm} color="primary">
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Save palette
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    );
  }
}
