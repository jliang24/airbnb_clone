import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import Welcome from './components/Welcome';
import Signup from './components/auth/Signup';
import ListingCreate from './components/listing/ListingCreate';
import Signout from './components/auth/Signout';
import Signin from './components/auth/Signin';
import './semantic/dist/semantic.min.css';

const store = createStore(
  reducers,
  {
    auth: { authenticated: localStorage.getItem('token') }
  },
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route path="/" exact component={Welcome} />
        <Route path="/signup" component={Signup} />
        <Route path="/signout" component={Signout} />
        <Route path="/signin" component={Signin} />
        <Route path="/listing/create" component={ListingCreate} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector('#root')
);
