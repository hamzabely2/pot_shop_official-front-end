import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {admin_routes, auth_routes, user_routes} from './UnProtectedRoutes';
import RedirectIfLoggedIn from './RedirectIfLoggedIn';
import RequireAuth from './RequireAuth';
import NavBar from '../components/navBar/NavBar';

const AppRoutes = () => {
  const protectedRoutes = [
    ...admin_routes,
    ...user_routes,
  ];

  const unprotectedRoutes = [...auth_routes];

  return (
      <BrowserRouter>
        <NavBar/>
        <Routes>
          {
            unprotectedRoutes.map((e) => {
              return (
                  <Route
                      key={e.path}
                      exact
                      path={e.path}
                      element={
                        <RedirectIfLoggedIn>
                          {e.ele}
                        </RedirectIfLoggedIn>
                      }
                      // element={e.ele}
                  />
              );
            })
          }

          {
            protectedRoutes.map((e) => {
              return (
                  <Route
                      key={e.path}
                      exact
                      path={e.path}
                      element={
                        <RequireAuth userroles={e?.availability}>
                          {e.ele}
                        </RequireAuth>
                      }
                      // element={e.ele}
                  />
              );
            })
          }
        </Routes>
      </BrowserRouter>
  );
};
export default AppRoutes;