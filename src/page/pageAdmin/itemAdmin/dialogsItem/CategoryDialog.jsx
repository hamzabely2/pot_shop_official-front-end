import {Fragment, useEffect, useRef, useState} from 'react';
import { Dialog, Transition } from '@headlessui/react'
import Cookies from 'universal-cookie';
import ListBoxColorsItem
  from '../../../../components/listBox/ListBoxColorsItem';
import {
  fetchColor,
} from '../../../../redux/color/colorAction';
import {useDispatch, useSelector} from 'react-redux';
import {addColorByItem} from '../../../../redux/item/itemAction';

export default function CategoryDialog({ isOpen, closeModal,itemId}) {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)
  const [selectedColor, setSelectedColor] = useState();
  let colors = useSelector(state => state.color.color);
  let error = useSelector(state => state.color.isError);
  let [payload , setPayload] = useState({
    ItemId : itemId,
    ColorId : 1,
  })

  useEffect(() => {
    dispatch(fetchColor(cookies.get('token')))
  }, [])

  const handleSelectionChange = (selectedColor) => {
    setSelectedColor(selectedColor);
    console.log(selectedColor)
    setPayload({...payload,ColorId : selectedColor.id });

  };
  const AddColoByItem = () => {
    console.log(payload)
    dispatch(addColorByItem({ token: cookies.get('token'),payload : payload }))
        .then((result) => {
          if(!result.error) {
            closeModal()
          }
        });
  }

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
                <Dialog.Panel className="relative  transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">

                  <ListBoxColorsItem colors={colors}  onSelect={handleSelectionChange} />

                  <div className=" sm:mt-60 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                    <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-gray-950 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                        onClick={() => AddColoByItem()}
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
