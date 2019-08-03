import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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

  renderDetails(details) {
    const detailArr = [];
    for (let [detail, detailVal] of Object.entries(details)) {
      if (detailVal === '0') continue;
      const divArr = (
        <div
          key={detail}
          style={{ textTransform: 'capitalize' }}
          className="item"
        >
          {detail} : {detailVal}
        </div>
      );
      detailArr.push(divArr);
    }
    return detailArr;
  }

  render() {
    const { listing } = this.props;
    const { title } = listing.location;
    let roundedCost = Math.floor(listing.location.cost * 100) / 100;

    const style = this.styleToUse();

    // Title
    // Num beds/guests/details
    // Amenities
    // Cost/night bottom right
    // Take me to listing

    return (
      <div
        onMouseDown={() => this.onListingClicked()}
        onMouseLeave={() => this.onListingLeave()}
        onMouseEnter={() => this.onListingHover()}
        style={style}
        className="table-items"
      >
        <b>{title}</b>
        <div>
          <div className="ui horizontal bulleted link list detail meta">
            {this.renderDetails(listing.details)}
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: '10px' }}>
          <div className="item cost">${roundedCost}/Night </div>
          <Link
            to={`/listings/${listing._id}`}
            className="ui tiny secondary basic button"
          >
            View Listing
          </Link>
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
)(TableItems);
