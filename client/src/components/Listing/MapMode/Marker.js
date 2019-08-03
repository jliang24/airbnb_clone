import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateActiveListing, pinListing } from 'actions';
import MarkerDetails from './MarkerDetails';

const K_SIZE = 40;

const regularStyle = {
  position: 'absolute',
  width: K_SIZE,
  height: K_SIZE,
  left: -K_SIZE / 2,
  top: -K_SIZE / 2,
  border: '5px solid #f44336',
  borderRadius: K_SIZE,
  backgroundColor: 'white',
  textAlign: 'center',
  color: '#3f51b5',
  fontSize: 13,
  fontWeight: 'bold',
  padding: 4,
  cursor: 'pointer'
};

const hoverStyle = {
  ...regularStyle,
  border: '5px solid #3f51b5',
  color: '#f44336'
};

const pinnedStyle = {
  ...regularStyle,
  border: '5px solid orange',
  color: '#f44336'
};

class Marker extends Component {
  constructor(props) {
    super(props);
    this.listingId = props.listing._id;
    this.listing = props.listing;
  }

  isActiveId = () => {
    return this.listingId === this.props.activeId;
  };

  isPinnedId = () => {
    return this.listingId === this.props.pinnedId;
  };

  onListingClicked() {
    if (this.props.pinnedId === this.listingId) {
      return this.props.pinListing('');
    }

    this.props.pinListing(this.listingId);
  }

  styleToUse() {
    if (this.isPinnedId()) {
      return pinnedStyle;
    } else if (this.isActiveId()) {
      return hoverStyle;
    } else return regularStyle;
  }

  render() {
    const listing = this.listing;
    const style = this.styleToUse();

    return (
      <div>
        {this.isPinnedId() && (
          <MarkerDetails listing={listing} idx={this.props.idx} />
        )}
        <div
          className="marker"
          onMouseEnter={() => this.props.updateActiveListing(this.listingId)}
          onMouseLeave={() => this.props.updateActiveListing('')}
          onMouseDown={() => this.onListingClicked()}
          style={style}
        >
          ${listing.location.cost}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    activeId: state.maps.hoveredId,
    pinnedId: state.maps.pinnedId
  };
};

export default connect(
  mapStateToProps,
  { updateActiveListing, pinListing }
)(Marker);
