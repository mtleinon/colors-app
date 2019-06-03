import React from 'react';
import Button from '@material-ui/core/Button';
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
    };
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isPaletteNameUnique', value =>
      this.props.palettes.every(({ paletteName }) => {
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

  render() {
    const { stage, newPaletteName } = this.state;
    const { hideSaveForm } = this.props;
    return (
      <div>
        <Dialog open={stage === 'emoji'} onClose={hideSaveForm}>
          <DialogTitle id="form-dialog-title" margin="normal">
            Select Emoji for the palette
          </DialogTitle>
          <DialogContent>
            <Picker onSelect={this.savePalette} />
          </DialogContent>
          <DialogActions>
            <Button onClick={hideSaveForm} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={stage === 'form'}
          onClose={hideSaveForm}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <ValidatorForm onSubmit={this.showEmojiPicker}>
            <DialogContent>
              <DialogContentText>
                To subscribe to this website, please enter your email address
                here. We will send updates occasionally.
              </DialogContentText>
              <TextValidator
                label="Palette Name"
                value={newPaletteName}
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
              <Button onClick={hideSaveForm} color="primary">
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
