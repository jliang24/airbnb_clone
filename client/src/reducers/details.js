import { ADD_DETAILS, CLEAR_DETAILS } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_DETAILS:
      console.log(action.payload);
      return { ...state, ...action.payload };
    case CLEAR_DETAILS:
      return {};
    default:
      return state;
  }
};
