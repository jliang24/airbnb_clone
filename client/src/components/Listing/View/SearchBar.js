import React, { Component } from 'react';
import { Field, reduxForm, change } from 'redux-form';
import * as cities from 'utils/cities';
import * as states from 'utils/states';

import 'css/searchbar.css';

const initialState = {
  results: []
};

class SearchBar extends Component {
  state = initialState;

  handleSearchChange = (e, newValue) => {
    this.setState({ value: newValue });
    console.log(cities);
    console.log(states);
  };

  handleResultSelected = () => {
    console.log('hey');
    this.props.dispatch(change('searchbar', 'search', 'this is jeff'));
  };

  renderInput = field => {
    return (
      <div className="ui category search">
        <div className="ui icon input">
          <input
            {...field.input}
            className="prompt"
            type="text"
            placeholder="Search by State, City, or Address..."
          />
          <i className="search icon" />
        </div>
        <div className="results" />
      </div>
    );
  };

  render() {
    return (
      <Field
        onChange={(e, newValue) => this.handleSearchChange(e, newValue)}
        name="search"
        component={this.renderInput}
      />
    );
  }
}

export default reduxForm({
  form: 'searchbar'
})(SearchBar);
