import React from 'react';
import ServiceGeneric from './ServiceGenerique';

const UserService = {

  //user
  GetAllUser : async  () => {
    return await ServiceGeneric.get("user");
  },

  GetUser: async (token) => {
    return await ServiceGeneric.getWithToken(`user/name`,token);
  },

  DeleteUser: async (token) => {
    return await ServiceGeneric.deleteWithToken(`user/delete`,token);
  },

  PutPassword : async (token,data) => {
    return await ServiceGeneric.putWithToken(`user/update/password`,token,data);
  },


  //cart
  GetCartUser : async (token) => {
    return await ServiceGeneric.getWithToken(`cart`,token);
  },

  CreateCartUser : async (token,data) => {
    return await ServiceGeneric.postWithToken(`cart/create`,token,data);
  },

  DeleteItemInCart : async (token,id) => {
    return await ServiceGeneric.deleteWithToken(`cart/delete/${id}`,token);
  },


  //address
  GetAddressUser : async (token) => {
    return await ServiceGeneric.getWithToken(`address/user`,token);
  },

  CreateAddressUser : async (token,data) => {
    return await ServiceGeneric.postWithToken(`address/create`,token,data);
  },

  DeleteAddressUser : async (token,id) => {
    return await ServiceGeneric.deleteWithToken(`address/delete/${id}`,token);
  },

  PutAddressUser : async (token,id,data) => {
    return await ServiceGeneric.putWithToken(`address/update/${id}`,token,data);
  },
};

export default UserService