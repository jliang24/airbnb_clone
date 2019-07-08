import { UPDATE_ACTIVE_LISTING, PIN_LISTING } from 'actions/types';

const initialState = {
  hoveredId: '',
  pinnedId: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ACTIVE_LISTING:
      return { ...state, hoveredId: action.payload };
    case PIN_LISTING:
      return { ...state, pinnedId: action.payload };
    default:
      return state;
  }
};
