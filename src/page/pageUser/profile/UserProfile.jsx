import React, {  useState } from 'react'
import { Switch} from '@headlessui/react';
import UserService from '../../../service/UserService';
import {ToastSuccess} from '../../../components/poPup/Toast';
import {useNavigate} from 'react-router-dom';
import Cookies from 'universal-cookie';
import ImageUserDialog from './dialogsProfile/ImageUserDialog';
import {useDispatch} from 'react-redux';
import {updateUser} from '../../../redux/user/userAction';
const cookies = new Cookies();
const imagesContext = require.context('../../../../public/img/profile', false, /\.(png|jpe?g|svg)$/);
const imageUrls = imagesContext.keys().map(imagesContext);
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function UserProfile({user}) {
  const navigate = useNavigate();
  const [availableToHire, setAvailableToHire] = useState(true)
  const [privateAccount, setPrivateAccount] = useState(false)
  const [allowCommenting, setAllowCommenting] = useState(true)
  const [allowMentions, setAllowMentions] = useState(true)
  const [cartOpenImage, setIsCartOpenImage] = useState(false);
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    imageId: user.imageId
  });
  const originalData = { ...user };


  const DeleteUser = () => {
    UserService.DeleteUser(cookies.get('token'))
        .then(data => {
          console.log(data)
          ToastSuccess(data.data.message);
          cookies.remove('token', { path: '/' });
          navigate("/public/login")

        })
        .catch(error => {
          console.error('Erreur de requête :', error);
        });
  };

  const UpdateUser = () => {
    console.log(user);
    console.log(payload);
    dispatch(updateUser(payload));
  };
  const CancelUpdate = () => {
    setPayload(originalData); // Reset payload to original data
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const openImageDialog = () => {
    setIsCartOpenImage(true);
  };
  const closeImageDialog = () => {
    setIsCartOpenImage(false);
  };

  return (
      <>
        <div>
          <ImageUserDialog user={user}  isOpen={cartOpenImage} openModal={openImageDialog} closeModal={closeImageDialog}/>
          <div className="px-4 py-6 sm:p-6 lg:pb-8">
            <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
              <div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                <dl className="mt-6 space-y-6 divide-y divide-gray-100  border-gray-200 text-sm leading-6">
                  <div className="pt-6 sm:flex">
                    <div>
                      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                          <div className="flex mt-5">
                            <img
                                className="h-16 w-16 rounded-full sm:h-24 sm:w-24"
                                src={imageUrls[user.imageId]}
                                alt=""
                            />

                            <button onClick={openImageDialog} type="button" className="font-semibold text-gray-950 hover:text-gray-500">
                              Mise à jour
                            </button>

                          </div>
                        </div>
                        <div className="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
                          <h1 className="truncate text-2xl font-bold text-gray-900">{user.firstName} {user.lastName}</h1>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 sm:flex">
                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Nom</dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                      <div className="">
                        <input
                            type="text"
                            name="lastName"
                            value={payload.lastName}
                            id="lastName"
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <button type="button" className="font-semibold text-gray-950 hover:text-gray-500">
                        Mise à jour
                      </button>
                    </dd>
                  </div>
                  <div className="pt-6 sm:flex">
                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Prénom</dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                      <div className="">
                        <input
                            type="text"
                            name="firstName"
                            value={payload.firstName}
                            id="firstName"
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <button type="button" className="font-semibold text-gray-950 hover:text-gray-500">
                        Mise à jour
                      </button>
                    </dd>
                  </div>
                  <div className="pt-6 sm:flex">
                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Adresse e-mail</dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                      <div className="">
                        <input
                            type="email"
                            name="email"
                            value={payload.email}
                            id="email"
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <button type="button" className="font-semibold text-gray-950 hover:text-gray-500">
                        Mise à jour
                      </button>
                    </dd>
                  </div>


                </dl>
              </div>
            </div>
        </div>
         <div className="">
            <div className="mt-4 flex justify-end gap-x-3 px-4 py-4 sm:px-6">
              <button
                  type="button"
                  onClick={CancelUpdate}
                  className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                  type="submit"
                  onClick={UpdateUser}
                  className="inline-flex justify-center rounded-md bg-sky-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
              >
                Save
              </button>
            </div>
            <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
              <div>
                <h2 className="text-base font-semibold leading-7 text-white">Delete account</h2>
                <p className="mt-1 text-sm leading-6 text-gray-950">
                  Vous ne souhaitez plus utiliser notre service ? Vous pouvez supprimer votre compte ici. Cette action n'est pas réversible.
                  Toutes les informations liées à ce compte seront supprimées définitivement.
                </p>
              </div>

              <form className="flex items-start md:col-span-2">
                <button
                    onClick={DeleteUser}
                    className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
                >
                  Oui, supprimer mon compte
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
  )
}
