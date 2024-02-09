import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import NavBar from './NavBar';
import NavBarAdmin from '../../page/pageAdmin/NavBarAdmin';
import Cookies from 'universal-cookie';
import {Roles} from '../../Route/UnProtectedRoutes';
const cookies = new Cookies();
function NavBarChooser({currentUserRole,handleSignOut }) {

  useEffect(() => {}, [currentUserRole]);
  const location = useLocation();

  if(location.pathname === "/public/login" || location.pathname === "/public/register") {
    return null;
  }else if(currentUserRole === Roles.admin) {
    return <NavBarAdmin currentUserRole={currentUserRole} handleSignOut={handleSignOut} />
  }else if(currentUserRole === Roles.user || currentUserRole === Roles.visitor){
    return <NavBar currentUserRole={currentUserRole} handleSignOut={handleSignOut} />
  }
}

export default NavBarChooser;