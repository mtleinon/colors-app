import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Palette from './Palette';
import seedColors from './seedColors';
import PaletteList from './PaletteList';
import generatePalette from './colorHelpers';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import Page from './Page';

class App extends React.Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
    this.state = {
      palettes:
        savedPalettes && savedPalettes.length > 0 ? savedPalettes : seedColors
    };
  }
  saveToLocalStorage() {
    window.localStorage.setItem(
      'palettes',
      JSON.stringify(this.state.palettes)
    );
  }
  savePalette = newPalette => {
    this.setState(
      state => ({ palettes: [...state.palettes, newPalette] }),
      this.saveToLocalStorage
    );
  };
  deletePalette = paletteId => {
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
      <Route
        render={({ location }) => (
          <TransitionGroup>
            <CSSTransition key={location.key} classNames="page" timeout={500}>
              <Switch location={location}>
                <Route
                  exact
                  path="/palette/new"
                  render={routeProps => (
                    <Page>
                      <NewPaletteForm
                        savePalette={this.savePalette}
                        palettes={this.state.palettes}
                        {...routeProps}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/palette/:id"
                  render={routeProps => (
                    <Page>
                      <Palette
                        palette={generatePalette(
                          this.findPalette(routeProps.match.params.id)
                        )}
                      />
                    </Page>
                  )}
                />
                <Route
                  exact
                  path="/palette/:paletteId/:colorId"
                  render={routeProps => (
                    <Page>
                      <SingleColorPalette
                        palette={generatePalette(
                          this.findPalette(routeProps.match.params.paletteId)
                        )}
                        {...routeProps}
                      />
                    </Page>
                  )}
                />
                {/* Render palette list if no route matches */}
                <Route
                  render={routeProps => (
                    <Page>
                      <PaletteList
                        palettes={this.state.palettes}
                        deletePalette={this.deletePalette}
                        routeProps={routeProps}
                      />
                    </Page>
                  )}
                />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    );
  }
}

export default App;
