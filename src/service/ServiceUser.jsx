import React, { useEffect, useState } from 'react';
import ServiceGeneric from './ServiceGenerique';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const token = cookies.get('token');

const ServiceItem = {

  GetAllUser : async  () => {
    return await ServiceGeneric.get("user");
  },

  GetUser: async (id) => {
    return await ServiceGeneric.get(`user/${id}`);
  },

  GetCartUser : async (id) => {
    return await ServiceGeneric.getWithToken(`cart`,token);
  }


};

export default ServiceItem