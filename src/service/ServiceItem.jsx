import React, { useEffect, useState } from 'react';
import ServiceGeneric from './ServiceGenerique';

const ServiceItem = {

  //item
  GetAllItem : async  () => {
      return await ServiceGeneric.get("item");
  },

  GetItem : async (id) => {
    return await ServiceGeneric.get(`item/${id}`);
  },

  CreateItem : async (token,data) => {
    return await ServiceGeneric.postWithToken(`item/create`,token,data);
  },


  //categories
  GetAllCategories : async (token) => {
    return await ServiceGeneric.getWithToken(`category`,token);
  },
  CreateCategories : async (token,data) => {
    return await ServiceGeneric.postWithToken(`category/create`,token,data);
  },
  DeleteCategories : async (token,id) => {
    return await ServiceGeneric.deleteWithToken(`category/delete/${id}`,token);
  },
  //materials
  GetAllMaterials : async (token) => {
    return await ServiceGeneric.getWithToken(`material`,token);
  },
  CreateMaterials : async (token,data) => {
    return await ServiceGeneric.postWithToken(`material/create`,token,data);
  },
  DeleteMaterials : async (token,id) => {
    return await ServiceGeneric.deleteWithToken(`material/delete/${id}`,token);
  }

};

export default ServiceItem