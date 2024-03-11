import Login from '../connection/Login';
import Home from '../page/pagePublic/page/Home';
import Item from '../page/pagePublic/item/Item';
import Register from '../connection/Register';
import React from 'react';
import HomeProfile from '../page/pageUser/profile/HomeProfile';
import ItemDetails from '../page/pagePublic/item/ItemDetails';
import Creation from '../page/pageUser/Creation';
import Payment from '../page/pageUser/Payment';
import MoreAboutPots from '../page/pagePublic/page/MoreAboutPots';

export const Roles = {
  user: "User",
  admin: "Admin",
  visitor : "Visitor"
}
export const auth_routes = [
  {
    path: "/public/home",
    ele: <Home></Home>,
    availability:[Roles.visitor, Roles.user]

  },
  {
    path: "/public/nous",
    ele: <MoreAboutPots></MoreAboutPots>,
    availability:[Roles.visitor, Roles.user]

  },
  {
    path: "/public/item",
    ele: <Item></Item>,
    availability:[Roles.visitor, Roles.user]

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
  },
  {
    path: "/public/item/details/:id",
    ele: <ItemDetails/>,
    availability:[Roles.visitor, Roles.user]
  },
  {
    path: "/public/creation",
    ele: <Creation />,
    availability:[ Roles.user,Roles.visitor]
  },

  {
    path: "/*",
    ele: <Home/>,
    availability:[Roles.visitor, Roles.user]
  },
]
export const admin_routes = [

]
export const user_routes = [
  {
    path: "/public/profile/home",
    ele: <HomeProfile/>,
    availability:[ Roles.user]
  },
  {
    path: "/public/order",
    ele: <Payment/>,
    availability:[Roles.user]
  },

]