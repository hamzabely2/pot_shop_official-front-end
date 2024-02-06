import React, { useEffect, useState } from 'react';
import ServiceGeneric from './ServiceGenerique';

const ServiceItem = {

  GetAllUser : async  () => {
    return await ServiceGeneric.get("user");
  },

  GetUser: async (id) => {
    return await ServiceGeneric.get(`user/${id}`);
  }

};

export default ServiceItem