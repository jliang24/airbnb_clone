import { MODIFY_SEARCH, MODIFY_DATES, MODIFY_GUESTS } from 'actions/types';

const initialState = {
  searchConfigs: null,
  dates: null,
  guests: 1
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MODIFY_SEARCH:
      return { ...state, searchConfigs: action.payload };
    case MODIFY_DATES:
      return { ...state, dates: action.payload };
    case MODIFY_GUESTS:
      return { ...state, guests: action.payload };
    default:
      return state;
  }
};
