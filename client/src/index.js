import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from 'components/App';
import reducers from 'reducers';
import history from 'historyObj';
import Welcome from 'components/Welcome';
import Signup from 'components/Auth/Signup';
import Signout from 'components/Auth/Signout';
import Signin from 'components/Auth/Signin';
import ListingCreate from 'components/Listing/ListingCreate';
import ListingView from 'components/Listing/ListingView';
import ListingFormReview from 'components/Listing/FormReview/ListingFormReview';
import ListingDelete from 'components/Listing/ListingDelete';
import Home from 'components/Home';
import 'semantic/dist/semantic.min.css';
import 'css/themes.css';

const store = createStore(
  reducers,
  {
    auth: { authenticated: localStorage.getItem('token') }
  },
  applyMiddleware(reduxThunk)
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App>
        <Switch>
          <Route path="/" exact component={Welcome} />
          <Route path="/home" exact component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/signout" component={Signout} />
          <Route path="/signin" component={Signin} />
          <Route path="/listings/create" exact component={ListingCreate} />
          <Route path="/listings" component={ListingView} exact />
          <Route path="/listings/:id" exact component={ListingFormReview} />
          <Route path="/listings/delete/:id" exact component={ListingDelete} />
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.querySelector('#root')
);
