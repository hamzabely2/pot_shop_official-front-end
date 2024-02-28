import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const ServiceGeneric = {
  get: async (url) => {
    try {
      return await axios.get(process.env.REACT_APP_URL + url ,{
        headers : {
        }
      });
    } catch (error) {
      throw error.response || error.message;
    }
  },

  getWithToken: async (url) => {
    try {
      return await axios.get(process.env.REACT_APP_URL + url ,{
        headers : {
          'Authorization': `Bearer ${cookies.get('token')}`
        }

      });
    } catch (error) {
      throw error.response || error.message;
    }
  },

  post: async (url, data) => {
    try {
      return await axios.post(process.env.REACT_APP_URL + url, data);
    } catch (error) {
      throw error.response || error.message;
    }
  },

  postWithToken: async (url,data) => {
    try {
      return await axios.post(process.env.REACT_APP_URL + url , data,{
        headers : {
          'Authorization': `Bearer ${cookies.get('token')}`,
        }
      });
    } catch (error) {
      throw error.response || error.message;
    }
  },

  postWithTokenAndContentType: async (url,data) => {
    try {
      return await axios.post(process.env.REACT_APP_URL + url ,data,{
        headers : {
          'Authorization': `Bearer ${cookies.get('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });
    } catch (error) {
      throw error.response || error.message;
    }
  },
  putWithToken: async (url,data) => {
    try {
      return await axios.put(process.env.REACT_APP_URL + url ,data,{
        headers : {
          'Authorization': `Bearer ${cookies.get('token')}`
        }
      });
    } catch (error) {
      throw error.response || error.message;
    }
  },
  delete: async (url,data) => {
    try {
      return await axios.post(process.env.REACT_APP_URL + url , data,{
        headers : {
          'Authorization': `Bearer ${cookies.get('token')}`
        }
      });
    } catch (error) {
      throw error.response || error.message;
    }
  },
  deleteWithToken: async (url,data) => {
    try {
      return await axios.delete(process.env.REACT_APP_URL + url ,{
        headers : {
          'Authorization': `Bearer ${cookies.get('token')}`
        },data
      });
    } catch (error) {
      throw error.response || error.message;
    }
  },
};

export default ServiceGeneric;
