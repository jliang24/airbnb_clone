import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchFakeListings } from 'actions';
import Maps from './Maps';
import MapTable from './Table';

class MapMode extends Component {
  componentDidMount() {
    const center = { lat: 39.529, lng: -119.813 };
    this.props.fetchFakeListings(center);
  }
  render() {
    console.log(this.props.listings);
    return (
      <div>
        <Maps />
        <MapTable />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listings: state.listings
  };
};

export default connect(
  mapStateToProps,
  { fetchFakeListings }
)(MapMode);
