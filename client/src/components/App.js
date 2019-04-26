import React from 'react';
import Header from 'components/Header';

export default ({ children }) => {
  return (
    <div className="ui container">
      <Header />
      {children}
    </div>
  );
};
