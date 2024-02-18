import Login from '../connection/Login';
import Home from '../page/pagePublic/Home';
import Collection from '../page/pagePublic/Collection';
import Item from '../page/pagePublic/item/Item';
import Register from '../connection/Register';
import HomeAdmin from '../page/pageAdmin/HomeAdmin';
import React from 'react';
import Nous from '../page/pagePublic/Nous';
import HomeProfile from '../page/pageUser/profile/HomeProfile';
import AdressProfile from '../page/pageUser/profile/AdressProfile';
import PasswordProfile from '../page/pageUser/profile/PasswordProfile';
import CommandeProfile from '../page/pageUser/profile/CommandeProfile';
import ItemDetails from '../page/pagePublic/item/ItemDetails';
import Creation from '../page/pageUser/Creation';
import ItemAdmin from '../page/pageAdmin/itemAdmin/ItemAdmin';
import CommandeAdmin from '../page/pageAdmin/CommandeAdmin';
import UserAdmin from '../page/pageAdmin/userAdmin/UserAdmin';
import CategoryAdmin from '../page/pageAdmin/itemAdmin/itemDetails/CategoryAdmin';
import CreateItem from '../page/pageAdmin/itemAdmin/createItem/CreateItem';
import MaterialAdmin
  from '../page/pageAdmin/itemAdmin/itemDetails/MaterialAdmin';

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
    ele: <Nous></Nous>,
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
    availability:[Roles.visitor, Roles.user, Roles.admin]
  },
  {
    path: "/public/creation",
    ele: <Creation />,
    availability:[Roles.visitor, Roles.user, Roles.admin]
  },
]
export const admin_routes = [
  {
    path: "/admin/home",
    ele: <HomeAdmin/>,
    availability:[ Roles.admin]
  },
  {
    path: "/admin/item",
    ele: <ItemAdmin/>,
    availability:[ Roles.admin]
  },  {
    path: "/admin/item/create",
    ele: <CreateItem/>,
    availability:[ Roles.admin]
  },  {
    path: "/admin/user",
    ele: <UserAdmin/>,
    availability:[ Roles.admin]
  },
  {
    path: "/admin/commande",
    ele: <CommandeAdmin/>,
    availability:[ Roles.admin]
  },
  {
    path: "/admin/item/material",
    ele: <MaterialAdmin/>,
    availability:[ Roles.admin]
  },
  {
    path: "/admin/item/category",
    ele: <CategoryAdmin/>,
    availability:[ Roles.admin]
  },
]
export const user_routes = [
  {
    path: "/public/collection",
    ele: <Collection/>,
    availability:[Roles.visitor, Roles.user, Roles.admin]
  },

  {
    path: "/public/profile/adress",
    ele: <AdressProfile/>,
    availability:[Roles.visitor, Roles.user, Roles.admin]
  },
  {
    path: "/public/profile/password",
    ele: <PasswordProfile/>,
    availability:[Roles.visitor, Roles.user, Roles.admin]
  },
  {
    path: "/public/profile/home",
    ele: <HomeProfile/>,
    availability:[Roles.visitor, Roles.user, Roles.admin]
  },
  {
    path: "/public/profile/commande",
    ele: <CommandeProfile/>,
    availability:[Roles.visitor, Roles.user, Roles.admin]
  },
]
