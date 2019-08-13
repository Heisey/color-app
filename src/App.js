import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

// Components
import Palette from './components/Palette/Palette';
import PaletteForm from './components/PaletteForm/PaletteForm';
import PaletteList from './components/PaletteList/PaletteList';
import SingleColorPalette from './components/SingleColorPalette/SingleColorPalette';

// Assets
import seedColors from './assets/seedColors';
import { generatePalette } from './assets/colorHelpers';

import './App.css';

class App extends Component {
  findPalette(id) {
    const seedPalette = seedColors.find(palette => {
      return palette.id === id
    })
    return seedPalette
  }

  render() {
      this.findPalette("flat-ui-colors-v1")
    return (
      <Switch>

        <Route exact
               path="/palette/create"
               render={routeProps => (
                 <PaletteForm />
               )}
        />

        <Route exact
              path="/palette/:id"
              render={routeProps => (
                <Palette palette={generatePalette(
                      this.findPalette(routeProps.match.params.id)
                  )}
                />
              )}
        />

        <Route exact
               path="/palette/:paletteId/:colorId"
               render={routeProps => (
                 <SingleColorPalette palette={generatePalette(
                                       this.findPalette(routeProps.match.params.paletteId)
                                     )}
                                     colorId={routeProps.match.params.colorId}
                 />
               )}
        />

        <Route exact
               path="/"
               render={(routeProps) => <PaletteList palettes={seedColors} {...routeProps} />}
        />



      </Switch>



      // <div>
      //   <Palette palette={generatePalette(seedColors[1])} />
      // </div>
    )
  }
}

export default App;
