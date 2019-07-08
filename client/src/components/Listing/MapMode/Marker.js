import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateActiveListing, pinListing } from 'actions';

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

const detailStyle = {
  backgroundColor: 'white',
  position: 'absolute',
  bottom: '15px',
  border: '1px solid black',
  width: '200px',
  zIndex: 2
};

const testInfo = {
  guests: 1,
  beds: 1,
  bedrooms: 1,
  baths: 0
};

class Marker extends Component {
  renderCloseButton = () => {
    return (
      <div
        className="detail-close"
        onMouseDown={() => this.props.pinListing('')}
      >
        Close
      </div>
    );
  };
  renderDetails() {
    return (
      <div className="detail-marker" style={detailStyle}>
        Guests: {testInfo.guests}
        {this.renderCloseButton()}
      </div>
    );
  }

  isActiveId = () => {
    return this.props.listingId === this.props.activeId;
  };

  isPinnedId = () => {
    return this.props.listingId === this.props.pinnedId;
  };

  onListingClicked() {
    if (this.props.pinnedId === this.props.listingId) {
      return this.props.pinListing('');
    }
    this.props.pinListing(this.props.listingId);
  }

  render() {
    const style = this.isActiveId() ? hoverStyle : regularStyle;
    return (
      <div>
        {this.isPinnedId() && this.renderDetails()}
        <div
          onMouseEnter={() =>
            this.props.updateActiveListing(this.props.listingId)
          }
          onMouseLeave={() => this.props.updateActiveListing('')}
          onMouseDown={() => this.onListingClicked()}
          style={style}
        >
          {this.props.text}
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
