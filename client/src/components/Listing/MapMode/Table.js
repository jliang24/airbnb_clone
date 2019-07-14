import React, { Component } from 'react';
import TableItems from './TableItems';
import { connect } from 'react-redux';

class MapTable extends Component {
  render() {
    return this.props.listings.map(listing => {
      const { lat, lng } = listing.location;
      return (
        <TableItems
          moveCenter={() => this.props.moveCenter(lat, lng)}
          key={listing._id}
          listing={listing}
        />
      );
    });
  }
}

const mapStateToProps = state => {
  return {
    listings: Object.values(state.listings)
  };
};

export default connect(mapStateToProps)(MapTable);
