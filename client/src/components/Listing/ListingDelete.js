import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchListings, deleteListing } from 'actions';

import Modal from 'components/Modal';
import requireAuth from 'components/requireAuth';

class ListingDelete extends Component {
  componentDidMount() {
    this.props.fetchListings(true);
  }

  onDelete = () => {
    this.props.deleteListing(this.props.match.params.id);
    this.props.history.push('/home');
  };

  renderContent = () => {
    if (!this.props.listing) {
      return 'Are you sure you want to delete this listing?';
    }

    return (
      <div
        onClick={e => e.stopPropagation()}
        className="ui standard modal visible active"
      >
        <div className="header">
          Are you sure you want to delete {this.props.listing.location.title}?
        </div>
        <div className="actions">
          <div
            onClick={() => this.props.history.push('/home')}
            className="ui approve button"
          >
            Cancel
          </div>
          <div onClick={this.onDelete} className="ui cancel button">
            Delete
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <Modal
        content={this.renderContent()}
        onDismiss={() => this.props.history.push('/home')}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    listing: state.listings[ownProps.match.params.id]
  };
};

export default connect(
  mapStateToProps,
  { fetchListings, deleteListing }
)(requireAuth(ListingDelete));
