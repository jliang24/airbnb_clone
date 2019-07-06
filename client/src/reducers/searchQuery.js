import {
  MODIFY_SEARCH,
  MODIFY_DATES,
  MODIFY_GUESTS,
  MODIFY_COST
} from 'actions/types';

const initialState = {
  searchConfigs: null,
  dates: null,
  guests: null,
  cost: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MODIFY_SEARCH:
      return { ...state, searchConfigs: action.payload };
    case MODIFY_DATES:
      return { ...state, dates: action.payload };
    case MODIFY_GUESTS:
      return { ...state, guests: action.payload };
    case MODIFY_COST:
      return { ...state, cost: action.payload };
    default:
      return state;
  }
};
