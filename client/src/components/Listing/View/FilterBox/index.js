import React, { Component } from 'react';
import { connect } from 'react-redux';
import { resetSearch } from 'actions';

import DatesFilter from './Dates';
import GuestsFilter from './Guests';
import CostFilter from './Cost';

class FilterBox extends Component {
  componentWillUnmount() {
    this.props.resetSearch();
  }

  render() {
    return (
      <div className="filterbox ui three column grid">
        <DatesFilter />
        <GuestsFilter />
        <CostFilter />
      </div>
    );
  }
}

export default connect(
  null,
  { resetSearch }
)(FilterBox);
