import React, {useState} from 'react';
import { useLocation } from "react-router-dom";
import NavBar from './NavBar';
import NavBarAdmin from '../../page/pageAdmin/NavBarAdmin';
import HomeAdmin from '../../page/pageAdmin/HomeAdmin';
import {getRoleFromToken} from '../../service/useAuth';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
function NavBarChooser() {
  const [connected, setConnected] = useState(false);
  const [role, setRole] = useState(null);

  const token = cookies.get("token");
  if (token) {
    const userRole = getRoleFromToken();
    if (connected) {
      setRole(userRole);
    }
  }

  console.log("navBarAdmin")

  const location = useLocation();
  let header
if(location.pathname.split("/")[1] === "admin" ){
header = <NavBarAdmin/>
}else if(location.pathname.split("/")[1] === "public" ){
 header = <NavBar />
}else if (location.pathname.split("/")[1] === "public"){
  header = <></>
}

  return header;
}

export default NavBarChooser;