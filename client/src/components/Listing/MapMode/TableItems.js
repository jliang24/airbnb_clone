import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateActiveListing, pinListing } from 'actions';

const hoverStyle = {
  backgroundColor: 'pink'
};

class TableItems extends Component {
  onListingHover() {
    this.props.updateActiveListing(this.props.listingId);
  }

  onListingLeave() {
    this.props.updateActiveListing('');
  }

  onListingClicked() {
    if (this.props.pinnedId === this.props.listingId) {
      return this.props.pinListing('');
    }
    this.props.pinListing(this.props.listingId);
  }
  render() {
    const style =
      this.props.activeId === this.props.listingId ? hoverStyle : {};
    return (
      <div
        onMouseDown={() => this.onListingClicked()}
        onMouseLeave={() => this.onListingLeave()}
        onMouseEnter={() => this.onListingHover()}
        style={style}
      >
        This is listing {this.props.listingId}
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
