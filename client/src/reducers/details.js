import { ADD_DETAILS, CLEAR_DETAILS, REPLACE_DETAILS } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_DETAILS:
      return { ...state, ...action.payload };
    case CLEAR_DETAILS:
      return {};
    default:
      return state;
  }
};
