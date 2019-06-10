import {
  CREATE_LISTING,
  ADD_DETAILS,
  CLEAR_DETAILS,
  FETCH_LISTINGS,
  CLEAR_LISTINGS,
  DELETE_LISTING,
  EDIT_LISTING,
  UPLOAD_PICTURES,
  CLEAR_MESSAGES
} from './types';

import listingAPI from 'apis/listing';

export const createListing = formValues => async (dispatch, getState) => {
  const { authenticated } = getState().auth;

  const response = await listingAPI(authenticated).post(
    '/api/listings',
    formValues
  );

  dispatch({ type: CREATE_LISTING, payload: response.data });
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

export const fetchListings = user => async (dispatch, getState) => {
  const { authenticated } = getState().auth;
  // If user is authenticated, make a request to route that has authentication required
  const response =
    authenticated && user
      ? await listingAPI(authenticated).get('/api/listings/user')
      : await listingAPI().get('/api/listings');

  dispatch({ type: FETCH_LISTINGS, payload: response.data });
};

export const clearListings = () => {
  return {
    type: CLEAR_LISTINGS
  };
};

export const deleteListing = id => async (dispatch, getState) => {
  const { authenticated } = getState().auth;
  await listingAPI(authenticated).delete(`/api/listings/${id}`);

  dispatch({ type: DELETE_LISTING, payload: id });
  dispatch({ type: CLEAR_MESSAGES });
};

export const fetchListing = id => async dispatch => {
  const response = await listingAPI().get(`/api/listings/${id}`);
  const { pictures, location, details, amenities } = response.data;

  // map amenities to form values that are true
  const amenitiesObj = amenities
    ? amenities.reduce((acc, amenity) => {
        return { ...acc, [amenity]: true };
      }, 0)
    : {};

  // data comes back as a string in mongoose. convert back to dates
  const { includedDates, unavailableDates } = details;
  details.includedDates = includedDates.map(date => new Date(date));
  details.unavailableDates = unavailableDates.map(date => new Date(date));
  details['_user'] = response.data._user;

  dispatch({ type: UPLOAD_PICTURES, payload: pictures });
  dispatch({
    type: ADD_DETAILS,
    payload: { ...details, location, amenitiesObj }
  });
};

export const editListing = (id, formValues) => async (dispatch, getState) => {
  const { authenticated } = getState().auth;
  const response = await listingAPI(authenticated).patch(
    `/api/listings/${id}`,
    formValues
  );
  dispatch({ type: EDIT_LISTING, payload: response.data });
};
