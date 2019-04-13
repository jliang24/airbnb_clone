import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { renderField, renderError } from '../../utils/renderField';
import * as actions from '../../actions';
import states from '../../utils/states';
import Counter from '../../utils/Counter';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.min.css';
import NavigateButtons from './NavigateButtons';

class ListingForm extends Component {
  constructor(props) {
    super(props);
    this.detailKeys = ['guests', 'bedrooms', 'beds', 'baths'];
    this.todaysDate = new Date();
    this.state = {
      guests: 1,
      bedrooms: 0,
      beds: 0,
      baths: 0,
      startDate: new Date(),
      endDate: new Date()
    };
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
  }

  changeDateValue = (date, num) => {
    const copiedDate = new Date(date);
    return new Date(copiedDate.setDate(copiedDate.getDate() + num));
  };

  handleStartDateChange(date) {
    if (this.state.endDate < date) {
      this.setState({
        endDate: date
      });
    }

    this.setState({
      startDate: date
    });
  }

  handleEndDateChange(date) {
    if (date < this.state.startDate) {
      return this.setState({
        endDate: this.state.startDate
      });
    }

    this.setState({
      endDate: date
    });
  }

  findDateDifference() {
    if (!this.state.endDate || !this.state.startDate) return;
    const timeDiff = Math.abs(
      this.state.endDate.getTime() - this.state.startDate.getTime()
    );
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays + 1;
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

  handleSubmit = () => {
    this.props.addDetails(this.state);
    this.props.onSubmit();
  };

  render() {
    return (
      <>
        <div className="ui container segment general">
          <form
            className="ui form"
            onSubmit={this.props.handleSubmit(this.handleSubmit)}
          >
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
                  label="APT, Suite"
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
            <h4 className="ui dividing header">Select available dates</h4>
            <div className="ui five column grid">
              <div className="row">
                <div className="column field">
                  <label>Start Date</label>
                  <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleStartDateChange}
                    minDate={new Date()}
                    todayButton="Select Today"
                    selectsStart
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    withPortal
                  />
                </div>
                <div className="column field">
                  <label>End Date</label>
                  <DatePicker
                    selected={this.state.endDate}
                    onChange={this.handleEndDateChange}
                    selectsEnd
                    minDate={new Date()}
                    startDate={this.changeDateValue(this.state.startDate, -1)}
                    endDate={this.state.endDate}
                    monthsShown={this.state.startDate.getDate() > 27 ? 2 : 1}
                    todayButton="Select Today"
                    withPortal
                  >
                    <div style={{ color: 'red' }}>
                      This is not check out date!
                    </div>
                  </DatePicker>
                </div>
                <div className="required column field">
                  <Field
                    name="cost"
                    label="Cost Per Night"
                    placeholder="Cost"
                    type="text"
                    component={renderField}
                  />
                </div>
                <div className="column field">
                  <label>Nights</label>
                  <label>{this.findDateDifference()}</label>
                </div>
              </div>
              <div>
                <h4 className="ui dividing header">Select unavailable dates</h4>
                <DatePicker
                  inline
                  readOnly
                  monthsShown={2}
                  includeDates={[this.state.startDate, this.state.endDate]}
                />
              </div>
            </div>
          </form>
        </div>
        <NavigateButtons
          onDismiss={this.props.previousPage}
          dismiss="Cancel"
          submit="Next"
          onSubmit={this.props.handleSubmit(this.handleSubmit)}
        />
      </>
    );
  }
}

const validate = values => {
  const errors = {};

  if (!values.title) {
    errors.title = 'Please enter a title!';
  }
  if (!values.address) {
    errors.address = 'Please enter an address!';
  }
  if (!values.city) {
    errors.city = 'Please enter a city!';
  }
  if (!values.zip) {
    errors.zip = 'Please enter a zip code!';
  }
  if (!values.state) {
    errors.state = 'Please enter a state!';
  }
  if (!values.cost) {
    errors.cost = 'Please enter a price!';
  }
  return errors;
};

ListingForm = connect(
  null,
  actions
)(ListingForm);

export default reduxForm({
  form: 'listing',
  destroyOnUnmount: false,
  validate
})(ListingForm);
