import { UPLOAD_PICTURES } from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case UPLOAD_PICTURES:
      return [...state, ...action.payload];
    default:
      return state;
  }
};
