import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Cookies from 'universal-cookie';
import {RadioGroup} from '@headlessui/react';
import {MdDelete} from 'react-icons/md';
import ColorDialog from './dialogsItem/ColorDialog';
import ImageItemDialog from './dialogsItem/ImageItemDialog';
import {
  deleteColorByItem, deleteImageByItem, deleteItem,
  getItem, updateItem,
} from '../../../redux/item/itemAction';
import ListBoxMaterialItem
  from '../../../components/listBox/ListBoxMaterialItem';
import ListBoxCategoryItem
  from '../../../components/listBox/ListBoxCategoryItem';
import {FaWeightHanging} from 'react-icons/fa';
import {AiOutlineColumnWidth} from 'react-icons/ai';
import {CiLineHeight} from 'react-icons/ci';
import {SiMedibangpaint} from 'react-icons/si';
import {GrStatusPlaceholderSmall} from 'react-icons/gr';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default function ItemUpdate({item,setCurrentComponent}) {
  const dispatch = useDispatch();
  const [cartOpenColor, setIsCartOpenColor] = useState(false);
  const [cartOpenImage, setIsCartOpenImage] = useState(false);
  console.log(item)
  const [payload, setPayload] = useState({
    id : item.id,
    name: item.name,
    stock: item.stock,
    description: item.description,
    price : item.price,
    width: item.width,
    weight : item.weight,
    height :item.height
  });
  const originalData = { ...item };

  useEffect(() => {
    dispatch(getItem(item.id));
  }, [dispatch, item.id]);

  const itemChecked = useSelector(state => state.item.item)
  if(!itemChecked){
    return (<div></div>)
  }
  const DeleteColor = (color) => {
    dispatch(deleteColorByItem({payload : { colorId : +color.id, itemId : itemChecked.id } }))
  }
  const DeleteImage = (image) => {
    dispatch(deleteImageByItem({payload : { imageId : +image.id, itemId : itemChecked.id } }))
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

  const UpdateItem= () => {
    dispatch(updateItem(payload));
  };
  const CancelUpdate = () => {
    setPayload(originalData);
  };

  const DeleteItem = (itemId) => {
    dispatch(deleteItem({ id : itemId }))
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPayload(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  console.log(itemChecked.images)

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
                <dl className=" space-y-6 divide-y divide-gray-100 border-t border-gray-900 text-sm leading-6">
                      <div className="pt-6 sm:flex">
                        <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Nom de l'article</dt>
                        <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                          <div className="w-80">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={payload.name}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={handleChange}
                            />
                          </div>
                        </dd>
                      </div>
                  <div className="pt-6 sm:flex">
                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Description</dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                      <div className="w-80">
                        <textarea
                            value={payload.description}
                            id="description"
                            name="description"
                            onChange={handleChange}
                            rows={4}
                            className="block w-full rounded-md border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            aria-describedby="message-max"
                            defaultValue={''}
                        />
                      </div>
                    </dd>
                  </div>
                  <div className="pt-6 sm:flex">
                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Quantité disponible</dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                      <div className="w-80">
                        <input
                            type="number"
                            name="stock"
                            id="stock"
                            value={payload.stock}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={handleChange}
                        />
                      </div>
                    </dd>
                  </div>
                  <div className="pt-6 sm:flex">
                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Prix actuel</dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                        <div className="relative w-80 rounded-md shadow-sm">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 sm:text-sm">€</span>
                          </div>
                          <input
                              type="number"
                              name="price"
                              id="price"
                              value={payload.price}
                              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              placeholder="0.00"
                              onChange={handleChange}
                              aria-describedby="price-currency"
                          />
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <span className="text-gray-500 sm:text-sm" id="price-currency">
                            EUR
                          </span>
                          </div>
                      </div>
                    </dd>
                  </div>
                  <div className="pt-6 sm:flex">
                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Poids</dt>
                      <div className="relative w-80 rounded-md shadow-sm">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <span className="text-gray-500 sm:text-sm"><FaWeightHanging /></span>
                        </div>
                        <input
                            type="text"
                            name="weight"
                            id="weight"
                            value={payload.weight}
                            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            placeholder="0.00"
                            onChange={handleChange}
                            aria-describedby="price-currency"
                        />
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="text-gray-500 sm:text-sm" id="price-currency">
                          Kg
                        </span>
                        </div>
                      </div>

                  </div>
                  <div className="pt-6 sm:flex">
                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Hauteur</dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                        <div className="relative  w-80 mt-2 rounded-md shadow-sm">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 sm:text-sm"><CiLineHeight /></span>
                          </div>
                          <input
                              type="text"
                              name="height"
                              id="height"
                              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              placeholder="0.00"
                              value={payload.height}
                              onChange={handleChange}
                              aria-describedby="price-currency"
                          />
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                          <span className="text-gray-500 sm:text-sm" id="price-currency">
                            Cm
                          </span>
                          </div>
                      </div>
                    </dd>
                  </div>
                  <div className="pt-6 sm:flex">
                    <dt className="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Largeur</dt>
                    <dd className="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                        <div className="relative w-80 mt-2 rounded-md shadow-sm">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                            <span className="text-gray-500 sm:text-sm"><AiOutlineColumnWidth /></span>
                          </div>
                          <input
                              type="text"
                              name="width"
                              id="width"
                              className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              placeholder="0.00"
                              value={payload.width}
                              onChange={handleChange}
                              aria-describedby="price-currency"
                          />
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <span className="text-gray-500 sm:text-sm" id="price-currency">
                          Cm
                        </span>
                          </div>
                      </div>
                    </dd>
                  </div>
                </dl>
                <div className="mt-4 flex justify-end gap-x-3 px-4 py-4 sm:px-6">
                  <button
                      onClick={CancelUpdate}
                      type="button"
                      className="inline-flex justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                      onClick={UpdateItem}
                      type="submit"
                      className="inline-flex justify-center rounded-md bg-gray-950 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
                  >
                    Save
                  </button>
                </div>
              </div>

              <div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">Couleur article</h2>
                <div className="flex border-t border-gray-500 pt-6">
                  <button onClick={openCartColor} type="button" className="text-sm font-semibold leading-6 text-gray-950 hover:text-gray-700">
                    <span aria-hidden="true">+</span> Ajouter une couleur à cet article
                  </button>
                </div>
                <RadioGroup className="mt-2">
                  <RadioGroup.Label className="sr-only">Couleur</RadioGroup.Label>
                  <span className="flex items-center  space-x-3 ">
                    {itemChecked.colors.map((color,index) => (
                        <div key={index} className="flex column-2">
                        <RadioGroup.Option
                            key={color.hex}
                            value={color}
                                classNames='flex justify-center -2 m-5 ring ring-offset-1 relative -2 cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'>
                          <div className="flex columns-lg">
                            <GrStatusPlaceholderSmall  style={{ color: `${color.hex}` }}   className={classNames(
                                color.hex,
                                'h-16 m-2 w-16 rounded-full border-0  border-opacity-10'
                            )} />
                          </div>
                          <button className="m-2" style={{ fontSize: '20px' }}>
                            <MdDelete  onClick={() => DeleteColor(color)} className="text-red-700" />
                          </button>
                        </RadioGroup.Option>
                        </div>
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
                      {itemChecked.images.map((image,index) => (
                          <li key={index} className="relative">
                            <div
                                className={classNames(

                                        'focus-within:ring-2  focus-within:ring-offset-2 focus-within:ring-offset-gray-100',
                                    'aspect-w-10  aspect-h-7 group block w-full overflow-hidden rounded-lg '
                                )}
                            >
                              <img
                                  src={`data:image/jpeg;base64,${image.imageData}`}
                                  alt={image.alt}
                                  className="h-48 object-cover object-center sm:rounded-lg"
                              />
                              <button className="m-2" style={{ fontSize: '20px' }}>
                                <MdDelete  onClick={() => DeleteImage(image)} className="text-red-700" />
                              </button>

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
