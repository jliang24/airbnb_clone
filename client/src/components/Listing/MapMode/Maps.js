import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import Marker from './Marker';

import 'css/maps.css';

class MapMode extends Component {
  constructor(props) {
    super(props);
    this.defaultMap = {
      center: {
        lat: 39.529,
        lng: -119.813
      },
      zoom: 12
    };

    this.testData = this.createTestdata(5);
  }

  createTestdata(numPoints) {
    let { lat, lng } = this.defaultMap.center;
    const info = [];
    for (let i = 0; i < numPoints; i++) {
      const newLat = lat + i * 0.01;
      const stringId = i.toString();
      info.push({ lat: newLat, lng: lng, listingId: stringId });
    }
    return info;
  }

  createMarkers() {
    const markers = this.testData.map(({ lat, lng, listingId }) => {
      return (
        <Marker
          key={lat}
          lat={lat}
          lng={lng}
          text={lat}
          listingId={listingId}
        />
      );
    });
    return markers;
  }

  render() {
    return (
      <div style={{ height: '800px', width: '80%' }}>
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals
          bootstrapURLKeys={{
            key: 'AIzaSyDDpvoLFlIg5Xn15LQvWAm3bvOOGNLVxXk'
          }}
          defaultCenter={this.defaultMap.center}
          defaultZoom={this.defaultMap.zoom}
        >
          {this.createMarkers()}
        </GoogleMapReact>
      </div>
    );
  }
}

export default MapMode;
