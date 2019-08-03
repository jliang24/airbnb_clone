import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { pinListing } from 'actions';
import detailIcons from 'utils/details';

const detailStyle = {
  backgroundColor: 'white',
  position: 'absolute',
  bottom: '20px',
  width: '250px',
  zIndex: 2,
  left: '25px',
  boxShadow: '2px 2px 10px #817f7f'
};

const markerTableStyle = {
  overflow: 'hidden',
  position: 'absolute',
  boxShadow: '0px 2px 10px #817f7f',
  borderTop: '1px solid #888888',
  maxHeight: 0,
  transition: 'max-height 0.8s cubic-bezier(0, 1, 0, 1)',
  width: '100%'
};

class MarkerDetails extends Component {
  state = { showDetails: false };
  constructor(props) {
    super(props);
    this.domainURL = 'https://s3-us-west-1.amazonaws.com/airbnb-clone-jeff/';
  }

  toggleShowDetails = () => {
    this.setState({ showDetails: !this.state.showDetails });
  };

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

  renderShowButton = () => {
    return (
      <div
        className="detail-close ui basic mini right floated button"
        onMouseDown={this.toggleShowDetails}
      >
        Show Details
      </div>
    );
  };

  renderTableDetails = details => {
    const tableDetails = [];
    for (let detail in details) {
      if (details[detail] === '0') continue;
      tableDetails.push(
        <tr key={detail}>
          <td style={{ textTransform: 'uppercase' }}>
            <i className={`${detailIcons[detail]} icon`} />
            {detail}
          </td>
          <td>{details[detail]}</td>
        </tr>
      );
    }
    return tableDetails;
  };

  renderTable(details, id) {
    return (
      <div
        className={this.state.showDetails ? 'animate-table' : ''}
        style={markerTableStyle}
      >
        <table className="ui single line table">
          <tbody>
            {this.renderTableDetails(details)}
            <tr>
              <td colspan="2">
                <Link
                  style={{ width: '100%' }}
                  className="ui right floated primary button"
                  to={`/listings/${id}`}
                >
                  View Listing
                  <i className="right chevron icon" />
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    const listing = this.props.listing;

    return (
      <div className="detail-marker" style={detailStyle}>
        <img
          className="image"
          src={
            this.domainURL + listing.pictures[0] ||
            `http://lorempixel.com/250/250/city/${this.props.idx}`
          }
          style={{ height: '250px', width: '250px' }}
        />
        <div className="detail-description">
          <div className="header">{listing.location.title} </div>
          {this.renderCloseButton()}
          {this.renderShowButton()}
        </div>
        {this.renderTable(listing.details, listing._id)}
      </div>
    );
  }
}

export default connect(
  null,
  { pinListing }
)(MarkerDetails);
