import React from 'react';

import Header from 'components/Header';

const App = ({ children }) => {
  return (
    <div className="ui container">
      <Header />
      {children}
    </div>
  );
};

export default App;
