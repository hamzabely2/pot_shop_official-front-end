import { Navigate } from "react-router-dom"
import { useLocation } from "react-router-dom";
import {getRoleFromToken} from '../service/useAuth';
import Cookies from 'universal-cookie';
import {Roles} from './UnProtectedRoutes';
const cookies = new Cookies();

const RequireAuth = ({ children, userroles,setCurrentUserRole }) => {
  const location = useLocation();
  let currentUserRole;

  if (cookies.get("token")){
    currentUserRole = getRoleFromToken();
  }else {
    currentUserRole = Roles.visitor;
  }
   setCurrentUserRole(currentUserRole);


  if (currentUserRole) {
    if (userroles) {
      if (userroles.includes(currentUserRole)) {
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