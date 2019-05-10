import { CREATE_LISTING } from 'actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case CREATE_LISTING:
      return [...state, action.payload];
  }
};
