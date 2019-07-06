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
        <div className="filterbox ui three column grid">
          <DatesFilter />
          <GuestsFilter />
          <CostFilter />
        </div>
      </div>
    );
  }
}

export default FilterBox;
