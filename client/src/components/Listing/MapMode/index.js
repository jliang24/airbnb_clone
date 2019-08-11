import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchFakeListings, fetchListings } from 'actions';
import Maps from './Maps';
import MapTable from './Table';
import SearchBar from '../View/FilterBox/SearchBar';

const initialState = { lat: 39.529, lng: -119.813 };

class MapMode extends Component {
  constructor(props) {
    super(props);
    this.state = { center: initialState, shown: false };
  }

  componentDidMount() {
    this.props.fetchListings();
    // this.props.fetchFakeListings(this.state.center);
  }

  showMap() {
    if (!this.state.shown) {
      this.setState({ shown: true });
    }
  }

  handleGeocoderSuccess([results]) {
    let { lat, lng } = results.geometry.location;
    lat = lat();
    lng = lng();
    this.setState({ center: { lat, lng } });
  }

  handleSearchResult(configs) {
    //This works because google maps has already been added within google maps react component
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: configs.display }, (results, status) => {
      if (status === 'OK') {
        this.showMap();
        this.handleGeocoderSuccess(results);
      } else {
        return;
      }
    });
  }

  moveCenter = (lat, lng) => {
    lat = parseFloat(lat, 10);
    lng = parseFloat(lng, 10);
    this.setState({ center: { lat, lng } });
  };

  refreshCenter = newCenter => {
    if (this.state.center !== newCenter) {
      return this.setState({ center: newCenter });
    }
  };

  isMapShown() {
    const visible = {
      display: 'flex',
      opacity: 1,
      transition: 'all 0.7s ease-in'
    };
    const notVisible = {
      opacity: 0,
      zIndex: -1,
      position: 'relative'
    };
    return this.state.shown ? visible : notVisible;
  }

  render() {
    return (
      <div>
        <SearchBar
          handleSearchResult={configs => this.handleSearchResult(configs)}
        />
        {/* <FilterBox /> */}
        <div style={{ marginTop: '10px', ...this.isMapShown() }}>
          <Maps center={this.state.center} refreshCenter={this.refreshCenter} />
          <MapTable moveCenter={(lat, lng) => this.moveCenter(lat, lng)} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listings: state.listings,
    query: state.searchQuery
  };
};

export default connect(
  mapStateToProps,
  { fetchFakeListings, fetchListings }
)(MapMode);
