import ServiceGeneric from './ServiceGenerique';

const UserService = {


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
};

export default UserService