import { CREATE_LISTING, FETCH_MESSAGES } from 'actions/types';
import _ from 'lodash';

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_LISTING:
      return { ...state, [action.payload._id]: action.payload };
    case FETCH_MESSAGES:
      return { ...state, ..._.mapKeys(action.payload, '_id') };
    default:
      return state;
  }
};
