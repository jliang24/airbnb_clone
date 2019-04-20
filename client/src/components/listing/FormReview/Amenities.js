import React from 'react';
import { connect } from 'react-redux';
import amenityIcons from '../../../utils/amenities';
import _ from 'lodash';

const Amenities = ({ amenities }) => {
  if (_.isEmpty(amenities)) return;
  const arrAmenities = Object.keys(amenities);

  return (
    <div className="ui four column grid">
      {arrAmenities.map(amenity => {
        const { icon } = amenityIcons[amenity];
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
  );
};

const mapStateToProps = state => {
  return {
    amenities: state.form.amenities.values
  };
};

export default connect(mapStateToProps)(Amenities);
