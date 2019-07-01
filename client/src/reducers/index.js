import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import pictures from './pictures';
import details from './details';
import listings from './listings';
import messages from './messages';
import deviceDims from './deviceDims';
import searchQuery from './searchQuery';

export default combineReducers({
  auth,
  pictures,
  details,
  messages,
  listings,
  deviceDims,
  searchQuery,
  form: formReducer
});
