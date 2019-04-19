import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import Counter from '../../utils/Counter';

class Scheduler extends Component {
  constructor(props) {
    super(props);
    this.testData = {
      cost: '50',
      startDates: [],
      maxNights: 2,
      guests: 2
    };

    this.state = {
      guests: 1,
      startDate: null,
      endDate: null,
      endDates: [],
      datePickerIsOpen: false
    };
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.openDatePicker = this.openDatePicker.bind(this);
  }

  componentDidMount() {
    for (let i = 0; i < 10; i++) {
      this.testData.startDates.push(this.changeDateValue(new Date(), i));
    }

    if (this.state.endDates.length === 0) {
      const endDates = this.testData.startDates.map(startDate =>
        this.changeDateValue(startDate, this.testData.maxNights)
      );

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
    for (let i = 1; i <= this.testData.maxNights; i++) {
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

  render() {
    return (
      <div className="ui container segment">
        <h1 style={{ display: 'block' }} className="ui dividing header">
          ${this.testData.cost}
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
          includeDates={this.testData.startDates}
          onChange={this.handleStartDateChange}
          placeholderText="Check In"
        />
        <DatePicker
          selected={this.state.endDate}
          includeDates={this.state.endDates}
          onChange={this.handleEndDateChange}
          placeholderText="Check Out"
          open={this.state.datePickerIsOpen}
          onInputClick={this.openDatePicker}
          onClickOutside={this.openDatePicker}
        />
        <Counter
          incrementValue={() => {
            if (this.state.guests === this.testData.guests) return;
            this.setState({ guests: this.state.guests + 1 });
          }}
          decrementValue={() => {
            if (this.state.guests === 1) return;
            this.setState({ guests: this.state.guests - 1 });
          }}
          count={this.state.guests}
          detailItem={'guests'}
        />
        <h3>Message the host!</h3>
        <textarea />
        <div>
          <button className="ui button">Send</button>
        </div>
      </div>
    );
  }
}

export default Scheduler;
