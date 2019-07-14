import React, { Component } from 'react';

import detailIcons from 'utils/details';

const detailStyle = {
  backgroundColor: 'white',
  position: 'absolute',
  bottom: '130px',
  width: '200px',
  zIndex: 2,
  left: '10px',
  boxShadow: '2px 2px 10px #817f7f'
};

class MarkerDetails extends Component {
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

  renderTable(details) {
    return (
      <table id="marker-table" className="ui celled table">
        <tbody>{this.renderTableDetails(details)}</tbody>
      </table>
    );
  }

  render() {
    const listing = this.props.listing;

    return (
      <div className="detail-marker" style={detailStyle}>
        <img className="image" src={'http://lorempixel.com/200/200/city'} />
        <div class="header">{listing.location.title} </div>
        {this.renderCloseButton()}
        {this.renderTable(listing.details)}
      </div>
    );
  }
}

export default MarkerDetails;
