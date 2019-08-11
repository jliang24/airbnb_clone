import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import pictures from './pictures';
import details from './details';
import listings from './listings';
import messages from './messages';
import deviceDims from './deviceDims';
import searchQuery from './searchQuery';
import maps from './maps';

export default combineReducers({
  auth,
  pictures,
  details,
  messages,
  listings,
  deviceDims,
  maps,
  searchQuery,
  form: formReducer
});
