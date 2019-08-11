import {
  MODIFY_SEARCH,
  MODIFY_DATES,
  MODIFY_GUESTS,
  MODIFY_COST,
  RESET_SEARCH
} from 'actions/types';

export const modifySearch = searchConfigs => {
  return {
    type: MODIFY_SEARCH,
    payload: searchConfigs
  };
};

export const modifyDates = dateConfigs => {
  return {
    type: MODIFY_DATES,
    payload: dateConfigs
  };
};

export const modifyGuests = numGuests => {
  return {
    type: MODIFY_GUESTS,
    payload: numGuests
  };
};

export const modifyCost = numCost => {
  return {
    type: MODIFY_COST,
    payload: numCost
  };
};

export const resetSearch = () => {
  return {
    type: RESET_SEARCH
  };
};
