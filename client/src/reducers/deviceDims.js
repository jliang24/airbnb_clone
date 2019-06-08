import { UPDATE_WIDTH, UPDATE_HEIGHT } from 'actions/types';

export default (state = { width: 0, height: 0 }, action) => {
  switch (action.type) {
    case UPDATE_WIDTH:
      return { ...state, width: action.payload };
    case UPDATE_HEIGHT:
      return { ...state, height: action.payload };
    default:
      return state;
  }
};
