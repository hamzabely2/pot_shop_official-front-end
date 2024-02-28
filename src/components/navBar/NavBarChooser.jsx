import React, {useEffect} from 'react';
import { useLocation } from "react-router-dom";
import NavBar from './NavBar';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
function NavBarChooser({currentUserRole,handleSignOut,token }) {

  useEffect(() => {}, [currentUserRole]);
  const location = useLocation();

  if(location.pathname === "/public/login" || location.pathname === "/public/register") {
    return null;
  }else {
    return <NavBar currentUserRole={currentUserRole} handleSignOut={handleSignOut}  token={token}/>
  }
}

export default NavBarChooser;