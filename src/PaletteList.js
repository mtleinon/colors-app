import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { withStyles } from '@material-ui/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import MiniPalette from './MiniPalette';
import styles from './styles/PaletteListStyles';

class PaletteList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deleteDialogOpen: false
    };
  }

  closeDeleteDialog = () => {
    this.setState({ deleteDialogOpen: false, deletingPaletteId: '' });
  };
  openDeleteDialog = paletteId => {
    this.setState({ deleteDialogOpen: true, deletingPaletteId: paletteId });
  };
  handleDeletePalette = () => {
    this.props.deletePalette(this.state.deletingPaletteId);
    this.closeDeleteDialog();
  };

  setPaletteRoute = paletteId => {
    this.props.routeProps.history.push('/palette/' + paletteId);
  };
  render() {
    const { palettes, classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <dir className={classes.nav}>
            <h1>React Colors</h1>
            <Link to="/palette/new">CREATE NEW PALETTE</Link>
          </dir>
          <TransitionGroup className={classes.palettes}>
            {palettes.map((palette, i) => (
              <CSSTransition key={palette.id} timeout={500} classNames="fade">
                <MiniPalette
                  key={palette.id}
                  palette={palette}
                  deletePalette={this.openDeleteDialog}
                  setPaletteRoute={this.setPaletteRoute}
                />
              </CSSTransition>
            ))}
          </TransitionGroup>
        </div>
        <Dialog
          open={this.state.deleteDialogOpen}
          onClose={this.closeDialog}
          aria-labelledby="delete-palette-dialog"
        >
          <DialogTitle id="delete-palette-dialog-title">
            Delete this palette?
          </DialogTitle>
          <List>
            <ListItem button onClick={this.handleDeletePalette}>
              <ListItemAvatar>
                {/* According to documentation you should be able to use
                    className and own class to override Material UI default styling:
                  
                       <Avatar className={classes.avatarCheck}> 

                    But actually default styling overrides my own styling.
                    Therefore I set own styling with inline style show below:
                 */}
                <Avatar style={styles.avatarCheck}>
                  <CheckIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Delete" />
            </ListItem>
            <ListItem button onClick={this.closeDeleteDialog}>
              <ListItemAvatar>
                <Avatar style={styles.avatarCancel}>
                  <CloseIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Cancel" />
            </ListItem>
          </List>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(PaletteList);
