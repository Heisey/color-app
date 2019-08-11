import React from 'react';

// Components
import Palette from './components/Palette/Palette';

// Assets
import seedColors from './assets/seedColors';
import { generatePalette } from './assets/colorHelpers';

import './App.css';

function App() {
  return (
    <div>
      <Palette palette={generatePalette(seedColors[1])} />
    </div>
  );
}

export default App;
