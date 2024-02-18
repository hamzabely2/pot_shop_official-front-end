import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import {Roles} from '../../Route/UnProtectedRoutes';
import Footer from './Footer';
function FooterChooser({currentUserRole,handleSignOut,token }) {

  useEffect(() => {}, [currentUserRole]);
  const location = useLocation();

  if(location.pathname === "/public/login" || location.pathname === "/public/register") {
    return null;
  }else if(currentUserRole === Roles.user || currentUserRole === Roles.visitor){
    return <Footer currentUserRole={currentUserRole} handleSignOut={handleSignOut}  token={token}/>
  }
}

export default FooterChooser;