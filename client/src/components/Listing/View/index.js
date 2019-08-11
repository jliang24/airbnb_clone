import React, { Component } from 'react';

import ListingCards from './Cards';
import FilterBox from './FilterBox';
import SearchBar from './FilterBox/SearchBar';

class ListingView extends Component {
  render() {
    return (
      <div className="ui container">
        <SearchBar />
        <FilterBox />
        <ListingCards errorMessage={'No results found. Please try again.'} />
      </div>
    );
  }
}

export default ListingView;
