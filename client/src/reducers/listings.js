import _ from 'lodash';
import {
  CREATE_LISTING,
  FETCH_LISTINGS,
  FETCH_LISTING,
  DELETE_LISTING,
  EDIT_LISTING,
  CLEAR_LISTINGS
} from 'actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_LISTING:
      return { ...state, [action.payload._id]: action.payload };
    case FETCH_LISTING:
      return { ...state, [action.payload._id]: action.payload };
    case FETCH_LISTINGS:
      return _.mapKeys(action.payload, '_id');
    case EDIT_LISTING:
      return { ...state, [action.payload._id]: action.payload };
    case DELETE_LISTING:
      return _.omit(state, action.payload);
    case CLEAR_LISTINGS:
      return {};
    default:
      return state;
  }
};
