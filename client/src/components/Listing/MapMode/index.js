import React, { Component } from 'react';
import Maps from './Maps';
import MapTable from './Table';

class MapMode extends Component {
  render() {
    return (
      <div>
        <Maps />
        <MapTable />
      </div>
    );
  }
}

export default MapMode;
