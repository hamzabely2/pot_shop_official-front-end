import { Navigate } from "react-router-dom";

const RedirectIfLoggedIn = ({children})=>{
  if(JSON.parse(localStorage.getItem("User"))){
    return <Navigate to="/public/home" />
  }
  return children;

}
export default RedirectIfLoggedIn;