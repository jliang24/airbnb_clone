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
    this.detailIcons = ['user outline', 'cube', 'bed', 'bath'];
    this.todaysDate = new Date();
    this.todaysDate.setHours(0, 0, 0, 0);
    this.state = {
      guests: 1,
      bedrooms: 0,
      beds: 0,
      baths: 0,
      maxNights: 1,
      startDate: this.todaysDate,
      endDate: this.todaysDate,
      includedDates: [],
      unavailableDates: [],
      dateError: false,
      forward: false
    };
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleUnavailableDate = this.handleUnavailableDate.bind(this);
  }

  componentDidMount() {
    if (this.props.details.hasOwnProperty('includedDates')) {
      this.setState(this.props.details);
    }
  }

  componentDidUpdate() {
    if (
      this.state.includedDates.length !== this.findDateDifference() ||
      this.state.forward
    ) {
      const includedDatesArr = this.dateDiffArr();
      this.setState({ includedDates: includedDatesArr });
      const unavailableDates = this.state.unavailableDates.filter(date => {
        return includedDatesArr.some(
          includedDate => includedDate.getTime() === date.getTime()
        );
      });

      this.setState({ unavailableDates, forward: false });
    }
  }

  dateDiffArr() {
    const dateArr = [];
    let currentDate = this.state.startDate;
    let endDate = this.state.endDate;
    currentDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);
    while (currentDate.getTime() <= endDate.getTime()) {
      dateArr.push(currentDate);
      currentDate = this.changeDateValue(currentDate, 1);
    }
    return dateArr;
  }

  changeDateValue = (date, num) => {
    const copiedDate = new Date(date);
    copiedDate.setDate(copiedDate.getDate() + num);
    copiedDate.setHours(0, 0, 0, 0);

    return new Date(copiedDate);
  };

  handleStartDateChange(date) {
    if (this.state.endDate < date) {
      this.setState({
        endDate: date,
        forward: true
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

  handleUnavailableDate(date) {
    if (
      this.state.unavailableDates.some(
        unavailableDate => date.getTime() === unavailableDate.getTime()
      )
    ) {
      const unavailableDatesArr = this.state.unavailableDates.filter(
        unavailableDate => unavailableDate.getTime() !== date.getTime()
      );
      return this.setState({ unavailableDates: unavailableDatesArr });
    }
    this.setState({ unavailableDates: [...this.state.unavailableDates, date] });
  }

  findDateDifference() {
    if (!this.state.endDate || !this.state.startDate) return;
    const timeDiff = Math.abs(
      this.state.endDate.getTime() - this.state.startDate.getTime()
    );
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays + 1;
  }

  renderDateError() {
    if (this.findDateDifference() - this.state.unavailableDates.length === 0) {
      return (
        <div
          style={{ position: 'absolute', top: '35%', width: '100px' }}
          className="ui left pointing red basic label"
        >
          Please allow at least one night!
        </div>
      );
    }
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
    if (this.findDateDifference() - this.state.unavailableDates.length === 0)
      return;
    const details = {
      detailKeys: this.detailKeys,
      detailIcons: this.detailIcons
    };
    this.props.addDetails({ ...this.state, ...details });
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
            <h4 className="ui dividing header">
              Select available check in dates
            </h4>
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
                    startDate={this.state.startDate}
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
                  <Counter
                    incrementValue={() =>
                      this.setState({ maxNights: this.state.maxNights + 1 })
                    }
                    decrementValue={() => {
                      if (this.state.maxNights === 1) return;
                      this.setState({ maxNights: this.state.maxNights - 1 });
                    }}
                    count={this.state.maxNights}
                    detailItem="Maximum Nights"
                  />
                </div>
              </div>
              <div>
                <h4 className="ui dividing header">Select unavailable dates</h4>
                <div style={{ position: 'relative' }}>
                  <DatePicker
                    inline
                    monthsShown={2}
                    includeDates={this.state.includedDates}
                    onChange={this.handleUnavailableDate}
                    highlightDates={this.state.unavailableDates}
                    inlineFocusSelectedMonth
                    openToDate={this.state.startDate}
                  />
                  {this.renderDateError()}
                </div>
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

const mapStateToProps = state => {
  return {
    details: state.details
  };
};
ListingForm = connect(
  mapStateToProps,
  actions
)(ListingForm);

export default reduxForm({
  form: 'listing',
  destroyOnUnmount: false,
  validate
})(ListingForm);
