import React, {Fragment, useState} from 'react';
import { Menu, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  Cog6ToothIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import {Link, useNavigate,} from 'react-router-dom';
import { GiPaintedPottery } from "react-icons/gi";
import { GrDeliver } from "react-icons/gr";
import Cookies from 'universal-cookie';
import { Disclosure } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import OrderAdmin from './OrderAdmin';
import ItemAdmin from './itemAdmin/ItemAdmin';
import UserAdmin from './userAdmin/UserAdmin';
import DashboardAdmin from './DashboardAdmin';
import CategoryAdmin from './itemAdmin/itemDetails/CategoryAdmin';
import MaterialAdmin from './itemAdmin/itemDetails/MaterialAdmin';
import ItemUpdate from './itemAdmin/ItemUpdate';
import CreateItem from './itemAdmin/CreateItem';
const cookies = new Cookies();


const navigation = [
  { name: 'Tableau de bord', to: 'home', icon: HomeIcon},
  { name: 'Articles', to: 'item', icon: GiPaintedPottery,
    children: [
      { name: 'Articles', to: 'item' },
        { name: 'Catégories', to: 'category' },
      { name: 'Matériaux', to: 'material' },

    ],
  },
  { name: 'Utilisateur', to: 'user', icon: UsersIcon},
  { name: 'Commande', to: 'order', icon: GrDeliver },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function HomeAdmin({handleSignOut }) {
  const navigate = useNavigate();
  const [sidebarOpen ,setSidebarOpen] = useState(false);
  const [currentComponent, setCurrentComponent] = useState('item');
  const [itemId, setItemId] = useState()
  const SignOut =()=> {
    cookies.remove('token', { path: '/' });
    navigate("/public/home")
  }

  const componentsMap = {
    user  : <UserAdmin   />,
    item: <ItemAdmin setCurrentComponent={setCurrentComponent} setItemId={setItemId} />,
    order: <OrderAdmin  />,
    home: <DashboardAdmin />,
    category : <CategoryAdmin/>,
    material : <MaterialAdmin/>,
    itemUpdated : <ItemUpdate item={itemId} setCurrentComponent={setCurrentComponent}/>,
    createItem : <CreateItem setCurrentComponent={setCurrentComponent} />

  };

  const changeComponent = (component) => {
    setCurrentComponent(component);
  };


  return (
      <>
        <div>
          <div className="relative lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
            <div className="fle-x h-16 shrink-0  flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
              <div className="fle-x h-16 shrink-0 items-center">
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigation.map((item) => (
                          <li key={item.name}>
                            {!item.children ? (
                                <button
                                    to={item.to}
                                    onClick={() => changeComponent(item.to)}
                                    className={classNames(
                                        item.current ? 'bg-gray-50' : 'text-gray-950  ',
                                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold text-white'
                                    )}
                                >
                                  <item.icon className="h-6 w-6 shrink-0 text-gray-400" aria-hidden="true" />
                                  {item.name}
                                </button>
                            ) : (
                                <Disclosure as="div">
                                  {({ open }) => (
                                      <>
                                        <Disclosure.Button
                                            className={classNames(
                                                item.current ? 'bg-gray-50' : '',
                                                'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-white'
                                            )}
                                        >
                                          <item.icon className="h-6 w-6 shrink-0 text-gray-400" aria-hidden="true" />
                                          {item.name}
                                          <ChevronRightIcon
                                              className={classNames(
                                                  open ? 'rotate-90 text-white' : 'text-white',
                                                  'ml-auto h-5 w-5 shrink-0'
                                              )}
                                              aria-hidden="true"
                                          />
                                        </Disclosure.Button>
                                        <Disclosure.Panel as="ul" className="mt-1 px-2">
                                          {item.children.map((subItem) => (
                                              <li key={subItem.name}>
                                                <button
                                                    onClick={() => changeComponent(subItem.to)}
                                                    className={classNames(
                                                        subItem.current ? 'bg-gray-50' : ' text-gray-950',
                                                        'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-white'
                                                    )}
                                                >
                                                  {subItem.name}
                                                </button>
                                              </li>
                                          ))}
                                        </Disclosure.Panel>
                                      </>
                                  )}
                                </Disclosure>
                            )}
                          </li>
                      ))}
                    </ul>
                  </li>

                  <li className="mt-auto">
                    <Link
                        to="#"
                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                    >
                      <Cog6ToothIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
                      Settings
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="lg:pl-72">
            <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
              <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>
              <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

              <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                <form className="relative flex flex-1" action="HomeAdmin#" method="GET">
                  <label htmlFor="search-field" className="sr-only">
                    Search
                  </label>
                  <MagnifyingGlassIcon
                      className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                      aria-hidden="true"
                  />
                  <input
                      id="search-field"
                      className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                      placeholder="Search..."
                      type="search"
                      name="search"
                  />
                </form>
                <div className="flex items-center gap-x-4 lg:gap-x-6">
                  <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true" />
                  <Menu as="div" className="relative">
                    <Menu.Button className="-m-1.5 flex items-center p-1.5">
                      <span className="sr-only">Open user menu</span>
                      <span className="hidden lg:flex lg:items-center">
                      <span className="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">
                        Hamza
                      </span>
                      <ChevronDownIcon className="ml-2 h-5 w-5 text-gray-400" aria-hidden="true" />
                    </span>
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                  <button
                                      onClick={SignOut}
                                      className={`${
                                          active ? 'bg-gray-100' : ''
                                      } block px-4 py-2 text-sm text-red-700`}

                                  >
                                    Se déconnecter
                                  </button>
                              )}
                            </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
            <main className="">
              <div className=" sm:px-6 lg:px-8">
                {componentsMap[currentComponent]}
              </div>
            </main>
          </div>
        </div>
      </>

  )
}
