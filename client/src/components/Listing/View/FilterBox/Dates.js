import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { compose } from 'redux';
import { connect } from 'react-redux';

import OutsideAlerter from 'components/Util/OutsideAlerter';
import {
  handleStartDateChange,
  handleEndDateChange,
  formatDate
} from 'utils/dates';
import { modifyDates } from 'actions/searchQuery';
import { fetchListings } from 'actions/listing';

const initialState = {
  startDate: new Date(),
  endDate: null,
  filterApplied: false
};

class DatesFilter extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleStartDateChange = handleStartDateChange.bind(this);
    this.handleEndDateChange = handleEndDateChange.bind(this);
  }

  onApplySelected = () => {
    if (this.checkNullDates()) return;

    this.props.modifyDates({
      startDate: this.state.startDate.setHours(0, 0, 0),
      endDate: this.state.endDate.setHours(0, 0, 0)
    });
    this.props.fetchListings();
    this.setState({ filterApplied: true });
    this.props.toggleActive();
  };

  checkNullDates() {
    return !this.state.startDate || !this.state.endDate;
  }

  onClearSelected = () => {
    this.setState(initialState);
    this.props.modifyDates();
    this.props.fetchListings();
    this.props.toggleActive();
  };

  modifyDisplay() {
    if (!this.state.filterApplied) return 'Dates';
    let { startDate, endDate } = this.props.dates;
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    //const { startDate, endDate } = this.state;

    const checkOut = `Check Out - ${formatDate(startDate)}`;
    const range = `${formatDate(startDate)} - ${formatDate(endDate)} `;
    return this.isSameDate(startDate, endDate) ? checkOut : range;
  }

  isSameDate(startDate, endDate) {
    return startDate.toString() === endDate.toString();
  }

  render() {
    const { toggleActive, active } = this.props;

    return (
      <div>
        <button onMouseDown={toggleActive} className="ui button">
          {this.modifyDisplay()}
        </button>
        {active && (
          <div>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleStartDateChange}
              minDate={new Date()}
              placeholderText="Check In"
            />
            <DatePicker
              selected={this.state.endDate}
              onChange={this.handleEndDateChange}
              minDate={new Date()}
              placeholderText="Check Out"
            />
            <button
              onClick={this.onClearSelected}
              className="ui button success"
            >
              Clear
            </button>
            <button
              onClick={this.onApplySelected}
              className="ui button success"
            >
              Apply
            </button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    dates: state.searchQuery.dates
  };
};
export default compose(
  OutsideAlerter,
  connect(
    mapStateToProps,
    { modifyDates, fetchListings }
  )
)(DatesFilter);
