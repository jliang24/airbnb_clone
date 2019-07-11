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

  randomGeo(lat, lng, radius) {
    const y0 = lat;
    const x0 = lng;
    const rd = radius / 111300;
    const u = Math.random();
    const v = Math.random();
    const w = rd * Math.sqrt(u);
    const t = 2 * Math.PI * v;
    const x = w * Math.cos(t);
    const y = w * Math.sin(t);

    const newLat = (y + y0).toFixed(5);
    const newLng = (x + x0).toFixed(5);

    return {
      newLat,
      newLng
    };
  }

  createTestdata(numPoints) {
    let { lat, lng } = this.defaultMap.center;
    const info = [];
    for (let i = 0; i < numPoints; i++) {
      const stringId = i.toString();
      const { newLat, newLng } = this.randomGeo(lat, lng, 5000);
      info.push({ lat: newLat, lng: newLng, listingId: stringId });
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
