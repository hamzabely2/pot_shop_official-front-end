import React from 'react';
import ServiceGeneric from './ServiceGenerique';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const token = cookies.get('token');

const ServiceItem = {

  GetAllUser : async  () => {
    return await ServiceGeneric.get("user");
  },

  GetUser: async (token) => {
    return await ServiceGeneric.getWithToken(`user/name`,token);
  },

  GetCartUser : async () => {
    return await ServiceGeneric.getWithToken(`cart`,token);
  }


};

export default ServiceItem