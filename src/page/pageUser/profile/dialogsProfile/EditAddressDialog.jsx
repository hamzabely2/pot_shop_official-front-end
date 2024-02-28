import {Fragment, useEffect, useRef, useState} from 'react';
import { Dialog, Transition } from '@headlessui/react'
import {
  updateAddress,
} from '../../../../redux/address/addressAction';
import Cookies from 'universal-cookie';
import {useDispatch} from 'react-redux';

export default function EditAddressDialog({ isOpen, closeModal,address}) {
  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({
    City: isOpen ? address.city : '',
    State: isOpen ? address.state : '',
    Code: isOpen ? address.code : '',
    Street: isOpen ? address.street : ''
  })
  useEffect(() => {
    if (address) {
      setPayload({
        City: isOpen ? address.city : '',
        State: isOpen ? address.state : '',
        Code: isOpen ? address.code : '',
        Street: isOpen ? address.street : ''
      });
    }
  }, [address]);


  const EditAddress = () => {
      payload.Code = payload.Code ? payload.Code : 0
      dispatch(updateAddress({ token: cookies.get('token'),data : payload, id : +address.id }))
        .then((result) => {
          if(!result.error) {
            closeModal();
          }
        });
  };


  return (
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
          <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                  <div>
                    <div className="mt-10">
                      <h3 className="text-lg font-medium text-gray-900">Ajoutez une adresse</h3>

                      <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
                        <div className="sm:col-span-3">
                          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Rue
                          </label>
                          <div className="mt-1">
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={payload.Street}
                                onChange={(e) => setPayload({...payload, Street: e.target.value})}
                                autoComplete="street-address"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                            Ville
                          </label>
                          <div className="mt-1">
                            <input
                                type="text"
                                id="city"
                                value={payload.City}
                                onChange={(e) => setPayload({...payload, City: e.target.value})}
                                name="city"
                                autoComplete="address-level2"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                            État/Province
                          </label>
                          <div className="mt-1">
                            <input
                                type="text"
                                id="region"
                                name="region"
                                value={payload.State}
                                onChange={(e) => setPayload({...payload, State: e.target.value})}
                                autoComplete="address-level1"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                            Code Postal
                          </label>
                          <div className="mt-1">
                            <input
                                type="number"
                                id="postal-code"
                                value={payload.Code}
                                onChange={(e) => setPayload({...payload, Code: e.target.value})}
                                name="postal-code"
                                autoComplete="postal-code"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>

                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-gray-950 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                        onClick={EditAddress}
                    >
                      Confirmer
                    </button>
                    <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                        onClick={closeModal}
                        ref={cancelButtonRef}
                    >
                      Annuler
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
  )
}
