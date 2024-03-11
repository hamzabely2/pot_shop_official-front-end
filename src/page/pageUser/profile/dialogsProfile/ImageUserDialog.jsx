import {Fragment, useEffect, useRef, useState} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {useDispatch, useSelector} from 'react-redux';
import {getUser, updateUser} from '../../../../redux/user/userAction';
const imagesContext = require.context('../../../../../public/img/profile', false, /\.(png|jpe?g|svg)$/);
const imageUrls = imagesContext.keys().map(imagesContext);

export default function ImageUserDialog({ isOpen, closeModal }) {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const dispatch = useDispatch();
  const [selectedImageId, setSelectedImageId] = useState(null);
  let user = useSelector(state => state.user.user);
  useEffect(() => {
    dispatch((getUser()))
  }, []);

  const [payload, setPayload] = useState({
    firstName: '',
    lastName:  '',
    email:   '',
    phoneNumber:  '',
    imageId : 0
  })
  const handleImageClick = (id) => {
    payload.imageId = id;
    setSelectedImageId(id);
  console.log(selectedImageId);
  };
  const UpdateImageUser = () => {
    payload.firstName = user.firstName;
    payload.email = user.email;
    payload.lastName = user.lastName;
    payload.imageId = selectedImageId ? selectedImageId : 0;
    console.log(payload);
    dispatch(updateUser(payload))
        .then((result) => {
          if (!result.error) {
            closeModal();
          }
        })
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
                    <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
                      {imageUrls.map((imageUrl, index) => (
                          <li key={index} className="relative">
                            <div
                                className={`group aspect-h-7 aspect-w-5 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 ${
                                    selectedImageId === index ? 'border-2 border-indigo-500' : ''
                                }`}
                                onClick={() => handleImageClick(index)}
                            >
                              <img src={imageUrl} alt="" className="pointer-events-none object-cover group-hover:opacity-75" />
                            </div>
                          </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-gray-950 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                        onClick={UpdateImageUser}
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
  );
}
