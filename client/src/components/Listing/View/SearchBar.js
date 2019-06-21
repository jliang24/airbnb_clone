import React, { Component } from 'react';

import 'css/searchbar.css';

class SearchBar extends Component {
  render() {
    return (
      <div className="ui category search">
        <div className="ui icon input">
          <input
            className="prompt"
            type="text"
            placeholder="Search by State, City, or Address..."
          />
          <i className="search icon" />
        </div>
        <div className="results" />
      </div>
    );
  }
}

export default SearchBar;
