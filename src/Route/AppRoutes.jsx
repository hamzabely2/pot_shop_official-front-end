import React, {useState} from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom';
import { auth_routes, user_routes} from './UnProtectedRoutes';
import RequireAuth from './RequireAuth';
import {ToastContainer} from 'react-toastify';
import FooterChooser from '../components/footer/FooterChooser';
import NavBarChooser from '../components/navBar/NavBarChooser';

const AppRoutes = () => {
  const protectedRoutes = [...user_routes, ...auth_routes];
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