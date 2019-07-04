import React, { Component } from 'react';
import DatePicker from 'react-datepicker';

class CustomInputComponent extends Component {
  render() {
    return (
      <button onClick={this.props.onClick} className="ui button">
        Dates
      </button>
    );
  }
}

class DatesFilter extends Component {
  render() {
    return (
      <DatePicker
        minDate={new Date()}
        customInput={<CustomInputComponent />}
        monthsShown={2}
      />
    );
  }
}

export default DatesFilter;
