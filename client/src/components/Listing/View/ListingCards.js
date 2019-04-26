import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from 'actions';
import detailUtils from 'utils/details';
import { capitalizeFirstLetter, pluralization } from 'utils/text';
import { Link } from 'react-router-dom';

class ListingCards extends Component {
  componentDidMount() {
    this.props.fetchListings();
  }

  renderList() {
    const domainURL = `https://s3-us-west-1.amazonaws.com/airbnb-clone-jeff/`;
    return this.props.listings.map(({ details, pictures, location, _id }) => {
      const renderDetails = () => {
        return detailUtils.keys.map((detail, idx) => {
          const detailValue = details[detail];
          if (detailValue > 0)
            return (
              <div
                className={(idx + 1) % 2 === 0 ? '' : 'column'}
                style={{ padding: '3px 3px' }}
                key={location.title + detail + detailValue}
              >
                <i className={`${detailUtils[detail]} icon`} />{' '}
                {`${details[detail]} ${pluralization(
                  capitalizeFirstLetter(detail),
                  detailValue
                )}`}
              </div>
            );
        });
      };

      const renderPicture = () => {
        if (pictures[0]) return domainURL + pictures[0];
        return 'https://loremflickr.com/2000/2000';
      };

      return (
        <Link
          to={`listings/${_id}`}
          key={location.title + location.cost}
          className="card"
        >
          <div className="image">
            <img src={renderPicture()} />
          </div>
          <div className="content">
            <div className="header">{location.title}</div>
            <div className="meta">
              {location.city}, {location.state}
              <h4 className="right floated">${location.cost}</h4>
            </div>
          </div>
          <div className="extra content">
            <div className="ui two column grid">{renderDetails()}</div>
          </div>
        </Link>
      );
    });
  }

  render() {
    return <div className="ui link four cards">{this.renderList()}</div>;
  }
}

const mapStateToProps = state => {
  return {
    listings: Object.values(state.listings)
  };
};

export default connect(
  mapStateToProps,
  actions
)(ListingCards);
