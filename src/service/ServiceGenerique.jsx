import axios from 'axios';

const ServiceGeneric = {
  get: async (url) => {
    try {
      return await axios.get(process.env.REACT_APP_URL + url);
    } catch (error) {
      throw error.response || error.message;
    }
  },

  post: async (url, data) => {
    try {
      return await axios.post(url, data);
    } catch (error) {
      throw error.response || error.message;
    }
  },
};

export default ServiceGeneric;
