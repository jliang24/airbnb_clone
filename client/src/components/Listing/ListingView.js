import React, { Component } from 'react';

import ListingCards from 'components/Listing/View/ListingCards';

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
