import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';

import history from 'historyObj';
import { removeUnavailableDates } from 'utils/dates';
import Counter from 'utils/Counter';
import * as actions from 'actions';

class Scheduler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      guests: 1,
      startDate: null,
      endDate: null,
      endDates: [],
      datePickerIsOpen: false,
      message: '',
      errorShown: false
    };
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.openDatePicker = this.openDatePicker.bind(this);
  }

  componentDidMount() {
    if (this.state.endDates.length === 0) {
      const { includedDates, unavailableDates, maxNights } = this.props.details;
      const endDates = removeUnavailableDates(
        includedDates,
        unavailableDates
      ).map(startDate => this.changeDateValue(startDate, maxNights));

      this.setState({ endDates });
    }
  }

  openDatePicker() {
    this.setState({
      datePickerIsOpen: !this.state.datePickerIsOpen
    });
  }

  handleStartDateChange(date) {
    this.setState({
      startDate: date
    });

    const endDates = [];
    for (let i = 1; i <= this.props.details.maxNights; i++) {
      endDates.push(this.changeDateValue(date, i));
    }
    this.setState({ endDates });

    if (!this.state.endDate) return this.openDatePicker();

    if (
      endDates.some(
        endDate => this.state.endDate.getTime() === endDate.getTime()
      )
    )
      return;

    this.openDatePicker();
  }

  handleEndDateChange(date) {
    this.setState({
      endDate: date
    });
    this.openDatePicker();
  }

  changeDateValue = (date, num) => {
    const copiedDate = new Date(date);
    copiedDate.setDate(copiedDate.getDate() + num);
    copiedDate.setHours(0, 0, 0, 0);

    return new Date(copiedDate);
  };

  onSendClick = () => {
    if (!this.state.startDate || !this.state.endDate)
      return this.setState({ errorShown: true });
    this.props.createMessage({
      message: this.state.message,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      guests: this.state.guests,
      listingId: this.props.listingId
    });
    history.push('/home');
  };

  render() {
    const { cost } = this.props.listing;
    const { includedDates, unavailableDates, guests } = this.props.details;
    const datesToInclude = removeUnavailableDates(
      includedDates,
      unavailableDates
    );
    return (
      <div className="ui container segment">
        <h1 style={{ display: 'block' }} className="ui dividing header">
          ${cost}
          <div
            style={{ marginLeft: '5px', display: 'inline-block' }}
            className="sub header"
          >
            per night
          </div>
        </h1>
        <h3>Dates</h3>
        <DatePicker
          selected={this.state.startDate}
          includeDates={datesToInclude}
          onChange={this.handleStartDateChange}
          placeholderText="Check In"
          minDate={new Date()}
        />
        <DatePicker
          selected={this.state.endDate}
          includeDates={this.state.endDates}
          onChange={this.handleEndDateChange}
          placeholderText="Check Out"
          minDate={new Date()}
          open={this.state.datePickerIsOpen}
          onInputClick={() =>
            this.state.datePickerIsOpen ? null : this.openDatePicker()
          }
          onClickOutside={this.openDatePicker}
        />
        <div className="ui container segment">
          <Counter
            incrementValue={() => {
              if (this.state.guests === guests) return;
              this.setState({ guests: this.state.guests + 1 });
            }}
            decrementValue={() => {
              if (this.state.guests === 1) return;
              this.setState({ guests: this.state.guests - 1 });
            }}
            count={this.state.guests}
            detailItem={'guests'}
          />
        </div>
        <div className="ui form">
          <div className="field">
            <label>Send a message to the host!</label>
            <textarea
              onChange={e => this.setState({ message: e.target.value })}
              rows={2}
              value={this.state.message}
            />
            <div style={{ marginTop: '10px', height: '40px' }}>
              {this.state.errorShown && (
                <div className="ui compact negative message">
                  <i
                    onClick={() => this.setState({ errorShown: false })}
                    className="close icon"
                  />
                  <div className="tiny">
                    Please make sure check in or check out is filled out!
                  </div>
                </div>
              )}
              {this.props.listingId && (
                <button
                  onClick={this.onSendClick}
                  className="ui right floated button black "
                >
                  Send
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    listing: state.form.listing.values,
    details: state.details
  };
};

export default connect(
  mapStateToProps,
  actions
)(Scheduler);
