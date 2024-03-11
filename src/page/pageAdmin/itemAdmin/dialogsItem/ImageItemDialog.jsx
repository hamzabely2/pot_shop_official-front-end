import {Fragment, useRef, useState} from 'react';
import { Dialog, Transition } from '@headlessui/react'
import {useDispatch} from 'react-redux';
import {addImageByItem} from '../../../../redux/item/itemAction';
import {PhotoIcon} from '@heroicons/react/24/solid';

export default function ImageItemDialog({ isOpen, closeModal,itemId}) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)
  let [payload , setPayload] = useState({
    ItemId : itemId,
    ImageData : "",
  });

  const AddImageByItem = () => {
    dispatch(addImageByItem({payload : payload }))
        .then((result) => {
          if(!result.error) {
            closeModal()
          }
        });
  }

  const handleFileChange = (event) => {
    payload.ImageData = event.target.files[0];

  };
  return (
      <Transition.Root show={isOpen} as={Fragment} >
        <Dialog as="div" className="relative z-10 " initialFocus={cancelButtonRef} onClose={setOpen}>
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

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
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


                  <div className="flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
                    <div className="text-center">
                      <PhotoIcon className="mx-auto h-5 w-12 text-gray-500" aria-hidden="true" />
                      <div className=" flex text-sm leading-6 text-gray-400">
                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md text-gray-950 font-semibold  focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 hover:text-gray-500">
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                        </label>
                        <p className="pl-1">ou glisser-déposer</p>
                      </div>
                      <p className="text-xs leading-5 text-gray-400">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>


                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-gray-950 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                        onClick={() => AddImageByItem()}
                    >
                      Confirme
                    </button>
                    <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-950 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                        onClick={closeModal}
                        ref={cancelButtonRef}
                    >
                      Cancel
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
