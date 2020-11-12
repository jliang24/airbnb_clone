import axios from 'axios';

import { CLEAR_PICTURES, UPLOAD_PICTURES } from './types';

export const uploadPictures = files => async (dispatch, getState) => {
  const { authenticated } = getState().auth;
  const uploadURLS = [];
  for (let file of files) {
    const filetype = file.type.split('/')[1];

    var fileInfo = await addImageProcess(file)


  await axios({
    method: 'post',
    url: `/api/upload/${filetype}`,
    data: { pictures: fileInfo} ,
    headers: {
        authorization: authenticated
  }}).then( function(response) {
    console.log(response)
    uploadURLS.push(response.data.url)
  })
  }
  
  dispatch({ type: UPLOAD_PICTURES, payload: uploadURLS });

  return uploadURLS;
};

 function addImageProcess(file) {
  return new Promise((resolve, reject) => {
  var reader = new FileReader();
   reader.readAsDataURL(file);
   reader.onload = () => resolve(reader.result)
   reader.onerror = function (error) {
     console.log('Error: ', error);
   };
  })
}

export const clearPictures = () => {
  return {
    type: CLEAR_PICTURES
  };
};
