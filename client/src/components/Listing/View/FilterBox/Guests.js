import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import GuestsCounter from 'utils/Counter';
import OutsideAlerter from 'components/Util/OutsideAlerter';
import { modifyGuests } from 'actions/searchQuery';
import { fetchListings } from 'actions/listing';

const initialState = { guests: 1, filterApplied: false };

class GuestsFilter extends Component {
  state = { ...initialState };

  incrementValue = () => {
    let guests = this.state.guests;
    return this.setState({ guests: (guests += 1) });
  };

  decrementValue = () => {
    let guests = this.state.guests;
    if (guests <= 1) return;
    return this.setState({ guests: (guests -= 1) });
  };

  onApplySelected = () => {
    this.props.modifyGuests(this.state.guests);
    this.setState({ filterApplied: true });
    this.props.fetchListings();
    this.props.toggleActive();
  };

  onClearSelected = () => {
    this.setState(initialState);
    this.props.modifyGuests(1);
    this.props.fetchListings();
    this.props.toggleActive();
  };

  modifyDisplay() {
    return this.state.filterApplied ? `: ${this.props.guestFilter}` : null;
  }

  render() {
    const { toggleActive, active } = this.props;

    return (
      <div>
        <button
          onMouseDown={toggleActive}
          className="ui button secondary basic button"
        >
          Guests {this.modifyDisplay()}
        </button>
        {active && (
          <div className="ui container segment popout">
            <GuestsCounter
              detailItem="Guests"
              count={this.state.guests}
              incrementValue={this.incrementValue}
              decrementValue={this.decrementValue}
            />
            <button
              className="ui secondary basic button"
              onClick={this.onClearSelected}
            >
              Clear
            </button>
            <button
              className="ui secondary right floated basic button"
              onClick={this.onApplySelected}
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
    guestFilter: state.searchQuery.guests
  };
};

export default compose(
  OutsideAlerter,
  connect(
    mapStateToProps,
    { modifyGuests, fetchListings }
  )
)(GuestsFilter);
