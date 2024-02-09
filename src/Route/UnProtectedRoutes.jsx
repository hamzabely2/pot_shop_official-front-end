import Login from '../connection/Login';
import Home from '../page/pagePublic/Home';
import Collection from '../page/pagePublic/Collection';
import Item from '../page/pagePublic/item/Item';
import Register from '../connection/Register';
import HomeAdmin from '../page/pageAdmin/HomeAdmin';
import React from 'react';
import Nous from '../page/pagePublic/Nous';

export const Roles = {
  user: "User",
  admin: "Admin",
  visitor : "Visitor"
}
export const auth_routes = [
  {
    path: "/public/home",
    ele: <Home></Home>,
    availability:[Roles.visitor, Roles.user, Roles.admin]

  },
  {
    path: "/public/nous",
    ele: <Nous></Nous>,
    availability:[Roles.visitor, Roles.user, Roles.admin]

  },
  {
    path: "/public/item",
    ele: <Item></Item>,
    availability:[Roles.visitor, Roles.user, Roles.admin]

  },
  {
    path: "/public/register",
    ele: <Register></Register>,
    availability:[Roles.visitor]

  },
  {
    path: "/public/login",
    ele: <Login></Login>,
    availability:[Roles.visitor]
  }
]
export const admin_routes = [
  {
    path: "/admin/homeAdmin",
    ele: <HomeAdmin/>,
    availability:[Roles.admin]
  }
]
export const user_routes = [
  {
    path: "/public/Collection",
    ele: <Collection/>,
    availability:[Roles.visitor, Roles.user, Roles.admin]
  }
]
