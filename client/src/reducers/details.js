import { ADD_DETAILS } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_DETAILS:
      return action.payload;
    default:
      return state;
  }
};
