import React, { Component } from 'react';

import ListingCards from './Cards';
import SearchBar from './SearchBar';

class ListingView extends Component {
  render() {
    return (
      <div className="ui container">
        <SearchBar />
        <ListingCards />
      </div>
    );
  }
}

export default ListingView;
