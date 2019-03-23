import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { renderField, renderError } from '../../utils/renderField';
import states from '../../utils/states';
import Counter from '../../utils/Counter';

class ListingForm extends Component {
  constructor(props) {
    super(props);
    this.detailKeys = ['guests', 'bedrooms', 'beds', 'baths'];
    this.state = { guests: 0, bedrooms: 0, beds: 0, baths: 0 };
  }

  renderStates() {
    return states.map(state => {
      return (
        <option key={state} value={state}>
          {state}
        </option>
      );
    });
  }

  renderSelectField({ input, children, meta }) {
    return (
      <>
        <select {...input}>{children}</select>
        {renderError(meta)}
      </>
    );
  }

  incrementValue = item => {
    this.setState(prevState => {
      return {
        ...prevState,
        [item]: prevState[item] + 1
      };
    });
  };

  decrementValue = item => {
    if (this.state[item] === 0) return;
    this.setState(prevState => {
      return {
        ...prevState,
        [item]: prevState[item] - 1
      };
    });
  };

  renderIncrementButtons = () => {
    return this.detailKeys.map(detailItem => {
      return (
        <React.Fragment key={detailItem}>
          <Counter
            incrementValue={() => this.incrementValue(detailItem)}
            decrementValue={() => this.decrementValue(detailItem)}
            count={this.state[detailItem]}
            detailItem={detailItem}
          />
        </React.Fragment>
      );
    });
  };

  render() {
    return (
      <div className="ui container segment">
        <form className="ui form">
          <div className="required field">
            <Field
              name="title"
              label="Title"
              type="text"
              component={renderField}
            />
          </div>
          <h4 className="ui dividing header">Location</h4>
          <div className="two fields">
            <div className="eleven wide required field">
              <Field
                name="address"
                label="Address"
                type="text"
                placeholder="Street Address"
                component={renderField}
              />
            </div>
            <div className="two wide field">
              <Field
                name="apt"
                label="APT, Suite (Optional)"
                type="text"
                placeholder="APT #"
                component={renderField}
              />
            </div>
          </div>
          <div className="three required fields">
            <div className="three wide field">
              <label>State</label>
              <Field name="state" component={this.renderSelectField}>
                <option />
                {this.renderStates()}
              </Field>
            </div>
            <div className="three wide field">
              <Field label="City" name="city" component={renderField} />
            </div>
            <div className="three wide field">
              <Field label="Zip Code" name="zip" component={renderField} />
            </div>
          </div>
          <h4 className="ui dividing header">Listing Details</h4>
          <div className="ui four column grid">
            {this.renderIncrementButtons()}
          </div>
        </form>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};
  console.log(values);
  if (!values.title) {
    errors.title = 'Please enter a title!';
  }
  if (!values.address) {
    errors.address = 'Please enter an address';
  }
  if (!values.city) {
    errors.city = 'Please enter a city';
  }
  if (!values.zip) {
    errors.zip = 'Please enter a zip code';
  }
  if (!values.state) {
    errors.state = 'Please enter a state';
  }
  return errors;
};

export default reduxForm({
  form: 'listing',
  validate
})(ListingForm);
