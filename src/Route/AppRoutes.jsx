import React, {useState} from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {admin_routes, auth_routes, user_routes} from './UnProtectedRoutes';
import RequireAuth from './RequireAuth';
import NavBarChooser from '../components/navBar/NavBarChooser';
import {ToastContainer} from 'react-toastify';
import Header from '../components/header/Header';
const AppRoutes = () => {
  const protectedRoutes = [...admin_routes, ...user_routes, ...auth_routes];
  const [currentUserRole, setCurrentUserRole] = useState(null);
  const [token, setToken2] = useState(null);

  const handleSignOut = () => {
    setCurrentUserRole(undefined);
  };

  return (
      <BrowserRouter>
        <NavBarChooser currentUserRole={currentUserRole} handleSignOut={handleSignOut} token={token}/>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
        />
        <Routes>
          {
            protectedRoutes.map((e) => {
              return (
                  <Route
                      key={e.path}
                      exact
                      path={e.path}
                      element={
                        <RequireAuth
                            userroles={e?.availability}
                            setCurrentUserRole={setCurrentUserRole}
                            setToken={setToken2}
                            toke={token}
                        >
                          {e.ele}
                        </RequireAuth>
                      }
                  />
              );
            })
          }
        </Routes>
        <Header/>
      </BrowserRouter>
  );
};
export default AppRoutes;