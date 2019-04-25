import _ from 'lodash';
import {
  CREATE_LISTING,
  FETCH_LISTINGS,
  FETCH_LISTING,
  DELETE_LISTING,
  EDIT_LISTING
} from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_LISTING:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_LISTING:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_LISTINGS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case EDIT_LISTING:
      return { ...state, [action.payload.id]: action.payload };
    case DELETE_LISTING:
      return _.omit(state, action.payload);

    default:
      return state;
  }
};
