import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from 'actions';
import detailUtils from 'utils/details';
import { capitalizeFirstLetter, pluralization } from 'utils/text';
import AdminButtons from './AdminButtons';
import history from 'historyObj';

import 'css/listingcards.css';

class ListingCards extends Component {
  state = { title: '', id: '' };

  componentDidMount() {
    const user = this.props.user;
    this.props.fetchListings(user && true);
  }

  componentWillUnmount() {
    this.props.clearListings();
  }

  onDelete(e) {
    e.preventDefault();
    history.push(`/listings/delete/${this.Id}`);
  }

  onEdit(e) {
    e.preventDefault();
    history.push(`/listings/edit/${this.Id}`);
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
          return null;
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
            <img alt={location.title} src={renderPicture()} />
          </div>
          <div className="content">
            <div className="header">{location.title}</div>
            <div className="meta">
              {location.city}, {location.state}
              <h4 className="right floated">${location.cost}</h4>
            </div>
          </div>
          <div
            style={{ margin: '10px 0px', paddingTop: '2px' }}
            className="extra content"
          >
            <div
              style={{ marginLeft: '3px', marginTop: '2px' }}
              className="ui two column grid"
            >
              {renderDetails()}
            </div>
            {this.props.user && (
              <AdminButtons
                onEdit={this.onEdit}
                Id={_id}
                onDelete={this.onDelete}
              />
            )}
          </div>
        </Link>
      );
    });
  }

  determineColumnCount() {
    const clientWidth = document.body.clientWidth;
    switch (true) {
      case clientWidth <= 425:
        return 'one';
      case clientWidth <= 980:
        return 'two';
      default:
        return 'four';
    }
  }

  renderEmptyList() {
    return this.props.listings.length > 0 ? null : (
      <div className="error-card">No results found. Please try again.</div>
    );
  }

  render() {
    //this render function determines if the list is empty. If it is not, short circuits to rendering the list.
    return (
      <div
        id="cardlist"
        style={{ marginTop: '1px' }}
        className={`ui link ${this.determineColumnCount()} cards`}
      >
        {this.renderEmptyList() || this.renderList()}
      </div>
    );
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
