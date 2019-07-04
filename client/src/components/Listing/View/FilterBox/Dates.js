import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { compose } from 'redux';
import { connect } from 'react-redux';

import OutsideAlerter from 'components/Util/OutsideAlerter';
import { handleStartDateChange, handleEndDateChange } from 'utils/dates';
import { modifyDates } from 'actions/searchQuery';
import { fetchListings } from 'actions/listing';

const initialState = { startDate: new Date(), endDate: null };

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
  };

  checkNullDates() {
    return !this.state.startDate || !this.state.endDate;
  }

  onClearSelected = () => {
    this.setState(initialState);
    this.props.modifyDates();

    this.props.fetchListings();
  };

  render() {
    const { toggleActive, active } = this.props;

    return (
      <div>
        <button onMouseDown={toggleActive} className="ui button">
          Dates
        </button>
        {active && (
          <div>
            <DatePicker
              selected={this.state.startDate}
              onChange={this.handleStartDateChange}
              minDate={new Date()}
              placeholderText="Begin Date"
            />
            <DatePicker
              selected={this.state.endDate}
              onChange={this.handleEndDateChange}
              minDate={new Date()}
              placeholderText="End Date"
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

export default compose(
  OutsideAlerter,
  connect(
    null,
    { modifyDates, fetchListings }
  )
)(DatesFilter);
