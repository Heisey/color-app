import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class PaletteList extends Component {
  render() {
    const { palettes } = this.props
    return (
      <div className="PaletteList">
        <h1>My Palettes</h1>
        {palettes.map(palette => (
          <Link to={`/palette/${palette.id}`}>
            {palette.paletteName}
          </Link>
        ))}
      </div>
    )
  }
}

export default PaletteList;
