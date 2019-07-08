import { UPDATE_ACTIVE_LISTING, PIN_LISTING } from './types';

export const updateActiveListing = id => {
  return {
    type: UPDATE_ACTIVE_LISTING,
    payload: id
  };
};

export const pinListing = id => {
  return {
    type: PIN_LISTING,
    payload: id
  };
};
