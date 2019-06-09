import React, { Component } from 'react';

import ListingCards from './Cards';

class ListingView extends Component {
  render() {
    return (
      <div className="ui container">
        <ListingCards />
      </div>
    );
  }
}

export default ListingView;
