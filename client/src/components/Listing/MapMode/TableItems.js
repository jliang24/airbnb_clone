import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateActiveListing, pinListing } from 'actions';

const hoverStyle = {
  backgroundColor: 'pink'
};

const pinnedStyle = {
  backgroundColor: 'orange'
};

class TableItems extends Component {
  constructor(props) {
    super(props);
    this.listingId = props.listing._id;
  }

  onListingHover() {
    this.props.updateActiveListing(this.listingId);
  }

  onListingLeave() {
    this.props.updateActiveListing('');
  }

  onListingClicked() {
    if (this.props.pinnedId === this.listingId) {
      return this.props.pinListing('');
    }
    this.props.moveCenter();
    this.props.pinListing(this.listingId);
  }

  styleToUse() {
    if (this.listingId === this.props.pinnedId) {
      return pinnedStyle;
    } else if (this.listingId === this.props.activeId) {
      return hoverStyle;
    } else return {};
  }

  render() {
    const { title } = this.props.listing.location;

    const style = this.styleToUse();

    // Title
    // Num beds/guests/details
    // Amenities
    // Cost/night bottom right

    return (
      <div
        onMouseDown={() => this.onListingClicked()}
        onMouseLeave={() => this.onListingLeave()}
        onMouseEnter={() => this.onListingHover()}
        style={style}
      >
        <div class="content">
          <a class="header">Rachel</a>
          <div class="description">
            Last seen watching{' '}
            <a>
              <b>Arrested Development</b>
            </a>{' '}
            just now.
          </div>
        </div>
        {title}
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
)(TableItems);
