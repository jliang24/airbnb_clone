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
      address: '1900 lindoo rd',
      city: 'las vegas',
      cost: '31',
      state: 'arizona',
      zip: '89146',
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
          <h2>{this.listing.title}</h2>
          <h2 style={{ marginTop: '0px' }} className="ui sub header dolly600">
            {this.name.first} {this.name.last}
          </h2>
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
                  position: 'absolute',
                  top: '50px'
                }}
                className="column field"
              >
                // scheduler component
                <Scheduler />
              </div>
            </div>
          </div>
          <div className="ui two column grid">
            <div className="row">
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
