import React, { useEffect, useState } from 'react';
import ServiceGeneric from './ServiceGenerique';

const ServiceItem = {

  GetAllItem : async  () => {
      return await ServiceGeneric.get("item");
  },

  GetItem : async (id) => {
    return await ServiceGeneric.get(`item/${id}`);
  }

};

export default ServiceItem