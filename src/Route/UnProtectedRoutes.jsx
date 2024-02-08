import Login from '../connection/login/Login';
import Home from '../page/pagePublic/home/Home';
import Collection from '../page/pagePublic/collection/Collection';
import Nous from '../page/pagePublic/Nous/Nous';
import Item from '../page/pagePublic/item/Item';
import Register from '../connection/register/Register';
import HomeAdmin from '../page/pageAdmin/HomeAdmin';
import React from 'react';

export const userRoles = {
  user: "User",
  admin: "Admin",
}
export const auth_routes = [
  {
    path: "/public/home",
    ele: <Home></Home>,
  },
  {
    path: "/public/nous",
    ele: <Nous></Nous>,
  },
  {
    path: "/public/item",
    ele: <Item></Item>,
  },
  {
    path: "/public/register",
    ele: <Register></Register>,
  },
  {
    path: "/public/login",
    ele: <Login></Login>,
  }
]
export const admin_routes = [
  {
    path: "/admin/homeAdmin",
    ele: <HomeAdmin/>,
    availability:[userRoles.admin]
  }
]
export const user_routes = [
  {
    path: "/public/Collection",
    ele: <Collection/>,
    availability:[userRoles.user]
  }
]
