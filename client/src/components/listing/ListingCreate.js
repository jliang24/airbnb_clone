import React, { Component } from 'react';
import requireAuth from '../requireAuth';
import ListingForm from './ListingForm';
import ListingAmenities from './ListingAmenities';
import ListingFormReview from './ListingFormReview';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class ListingCreate extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 2
    };
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  componentWillUnmount() {
    this.props.clearDetails();
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

ListingCreate = connect(
  null,
  actions
)(ListingCreate);

export default reduxForm({ form: 'listing' })(requireAuth(ListingCreate));
