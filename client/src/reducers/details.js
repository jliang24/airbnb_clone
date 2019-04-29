import { ADD_DETAILS, CLEAR_DETAILS } from 'actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case ADD_DETAILS:
      return { ...state, ...action.payload };
    case CLEAR_DETAILS:
      state = {};
      console.log(state);
      return state;
    default:
      return state;
  }
};
