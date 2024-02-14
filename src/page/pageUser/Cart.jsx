import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { LuShoppingCart } from 'react-icons/lu';
import ServiceUser from '../../service/ServiceUser';
import Cookies from 'universal-cookie';
import {ToastSuccess} from '../../components/poPup/Toast';
const cookies = new Cookies();
const token = cookies.get('token');

const Cart = ({  isOpen, openModal, closeModal,token}) => {
    const [items, setItems] = useState([]);
    const [errorMessage, setErrorMessage] = useState(false);

    useEffect(() => {
        ServiceUser.GetCartUser(token)
            .then(data => {
                setItems(data.data.result);
            })
            .catch(error => {
                setErrorMessage(true);
                console.error('Erreur de requête :', error);
            });
    }, [items]);

    const DeleteItem = (itemId) => {
        ServiceUser.DeleteItemInCart(token, itemId)
            .then(data => {
                console.log(data)
                ToastSuccess(data.data.message);
            })
            .catch(error => {
                setErrorMessage(true);
                console.error('Erreur de requête :', error);
            });
    };

    return (
        <>
            <button
                onClick={openModal}
                className="relative rounded-full p-1 text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-40"
            >
                <LuShoppingCart className="" style={{}} />
            </button>

            <Transition.Root show={isOpen} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={closeModal}>
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <div className="pointer-events-auto w-screen max-w-md">
                                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                        <div className="flex items-start justify-between">
                                            <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Panier</h2>
                                            <div className="ml-3 flex h-7 items-center">
                                                <button
                                                    type="button"
                                                    className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                    onClick={closeModal}
                                                >
                                                    <span className="absolute -inset-0.5"></span>
                                                    <span className="sr-only"></span>
                                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mt-8">
                                            <div className="flow-root">
                                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                    {items.map((item) => (
                                                        <li key={item.items.id} className="flex py-6">
                                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                <img
                                                                    src={item.items.images && item.items.images.length > 0 ? `data:image/jpeg;base64,${item.items.images[0]}` : '/placeholder.jpg'}
                                                                    alt={item.items.name}
                                                                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                                                                />
                                                            </div>

                                                            <div className="ml-4 flex flex-1 flex-col">
                                                                <div>
                                                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                                                        <h3>
                                                                            <a href={item.items.href}>{item.items.name}</a>
                                                                        </h3>
                                                                        <p className="ml-4">Prix total :{item.subtotal}</p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                                    <p className="text-gray-500">Quantité : {item.quantity}</p>
                                                                    <div className="flex">
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => DeleteItem(item.items.id)}
                                                                            className="font-medium text-red-600 hover:text-red-200"
                                                                        >
                                                                            Retirer
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <p>Total</p>
                                            <p>$0</p>
                                        </div>
                                        <p className="mt-0.5 text-sm text-gray-500">Frais de port et taxes calculés à la caisse.</p>
                                        <div className="mt-6">
                                            <a href="cart#" className="flex items-center justify-center rounded-md border border-transparent bg-gray-950 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-900">Passe la Commande</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
};

export default Cart;
