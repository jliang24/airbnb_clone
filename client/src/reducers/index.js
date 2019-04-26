import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from 'reducers/auth';
import pictures from 'reducers/pictures';
import details from 'reducers/details';
import listings from 'reducers/listings';

export default combineReducers({
  auth,
  pictures,
  details,
  listings,
  form: formReducer
});
