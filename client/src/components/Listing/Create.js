import React, { Component } from 'react';
import { reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux';

import requireAuth from 'components/Util/requireAuth';
import ListingForm from './Form';
import ListingAmenities from './Form/Amenities';
import ListingFormReview from './FormReview';
import * as actions from 'actions';

class ListingCreate extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1
    };
  }

  componentDidUpdate(prevProps) {
    const initializeListing = () => {
      this.props.fetchListing(this.props.match.params.id);
      this.props.dispatch(initialize('listing', this.props.listing));
      this.props.dispatch(initialize('amenities', this.props.amenities));
    };
    if (this.props.match.params.hasOwnProperty('id') && !prevProps.listing) {
      initializeListing();
    }
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  componentWillUnmount() {
    this.props.clearDetails();
    this.props.dispatch(initialize('listing', {}));
    this.props.dispatch(initialize('amenities', {}));
  }

  render() {
    const { page } = this.state;
    return (
      <div>
        {page === 1 && <ListingForm onSubmit={this.nextPage} />}
        {page === 2 && (
          <ListingAmenities
            previousPage={this.previousPage}
            onSubmit={this.nextPage}
          />
        )}
        {page === 3 && <ListingFormReview previousPage={this.previousPage} />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listing: state.details.location,
    amenities: state.details.amenitiesObj
  };
};

ListingCreate = connect(
  mapStateToProps,
  actions
)(ListingCreate);

export default reduxForm({ form: 'listing' })(requireAuth(ListingCreate));
