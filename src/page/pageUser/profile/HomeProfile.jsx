import React, {createElement, Fragment, useEffect, useState} from 'react';
import { Disclosure, Menu, Switch, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  BellIcon, HomeIcon,
  KeyIcon,
  UserCircleIcon, UsersIcon,
} from '@heroicons/react/24/outline';
import {FaRegAddressCard} from 'react-icons/fa';
import {TbTruckDelivery} from 'react-icons/tb';
import {Link, Route, Routes} from 'react-router-dom';
import ServiceItem from '../../../service/ServiceItem';
import Cookies from 'universal-cookie';
import ServiceUser from '../../../service/ServiceUser';
import HomeAdmin from '../../pageAdmin/HomeAdmin';
import {GiPaintedPottery} from 'react-icons/gi';
import ItemAdmin from '../../pageAdmin/itemAdmin/ItemAdmin';
import UserAdmin from '../../pageAdmin/userAdmin/UserAdmin';
import CommandeAdmin from '../../pageAdmin/CommandeAdmin';
import UserProfile from './UserProfile';
import {ChevronDownIcon, MagnifyingGlassIcon} from '@heroicons/react/20/solid';
import AdressProfile from './AdressProfile';
import PasswordProfile from './PasswordProfile';
import CommandeProfile from './CommandeProfile';
const cookies = new Cookies();

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function HomeProfile() {


  const navigation = [
    { name: 'Profile', to: '/public/profile/user', icon: UserCircleIcon, current: false , component: UserProfile},
    { name: 'Adresse', to: '/public/profile/adress', icon: FaRegAddressCard , current: false , component: AdressProfile},
    { name: 'Password', to: '/public/profile/password', icon: KeyIcon, current: false ,component: PasswordProfile},
    { name: 'Commande', to: '/public/profile/commande', icon: TbTruckDelivery , current: false, component: CommandeProfile },
  ]
  let token = cookies.get('token');
  const [user, setUser] = useState([]);
  let [errorMessage , setErrorMessage] = useState(false);

  useEffect(() => {
    ServiceUser.GetUser(token)
        .then(data => {
          setUser(data.data.result);
        })
        .catch(error => {
          setErrorMessage(true)
          console.error('Erreur de requête :', error);
        });
  }, [])


  const backgroundStyle = {
    backgroundImage: `url(https://images.pexels.com/photos/7718448/pexels-photo-7718448.jpeg?auto=compress&cs=tinysrgb&w=1600)`,
    borderRadius: "20px"
  };
  const [sidebarOpen ,setSidebarOpen] = useState(false)


  return (
      <div>
        <Disclosure as="div" className="relative overflow-hidden mt-5 p-5">
          <div style={backgroundStyle} className="relative rounded-3xl h-96 bg-white overflow-hidden"></div>
        </Disclosure>
        <div className="relative -mt-52">
          <div className="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-x lg:divide-y-0">
                <aside className="py-6 lg:col-span-3">
                  <nav className="space-y-1">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            to={item.to}
                            className={classNames(
                                item.current
                                    ? 'border-teal-500 bg-teal-50 text-teal-700 hover:bg-teal-50 hover:text-teal-700'
                                    : 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900',
                                'group flex items-center border-l-4 px-3 py-2 text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                        >
                          <item.icon
                              className={classNames(
                                  item.current
                                      ? 'text-teal-500 group-hover:text-teal-500'
                                      : 'text-gray-400 group-hover:text-gray-500',
                                  '-ml-1 mr-3 h-6 w-6 flex-shrink-0'
                              )}
                              aria-hidden="true"
                          />
                          <span className="truncate">{item.name}</span>
                        </Link>
                    ))}
                  </nav>
                </aside>
                <div className="lg:pl-72">
                  <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                    <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
                      <span className="sr-only">Open sidebar</span>
                      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                    <div className="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true" />

                    <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                      <form className="relative flex flex-1" action="navBarAdmin#" method="GET">
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
                              {navigation.map((item) => (
                                  <Menu.Item key={item.name}>
                                    {({ active }) => (
                                        <a
                                            href={item.href}
                                            className={classNames(
                                                active ? 'bg-gray-50' : '',
                                                'block px-3 py-1 text-sm leading-6 text-gray-900'
                                            )}
                                        >
                                          {item.name}
                                        </a>
                                    )}
                                  </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                  </div>
                  <main className="py-10">
                    <div className="px-4 sm:px-6 lg:px-8">
                      <Routes>
                        {navigation.map((item) => (
                            <Route
                                key={item.name}
                                path={item.to}
                                element={createElement(item.component)}
                            />
                        ))}
                      </Routes>
                    </div>
                  </main>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}