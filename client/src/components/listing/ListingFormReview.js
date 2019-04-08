import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';
import ImageList from './Images/ImageList';
import NavigateButtons from './NavigateButtons';

class ListingFormReview extends Component {
  constructor(props) {
    super(props);
    //test data
    this.listing = {
      'Bed Sheets': true,
      address: '1900 lindoo rd',
      city: 'las vegas',
      cost: '31',
      state: 'arizona',
      zip: '89146',
      title: "Jeff's amazing house!"
    };
    this.name = {
      first: 'John',
      last: 'Doe'
    };

    this.pictures = [
      {
        original:
          'https://s3-us-west-1.amazonaws.com/airbnb-clone-jeff/5c9ea044e9f71225c96ff4bf/36a9dd8f-9104-404d-8d67-eec890ac8004.jpeg',
        thumbnail:
          'https://s3-us-west-1.amazonaws.com/airbnb-clone-jeff/5c9ea044e9f71225c96ff4bf/36a9dd8f-9104-404d-8d67-eec890ac8004.jpeg'
      },
      {
        original:
          'https://s3-us-west-1.amazonaws.com/airbnb-clone-jeff/5c9ea044e9f71225c96ff4bf/d63b935f-b114-45b1-b48f-62455920c77f.jpeg',
        thumbnail:
          'https://s3-us-west-1.amazonaws.com/airbnb-clone-jeff/5c9ea044e9f71225c96ff4bf/d63b935f-b114-45b1-b48f-62455920c77f.jpeg'
      },
      {
        original:
          'https://s3-us-west-1.amazonaws.com/airbnb-clone-jeff/5c9ea044e9f71225c96ff4bf/b720a256-b3d6-4f29-8c15-ed44db8bc67c.jpeg',
        thumbnail:
          'https://s3-us-west-1.amazonaws.com/airbnb-clone-jeff/5c9ea044e9f71225c96ff4bf/b720a256-b3d6-4f29-8c15-ed44db8bc67c.jpeg'
      }
    ];
    this.state = {
      renderCarousel: false
    };
  }

  renderPictures() {
    // const domainURL = `https://s3-us-west-1.amazonaws.com/airbnb-clone-jeff/`;
    // if (this.props.pictures) {
    //   return this.props.pictures.map(picture => {
    //     return <Image key={picture} src={domainURL + picture} />;
    //   });
    // }
    if (this.state.renderCarousel) {
      return <ImageGallery items={this.pictures} swipeThreshold={30} />;
    }
    return <ImageList images={this.pictures} />;
  }

  renderPictureButton() {
    if (this.state.renderCarousel) {
      return (
        <div
          onClick={() => this.setState({ renderCarousel: false })}
          className="ui right floated primary button"
        >
          Toggle Photo Gallery
        </div>
      );
    }
    return (
      <div
        onClick={() => this.setState({ renderCarousel: true })}
        className="ui right floated primary button"
      >
        Toggle Carousel
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderPictureButton()}
        <h2>Listing Form Preview</h2>
        {this.renderPictures()}
        <h2>{this.listing.title}</h2>
        <h2 className="ui sub header">
          {this.name.first} {this.name.last}
        </h2>
        <NavigateButtons
          onDismiss={this.props.previousPage}
          dismiss="Back"
          submit="Create Listing!"
        />
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
