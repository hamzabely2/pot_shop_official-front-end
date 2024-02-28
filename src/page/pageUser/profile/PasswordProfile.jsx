import React, {useState} from 'react';
import {
  DisplayApiErrors,
  ToastError,
  ToastSuccess,
} from '../../../components/poPup/Toast';
import UserService from '../../../service/UserService';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
function PasswordProfile() {
  const [errorMessage, setErrorMessage] = useState(false);
  const [newPassword, setNewPassword] = useState();
  const [oldPassword, setOldPassword] = useState();
  const [confirmNewPassword, setConfirmNewPassword] = useState();


  const EditPassword  = () => {
      let data = {
        NewPassword: newPassword,
        OldPassword: oldPassword,
        ConfirmNewPassword: confirmNewPassword,
      }
      console.log(data)
      UserService.PutPassword(cookies.get('token'), data)
          .then(data => {
            ToastSuccess(data.data.message);
          })
          .catch(error => {
            setErrorMessage(true);
            ToastError(error.data.message);
            DisplayApiErrors(error.data.errors)
            console.error('Erreur de requête :', error);
          });
  };

  return (
      <div>
        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8 h-[600px]" >
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-950">Changer le mot de passe</h2>
            <p className="mt-1 text-sm leading-6 text-gray-950">
              Mettez à jour votre mot de passe associé à votre compte.
            </p>
          </div>

          <form className="md:col-span-2">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              <div className="col-span-full">
                <label htmlFor="current-password" className="block text-sm font-medium leading-6 text-gray-950">
                  Mot de passe actuel
                </label>
                <div className="mt-2">
                  <input
                      id="current-password"
                      name="current_password"
                      type="password"
                      onChange={(e) => setOldPassword(e.target.value)}
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="new-password" className="block text-sm font-medium leading-6 text-gray-950">
                  Nouveau mot de passe
                </label>
                <div className="mt-2">
                  <input
                      id="new-password"
                      name="new_password"
                      type="password"
                      onChange={(e) => setNewPassword(e.target.value)}
                      autoComplete="new-password"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 text-gray-950">
                  Confirmez le nouveau mot de passe
                </label>
                <div className="mt-2">
                  <input
                      id="confirm-password"
                      name="confirm_password"
                      type="password"
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      autoComplete="new-password"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

              </div>

            </div>
            <button
                onClick={EditPassword}
                type="button"
                className="mt-3  block rounded-md bg-gray-950 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Confirme
            </button>
          </form>
        </div>
      </div>
  );
}

export default PasswordProfile;