import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from 'reducers/auth';
import pictures from 'reducers/pictures';
import details from 'reducers/details';
import listings from 'reducers/listings';
import messages from 'reducers/messages';
import deviceDims from 'reducers/deviceDims';

export default combineReducers({
  auth,
  pictures,
  details,
  messages,
  listings,
  deviceDims,
  form: formReducer
});
