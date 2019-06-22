import React, { Component } from 'react';
import { Field, reduxForm, change } from 'redux-form';
import _ from 'lodash';

import cityInfo from 'utils/cities';
import states from 'utils/states';
import zipcodeToState from 'utils/zipcode';
import { capitalizeFirstLetter, hasNumbers } from 'utils/text';
import SearchResults from './SearchResults';

import 'css/searchbar.css';

class SearchBar extends Component {
  state = { results: {} };

  handleSearchChange = (e, newValue) => {
    const filteredResults = newValue ? this.filterByStateAndCity(newValue) : [];
    const propertyResults = this.organizeByProperty(filteredResults);

    this.setState({ results: propertyResults });
  };

  handleResultSelected = () => {
    this.props.dispatch(change('searchbar', 'search', 'this is jeff'));
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
    const pullTopResults = results.slice(0, 5);

    const splitByPropertyValue = result => {
      const indexOfSpace = result.indexOf(' ');
      const property = result.substr(0, indexOfSpace);
      const value = result.substr(indexOfSpace + 1);

      return [property, value];
    };

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
      <div className="ui category search">
        <div className="ui icon input">
          <input
            {...field.input}
            className="prompt"
            type="text"
            placeholder="Search by State or City..."
            autoComplete="off"
          />
          <i className="search icon" />
        </div>
      </div>
    );
  };

  render() {
    return (
      <>
        <Field
          onChange={(e, newValue) => this.handleSearchChange(e, newValue)}
          name="search"
          component={this.renderInput}
        />
        <SearchResults results={this.state.results} />
      </>
    );
  }
}

export default reduxForm({
  form: 'searchbar'
})(SearchBar);
