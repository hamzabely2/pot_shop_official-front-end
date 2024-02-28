import { Navigate } from "react-router-dom"
import { useLocation } from "react-router-dom";
import Cookies from 'universal-cookie';
import {Roles} from './UnProtectedRoutes';
import {getRoleFromToken} from '../service/TokenService';
const cookies = new Cookies();

const  RequireAuth = ({ children, userRoles,setCurrentUserRole }) => {
  const location = useLocation();
  let currentUserRole;

  if (cookies.get("token")){
    currentUserRole = getRoleFromToken(cookies.get("token"));
  }else {
    currentUserRole = Roles.visitor;
  }
  setCurrentUserRole(currentUserRole);

  if (currentUserRole) {
    if (userRoles) {
      if (userRoles.includes(currentUserRole)) {
        return children
      } else {
        return <Navigate to="/public/home" />
      }
    } else {
      return children
    }
  } else {
    return <Navigate to="/public/login" state={{ path: location.pathname }} />
  }
}
export default RequireAuth