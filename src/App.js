import React from 'react';
import Palette from './Palette';
import seedColors from './seedColors';

import generatePalette from './colorHelpers';
function App() {
  const palette = generatePalette(seedColors[0]);
  return (
    <div>
      <Palette palette={seedColors[4]} />
    </div>
  );
}

export default App;
