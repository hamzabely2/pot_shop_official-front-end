import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import Cookies from 'universal-cookie';
import PasswordProfile from './PasswordProfile';
import AdressProfile from './AdressProfile';
const cookies = new Cookies();
export default function RouteProfile({currentUserRole,handleSignOut }) {

  useEffect(() => {}, [currentUserRole]);
  const location = useLocation();

  const url = location.pathname
  const home = "/public/profile/home"
  const password = "/public/profile/home"
  const adress = "/public/profile/adress"

  console.log("local",location.pathname);

  if(url === password) {
    return <PasswordProfile/>
  }else if(url === adress) {
    console.log("add")
    return <AdressProfile/>
  }else{
    return <p>rien</p>
  }

}
