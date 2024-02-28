import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Cookies from 'universal-cookie';
import {RadioGroup} from '@headlessui/react';
import {MdDelete} from 'react-icons/md';
import ColorDialog from './dialogsItem/ColorDialog';
import ImageItemDialog from './dialogsItem/ImageItemDialog';
import {
  deleteColorByItem,
  deleteItem,
  getItem,
} from '../../../redux/item/itemAction';
import ListBoxMaterialItem
  from '../../../components/listBox/ListBoxMaterialItem';
import ListBoxCategoryItem
  from '../../../components/listBox/ListBoxCategoryItem';
import {LuShoppingCart} from 'react-icons/lu';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function ItemUpdate({item,setCurrentComponent}) {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const [cartOpenColor, setIsCartOpenColor] = useState(false);
  const [cartOpenImage, setIsCartOpenImage] = useState(false);
  useEffect(() => {
    dispatch(getItem(item.id));
  }, [dispatch, item.id]);

  console.log(useSelector(state => state));


  const itemChecked = useSelector(state => state.item.item)
  if(!itemChecked){
    return (<div></div>)
  }

  const DeleteColor = (color) => {
    let payload ={
      colorId : +color.id,
      itemId : itemChecked.id
    }

    console.log(payload);
    dispatch(deleteColorByItem({ token: cookies.get('token'), payload : payload }))
  }
  const openCartColor = () => {
    setIsCartOpenColor(true);
  };
  const closeCartColor = () => {
    setIsCartOpenColor(false);
  };
  const openCartImage = () => {
    setIsCartOpenImage(true);
  };
  const closeCartImage = () => {
    setIsCartOpenImage(false);
  };

  console.log(itemChecked)

  return (
      <>
        <ImageItemDialog itemId={item.id}   isOpen={cartOpenImage} openModal={openCartImage} closeModal={closeCartImage}/>
        <ColorDialog itemId={item.id}  isOpen={cartOpenColor} openModal={openCartColor} closeModal={closeCartColor}/>
        <div className="ml-3 flex h-7 items-center justify-end">
          <button
              onClick={() => setCurrentComponent("item")}
              type="button"
              className="relative bg-gray-950 -m-2 mt-5 p-2 text-white  rounded-full"
          >
            <span className="absolute -inset-0.5"></span>
            <span className="sr-only"></span>
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mx-auto max-w-7xl  lg:flex lg:gap-x-16 lg:px-8">

          <main className="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
            <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
              <div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">Details article</h2>
                <dl className="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-900 text-sm leading-6">
                      <div className="pt-6 sm:flex">
                        <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Nom de l'article</dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                          <div className="text-gray-900">{itemChecked.name}</div>
                          <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Update
                          </button>
                        </dd>
                      </div>
                  <div className="pt-6 sm:flex">
                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Description</dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                      <div className="text-gray-900">{itemChecked.description}</div>
                      <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Update
                      </button>
                    </dd>
                  </div>
                  <div className="pt-6 sm:flex">
                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Quantité disponible</dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                      <div className="text-gray-900">{itemChecked.stock}</div>
                      <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Update
                      </button>
                    </dd>
                  </div>
                  <div className="pt-6 sm:flex">
                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Prix actuel</dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                      <div className="text-gray-900">{itemChecked.price} $</div>
                      <button type="button" className="font-semibold text-indigo-600 hover:text-indigo-500">
                        Update
                      </button>
                    </dd>
                  </div>
                </dl>
              </div>

              <div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">Couleur article</h2>
                <div className="flex border-t border-gray-950 pt-6">
                  <button onClick={openCartColor} type="button" className="text-sm font-semibold leading-6 text-gray-950 hover:text-gray-700">
                    <span aria-hidden="true">+</span> Ajouter une couleur à cet article
                  </button>
                </div>
                <RadioGroup className="mt-2">
                  <RadioGroup.Label className="sr-only">Couleur</RadioGroup.Label>
                  <span className="flex items-center co space-x-3">
                    {itemChecked.colors.map((color) => (
                        <RadioGroup.Option
                            key={color.hex}
                            value={color}
                                classNames='m-5 ring ring-offset-1 relative  flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'>
                          <div className="flex columns-lg">
                          <span
                              aria-hidden="true"
                              style={{ backgroundColor: `${color.hex}` }}
                              className={classNames(
                                  color.hex,
                                  'h-8 m-2 w-8 rounded-full border border-black border-opacity-10'
                              )}
                          />

                          </div>
                          <button className="m-2" style={{ fontSize: '20px' }}>
                            <MdDelete  onClick={() => DeleteColor(color)} className="text-red-700" />
                          </button>
                        </RadioGroup.Option>
                    ))}
                  </span>
                </RadioGroup>
              </div>

              <div>
                <h2 className="text-base font-semibold   leading-7 text-gray-900">Details article</h2>
                <div className="flex border-t border-gray-950" >
                <div className="flex mr-14  pt-6">
                 <ListBoxMaterialItem/>
                </div>
                <div className="flex   pt-6">
                  <ListBoxCategoryItem/>
                </div>
              </div>
              </div>

              <div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">Image</h2>
                <div className="col-span-full">
                  <div className="flex border-t border-gray-950 pt-6">
                    <button onClick={openCartImage} type="button" className="text-sm font-semibold leading-6 text-gray-950 hover:text-gray-700">
                      <span aria-hidden="true"></span>+ Ajouter une image à cet article
                    </button>
                  </div>
                </div>
                <dl className="mt-6 space-y-6 divide-y divide-gray-100  border-gray-200 text-sm leading-6">
                  <section className="mt-8 pb-16" aria-labelledby="gallery-heading">

                    <ul
                        role="list"
                        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
                    >
                      {itemChecked.images.map((image) => (
                          <li className="relative">
                            <div
                                className={classNames(

                                        'focus-within:ring-2  focus-within:ring-offset-2 focus-within:ring-offset-gray-100',
                                    'aspect-w-10  aspect-h-7 group block w-full overflow-hidden rounded-lg '
                                )}
                            >
                              <img
                                  src={`data:image/jpeg;base64,${image}`}
                                  alt={image.alt}
                                  className="h-48 object-cover object-center sm:rounded-lg"
                              />

                            </div>
                          </li>
                      ))}
                    </ul>
                  </section>
                </dl>
              </div>
            </div>
          </main>
        </div>
      </>
  )
}
