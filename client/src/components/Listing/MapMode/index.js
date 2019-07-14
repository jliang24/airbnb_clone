import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchFakeListings } from 'actions';
import Maps from './Maps';
import MapTable from './Table';
import SearchBar from '../View/FilterBox/SearchBar';

const initialState = { lat: 39.529, lng: -119.813 };
class MapMode extends Component {
  constructor(props) {
    super(props);
    this.state = { center: initialState };
  }
  componentDidMount() {
    this.props.fetchFakeListings(this.state.center);
  }

  handleGeocoderSuccess(results) {
    let { lat, lng } = results[0].geometry.location;
    lat = lat();
    lng = lng();
    this.setState({ center: { lat, lng } });
    this.props.fetchFakeListings({ lat, lng });
  }

  handleSearchResult(configs) {
    //This works because google maps has already been added within google maps react component
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: configs.display }, (results, status) => {
      if (status == 'OK') {
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

  render() {
    return (
      <div>
        <SearchBar
          handleSearchResult={configs => this.handleSearchResult(configs)}
        />
        <Maps center={this.state.center} />
        <MapTable moveCenter={(lat, lng) => this.moveCenter(lat, lng)} />
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
  { fetchFakeListings }
)(MapMode);
