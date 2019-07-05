import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import GuestsCounter from 'utils/Counter';
import OutsideAlerter from 'components/Util/OutsideAlerter';
import { modifyGuests } from 'actions/searchQuery';
import { fetchListings } from 'actions/listing';

const initialState = { guests: 1, filterApplied: false };

class GuestsFilter extends Component {
  state = initialState;

  incrementValue = () => {
    return this.setState({ guests: (this.state.guests += 1) });
  };

  decrementValue = () => {
    if (this.state.guests <= 1) return;
    return this.setState({ guests: (this.state.guests -= 1) });
  };

  onApplySelected = () => {
    this.props.modifyGuests(this.state.guests);
    this.setState({ filterApplied: true });
    this.props.fetchListings();
    this.props.toggleActive();
  };

  onClearSelected = () => {
    this.setState({ guests: 1, filterApplied: false });
    this.props.modifyGuests(1);
    this.props.fetchListings();
    this.props.toggleActive();
  };

  modifyDisplay() {
    return this.state.filterApplied ? `: ${this.state.guests}` : null;
  }

  render() {
    const { toggleActive, active } = this.props;

    return (
      <div>
        <button onMouseDown={toggleActive} className="ui button danger">
          Guests {this.modifyDisplay()}
        </button>
        {active && (
          <div>
            <GuestsCounter
              detailItem="Guests"
              count={this.state.guests}
              incrementValue={this.incrementValue}
              decrementValue={this.decrementValue}
            />
            <button className="ui button" onClick={this.onApplySelected}>
              Apply
            </button>
            <button className="ui button" onClick={this.onClearSelected}>
              Clear
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
    { modifyGuests, fetchListings }
  )
)(GuestsFilter);
