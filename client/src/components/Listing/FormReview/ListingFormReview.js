import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import _ from 'lodash';
import ImageGallery from 'react-image-gallery';
import DatePicker from 'react-datepicker';
import { initialize, reduxForm } from 'redux-form';

import ImageList from 'components/Listing/Images/ImageList';
import NavigateButtons from 'components/NavigateButtons';
import ListingDetails from 'components/Listing/FormReview/ListingDetails';
import Amenities from 'components/Listing/FormReview/Amenities';
import CustomAmenities from 'components/Listing/FormReview/CustomAmenities';
import Scheduler from 'components/Listing/FormReview/Scheduler';
import { removeUnavailableDates } from 'utils/dates';
import { createListing, fetchListing, clearDetails } from 'actions';
import 'react-image-gallery/styles/css/image-gallery.css';
import 'react-quill/dist/quill.bubble.css';
import 'css/datepicker.css';

class ListingFormReview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderCarousel: false
    };
  }

  componentDidMount() {
    if (this.props.match) {
      const { id } = this.props.match.params;
      this.props.dispatch(initialize('listing', {}));
      this.props.dispatch(initialize('amenities', {}));
      this.props.fetchListing(id);
    }
  }

  componentDidUpdate() {
    const listingValues = this.props.details ? this.props.details.location : {};

    const amenityValues = this.props.details
      ? this.props.details.amenitiesObj
      : {};

    this.props.dispatch(initialize('listing', listingValues));
    this.props.dispatch(initialize('amenities', amenityValues));
  }

  componentWillUnmount() {
    if (this.props.match) {
      this.props.clearDetails();
      this.props.dispatch(initialize('listing', {}));
      this.props.dispatch(initialize('amenities', {}));
    }
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
    } else if (this.props.pictures.length > 0) {
      return (
        <div
          onClick={() => this.setState({ renderCarousel: true })}
          className="ui right floated primary button"
        >
          Toggle Carousel
        </div>
      );
    } else return null;
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

  onCreateListingClicked = () => {
    const { details, amenities, pictures, listing } = this.props;

    const listingValues = { details, amenities, pictures, listing };

    this.props.createListing(listingValues);
  };

  render() {
    // if no data is present, return
    if (_.isEmpty(this.props.listing)) return null;
    const {
      includedDates,
      unavailableDates,
      descriptionText
    } = this.props.details;
    const { firstName, lastName } = this.props.details._user;

    return (
      <div>
        {this.renderPictures()}
        {this.renderPictureButton()}
        <div className="general">
          <h2 className="ui divided header">{this.props.listing.title} </h2>
          <h5 style={{ marginTop: '0px' }} className="ui sub header dolly600">
            {firstName} {lastName}
          </h5>
          <h4 style={{ marginTop: '0px' }} className="ui sub header dolly600">
            {this.props.listing.city}
          </h4>
          <ListingDetails />
          {descriptionText &&
            (descriptionText !== '' && (
              <ReactQuill readOnly value={descriptionText} theme="bubble" />
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
                minDate={new Date()}
                includeDates={removeUnavailableDates(
                  includedDates,
                  unavailableDates
                )}
              />
            </div>
          </div>
        </div>
        {!this.props.match && (
          <NavigateButtons
            onDismiss={this.props.previousPage}
            dismiss="Back"
            submit="Create Listing!"
            onSubmit={this.onCreateListingClicked}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  if (!state.form.listing || !state.form.amenities) return {};
  const values = {
    listing: state.form.listing.values,
    pictures: state.pictures,
    details: state.details,
    amenities: state.form.amenities.values
  };
  return values;
};

ListingFormReview = connect(
  mapStateToProps,
  { createListing, fetchListing, clearDetails }
)(ListingFormReview);

export default reduxForm({
  enableReinitialize: true,
  form: 'final'
})(ListingFormReview);
