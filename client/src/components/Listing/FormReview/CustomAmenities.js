import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

const Amenities = ({ customAmenities, customAmenityValues }) => {
  if (
    customAmenities.length === 0 ||
    _.isEmpty(customAmenityValues) ||
    _.values(customAmenityValues).every(value => value === false)
  ) {
    return null;
  }

  //Check if custom amenity is true inside forms
  const arrCustomAmenities = customAmenities.filter(
    ({ name }) =>
      customAmenityValues.hasOwnProperty(name) && customAmenityValues[name]
  );

  return (
    <>
      <h4 className="ui dividing header">Custom Amenities</h4>
      <div className="ui four column grid">
        {arrCustomAmenities.map(({ name, icon }) => {
          return (
            <div key={name} className="column">
              <div className="equal width row">
                <h4>
                  <i
                    style={{ color: 'black' }}
                    className={`${icon} large icon`}
                  />
                  {name}
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
    customAmenities: state.details.customAmenityArr,
    customAmenityValues: state.form.amenities.values
  };
};

export default connect(mapStateToProps)(Amenities);
