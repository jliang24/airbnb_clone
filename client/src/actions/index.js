import {
  AUTH_USER,
  AUTH_ERROR,
  SUBMIT_LISTING,
  UPLOAD_PICTURES,
  ADD_DETAILS,
  CLEAR_DETAILS
} from './types';
import axios from 'axios';

export const signup = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      'http://localhost:3090/signup',
      formProps
    );

    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem('token', response.data.token);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
  }
};

export const signin = (formProps, callback) => async dispatch => {
  try {
    const response = await axios.post(
      'http://localhost:3090/signin',
      formProps
    );

    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem('token', response.data.token);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
  }
};

export const signout = () => {
  localStorage.removeItem('token');
  return {
    type: AUTH_USER,
    payload: ''
  };
};

export const submitListing = files => async (dispatch, getState) => {
  const { auth } = getState();
  const uploadURLS = [];
  for (let file of files) {
    const uploadConfig = await axios.get('http://localhost:3090/api/upload', {
      headers: {
        authorization: auth.authenticated
      }
    });
    uploadURLS.push(uploadConfig.data.key);

    await axios.put(uploadConfig.data.url, file, {
      headers: {
        'Content-Type': file.type
      }
    });
  }

  dispatch({ type: UPLOAD_PICTURES, payload: uploadURLS });
};

export const addDetails = formValues => {
  return {
    type: ADD_DETAILS,
    payload: formValues
  };
};

export const clearDetails = () => {
  return {
    type: CLEAR_DETAILS
  };
};
