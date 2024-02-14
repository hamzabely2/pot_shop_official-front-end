import axios from 'axios';

const ServiceGeneric = {
  get: async (url) => {
    try {
      return await axios.get(process.env.REACT_APP_URL + url);
    } catch (error) {
      throw error.response || error.message;
    }
  },

  getWithToken: async (url,token) => {
    try {
      return await axios.get(process.env.REACT_APP_URL + url ,{
        headers : {
          'Authorization': `Bearer ${token}`
        }
      });
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

  postWithToken: async (url,token,data) => {
    try {
      return await axios.post(process.env.REACT_APP_URL + url , data,{
        headers : {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      throw error.response || error.message;
    }
  },
  delete: async (url,token,data) => {
    try {
      return await axios.post(process.env.REACT_APP_URL + url , data,{
        headers : {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      throw error.response || error.message;
    }
  },
  deleteWithToken: async (url,token,data) => {
    try {
      return await axios.delete(process.env.REACT_APP_URL + url ,{
        headers : {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (error) {
      throw error.response || error.message;
    }
  },
};

export default ServiceGeneric;
