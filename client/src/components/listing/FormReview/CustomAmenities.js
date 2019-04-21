import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

const Amenities = ({ customAmenities, customAmenityValues }) => {
  if (
    _.isEmpty(customAmenities) ||
    _.isEmpty(customAmenityValues) ||
    _.values(customAmenityValues).every(value => value === false)
  )
    return null;
  //Check if custom amenity is true inside forms
  const arrCustomAmenities = customAmenities.order.filter(
    amenity =>
      customAmenityValues.hasOwnProperty(amenity) &&
      customAmenityValues[amenity]
  );

  return (
    <>
      <h4 className="ui dividing header">Custom Amenities</h4>
      <div className="ui four column grid">
        {arrCustomAmenities.map(amenity => {
          const icon = customAmenities[amenity];
          return (
            <div key={amenity} className="column">
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
    </>
  );
};

const mapStateToProps = state => {
  return {
    customAmenities: state.details.customAmenityObj,
    customAmenityValues: state.form.amenities.values
  };
};

export default connect(mapStateToProps)(Amenities);
