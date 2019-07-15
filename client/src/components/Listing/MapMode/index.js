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
    this.state = { center: initialState, realData: false };
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

  renderButton() {
    return this.state.realData
      ? this.renderFakeButton()
      : this.renderRealButton();
  }

  renderFakeButton() {
    return (
      <button onClick={this.onFakeDataClicked} className="ui small button">
        Use Fake Data
      </button>
    );
  }

  onFakeDataClicked = () => {
    this.props.fetchFakeListings(this.state.center);
    this.setState({ realData: false });
  };

  renderRealButton() {
    return (
      <button onClick={this.onRealDataClicked} className="ui small button">
        Use Real Data
      </button>
    );
  }

  onRealDataClicked = () => {
    this.props.fetchListings();
    this.setState({ realData: true });
  };

  render() {
    return (
      <div>
        <SearchBar
          handleSearchResult={configs => this.handleSearchResult(configs)}
        />
        {this.renderButton()}
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
  { fetchFakeListings, fetchListings }
)(MapMode);