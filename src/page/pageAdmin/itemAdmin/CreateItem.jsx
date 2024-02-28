import React, {useEffect, useRef, useState} from 'react';
import Cookies from 'universal-cookie';
import { PhotoIcon } from '@heroicons/react/24/solid'
import ListBoxColorsItem from '../../../components/listBox/ListBoxColorsItem';
import ListBoxMaterialItem
  from '../../../components/listBox/ListBoxMaterialItem';
import ListBoxCategoryItem
  from '../../../components/listBox/ListBoxCategoryItem';
import {useDispatch} from 'react-redux';
import {createItem} from '../../../redux/item/itemAction';



export default function CreateItem() {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const [selectedColor, setSelectedColor] = useState();

  const [payload, setPayload] = useState({
    Name: "",
    CategoryId: 2,
    Stock:"",
    MaterialId : 1,
    Description : "",
    Price: "",
    ColorId :1 ,
    ImagesData : ""
  });
  const handleCategoryChange = (selectedCategory) => {
    setPayload({...payload,CategoryId : selectedCategory.id });
  };

  const handleMaterialChange = (selectedMaterial) => {
    setPayload({...payload,MaterialId : selectedMaterial.id });
  };
  const handleFileChange = (event) => {
    payload.ImagesData = event.target.files[0];

  };
  const handleColorChange = (selectedColor) => {
    setSelectedColor(selectedColor);
    setPayload({...payload,ColorId : selectedColor.id });

  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(payload)
    dispatch(createItem({ token: cookies.get('token'),payload : payload }))
        .then((result) => {
          if(!result.error) {
          }
        });
  };

  return (
      <div className="">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:py-24 lg:px-8">
          <form onSubmit={handleSubmit} className=" grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Nom
              </label>
              <div className="mt-2">
                <input
                    type="text"
                    name="email"
                    id="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setPayload({...payload, Name: e.target.value})}
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Liste des catégories
              </label>
              <div className="mt-2">
                <ListBoxMaterialItem  onSelect={handleMaterialChange}/>
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Liste des matériaux
              </label>
              <div className="mt-2">
                <ListBoxCategoryItem onSelect={handleCategoryChange}/>
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                La quantité en dépôt
              </label>
              <div className="mt-2">
                <input
                    type="number"
                    name="stock"
                    id="stock"
                    onChange={(e) => setPayload({...payload, Stock: e.target.value})}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                Prix
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                    type="number"
                    name="price"
                    id="price"
                    className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="0.00"
                    onChange={(e) => setPayload({...payload, Price: e.target.value})}
                    aria-describedby="price-currency"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-gray-500 sm:text-sm" id="price-currency">
                  USD
                </span>
                </div>
              </div>
            </div>
            <ListBoxColorsItem onSelect={handleColorChange} />
            <div className="sm:col-span-2">
              <div className="flex justify-between">
                <label htmlFor="message" className="block text-sm font-medium text-gray-900">
                  Description
                </label>
                <span id="message-max" className="text-sm text-gray-500">
                Max. 500 characters
              </span>
              </div>
              <div className="mt-1">
              <textarea
                  id="description"
                  name="description"
                  onChange={(e) => setPayload({...payload, Description: e.target.value})}
                  rows={4}
                  className="block w-full rounded-md border-gray-300 px-4 py-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  aria-describedby="message-max"
                  defaultValue={''}
              />
              </div>
            </div>
            <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-white">
                Photo de couverture
              </label>
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
            </div>
            <div className="sm:col-span-2 sm:flex sm:justify-end">
              <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-gray-950 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
              >
                créer l'article
              </button>
            </div>
          </form>
        </div>
      </div>
  );
}
