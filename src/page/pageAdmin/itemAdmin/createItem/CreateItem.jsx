import React, { useState } from 'react';
import Cookies from 'universal-cookie';

import ListBoxDetailsItem from '../../../../components/listBox/ListBoxDetailsItem';
import ListBoxColorsItem from '../../../../components/listBox/ListBoxColorsItem';
import { PhotoIcon } from '@heroicons/react/24/solid'
import { ToastError, ToastSuccess } from '../../../../components/poPup/Toast';
import ServiceItem from '../../../../service/ServiceItem';

const categories = [
  { name: 'Tagine' },
  { name: 'Pot de conservation' },
  { name: 'Pot de jardin' },
];

const materials = [
  { name: 'Argile rouge' },
  { name: 'Argile blanche' },
  { name: 'Argile chamottée' },
];

export default function CreateItem() {
  const [name, setName] = useState('');
  const [stock, setStock] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);
  const cookies = new Cookies();
  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedMaterial, setSelectedMaterial] = useState();
  const [selectedColor, setSelectedColor] = useState();

  const handleSelectionChange = (selectedColor) => {
    setSelectedColor(selectedColor);
  };

  const handleCategoryChange = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
  };

  const handleMaterialChange = (selectedMaterial) => {
    setSelectedMaterial(selectedMaterial);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Name: name,
      Color: selectedColor,
      Price: price,
      Stock: stock,
      CategoryId: selectedCategory,
      MaterialId: selectedMaterial,
      ImagesData: file,
      Description: description,
    };
    console.log(data)

    ServiceItem.CreateItem(cookies.get("token"), data)
        .then(data => {
          ToastSuccess(data.data.message);
        })
        .catch(error => {
          setErrorMessage(true);
          ToastError(error);
          console.error('Erreur de requête :', error);
        });
  };

  return (
      <div className="bg-gray-100">
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
                    onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Liste des catégories
              </label>
              <div className="mt-2">
                <ListBoxDetailsItem item={categories} onSelect={handleCategoryChange}/>
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Liste des matériaux
              </label>
              <div className="mt-2">
                <ListBoxDetailsItem item={materials} onSelect={handleMaterialChange}/>
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
                    onChange={(e) => setStock(e.target.value)}
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
                    onChange={(e) => setPrice(e.target.value)}
                    aria-describedby="price-currency"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                <span className="text-gray-500 sm:text-sm" id="price-currency">
                  USD
                </span>
                </div>
              </div>
            </div>
            <ListBoxColorsItem onSelect={handleSelectionChange} />
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
                  onChange={(e) => setDescription(e.target.value)}
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
