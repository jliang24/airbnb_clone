import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import _ from 'lodash';
import ImageGallery from 'react-image-gallery';
import DatePicker from 'react-datepicker';
import { initialize, reduxForm } from 'redux-form';
import GoogleMapReact from 'google-map-react';

import keys from 'config/keys';
import history from 'historyObj';
import ImageList from 'components/Listing/Images/ImageList';
import NavigateButtons from 'components/NavigateButtons';
import ListingDetails from 'components/Listing/FormReview/ListingDetails';
import Amenities from 'components/Listing/FormReview/Amenities';
import CustomAmenities from 'components/Listing/FormReview/CustomAmenities';
import Scheduler from 'components/Listing/FormReview/Scheduler';
import { removeUnavailableDates } from 'utils/dates';
import {
  createListing,
  fetchListing,
  clearDetails,
  clearPictures,
  editListing
} from 'actions';

import 'react-image-gallery/styles/css/image-gallery.css';
import 'react-quill/dist/quill.bubble.css';
import 'css/datepicker.css';

class ListingFormReview extends Component {
  constructor(props) {
    super(props);
    this.editMode = window.location.href.indexOf('edit') > -1 ? true : false;
    this.defaultProps = {
      center: {
        lat: 39.529,
        lng: -119.813
      },
      zoom: 13
    };
    this.state = {
      renderCarousel: false
    };
  }

  componentDidMount() {
    if (this.props.match) {
      const { id } = this.props.match.params;
      this.cleanUp();
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
      this.cleanUp();
    }
  }

  cleanUp() {
    this.props.dispatch(initialize('listing', {}));
    this.props.dispatch(initialize('amenities', {}));
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
          <ImageGallery
            showFullscreenButton={false}
            size={300}
            items={imagePics}
            swipeThreshold={30}
          />
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
      <>
        <h3 className="ui dividing header">Amenities</h3>
        <Amenities />
        <CustomAmenities />
      </>
    );
  }

  onCreateListingClicked = () => {
    const { details, amenities, pictures, listing } = this.props;

    const listingValues = { details, amenities, pictures, listing };
    this.editMode
      ? this.props.editListing(
          window.location.href.split('/').pop(),
          listingValues
        )
      : this.props.createListing(listingValues);
    history.push('/home');
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
              <div className="column field">{this.renderAmenities()}</div>
              <div className="column field">
                <h3 className="ui dividing header">Location</h3>
                <div style={{ height: '200px', width: '100%' }}>
                  <GoogleMapReact
                    bootstrapURLKeys={{ key: keys.mapsAPIKey }}
                    defaultCenter={this.defaultProps.center}
                    defaultZoom={this.defaultProps.zoom}
                  />
                </div>
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
            <div className="column field">
              <Scheduler />
            </div>
          </div>
        </div>
        {!this.props.match && (
          <NavigateButtons
            onDismiss={this.props.previousPage}
            dismiss="Back"
            submit={this.editMode ? 'Update Listing' : 'Create Listing!'}
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
  { createListing, fetchListing, clearDetails, clearPictures, editListing }
)(ListingFormReview);

export default reduxForm({
  enableReinitialize: true,
  form: 'final'
})(ListingFormReview);
