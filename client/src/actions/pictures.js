import axios from 'axios';

import { CLEAR_PICTURES, UPLOAD_PICTURES } from './types';
import listingAPI from 'apis/listing';

export const uploadPictures = files => async (dispatch, getState) => {
  const { authenticated } = getState().auth;
  const uploadURLS = [];
  for (let file of files) {
    const filetype = file.type.split('/')[1];

    const uploadConfig = await listingAPI(authenticated).get(
      `/api/upload/${filetype}`
    );

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

export const clearPictures = () => {
  return {
    type: CLEAR_PICTURES
  };
};
