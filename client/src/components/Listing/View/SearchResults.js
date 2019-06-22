import React from 'react';

const SearchResults = props => {
  const results = props.results;

  const renderTableDivs = items => {
    return items.map(item => {
      return (
        <tr key={item}>
          <td>{item}</td>
        </tr>
      );
    });
  };

  const createCategory = results => {
    const tableDiv = [];
    for (const [key, value] of Object.entries(results)) {
      tableDiv.push(
        <React.Fragment key={value}>
          <tr>
            <td rowSpan={value.length + 1}>{key}</td>
          </tr>
          {renderTableDivs(value)}
        </React.Fragment>
      );
    }
    return tableDiv;
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
