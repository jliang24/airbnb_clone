import React, { Component } from 'react';

import SearchBar from './SearchBar';
import DatesFilter from './Dates';
import GuestsFilter from './Guests';
import CostFilter from './Cost';

class FilterBox extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <DatesFilter />
        <GuestsFilter />
        <CostFilter />
      </div>
    );
  }
}

export default FilterBox;
