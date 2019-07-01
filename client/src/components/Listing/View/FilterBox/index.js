import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchBar from './SearchBar';
import DatesFilter from './Dates';
import GuestsFilter from './Guests';
import { fetchListings } from 'actions';

class FilterBox extends Component {
  componentDidUpdate() {
    const search = this.props.searchbar.values || '';
  }

  render() {
    return (
      <div>
        <SearchBar />
        <DatesFilter />
        <GuestsFilter />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    searchbar: state.form.searchbar
  };
};

export default connect(
  mapStateToProps,
  { fetchListings }
)(FilterBox);
