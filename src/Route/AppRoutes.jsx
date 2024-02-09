import React, {useState} from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {admin_routes, auth_routes, user_routes} from './UnProtectedRoutes';
import RequireAuth from './RequireAuth';
import NavBarChooser from '../components/navBar/NavBarChooser';

const AppRoutes = () => {
  const protectedRoutes = [...admin_routes, ...user_routes, ...auth_routes];
  const [currentUserRole, setCurrentUserRole] = useState(null);
  const handleSignOut = () => {
    setCurrentUserRole(undefined);
  };

  return (
      <BrowserRouter>
        <NavBarChooser currentUserRole={currentUserRole} handleSignOut={handleSignOut}/>
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
                        >
                          {e.ele}
                        </RequireAuth>
                      }
                  />
              );
            })
          }
        </Routes>
      </BrowserRouter>
  );
};
export default AppRoutes;