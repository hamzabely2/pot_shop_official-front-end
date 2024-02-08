import { Navigate } from "react-router-dom"
import { useLocation } from "react-router-dom";
import {getRoleFromToken, Token} from '../service/useAuth';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const RequireAuth = ({ children, userroles }) => {
  const location = useLocation();

  let currentUserRole;
  if (cookies.get("token")){
    currentUserRole = getRoleFromToken();
  }

  console.log("Current user role: " + currentUserRole)
  if (currentUserRole) {
    if (userroles) {
      if (userroles.includes(currentUserRole)) {
        return children
      } else {
        alert("non autorizato")
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