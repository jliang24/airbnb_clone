import React, { Component } from 'react';

import ListingCards from './Cards';
import FilterBox from './FilterBox';

class ListingView extends Component {
  render() {
    return (
      <div className="ui container">
        <FilterBox />
        <ListingCards errorMessage={'No results found. Please try again.'} />
      </div>
    );
  }
}

export default ListingView;
