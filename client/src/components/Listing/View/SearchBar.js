import React, { Component } from 'react';
import { Field, reduxForm, change } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';

import cityInfo from 'utils/cities';
import states from 'utils/states';
import zipcodeToState from 'utils/zipcode';
import { capitalizeFirstLetter, hasNumbers } from 'utils/text';
import SearchResults from './SearchResults';
import { fetchListings } from 'actions';

import 'css/searchbar.css';

const initialState = { results: {}, active: false };

class SearchBar extends Component {
  state = initialState;

  handleSearchChange = (e, newValue) => {
    const filteredResults = newValue ? this.filterByStateAndCity(newValue) : [];
    const propertyResults = this.organizeByProperty(filteredResults);

    this.setState({ results: propertyResults });
  };

  handleResultSelected = itemConfigs => {
    const { display } = itemConfigs;
    console.log(itemConfigs);
    this.props.dispatch(change('searchbar', 'search', display));
    this.props.fetchListings(null, itemConfigs);
    this.setState(initialState);
  };

  filterByStateAndCity = newValue => {
    const { cities } = cityInfo;

    const query = this.optimizeQuery(newValue);
    const regExp = new RegExp(query, 'i');

    const cityConfig = {
      regExp,
      query,
      arrInfo: cities,
      property: 'city'
    };

    const stateConfig = {
      regExp,
      query,
      arrInfo: states,
      property: 'state'
    };

    // This case is designed for zip codes.
    const filteredByCities = hasNumbers(newValue)
      ? []
      : this.filterValues(cityConfig);
    const filteredByStates = this.filterValues(stateConfig, filteredByCities);
    return filteredByStates;
  };

  optimizeQuery = string => {
    // Capitalize first letter, remove whitespaces, and escape special characters
    const query = capitalizeFirstLetter(string).trim();
    const escapedString = _.escapeRegExp(query);
    const zipcodeString = zipcodeToState(escapedString);
    const parsedString = zipcodeString ? zipcodeString : escapedString;

    return parsedString;
  };

  filterValues = (filterConfigs, arrToFilter = []) => {
    const { arrInfo, regExp, query, property } = filterConfigs;

    for (let value of arrInfo) {
      const propertyString = `${property} ${value}`;
      if (value.startsWith(query)) {
        arrToFilter.unshift(propertyString);
      } else if (regExp.test(value)) {
        arrToFilter.push(propertyString);
      }
    }
    return arrToFilter;
  };

  organizeByProperty = results => {
    const properties = {};

    const splitByPropertyValue = result => {
      const indexOfSpace = result.indexOf(' ');
      const property = result.substr(0, indexOfSpace);
      const value = result.substr(indexOfSpace + 1);

      return [property, value];
    };

    const pullTopResults = results.slice(0, 5);
    pullTopResults.forEach(result => {
      const [property, value] = splitByPropertyValue(result);

      if (properties[property] === undefined) {
        properties[property] = [];
      }

      const currentProperties = properties[property];
      properties[property] = [...currentProperties, value];
    });

    return properties;
  };

  renderInput = field => {
    return (
      <>
        <div className="ui category search">
          <div className="ui icon input">
            <input
              {...field.input}
              className="prompt"
              type="text"
              placeholder="Search by State, City, or Zip Code..."
              autoComplete="off"
            />
            <i className="search icon" />
          </div>
        </div>
        {field.input.value && (
          <i
            onClick={() => this.handleResultSelected({ display: '' })}
            className="close icon"
          />
        )}
      </>
    );
  };

  render() {
    return (
      <>
        <Field
          onChange={(e, newValue) => this.handleSearchChange(e, newValue)}
          name="search"
          component={this.renderInput}
          onFocus={e => this.setState({ active: true })}
          onBlur={e => this.setState({ active: false })}
        />
        <SearchResults
          results={this.state.results}
          handleResultSelected={this.handleResultSelected}
          searchBarActive={this.state.active}
        />
      </>
    );
  }
}

SearchBar = reduxForm({
  form: 'searchbar'
})(SearchBar);

export default connect(
  null,
  { fetchListings }
)(SearchBar);
