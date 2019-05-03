import axios from 'axios';

export default (auth = null) => {
  if (auth)
    return axios.create({
      headers: {
        authorization: auth
      }
    });
  return axios.create({});
};
