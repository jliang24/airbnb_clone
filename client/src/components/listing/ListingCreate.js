import React, { Component } from 'react';
import requireAuth from '../requireAuth';
import ListingForm from './ListingForm';
import ListingFormReview from './ListingFormReview';

class ListingCreate extends Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return <ListingFormReview />;
    }
    return <ListingForm />;
  }

  render() {
    return <div> {this.renderContent()} </div>;
  }
}

export default requireAuth(ListingCreate);
