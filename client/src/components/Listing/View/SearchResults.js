import React from 'react';

import cityInfo from 'utils/cities';

import 'css/searchresults.css';

const SearchResults = props => {
  const results = props.results;
  const handleResultSelected = props.handleResultSelected;

  const addStateToCity = city => {
    const cityContainer = cityInfo[city];
    return `${city}, ${cityContainer.state}`;
  };

  const renderTableDivs = (category, items) => {
    return items.map(item => {
      const itemString = category === 'city' ? addStateToCity(item) : item;

      const itemConfigs = {
        category,
        value: item,
        display: itemString
      };

      return (
        <tr onClick={() => handleResultSelected(itemConfigs)} key={item}>
          <td className="result">{itemString}</td>
        </tr>
      );
    });
  };

  const createCategory = results => {
    const tableRow = [];
    for (const [key, value] of Object.entries(results)) {
      tableRow.push(
        <React.Fragment key={key + value}>
          <tr>
            <td className="category" rowSpan={value.length + 1}>
              {key}
            </td>
          </tr>
          {renderTableDivs(key, value)}
        </React.Fragment>
      );
    }
    return tableRow;
  };

  const renderResults = () => {
    return (
      <table style={{ width: '50%' }} className="ui celled structured table">
        <tbody>{createCategory(results)}</tbody>
      </table>
    );
  };

  return renderResults();
};

export default SearchResults;
