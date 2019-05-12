import React, { Component } from 'react';

import Messages from 'components/Messages';
import requireAuth from 'components/requireAuth';
import ListingCards from 'components/Listing/View/ListingCards';
import 'css/accordion.css';

class Home extends Component {
  state = { listingsCollapsed: false, requestsCollapsed: false };

  render() {
    return (
      <div
        style={{
          marginTop: '20px'
        }}
      >
        <h2
          onClick={() => {
            this.setState({ listingsCollapsed: !this.state.listingsCollapsed });
          }}
          className="ui dividing header accord"
        >
          <div className="content">
            <i className="home icon" />
            My Listings
          </div>
          <i className="dropdown icon" />
        </h2>
        <div className={this.state.listingsCollapsed ? 'collapsed' : 'section'}>
          <ListingCards user />
        </div>
        <h2
          onClick={() => {
            this.setState({ requestsCollapsed: !this.state.requestsCollapsed });
          }}
          className="ui dividing header accord"
        >
          <div className="content">
            <i className="envelope open icon" />
            My Requests
          </div>
          <i className="dropdown icon" />
        </h2>
        <div className={this.state.requestsCollapsed ? 'collapsed' : 'section'}>
          <Messages />
        </div>
      </div>
    );
  }
}

export default requireAuth(Home);
