import {
  AUTH_USER,
  AUTH_ERROR,
  CREATE_LISTING,
  UPLOAD_PICTURES,
  ADD_DETAILS,
  CLEAR_DETAILS,
  FETCH_LISTING,
  FETCH_LISTINGS
} from 'actions/types';
import axios from 'axios';
import listingAPI from 'apis/listing';

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

export const uploadPictures = files => async (dispatch, getState) => {
  const { authenticated } = getState().auth;
  const uploadURLS = [];
  for (let file of files) {
    const uploadConfig = await listingAPI(authenticated).get('/api/upload');

    uploadURLS.push(uploadConfig.data.key);

    await axios.put(uploadConfig.data.url, file, {
      headers: {
        'Content-Type': file.type
      }
    });
  }
  dispatch({ type: UPLOAD_PICTURES, payload: uploadURLS });
  return uploadURLS;
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

export const createListing = formValues => async (dispatch, getState) => {
  const { authenticated } = getState().auth;

  const response = await listingAPI(authenticated).post(
    '/api/listings',
    formValues
  );

  dispatch({ type: CREATE_LISTING, payload: response.data });
};

export const fetchListings = () => async dispatch => {
  const response = await listingAPI().get('/api/listings');

  dispatch({ type: FETCH_LISTINGS, payload: response.data });
};

export const fetchListing = id => async dispatch => {
  const response = await listingAPI().get(`/api/listings/${id}`);

  dispatch({ type: FETCH_LISTING, payload: response.data });
};
