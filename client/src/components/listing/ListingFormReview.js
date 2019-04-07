import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Image = styled.img`
  max-height: 350px;
  max-width: 350px;
`;

class ListingFormReview extends Component {
  constructor(props) {
    super(props);
    //test data
    this.listing = {
      'Bed Sheets': true,
      address: 'asiohasd',
      city: 'las vegas',
      cost: '31',
      state: 'arizona',
      zip: '89146'
    };
  }

  renderPictures() {
    console.log(this.listing);
    const domainURL = `https://s3-us-west-1.amazonaws.com/airbnb-clone-jeff/`;
    if (this.props.pictures) {
      return this.props.pictures.map(picture => {
        return <Image key={picture} src={domainURL + picture} />;
      });
    }
  }

  render() {
    return (
      <div>
        <h2>Listing Form Review</h2>
        <h4 className="ui dividing header">Pictures!</h4>
        {this.renderPictures()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listing: state.form.listing,
    pictures: state.pictures,
    details: state.details
  };
};

export default connect(mapStateToProps)(ListingFormReview);
