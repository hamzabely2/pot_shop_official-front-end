import React, { Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { LuShoppingCart } from 'react-icons/lu';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {
    deleteCart,
    fetchCart,
    updateCart,
} from '../../redux/cart/cartAction';
import InfoEmpty from '../../components/skeletons/InfoEmpty';

const Cart = ({  isOpen, openModal, closeModal}) => {
    const dispatch = useDispatch();
    let cart = useSelector(state => state.cart.cart);
    let error = useSelector(state => state.cart.isError);
    const options = [];
    for (let i = 1; i <= 500; i++) {
        options.push(<option key={i}>{i}</option>);
    }

    useEffect(() => {
        dispatch((fetchCart()))
    }, [])


    let total = cart.reduce((accumulator, currentItem) => accumulator + currentItem.subtotal, 0);
    const HandleQuantityChange = (e,ItemId) => {
        EditQuantityItem(e,ItemId,+e.target.value)
    };
    const EditQuantityItem = (event,itemId,quantity) => {
        event.preventDefault();
        let payload = { ItemId: itemId, Quantity: quantity}
        dispatch(updateCart({payload : payload}))
    };

    const DeleteCart = (itemId) => {
        dispatch(deleteCart({ id : itemId }))
    };

    return (
        <>
            <button
                onClick={openModal}
                className="relative rounded-full p-1 text-gray-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-40"
            >
                <LuShoppingCart  />
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
                                                    {cart.length > 0 ? cart.map((item) => (
                                                        <li key={item.items.id}  className="flex py-6">
                                                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                <img
                                                                    src={ item.items.images.length > 0 ? `data:image/jpeg;base64,${item.items.images[0].imageData}` : '/placeholder.jpg'}
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
                                                                        <p className="ml-4">Prix total: {item.subtotal} $</p>
                                                                    </div>
                                                                </div>
                                                                <div className="flex flex-1 items-end justify-between text-sm">
                                                                    <select
                                                                        id="location"
                                                                        name="location"
                                                                        value={item.quantity}
                                                                        onChange={(e) => HandleQuantityChange(e, item.items.id)}
                                                                        className="mt-2 block w-20 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                                    >
                                                                        {options}
                                                                    </select>
                                                                    <div className="flex">
                                                                        <button
                                                                            type="button"
                                                                            onClick={() => DeleteCart(item.items.id)}
                                                                            className="font-medium text-red-600 hover:text-red-200"
                                                                        >
                                                                            Retirer
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    )) :
                                                       <InfoEmpty message={"le panier est vide"} />
                                                    }
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                            <p>Total</p>
                                            <p>{total}$</p>
                                        </div>
                                        <p className="mt-0.5 text-sm text-gray-500">Frais de port et taxes calculés à la caisse.</p>
                                        <div className="mt-6">
                                            <Link to="/public/order"
                                                  className="flex items-center justify-center rounded-md border border-transparent bg-gray-950 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-900">Passe la Commande
                                            </Link>
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
