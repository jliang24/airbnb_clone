import React, { useState } from 'react';
import { Field, reduxForm } from 'redux-form';
import amenities from '../../utils/amenities';

const ListingAmenities = props => {
  const [file, setFile] = useState(null);

  const renderAmenities = () => {
    return amenities.order.map(amenity => {
      return (
        <div key={amenity}>
          <div className="ui checkbox">
            <Field type="checkbox" name={amenity} component="input" />
            <label>{amenity}</label>
          </div>
        </div>
      );
    });
  };

  const onFileChange = event => {
    setFile(event.target.files[0]);
  };

  const onFormSubmit = formValues => {
    console.log({ ...formValues, pictures: file });
  };

  return (
    <div>
      <div className="ui container segment">
        <form onSubmit={props.handleSubmit(onFormSubmit)}>
          <h4 className="ui dividing header">
            Please select available amenities
          </h4>
          {renderAmenities()}
          <h4 className="ui dividing header">Pictures</h4>
          <h5>Add an image!</h5>
          <input type="file" accept="image/*" onChange={e => onFileChange(e)} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default reduxForm({
  initialValues: amenities,
  form: 'amenities'
})(ListingAmenities);
