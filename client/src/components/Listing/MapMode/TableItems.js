import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateActiveListing, pinListing } from 'actions';

const hoverStyle = {
  backgroundColor: 'pink'
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
  render() {
    const { title } = this.props.listing.location;

    const style = this.props.activeId === this.listingId ? hoverStyle : {};

    return (
      <div
        onMouseDown={() => this.onListingClicked()}
        onMouseLeave={() => this.onListingLeave()}
        onMouseEnter={() => this.onListingHover()}
        style={style}
      >
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
