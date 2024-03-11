import {Fragment, useEffect, useState} from 'react';
import {Listbox, Popover, Transition} from '@headlessui/react';
import {
  CheckIcon,
  ChevronUpDownIcon,
  ChevronUpIcon,
} from '@heroicons/react/20/solid';
import Cookies from 'universal-cookie';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Payment() {
  const cookies = new Cookies();
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0)
  let [adresses , setAdresses] = useState([]);





  const formattedAddresses = adresses.map(address => {
    return `${address.id} ${address.city} ${address.state} ${address.street} ${address.code}`;
  });
  console.log(formattedAddresses);

  const [selectedShippingAdress, setSelectedShippingAdress] = useState(formattedAddresses[1])
  const [selectedBilingAdress, setSelectedBilingAdress] = useState(formattedAddresses[1])

  return (
      <div className="bg-white">
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-x-16 lg:grid-cols-2 lg:px-8 xl:gap-x-48">
          <h1 className="sr-only">Informations sur la commande</h1>
          <section
              aria-labelledby="summary-heading"
              className="bg-gray-50 px-4 pb-10 pt-16 sm:px-6 lg:col-start-2 lg:row-start-1 lg:bg-transparent lg:px-0 lg:pb-16"
          >
            <div className="mx-auto max-w-lg lg:max-w-none">
              <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                Récapitulatif de la commande
              </h2>

              <ul role="list" className="divide-y divide-gray-200 text-sm font-medium text-gray-900">
                {cart.map((item) => (
                    <li key={item.id} className="flex items-start space-x-4 py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                            src={item.items.images && item.items.images.length > 0 ? `data:image/jpeg;base64,${item.items.images[0]}` : '/placeholder.jpg'}
                            alt={item.items.name}
                            className="h-full w-full object-cover object-center group-hover:opacity-75"
                        />
                      </div>
                      <div className="flex-auto space-y-1">
                        <h3>{item.items.name}</h3>
                        <p className="text-gray-500">{item.items.name}</p>
                        <p className="text-gray-500">{item.items.price}</p>
                      </div>
                      <p className="flex-none text-base font-medium">{item.price}</p>
                    </li>
                ))}
              </ul>

              <dl className="hidden space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-900 lg:block">
                <div className="flex items-center justify-between">
                  <dt className="text-gray-600">Subtotal</dt>
                  <dd>{total}$</dd>
                </div>

                <div className="flex items-center justify-between">
                  <dt className="text-gray-600">Shipping</dt>
                  <dd>$15.00</dd>
                </div>

                <div className="flex items-center justify-between">
                  <dt className="text-gray-600">Taxes</dt>
                  <dd>$26.80</dd>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base">Total</dt>
                  <dd className="text-base">$361.80</dd>
                </div>
              </dl>

              <Popover className="fixed inset-x-0 bottom-0 flex flex-col-reverse text-sm font-medium text-gray-900 lg:hidden">
                <div className="relative z-10 border-t border-gray-200 bg-white px-4 sm:px-6">
                  <div className="mx-auto max-w-lg">
                    <Popover.Button className="flex w-full items-center py-6 font-medium">
                      <span className="mr-auto text-base">Total</span>
                      <span className="mr-2 text-base">$361.80</span>
                      <ChevronUpIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
                    </Popover.Button>
                  </div>
                </div>

                <Transition.Root as={Fragment}>
                  <div>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                      <Popover.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-in-out duration-300 transform"
                        enterFrom="translate-y-full"
                        enterTo="translate-y-0"
                        leave="transition ease-in-out duration-300 transform"
                        leaveFrom="translate-y-0"
                        leaveTo="translate-y-full"
                    >
                      <Popover.Panel className="relative bg-white px-4 py-6 sm:px-6">
                        <dl className="mx-auto max-w-lg space-y-6">
                          <div className="flex items-center justify-between">
                            <dt className="text-gray-600">Subtotal</dt>
                            <dd>{total}$</dd>
                          </div>

                          <div className="flex items-center justify-between">
                            <dt className="text-gray-600">Shipping</dt>
                            <dd>$15.00</dd>
                          </div>

                          <div className="flex items-center justify-between">
                            <dt className="text-gray-600">Taxes</dt>
                            <dd>$26.80</dd>
                          </div>
                        </dl>
                      </Popover.Panel>
                    </Transition.Child>
                  </div>
                </Transition.Root>
              </Popover>
            </div>
          </section>

          <form className="px-4 pb-36 pt-16 sm:px-6 lg:col-start-1 lg:row-start-1 lg:px-0 lg:pb-16">
            <div className="mx-auto max-w-lg lg:max-w-none">
              <section aria-labelledby="contact-info-heading">
                <h2 id="contact-info-heading" className="text-lg font-medium text-gray-900">
                  Informations sur les contacts
                </h2>
              </section>

              <section aria-labelledby="payment-heading" className="mt-10">
                <h2 id="payment-heading" className="text-lg font-medium text-gray-900">
                  Détails du paiement
                </h2>

                <div className="mt-6 grid grid-cols-3 gap-x-4 gap-y-6 sm:grid-cols-4">
                  <div className="col-span-3 sm:col-span-4">
                    <label htmlFor="name-on-card" className="block text-sm font-medium text-gray-700">
                      Nome sulla carta
                    </label>
                    <div className="mt-1">
                      <input
                          type="text"
                          id="name-on-card"
                          name="name-on-card"
                          autoComplete="cc-name"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="col-span-3 sm:col-span-4">
                    <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                      Numéro de carte
                    </label>
                    <div className="mt-1">
                      <input
                          type="text"
                          id="card-number"
                          name="card-number"
                          autoComplete="cc-number"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="col-span-2 sm:col-span-3">
                    <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
                      Date d'expiration (MM/AA)
                    </label>
                    <div className="mt-1">
                      <input
                          type="text"
                          name="expiration-date"
                          id="expiration-date"
                          autoComplete="cc-exp"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                      CVC
                    </label>
                    <div className="mt-1">
                      <input
                          type="text"
                          name="cvc"
                          id="cvc"
                          autoComplete="csc"
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </section>

              <section aria-labelledby="shipping-heading" className="mt-10">
                <Listbox value={selectedShippingAdress} onChange={setSelectedShippingAdress}>
                  {({ open }) => (
                      <>
                        <Listbox.Label className="mt-5 block text-sm font-medium leading-6 text-gray-900">Adresse de facturation</Listbox.Label>
                        <div className="relative mt-2">
                          <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            <span className="block truncate">{selectedShippingAdress}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
                          </Listbox.Button>

                          <Transition
                              show={open}
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                              {formattedAddresses.map((person) => (
                                  <Listbox.Option
                                      className={({ active }) =>
                                          classNames(
                                              active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                              'relative cursor-default select-none py-2 pl-3 pr-9'
                                          )
                                      }
                                      value={person}
                                  >
                                    {({ selected, active }) => (
                                        <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {person}
                        </span>

                                          {selected ? (
                                              <span
                                                  className={classNames(
                                                      active ? 'text-white' : 'text-indigo-600',
                                                      'absolute inset-y-0 right-0 flex items-center pr-4'
                                                  )}
                                              >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                                          ) : null}
                                        </>
                                    )}
                                  </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </>
                  )}
                </Listbox>
                <Listbox value={selectedBilingAdress} onChange={setSelectedBilingAdress}>
                  {({ open }) => (
                      <>
                        <Listbox.Label className="mt-5 block text-sm font-medium leading-6 text-gray-900">Adresse de livraison</Listbox.Label>
                        <div className="relative mt-2">
                          <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            <span className="block truncate">{selectedBilingAdress}</span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </span>
                          </Listbox.Button>

                          <Transition
                              show={open}
                              as={Fragment}
                              leave="transition ease-in duration-100"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                              {formattedAddresses.map((person) => (
                                  <Listbox.Option
                                      key={person.id}
                                      className={({ active }) =>
                                          classNames(
                                              active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                              'relative cursor-default select-none py-2 pl-3 pr-9'
                                          )
                                      }
                                      value={person}
                                  >
                                    {({ selected, active }) => (
                                        <>
                        <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                          {person}
                        </span>

                                          {selected ? (
                                              <span
                                                  className={classNames(
                                                      active ? 'text-white' : 'text-indigo-600',
                                                      'absolute inset-y-0 right-0 flex items-center pr-4'
                                                  )}
                                              >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                                          ) : null}
                                        </>
                                    )}
                                  </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </>
                  )}
                </Listbox>
              </section>

              <section aria-labelledby="billing-heading" className="mt-10">
                <h2 id="billing-heading" className="text-lg font-medium text-gray-900">
                  Billing information
                </h2>
                <div className="mt-6 flex items-center">
                  <input
                      id="same-as-shipping"
                      name="same-as-shipping"
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <div className="ml-2">
                    <label htmlFor="same-as-shipping" className="text-sm font-medium text-gray-900">
                      Identique aux informations d'expédition
                    </label>
                  </div>
                </div>
              </section>
              <div className="mt-10 border-t border-gray-200 pt-6 sm:flex sm:items-center sm:justify-between">
                <button
                    type="submit"
                    className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:order-last sm:ml-6 sm:w-auto"
                >
                  Continuer
                </button>
                <p className="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-left">
                  Vous ne serez facturé qu’à l’étape suivante.
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
  )
}
