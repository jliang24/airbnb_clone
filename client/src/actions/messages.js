import listingAPI from 'apis/listing';

import {
  CREATE_MESSAGE,
  FETCH_MESSAGES,
  CHANGE_RESPONSE,
  CLEAR_MESSAGES
} from './types';

export const createMessage = formValues => async (dispatch, getState) => {
  const { authenticated } = getState().auth;
  const response = await listingAPI(authenticated).post(
    '/api/messages',
    formValues
  );

  dispatch({ type: CREATE_MESSAGE, payload: response.data });
};

export const fetchMessages = callback => async (dispatch, getState) => {
  const { authenticated } = getState().auth;
  const response = await listingAPI(authenticated).get('/api/messages');

  await dispatch({ type: FETCH_MESSAGES, payload: response.data });

  //call the callback if it is a function
  typeof callback === 'function' && callback();
};

export const changeResponse = (reply, id) => async (dispatch, getState) => {
  const { authenticated } = getState().auth;

  const response = await listingAPI(authenticated).patch(
    `/api/messages/${id}`,
    reply
  );

  await dispatch({ type: CHANGE_RESPONSE, payload: response.data });
};

export const clearMessages = () => {
  return {
    type: CLEAR_MESSAGES
  };
};
