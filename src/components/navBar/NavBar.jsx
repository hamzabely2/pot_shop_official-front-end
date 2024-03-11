import React, {Fragment, useEffect, useState} from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import {Roles} from '../../Route/Routes';
import Cart from '../../page/pageUser/Cart';
import HomeAdmin from '../../page/pageAdmin/HomeAdmin';
import Cookies from 'universal-cookie';
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '../../redux/user/userAction';
const cookies = new Cookies();
const imagesContext = require.context('../../../public/img/profile', false, /\.(png|jpe?g|svg)$/);
const imageUrls = imagesContext.keys().map(imagesContext);

const navigation = [
    { name: 'Home', to: 'public/home', current: false },
    { name: 'Plus sur les pots', to: 'public/nous', current: false },
    { name: 'Articles', to: 'public/item', current: false },
];

const navigationConnexion = [
    { name: 'Login', to: '/public/login', current: false },
    { name: 'Registration', to: '/public/register', current: false },
];

export default function NavBar({currentUserRole,handleSignOut}) {
    const [isCartOpen, setIsCartOpen] = useState(false);
    let [isConnected, setIsConnected] = useState(false);
    let user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    currentUserRole = currentUserRole ? currentUserRole : "Visiteur"

        useEffect(() => {
        dispatch((getUser()))
    }, []);


    useEffect(() => {
        if(currentUserRole === null || currentUserRole === undefined){
            setIsConnected(false);
        }else if(currentUserRole === Roles.user){
            setIsConnected(true)
        }else {
            setIsConnected(false)
        }
    }, [currentUserRole]);


    const SignOut =()=> {
        cookies.remove('token', { path: '/' });
        handleSignOut();
    }
    const openCart = () => {
        setIsCartOpen(true);
    };

    const closeCart = () => {
        setIsCartOpen(false);
    };

    return (
        currentUserRole === Roles.user || currentUserRole === Roles.visitor ||  currentUserRole === null || currentUserRole === undefined ?
            <Disclosure as="nav" className="">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 ">
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-900 border-solid border-2 border-gray-500 focus:outline-none">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                    <div className="flex flex-shrink-0 items-center">
                                        <img
                                            className="h-10 w-auto"
                                            src="/img/imgPage/logos.PNG"
                                            alt="pot shop"
                                        />
                                    </div>
                                    <div className="hidden sm:ml-6 sm:block m-3">
                                        <div className="flex space-x-4">
                                            {navigation.map((item) => (
                                                <Link
                                                    key={item.name}
                                                    to={item.to}
                                                    className={`text-gray-900 rounded-md px-3 py-2 text-sm font-medium ${
                                                        item.current ? 'bg-gray-200' : ''
                                                    }`}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="">
                                        {!isConnected ? (
                                            <div>
                                                <div className="hidden sm:ml-6 sm:block m-3">
                                                    <div className="flex space-x-4">
                                                        {navigationConnexion.map((item) => (
                                                            <Link
                                                                key={item.name}
                                                                to={item.to}
                                                                className={`text-gray-900 rounded-md px-3 py-2 text-sm font-medium ${
                                                                    item.current ? 'bg-gray-200' : ''
                                                                }`}
                                                                aria-current={item.current ? 'page' : undefined}
                                                            >
                                                                {item.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                                <Cart
                                                    isOpen={isCartOpen}
                                                    openModal={openCart}
                                                    closeModal={closeCart}
                                                />
                                                <Menu as="div" className="relative ml-3">
                                                    <div>
                                                        <Menu.Button className="relative flex rounded-full  text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 ">
                                                            <span className="absolute -inset-1.5" />
                                                            <span className="sr-only">Open user menu</span>
                                                            <img
                                                                className="h-10 w-10 rounded-full"
                                                                src={imageUrls[user.imageId ? user.imageId : 0]}
                                                                alt=""
                                                            />
                                                        </Menu.Button>
                                                    </div>
                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-100"
                                                        enterFrom="transform opacity-0 scale-95"
                                                        enterTo="transform opacity-100 scale-100"
                                                        leave="transition ease-in duration-75"
                                                        leaveFrom="transform opacity-100 scale-100"
                                                        leaveTo="transform opacity-0 scale-95"
                                                    >
                                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                            <Menu.Item>
                                                                {({ active }) => (
                                                                    <Link
                                                                        to="/public/profile/home"
                                                                        className={`${
                                                                            active ? 'bg-gray-100' : ''
                                                                        } block px-4 py-2 text-sm text-gray-700`}
                                                                    >
                                                                        Profil
                                                                    </Link>
                                                                )}
                                                            </Menu.Item>

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
                                        )}
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="sm:hidden">
                                <div className="space-y-1 px-2 pb-3 pt-2">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            as="a"
                                            to={item.to}
                                            className={`'text-gray-900 ' : ''
                                        } block rounded-md px-3 py-2 text-base font-medium`}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </Disclosure.Panel>
                        </div>
                    </>
                )}
            </Disclosure>
            :
            <HomeAdmin/>
    );
}
