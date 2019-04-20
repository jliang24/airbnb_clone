import React, { Component } from 'react';
import { connect } from 'react-redux';
import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';
import ImageList from './Images/ImageList';
import NavigateButtons from './NavigateButtons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';
import DatePicker from 'react-datepicker';
import '../../css/datepicker.css';
import { capitalizeFirstLetter } from '../../utils/text';
import amenities from '../../utils/amenities';
import Scheduler from './Scheduler';

class ListingFormReview extends Component {
  constructor(props) {
    super(props);
    //test data
    this.listing = {
      address: '4600 Neil Rd',
      city: 'Reno',
      cost: '31',
      state: 'Reno',
      zip: '89502',
      title: "Jeff's amazing house!",
      ...amenities
    };
    this.name = {
      first: 'John',
      last: 'Doe'
    };

    this.details = {
      guests: 1,
      bedrooms: 2,
      beds: 8,
      baths: 5,
      startDate: new Date(),
      endDate: new Date(),
      detailKeys: ['guests', 'bedrooms', 'beds', 'baths'],
      detailIcons: ['user outline', 'cube', 'bed', 'bath']
    };

    this.pictures = [
      {
        original:
          'https://s3-us-west-1.amazonaws.com/airbnb-clone-jeff/5c9ea044e9f71225c96ff4bf/a4004453-46e9-49ac-a66e-3ed5510bc104.jpeg',
        thumbnail: `https://s3-us-west-1.amazonaws.com/airbnb-clone-jeff/5c9ea044e9f71225c96ff4bf/a4004453-46e9-49ac-a66e-3ed5510bc104.jpeg`
      },
      {
        original: `https://s3-us-west-1.amazonaws.com/airbnb-clone-jeff/5c9ea044e9f71225c96ff4bf/9c53ca9c-8af7-4501-9d87-cf417cc78f62.jpeg`,
        thumbnail:
          'https://s3-us-west-1.amazonaws.com/airbnb-clone-jeff/5c9ea044e9f71225c96ff4bf/9c53ca9c-8af7-4501-9d87-cf417cc78f62.jpeg'
      },
      {
        original:
          'https://s3-us-west-1.amazonaws.com/airbnb-clone-jeff/5c9ea044e9f71225c96ff4bf/842b18c7-24a0-4659-8a22-fc6a06efb018.jpeg',
        thumbnail:
          'https://s3-us-west-1.amazonaws.com/airbnb-clone-jeff/5c9ea044e9f71225c96ff4bf/842b18c7-24a0-4659-8a22-fc6a06efb018.jpeg'
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
      return (
        <div className="dolly800-background">
          <ImageGallery items={this.pictures} swipeThreshold={30} />
        </div>
      );
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

  removeUnavailableDates() {
    const { includedDates, unavailableDates } = this.props.details;
    if (!includedDates) return;
    return includedDates.filter(includedDate => {
      if (
        unavailableDates.some(
          unavailableDate =>
            includedDate.getTime() === unavailableDate.getTime()
        )
      ) {
        return false;
      }
      return true;
    });
  }

  renderListingDetails() {
    const renderIcons = (num, icon) => {
      const totalIcons = [];
      for (let icons = 0; icons < num; icons++) {
        totalIcons.push(
          <i key={`${icon} ${icons}`} className={`large ${icon} icon`} />
        );
      }
      return totalIcons;
    };

    return (
      <div className="ui page grid listing-grid">
        {this.details.detailKeys.map((detailKey, idx) => {
          const detailValue = this.details[detailKey];
          const detailIcon = this.details.detailIcons[idx];
          return (
            <React.Fragment key={detailIcon}>
              <div className="listing-detail four wide column bottom aligned content">
                <div>{renderIcons(detailValue, detailIcon)}</div>
                <div>
                  <h3>{detailValue}</h3>
                </div>
                {capitalizeFirstLetter(detailKey)}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  renderAmenities() {
    return (
      <div className="ui four column grid">
        {amenities.order.map(amenity => {
          const { icon } = amenities[amenity];
          return (
            <div className="column">
              <div className="equal width row">
                <h4>
                  <i className={`${icon} large icon`} />
                  {amenity}
                </h4>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderPictures()}
        {this.renderPictureButton()}
        <div className="general">
          <h2 className="ui divided header">{this.listing.title} </h2>
          <h5 style={{ marginTop: '0px' }} className="ui sub header dolly600">
            {this.name.first} {this.name.last}
          </h5>
          <h4 style={{ marginTop: '0px' }} className="ui sub header dolly600">
            {this.listing.city}
          </h4>
          {this.renderListingDetails()}
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
              <div className="column field">
                <h3 className="ui dividing header">Amenities</h3>
                {this.renderAmenities()}
              </div>
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
                includeDates={this.removeUnavailableDates()}
              />
            </div>
          </div>
        </div>
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
