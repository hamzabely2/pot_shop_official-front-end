import React, {Fragment, useEffect, useState} from 'react';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { FunnelIcon } from '@heroicons/react/20/solid'
import ListItem from './ListItem';
import SkeletonItem from '../../../components/skeletons/SkeletonItem';
import {filteredItems} from '../../../redux/item/itemAction';
import {fetchColor} from '../../../redux/color/colorAction';
import {fetchCategory} from '../../../redux/category/categoryAction';
import {fetchMaterial} from '../../../redux/material/materialAction';
import {useDispatch, useSelector} from 'react-redux';


export default function Item() {
  const [open, setOpen] = useState(false)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  let [errorMessage , setErrorMessage] = useState(false);
  let category = useSelector(state => state.category);
  let material = useSelector(state => state.material);
  let color = useSelector(state => state.color);
  const dispatch = useDispatch();
  let listItemFiltered = useSelector(state => state.item.itemFiltered)
  let listItem = useSelector(state => state.item.data);
  let [selectedFilters, setSelectedFilters] = useState({
    colors: [""],
    categories: [""],
    materials: [""]
  });

  let areFiltersEmpty = () => {
    return Object.values(selectedFilters).every(filter => filter.every(value => value === ""));
  };
  listItemFiltered = areFiltersEmpty() ? listItem : listItemFiltered;

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


  const CleanFilter = () => {
    setSelectedFilters({
      colors: [""],
      categories: [""],
      materials: [""]
    });

    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
      checkbox.checked = false;
    });

    dispatch(filteredItems(selectedFilters));
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
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
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
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
              >
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
        <main className="pb-24">
          <div className="relative justify-center flex items-center">
            <h1 className="text_nav text-2xl leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight ">منتجات
              نوتر</h1>
          </div>
          <div className="relative justify-center flex items-center">
            <div className=""><img alt="image de decoration"
                                   className="w-40 mr-4"
                                   src="/img/decoration/decoration_right.jpg"></img>
            </div>
            <h2 className="text_nav leading-7 text.black sm:truncate sm:text-3xl ">Articles</h2>
            <div className=""><img alt="image de decoration"
                                   className="w-40 ml-4"
                                   src="/img/decoration/decoration_left.jpg"/>
            </div>
          </div>
            <Disclosure
                as="section"
                aria-labelledby="filter-heading"
                className="grid items-center border-b border-t border-gray-200"
            >
              <h2 id="filter-heading" className="sr-only">
                Filters
              </h2>
              <div className="relative col-start-1 row-start-1 py-4">
                <div
                    className="mx-auto flex max-w-7xl space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
                  <div>
                    <Disclosure.Button
                        className="group flex items-center font-medium text-gray-700">
                      <FunnelIcon onClick={handleSubmit}
                                  className="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                      />
                      Filtres
                    </Disclosure.Button>
                  </div>
                  <div className="pl-6">
                    <button onClick={CleanFilter} type="button"
                            className="text-gray-500">
                      Tout effacer
                    </button>
                  </div>
                </div>
              </div>
              <Disclosure.Panel className="border-t border-gray-200 py-10">
                <div
                    className="mx-auto grid max-w-7xl  gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
                  <div
                      className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
                    <div
                        className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-x-6">
                      <fieldset>
                        <legend className="block font-medium">Color</legend>
                        <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                          {color.color.map((option, optionIdx) => (
                              <div key={optionIdx}
                                   className="flex items-center text-base sm:text-sm">
                                <input
                                    id={`color-${optionIdx}`}
                                    name="color[]"
                                    defaultValue={option.value}
                                    onChange={() => handleCheckboxChange(
                                        'colors', option.label)}
                                    type="checkbox"
                                    className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    defaultChecked={option.checked}
                                />
                                <label htmlFor={`color-${optionIdx}`}
                                       className="ml-3 min-w-0 flex-1 text-gray-600">
                                  {option.label}
                                </label>
                              </div>
                          ))}
                        </div>
                      </fieldset>
                      <fieldset>
                        <legend className="block font-medium">Size</legend>
                        <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                          {material.material.map((option, optionIdx) => (
                              <div key={optionIdx}
                                   className="flex items-center text-base sm:text-sm">
                                <input
                                    defaultValue={option.value}
                                    onChange={() => handleCheckboxChange(
                                        'materials', option.label)}
                                    type="checkbox"
                                    className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    defaultChecked={option.checked}
                                />
                                <label htmlFor={`size-${optionIdx}`}
                                       className="ml-3 min-w-0 flex-1 text-gray-600">
                                  {option.label}
                                </label>
                              </div>
                          ))}
                        </div>
                      </fieldset>
                      <fieldset>
                        <legend className="block font-medium">Category</legend>
                        <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                          {category.category.map((option, optionIdx) => (
                              <div key={optionIdx}
                                   className="flex items-center text-base sm:text-sm">
                                <input
                                    id={`category-${optionIdx}`}
                                    name="category[]"
                                    defaultValue={option.value}
                                    type="checkbox"
                                    onChange={() => handleCheckboxChange(
                                        'categories', option.label)}
                                    className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    defaultChecked={option.checked}
                                />
                                <label htmlFor={`category-${optionIdx}`}
                                       className="ml-3 min-w-0 flex-1 text-gray-600">
                                  {option.label}
                                </label>
                              </div>
                          ))}
                        </div>
                      </fieldset>
                      <button onClick={handleSubmit}
                              className="bg-gray-950 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">Appliquer
                        des filtres
                      </button>

                    </div>
                  </div>
                </div>
              </Disclosure.Panel>
              <div className="col-start-1 row-start-1 py-4">
                <div
                    className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
                  <Menu as="div" className="relative inline-block">
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                    </Transition>
                  </Menu>
                </div>
              </div>
            </Disclosure>

            <section aria-labelledby="products-heading"
                     className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>
              <ListItem list={listItemFiltered}/>
            </section>
        </main>
      </div>
)
}
