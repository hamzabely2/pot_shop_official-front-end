import {Fragment, useEffect, useState} from 'react';
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { FunnelIcon } from '@heroicons/react/20/solid'
import ListItem from './ListItem';
import SkeletonItem from '../../../components/skeletons/SkeletonItem';
import {filteredItems} from '../../../redux/item/itemAction';
import {fetchColor} from '../../../redux/color/colorAction';
import {fetchCategory} from '../../../redux/category/categoryAction';
import {fetchMaterial} from '../../../redux/material/materialAction';
import {useDispatch, useSelector} from 'react-redux';

const filters = {
  price: [
    { value: '0', label: '$0 - $25', checked: false },
    { value: '25', label: '$25 - $50', checked: false },
    { value: '50', label: '$50 - $75', checked: false },
    { value: '75', label: '$75+', checked: false },
  ],
  color: [
    { value: 'white', label: 'White', checked: false },
    { value: 'beige', label: 'Beige', checked: false },
    { value: 'blue', label: 'Blue', checked: true },
    { value: 'brown', label: 'Brown', checked: false },
    { value: 'green', label: 'Green', checked: false },
    { value: 'purple', label: 'Purple', checked: false },
  ],
  size: [
    { value: 'xs', label: 'XS', checked: false },
    { value: 's', label: 'S', checked: true },
    { value: 'm', label: 'M', checked: false },
    { value: 'l', label: 'L', checked: false },
    { value: 'xl', label: 'XL', checked: false },
    { value: '2xl', label: '2XL', checked: false },
  ],
  category: [
    { value: 'all-new-arrivals', label: 'All New Arrivals', checked: false },
    { value: 'tees', label: 'Tees', checked: false },
    { value: 'objects', label: 'Objects', checked: false },
    { value: 'sweatshirts', label: 'Sweatshirts', checked: false },
    { value: 'pants-and-shorts', label: 'Pants & Shorts', checked: false },
  ],
}


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

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


  const CleanFilter = () =>{
      setSelectedFilters({
        colors: [""],
        categories: [""],
        materials: [""]
      });
    const updatedFilters = {};
    Object.keys(filters).forEach(filterType => {
      updatedFilters[filterType] = filters[filterType].map(option => ({
        ...option,
        checked: false
      }));
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
          <Disclosure
              as="section"
              aria-labelledby="filter-heading"
              className="grid items-center border-b border-t border-gray-200"
          >
            <h2 id="filter-heading" className="sr-only">
              Filters
            </h2>
            <div className="relative col-start-1 row-start-1 py-4">
              <div className="mx-auto flex max-w-7xl space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
                <div>
                  <Disclosure.Button className="group flex items-center font-medium text-gray-700">
                    <FunnelIcon onClick={handleSubmit}
                        className="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                    />
                    Filtres
                  </Disclosure.Button>
                </div>
                <div className="pl-6">
                  <button onClick={CleanFilter} type="button" className="text-gray-500">
                    Tout effacer
                  </button>
                </div>
              </div>
            </div>
            <Disclosure.Panel className="border-t border-gray-200 py-10">
              <div className="mx-auto grid max-w-7xl  gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
                <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
                  <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-x-6">
                  <fieldset>
                    <legend className="block font-medium">Color</legend>
                    <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                      {color.color.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center text-base sm:text-sm">
                            <input
                                id={`color-${optionIdx}`}
                                name="color[]"
                                defaultValue={option.value}
                                onChange={() => handleCheckboxChange('colors', option.label)}
                                type="checkbox"
                                className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                defaultChecked={option.checked}
                            />
                            <label htmlFor={`color-${optionIdx}`} className="ml-3 min-w-0 flex-1 text-gray-600">
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
                          <div key={option.value} className="flex items-center text-base sm:text-sm">
                            <input
                                defaultValue={option.value}
                                onChange={() => handleCheckboxChange('materials', option.label)}
                                type="checkbox"
                                className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                defaultChecked={option.checked}
                            />
                            <label htmlFor={`size-${optionIdx}`} className="ml-3 min-w-0 flex-1 text-gray-600">
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
                          <div key={option.value} className="flex items-center text-base sm:text-sm">
                            <input
                                id={`category-${optionIdx}`}
                                name="category[]"
                                defaultValue={option.value}
                                type="checkbox"
                                onChange={() => handleCheckboxChange('categories', option.label)}
                                className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                defaultChecked={option.checked}
                            />
                            <label htmlFor={`category-${optionIdx}`} className="ml-3 min-w-0 flex-1 text-gray-600">
                              {option.label}
                            </label>
                          </div>
                      ))}
                    </div>
                  </fieldset>
                    <button onClick={handleSubmit} className="bg-gray-950 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">Appliquer des filtres</button>

                  </div>
                </div>
              </div>
            </Disclosure.Panel>
            <div className="col-start-1 row-start-1 py-4">
              <div className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
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

          <section aria-labelledby="products-heading" className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <ListItem list={listItemFiltered}/>
          </section>

          <nav
              aria-label="Pagination"
              className="mx-auto mt-6 flex max-w-7xl justify-between px-4 text-sm font-medium text-gray-700 sm:px-6 lg:px-8"
          >
            <div className="min-w-0 flex-1">
              <a
                  href="#"
                  className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600"
              >
                Previous
              </a>
            </div>
            <div className="hidden space-x-2 sm:flex">
              <a
                  href="#"
                  className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600"
              >
                1
              </a>
              <a
                  href="#"
                  className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600"
              >
                2
              </a>
              <a
                  href="#"
                  className="inline-flex h-10 items-center rounded-md border border-indigo-600 bg-white px-4 ring-1 ring-indigo-600 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600"
              >
                3
              </a>
              <span className="inline-flex h-10 items-center px-1.5 text-gray-500">...</span>
              <a
                  href="#"
                  className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600"
              >
                8
              </a>
              <a
                  href="#"
                  className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600"
              >
                9
              </a>
              <a
                  href="#"
                  className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600"
              >
                10
              </a>
            </div>
            <div className="flex min-w-0 flex-1 justify-end">
              <a
                  href="#"
                  className="inline-flex h-10 items-center rounded-md border border-gray-300 bg-white px-4 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600"
              >
                Next
              </a>
            </div>
          </nav>
        </main>
      </div>
  )
}
