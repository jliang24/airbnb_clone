import { UPDATE_WIDTH, UPDATE_HEIGHT } from './types';

export const updateWidth = width => {
  return {
    type: UPDATE_WIDTH,
    payload: width
  };
};

export const updateHeight = height => {
  return {
    type: UPDATE_HEIGHT,
    payload: height
  };
};
