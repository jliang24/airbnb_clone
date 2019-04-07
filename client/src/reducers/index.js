import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import auth from './auth';
import pictures from './pictures';
import details from './details';

export default combineReducers({
  auth,
  pictures,
  details,
  form: formReducer
});
