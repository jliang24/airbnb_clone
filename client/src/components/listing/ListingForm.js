import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import renderField from '../renderField';
import states from '../../utils/states';

class ListingForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {
        guests: 0,
        bedrooms: 0,
        beds: 0,
        baths: 0
      }
    };
    this.detailKeys = ['guests', 'bedrooms', 'beds', 'baths'];
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

  renderSelectField({ input, children }) {
    return <select {...input}>{children}</select>;
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  renderIncrementButtons() {
    console.log('initiated');
    const incrementValue = (item, value) => {
      return prevState => {
        return {
          ...prevState,
          details: { ...prevState.details, [item]: (value += 1) }
        };
      };
    };

    return this.detailKeys.map(detailItem => {
      const detailValue = this.state.details[detailItem];
      return (
        <React.Fragment key={detailItem}>
          <div className="column">
            <label>
              {this.capitalizeFirstLetter(detailItem)}:<h5>{detailValue}</h5>
            </label>
          </div>
          <div className="column">
            <div className="ui icon buttons">
              <div className="decrement ui basic red button icon">
                <i className="minus icon" />
              </div>
              <div className="increment ui basic green button icon">
                <i
                  onClick={() =>
                    this.setState(incrementValue(detailItem, detailValue))
                  }
                  className="plus icon"
                />
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    });
  }

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

export default reduxForm({
  form: 'listing'
})(ListingForm);
