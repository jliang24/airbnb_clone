import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactQuill from 'react-quill';
import _ from 'lodash';
import ImageGallery from 'react-image-gallery';
import DatePicker from 'react-datepicker';
import { initialize, reduxForm } from 'redux-form';
import GoogleMapReact from 'google-map-react';

import history from 'historyObj';
import ImageList from 'components/Listing/Images/ImageList';
import NavigateButtons from 'components/Listing/NavigateButtons';
import ListingDetails from './Details';
import ListingAmenities from './Amenities';
import CustomAmenities from './CustomAmenities';
import Scheduler from './Scheduler';
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
    this.createMode =
      window.location.href.indexOf('create') > -1 ? true : false;
    this.defaultMap = {
      center: {
        lat: 39.529,
        lng: -119.813
      },
      zoom: 12
    };
    this.state = {
      renderCarousel: false
    };
    this.coordinates = {
      lat: null,
      lng: null
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
    let imagePics;

    if (this.props.pictures) {
      imagePics = this.props.pictures.map(picture => {
        return {
          original: picture,
          thumbnail: picture
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
    } else if (this.props.pictures.length > 0 && !this.createMode) {
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
    ) {
      return null;
    }

    return (
      <>
        <h3 className="ui dividing header">Amenities</h3>
        <ListingAmenities />
        <CustomAmenities />
      </>
    );
  }

  handleApiLoaded = (map, maps) => {
    const geocoder = new maps.Geocoder();
    const circleConfig = (map, center, city = false) => {
      return {
        map,
        center,
        strokeColor: '#FF0000',
        strokeOpacity: 1,
        strokeWeight: 1,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
        radius: city ? 3000 : 1000
      };
    };

    //Find location by address, if that fails, find location by city

    const handleFailure = () => {
      geocoder.geocode(
        {
          address: this.props.listing.city
        },
        (results, status) => {
          if (status === 'OK') {
            new maps.Circle(
              circleConfig(map, results[0].geometry.location, true)
            );
          } else {
            alert('could not find location');
          }
        }
      );
    };

    geocoder.geocode(
      {
        address: this.props.listing.address
      },
      (results, status) => {
        if (status === 'OK') {
          const location = results[0].geometry.location;
          new maps.Circle(circleConfig(map, location));
          map.setCenter(location);
          this.handleGeocoderSuccess(location);
        } else {
          handleFailure();
        }
      }
    );
  };

  handleGeocoderSuccess(location) {
    let { lat, lng } = location;
    lat = lat();
    lng = lng();
    this.coordinates = { lat, lng };
  }

  onCreateListingClicked = async () => {
    const { details, amenities, pictures, listing } = this.props;
    const coords = this.coordinates;
    const listingValues = { details, amenities, pictures, listing, coords };

    this.editMode
      ? await this.props.editListing(
          window.location.href.split('/').pop(),
          listingValues
        )
      : await this.props.createListing(listingValues);
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
          <div
            className={`ui ${
              this.renderAmenities() === null ? 'one' : 'two'
            } column grid`}
          >
            <div className="row">
              <div id="form-amenities" className="column field">
                {this.renderAmenities()}
              </div>
              <div id="location" className="column field">
                <h3 className="ui dividing header">Location</h3>
                <div style={{ height: '200px', width: '100%' }}>
                  {/* The key is restricted to only be used on my Domain */}
                  <GoogleMapReact
                    yesIWantToUseGoogleMapApiInternals
                    bootstrapURLKeys={{
                      key: 'AIzaSyDDpvoLFlIg5Xn15LQvWAm3bvOOGNLVxXk'
                    }}
                    defaultCenter={this.defaultMap.center}
                    defaultZoom={this.defaultMap.zoom}
                    onGoogleApiLoaded={({ maps, map }) =>
                      this.handleApiLoaded(map, maps)
                    }
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
                monthsShown={this.props.deviceWidth > 627 ? 2 : 1}
                minDate={new Date()}
                includeDates={removeUnavailableDates(
                  includedDates,
                  unavailableDates
                )}
              />
            </div>
            <div id="scheduler" className="column field">
              <Scheduler
                listingId={this.props.match ? this.props.match.params.id : null}
              />
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
    amenities: state.form.amenities.values,
    deviceWidth: state.deviceDims.width
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
