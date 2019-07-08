import React, { Component } from 'react';
import TableItems from './TableItems';

const testData = ['0', '1', '2', '3', '4'];

class MapTable extends Component {
  render() {
    return testData.map(id => <TableItems listingId={id} />);
  }
}

export default MapTable;
