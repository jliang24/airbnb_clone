import React from 'react';

export default () => {
  return (
    <div className="ui vertical inverted masthead center aligned segment">
      <div className="inverted ui text container segment">
        <h1
          style={{ color: 'white', fontSize: '3rem' }}
          className="inverted ui center aligned "
        >
          Welcome to an airbnb clone.
        </h1>
        <h2 className="grey inverted ui center aligned ">
          Feel free to check out the listings at the top!
        </h2>
      </div>
    </div>
  );
};
