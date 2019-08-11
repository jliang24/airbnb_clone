import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';

import Marker from './Marker';

import 'css/maps.css';

class MapMode extends Component {
  constructor(props) {
    super(props);
    this.defaultMap = {
      center: { ...props.center },
      zoom: 13
    };
  }

  createMarkers() {
    const markers = this.props.listings.map((listing, idx) => {
      const { lat, lng } = listing.location;

      return (
        <Marker key={lat} lat={lat} lng={lng} listing={listing} idx={idx} />
      );
    });
    return markers;
  }

  handleApiLoaded(map) {
    map.setOptions({ disableDoubleClickZoom: true, gestureHandling: 'greedy' });
  }

  handleMapChange = prop => {
    this.props.refreshCenter(prop.center);
  };

  render() {
    return (
      <div style={{ height: '800px', width: '70%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: 'AIzaSyDDpvoLFlIg5Xn15LQvWAm3bvOOGNLVxXk'
          }}
          yesIWantToUseGoogleMapApiInternals
          center={this.props.center}
          defaultZoom={this.defaultMap.zoom}
          onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded(map, maps)}
          onChange={this.handleMapChange}
        >
          {this.createMarkers()}
        </GoogleMapReact>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listings: Object.values(state.listings)
  };
};

export default connect(mapStateToProps)(MapMode);
