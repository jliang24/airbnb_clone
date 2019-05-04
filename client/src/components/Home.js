import React, { Component } from 'react';
import requireAuth from 'components/requireAuth';
import ListingCards from 'components/Listing/View/ListingCards';

class Home extends Component {
  render() {
    return (
      <div style={{ marginTop: '20px' }}>
        <h2 className="ui dividing header">
          <div className="content">
            <i className="home icon" />
            My Listings
          </div>
        </h2>
        <div className="content">
          <ListingCards user />
        </div>
      </div>
    );
  }
}

export default requireAuth(Home);
