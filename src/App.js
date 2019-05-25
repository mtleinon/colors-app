import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Palette from './Palette';
import seedColors from './seedColors';
import PaletteList from './PaletteList';
import generatePalette from './colorHelpers';
import SingleColorPalette from './SingleColorPalette';

function App() {
  const findPalette = id => seedColors.find(palette => palette.id === id);
  return (
    <Switch>
      <Route
        exact
        path="/"
        render={routeProps => (
          <PaletteList palettes={seedColors} routeProps={routeProps} />
        )}
      />
      <Route
        exact
        path="/palette/:id"
        render={routeProps => (
          <Palette
            palette={generatePalette(findPalette(routeProps.match.params.id))}
          />
        )}
      />
      <Route
        exact
        path="/palette/:paletteId/:colorId"
        render={routeProps => (
          <SingleColorPalette
            palette={generatePalette(
              findPalette(routeProps.match.params.paletteId)
            )}
            {...routeProps}
          />
        )}
      />
    </Switch>
  );
}

export default App;
