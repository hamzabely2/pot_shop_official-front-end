import React, {useEffect, useState} from 'react';
import Cookies from 'universal-cookie';
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import {
  admin_routes,
  auth_routes,
  user_routes,
} from './Routes';
import RequireAuth from './RequireAuth';
import {ToastContainer} from 'react-toastify';
import FooterChooser from '../components/footer/FooterChooser';
import NavBarChooser from '../components/navBar/NavBarChooser';

const AppRoutes = () => {
  const cookies = new Cookies();
  const protectedRoutes = [...user_routes, ...auth_routes,...admin_routes];
  const [currentUserRole, setCurrentUserRole] = useState(null);
  const [token, setToken] = useState(null);
  useEffect(() => {
    setToken(cookies.get('token'));
  }, [cookies.get('token')]);


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
                            userRoles={e?.availability}
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
        <FooterChooser currentUserRole={currentUserRole} handleSignOut={handleSignOut} token={token}/>
      </BrowserRouter>
  );
};
export default AppRoutes;