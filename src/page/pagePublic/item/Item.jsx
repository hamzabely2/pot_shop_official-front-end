import React, {Fragment, useEffect, useState} from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/20/solid'
import SkeletonItem from '../../../components/skeletons/SkeletonItem';
import ListItem from './ListItem';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMaterial} from '../../../redux/material/materialAction';
import {fetchCategory} from '../../../redux/category/categoryAction';
import {fetchColor} from '../../../redux/color/colorAction';
import {filteredItems} from '../../../redux/item/itemAction';


export default function Item() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  let [errorMessage , setErrorMessage] = useState(false);
  let category = useSelector(state => state.category);
  let material = useSelector(state => state.material);
  let color = useSelector(state => state.color);
  const dispatch = useDispatch();
  let listItemFiltered = useSelector(state => state.item.itemFiltered)

  const [selectedFilters, setSelectedFilters] = useState({
    colors: [""],
    categories: [""],
    materials: [""]
  });
  useEffect(() => {
    dispatch(fetchMaterial());
    dispatch(fetchCategory());
    dispatch(fetchColor());
  }, [])
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(selectedFilters)
    dispatch(filteredItems(selectedFilters));
  }

  const handleCheckboxChange = (filterType, value) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].includes(value)
          ? prevFilters[filterType].filter(item => item !== value)
          : [...prevFilters[filterType], value]
    }));
  }


  if (errorMessage) {
    return (
        <div >
          <SkeletonItem/>
        </div>
    )
  }


  return (
      <div className="bg-white">
        <div>
          <div className="relative justify-center flex items-center">
            <div className=""><img alt="decoration" className="w-40 mr-4" src="/img/decoration/decoration_right.jpg"></img></div>
            <h2 className="text_nav leading-7 text-gray-950 sm:truncate sm:text-3xl sm:tracking-tight">Articles</h2>
            <div className=""><img alt="decoration" className="w-40 ml-4" src="/img/decoration/decoration_left.jpg"/></div>
          </div>
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
              <Transition.Child
                  as={Fragment}
                  enter="transition-opacity ease-linear duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                      <button
                          type="button"
                          className="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <form  className="ml-5 space-y-10 divide-y divide-gray-200">
                      <div className="pt-10">
                        <fieldset>
                          <legend className="block text-sm font-medium text-gray-900">Couleur</legend>
                          <div className="space-y-3 pt-6">
                            {color.color.map(color => (
                                <div key={color.id} className="flex items-center">
                                  <input
                                      id={`color-${color.id}`}
                                      name="colors[]"
                                      value={color.id}
                                      type="checkbox"
                                      onChange={() => handleCheckboxChange('colors', color.label)}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label htmlFor={`color-${color.id}`} className="ml-3 text-sm text-gray-600">
                                    {color.label}
                                  </label>
                                </div>
                            ))}
                          </div>
                        </fieldset>
                      </div>

                      <div className="pt-10">
                        <fieldset>
                          <legend className="block text-sm font-medium text-gray-900">Catégorie</legend>
                          <div className="space-y-3 pt-6">
                            {category.category.map(category => (
                                <div key={category.id} className="flex items-center">
                                  <input
                                      id={`category-${category.id}`}
                                      name="categories[]"
                                      value={category.id}
                                      type="checkbox"
                                      onChange={() => handleCheckboxChange('categories', category.label)}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label htmlFor={`category-${category.id}`} className="ml-3 text-sm text-gray-600">
                                    {category.label}
                                  </label>
                                </div>
                            ))}
                          </div>
                        </fieldset>
                      </div>
                      <div className="pt-10">
                        <fieldset>
                          <legend className="block text-sm font-medium text-gray-900">Matériau</legend>
                          <div className="space-y-3 pt-6">
                            {material.material.map(material => (
                                <div key={material.id} className="flex items-center">
                                  <input
                                      id={`material-${material.id}`}
                                      name="materials[]"
                                      value={material.id}
                                      type="checkbox"
                                      onChange={() => handleCheckboxChange('materials', material.label)}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label htmlFor={`material-${material.id}`} className="ml-3 text-sm text-gray-600">
                                    {material.label}
                                  </label>
                                </div>
                            ))}
                          </div>
                        </fieldset>
                      </div>
                      <button onClick={handleSubmit} className="bg-gray-950 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">Appliquer des filtres</button>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="border-b border-gray-200 pb-10">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">Nouvelles Arrivées</h1>
              <p className="mt-4 text-base text-gray-500">
                Découvrez la dernière version de Basic Tees, nouvelle et améliorée avec quatre ouvertures !
              </p>
            </div>

            <div className="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
              <aside>
                <h2 className="sr-only">Filters</h2>

                <button
                    type="button"
                    className="inline-flex items-center lg:hidden"
                    onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="text-sm font-medium text-gray-700">Filters</span>
                  <PlusIcon className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                </button>

                <div className="hidden lg:block">
                  <form  className="ml-5 space-y-10 divide-y divide-gray-200">
                    <div className="pt-10">
                      <fieldset>
                        <legend className="block text-sm font-medium text-gray-900">Couleur</legend>
                        <div className="space-y-3 pt-6">
                          {color.color.map(color => (
                              <div key={color.id} className="flex items-center">
                                <input
                                    id={`color-${color.id}`}
                                    name="colors[]"
                                    value={color.id}
                                    type="checkbox"
                                    onChange={() => handleCheckboxChange('colors', color.label)}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label htmlFor={`color-${color.id}`} className="ml-3 text-sm text-gray-600">
                                  {color.label}
                                </label>
                              </div>
                          ))}
                        </div>
                      </fieldset>
                    </div>

                    <div className="pt-10">
                      <fieldset>
                        <legend className="block text-sm font-medium text-gray-900">Catégorie</legend>
                        <div className="space-y-3 pt-6">
                          {category.category.map(category => (
                              <div key={category.id} className="flex items-center">
                                <input
                                    id={`category-${category.id}`}
                                    name="categories[]"
                                    value={category.id}
                                    type="checkbox"
                                    onChange={() => handleCheckboxChange('categories', category.label)}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label htmlFor={`category-${category.id}`} className="ml-3 text-sm text-gray-600">
                                  {category.label}
                                </label>
                              </div>
                          ))}
                        </div>
                      </fieldset>
                    </div>

                    {/* Afficher les options de filtrage pour le matériau */}
                    <div className="pt-10">
                      <fieldset>
                        <legend className="block text-sm font-medium text-gray-900">Matériau</legend>
                        <div className="space-y-3 pt-6">
                          {material.material.map(material => (
                              <div key={material.id} className="flex items-center">
                                <input
                                    id={`material-${material.id}`}
                                    name="materials[]"
                                    value={material.id}
                                    type="checkbox"
                                    onChange={() => handleCheckboxChange('materials', material.label)}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label htmlFor={`material-${material.id}`} className="ml-3 text-sm text-gray-600">
                                  {material.label}
                                </label>
                              </div>
                          ))}
                        </div>
                      </fieldset>
                    </div>
                    <button onClick={handleSubmit} className="bg-gray-950 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">Appliquer des filtres</button>
                  </form>
                </div>

              </aside>
              <div className="mt-6 lg:col-span-2 lg:mt-0 xl:col-span-3">
                  <ListItem list={listItemFiltered} />
              </div>
            </div>
          </main>
        </div>
      </div>
  )
}
