import React from 'react';
import ServiceGeneric from './ServiceGenerique';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const token = cookies.get('token');

const ServiceUser = {

  GetAllUser : async  () => {
    return await ServiceGeneric.get("user");
  },

  GetUser: async (token) => {
    return await ServiceGeneric.getWithToken(`user/name`,token);
  },

  GetCartUser : async (token) => {
    return await ServiceGeneric.getWithToken(`cart`,token);
  },

  CreateCartUser : async (token,data) => {
    return await ServiceGeneric.postWithToken(`cart/create`,token,data);
  },

  DeleteItemInCart : async (token,id) => {
    return await ServiceGeneric.deleteWithToken(`cart/delete/${id}`,token);
  }
};

export default ServiceUser