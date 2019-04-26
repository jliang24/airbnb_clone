import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from 'actions';

class ListingCards extends Component {
  componentDidMount() {
    this.props.fetchListings();
  }

  renderList() {
    return this.props.listings.map(({ details, pictures, location }) => {
      return <div>{details.beds}</div>;
    });
  }

  render() {
    return <div>{this.renderList()}</div>;
  }
}

const mapStateToProps = state => {
  console.log(state.listings);
  return {
    listings: Object.values(state.listings)
  };
};

export default connect(
  mapStateToProps,
  actions
)(ListingCards);
