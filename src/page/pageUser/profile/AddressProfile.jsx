 import React, {useEffect, useState} from 'react';
import {MdDelete, MdEdit} from 'react-icons/md';
import EditAddressDialog from './dialogsProfile/EditAddressDialog';
import CreateAddressDialog from './dialogsProfile/CreateAddressDialog';
import {useDispatch, useSelector} from 'react-redux';
import {
  deleteAddress,
  fetchAddress,
} from '../../../redux/address/addressAction';
import AlertApi from '../../../components/skeletons/AlertApi';
import {InformationCircleIcon} from '@heroicons/react/16/solid';

export default function AddressProfile() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCartOpenEditDialog, setIsEditDialog] = useState(false);
  const [selectedAdresse, setSelectedAdresse] = useState(null);
  const dispatch = useDispatch();
  let addresses = useSelector(state => state.address.address);
  let error = useSelector(state => state.address.isError)

  useEffect(() => {
    dispatch((fetchAddress()))
  }, [])

  if (error) {
    return <AlertApi/>
  }
  const DeleteAddress = (addressId) => {
    dispatch(deleteAddress({id : addressId }))
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const openEditDialog = (adresse) => {
    setSelectedAdresse(adresse);
    setIsEditDialog(true);
  };

  const closeEditDialog = () => {
    setSelectedAdresse(null);
    setIsEditDialog(false);
  };


  return (
      <ul role="list" className="divide-y divide-gray-100 p-3">
        <CreateAddressDialog  address={addresses} isOpen={isCartOpen} openModal={openCart} closeModal={closeCart}/>
        <EditAddressDialog  isOpen={isCartOpenEditDialog} openModal={openEditDialog} closeModal={closeEditDialog}  address={selectedAdresse}/>

        <button
            onClick={openCart}
            type="button"
            className="m-2  block rounded-md bg-gray-950 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
>
          Ajouter un adresse
        </button>
        {addresses.length > 0 ? addresses.map((address) => (
            <li key={address.id} className="flex items-center justify-between gap-x-6 py-5">
              <div className="min-w-0">
                <div className="flex items-start gap-x-3">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{address.state}</p>
                </div>
                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                  <p className="whitespace-nowrap text-sm ">
                    <time className="text-sm " >{address.street}</time>
                  </p>
                  <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current text-sm">
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                  <p className="truncate text-sm"> {address.city}</p>
                  <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current text-sm">
                    <circle cx={1} cy={1} r={1} />
                  </svg>
                  <p className="truncate text-sm "> {address.code}</p>

                </div>
              </div>
              <div className="flex flex-none items-center gap-x-4">
                <button style={{ fontSize: '20px' }}>
                  <MdEdit onClick={() => openEditDialog(address)}  />
                </button>
                <button style={{ fontSize: '20px' }}>
                  <MdDelete onClick={() => DeleteAddress(address.id)} className="text-red-700" />
                </button>

              </div>
            </li>
        )) :

            <div className="rounded-md  p-4 flex justify-center">
              <div className="flex justify-center">
                <div className="flex-shrink-0">
                  <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                </div>
                <div className="ml-3 flex-1 md:flex md:justify-between">
                  <p className="text-sm text-blue-700">Aucune adresse disponible</p>
                  <p className="mt-3 text-sm md:ml-6 md:mt-0">

                  </p>
                </div>
              </div>
            </div>
        }
      </ul>
  )
}
