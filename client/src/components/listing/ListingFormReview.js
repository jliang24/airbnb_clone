import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import _ from 'lodash';
import ImageGallery from 'react-image-gallery';
import DatePicker from 'react-datepicker';
import ImageList from './Images/ImageList';
import NavigateButtons from './NavigateButtons';
import ListingDetails from './FormReview/ListingDetails';
import Amenities from './FormReview/Amenities';
import CustomAmenities from './FormReview/CustomAmenities';
import Scheduler from './Scheduler';
import { removeUnavailableDates } from '../../utils/dates';
import 'react-image-gallery/styles/css/image-gallery.css';
import 'react-quill/dist/quill.bubble.css';
import '../../css/datepicker.css';

class ListingFormReview extends Component {
  constructor(props) {
    super(props);

    this.name = {
      first: 'John',
      last: 'Doe'
    };

    this.state = {
      renderCarousel: false
    };
  }

  renderPictures() {
    const domainURL = `https://s3-us-west-1.amazonaws.com/airbnb-clone-jeff/`;
    let imagePics;
    if (this.props.pictures) {
      imagePics = this.props.pictures.map(picture => {
        return {
          original: domainURL + picture,
          thumbnail: domainURL + picture
        };
      });
    }
    if (this.state.renderCarousel) {
      return (
        <div className="dolly800-background">
          <ImageGallery items={imagePics} swipeThreshold={30} />
        </div>
      );
    }
    return <ImageList images={imagePics} />;
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

  renderAmenities() {
    if (
      _.values(this.props.amenities).every(value => value === false) ||
      _.isEmpty(this.props.amenities)
    )
      return null;
    return (
      <div className="column field">
        <h3 className="ui dividing header">Amenities</h3>
        <Amenities />
        <CustomAmenities />
      </div>
    );
  }

  onCreateListingClicked() {
    console.log('hey');
  }

  render() {
    const { includedDates, unavailableDates } = this.props.details;

    return (
      <div>
        {this.renderPictures()}
        {this.renderPictureButton()}
        <div className="general">
          <h2 className="ui divided header">{this.props.listing.title} </h2>
          <h5 style={{ marginTop: '0px' }} className="ui sub header dolly600">
            {this.name.first} {this.name.last}
          </h5>
          <h4 style={{ marginTop: '0px' }} className="ui sub header dolly600">
            {this.props.listing.city}
          </h4>
          <ListingDetails />
          {this.props.details.descriptionText &&
            (this.props.details.descriptionText !== '' && (
              <ReactQuill
                readOnly
                value={this.props.details.descriptionText}
                theme="bubble"
              />
            ))}
          <div className="ui two column grid">
            <div className="row">
              {this.renderAmenities()}
              <div
                style={{
                  right: '0px',
                  top: '40px',
                  position: 'absolute'
                }}
                className="column field"
              >
                <Scheduler />
              </div>
            </div>
          </div>
          <div className="ui two column grid">
            <div className="column field">
              <h3 className="ui dividing header">Availability</h3>
              <DatePicker
                inline
                readOnly
                monthsShown={2}
                includeDates={removeUnavailableDates(
                  includedDates,
                  unavailableDates
                )}
              />
            </div>
          </div>
        </div>
        <NavigateButtons
          onDismiss={this.props.previousPage}
          dismiss="Back"
          submit="Create Listing!"
          onSubmit={this.onCreateListingClicked}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    listing: state.form.listing.values,
    pictures: state.pictures,
    details: state.details,
    amenities: state.form.amenities.values
  };
};

export default connect(mapStateToProps)(ListingFormReview);
