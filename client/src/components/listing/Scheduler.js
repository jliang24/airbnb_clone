import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import Counter from '../../utils/Counter';

class Scheduler extends Component {
  constructor(props) {
    super(props);
    this.testData = {
      cost: '50',
      date: []
    };
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.state = {
      guests: 1
    };
  }

  componentDidMount() {
    for (let i = 0; i < 10; i++) {
      this.testData.date.push(this.changeDateValue(new Date(), i));
    }
    console.log(this.testData);
  }

  handleStartDateChange(date) {
    console.log(date);
  }

  handleEndDateChange(date) {
    console.log(date);
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
        <h3>Select Dates</h3>
        <DatePicker
          includeDates={this.testData.date}
          onChange={this.handleStartDateChange}
        />
        <DatePicker
          includeDates={this.testData.date}
          onChange={this.handleEndDateChange}
        />
        <h3>Select Guests</h3>
        <Counter
          incrementValue={() =>
            this.setState({ guests: this.state.guests + 1 })
          }
          decrementValue={() => {
            if (this.state.guests === 1) return;
            this.setState({ guests: this.state.guests - 1 });
          }}
          count={this.state.guests}
          detailItem={'guests'}
        />
        <h3>Message the host!</h3>
        <textarea />
      </div>
    );
  }
}

export default Scheduler;
