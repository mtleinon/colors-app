import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import seedColors from './seedColors';
import PaletteList from './PaletteList';
import generatePalette from './colorHelpers';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
    let palettes = (this.state = {
      palettes:
        savedPalettes && savedPalettes.length > 0 ? savedPalettes : seedColors
    });
  }
  saveToLocalStorage() {
    window.localStorage.setItem(
      'palettes',
      JSON.stringify(this.state.palettes)
    );
  }
  savePalette = newPalette => {
    console.log(newPalette);
    this.setState(
      state => ({ palettes: [...state.palettes, newPalette] }),
      this.saveToLocalStorage
    );
  };
  deletePalette = paletteId => {
    console.log(paletteId);
    this.setState(
      state => ({
        palettes: state.palettes.filter(palette => palette.id !== paletteId)
      }),
      this.saveToLocalStorage
    );
  };
  findPalette = id => this.state.palettes.find(palette => palette.id === id);

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/palette/new"
          render={routeProps => (
            <NewPaletteForm
              savePalette={this.savePalette}
              palettes={this.state.palettes}
              {...routeProps}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={routeProps => (
            <PaletteList
              palettes={this.state.palettes}
              deletePalette={this.deletePalette}
              routeProps={routeProps}
            />
          )}
        />
        <Route
          exact
          path="/palette/:id"
          render={routeProps => (
            <Palette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
              )}
            />
          )}
        />
        <Route
          exact
          path="/palette/:paletteId/:colorId"
          render={routeProps => (
            <SingleColorPalette
              palette={generatePalette(
                this.findPalette(routeProps.match.params.paletteId)
              )}
              {...routeProps}
            />
          )}
        />
      </Switch>
    );
  }
}

export default App;
