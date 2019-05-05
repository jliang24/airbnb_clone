import { UPLOAD_PICTURES, CLEAR_PICTURES } from 'actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case UPLOAD_PICTURES:
      return action.payload;
    case CLEAR_PICTURES:
      return [];
    default:
      return state;
  }
};
