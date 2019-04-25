import axios from 'axios';

export default (auth = null) => {
  if (auth)
    return axios.create({
      baseURL: 'http://localhost:3090',
      headers: {
        authorization: auth
      }
    });
  return axios.create({
    baseURL: 'http://localhost:3090'
  });
};
