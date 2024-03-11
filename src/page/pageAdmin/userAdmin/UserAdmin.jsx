import AlertApi from '../../../components/skeletons/AlertApi';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUser, updateUser} from '../../../redux/user/userAction';

export default function UserAdmin() {
  let [errorMessage , setErrorMessage] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector(state => state.user.users)
  console.log(users)
  const ActiveUser =(user) =>{
    console.log(user)
    const payload ={
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      deactivated : false,
      Id : user.id
    };
    dispatch(updateUser(payload))
  }

  const DeactivateUser = (user) =>{
    console.log(user)
    const payload ={
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      deactivated : true,
      Id : user.id
    };
    console.log(payload);
    dispatch(updateUser(payload))
  }

  useEffect(() => {
   dispatch(fetchUser())
  }, [])

  if (errorMessage) {
    return (
        <div >
          <AlertApi/>
        </div>
    )
  }

  return (
      <div className="py-10">
        <div className="sm:flex sm:items-center px-4 sm:px-6 lg:px-8">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">List utilisateur</h1>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Link
                to={"/admin/item/create"}
                type="button"
                className="block rounded-md bg-gray-950 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Ajouter un utilisateur
            </Link>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Prénom
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Nom de famille
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Numéro de téléphone
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 " >
                {users.map((user) => (
                    <tr key={user.id} >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {user.firstName}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.lastName}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.email}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{user.phoneNumber}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        {user.deactivated ?
                            <button onClick={() => ActiveUser(user)} className="text-red-600 hover:text-indigo-900">
                              Active<span className="sr-only">, {user.Name}</span>
                            </button>
                          :
                            <button onClick={() => DeactivateUser(user)} className="text-red-600 hover:text-red-400">
                              Désactiver<span className="sr-only">, {user.Name}</span>
                            </button>
                        }
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  )
}
