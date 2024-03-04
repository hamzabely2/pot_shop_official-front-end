import { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  XMarkIcon,
} from '@heroicons/react/24/outline'

const files = [
  {
    name: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source:
        'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
    current: true,
  },
  {
    name: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source:
        'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
    current: true,
  },
  {
    name: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source:
        'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
    current: true,
  },
  {
    name: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source:
        'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
    current: true,
  },
]
const currentFile = {
  name: 'IMG_4985.HEIC',
  size: '3.9 MB',
  source:
      'https://images.unsplash.com/photo-1582053433976-25c00369fc93?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=512&q=80',
  information: {
    'Uploaded by': 'Marie Culver',
    Created: 'June 8, 2020',
    'Last modified': 'June 8, 2020',
    Dimensions: '4032 x 3024',
    Resolution: '72 x 72',
  },
  sharedWith: [
    {
      id: 1,
      name: 'Aimee Douglas',
      imageUrl:
          'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=1024&h=1024&q=80',
    },
    {
      id: 2,
      name: 'Andrea McMillan',
      imageUrl:
          'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Creation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
      <>
        <div className="flex h-full">
          <Transition.Root show={mobileMenuOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40 md:hidden" onClose={setMobileMenuOpen}>
              <Transition.Child
                  as={Fragment}
                  enter="transition-opacity ease-linear duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="transition-opacity ease-linear duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
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
                  <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-indigo-700 pb-4 pt-5">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                      <div className="absolute right-0 top-1 -mr-14 p-1">
                        <button
                            type="button"
                            className="flex h-12 w-12 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-white"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                          <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                          <span className="sr-only">Close sidebar</span>
                        </button>
                      </div>
                    </Transition.Child>
                    <div className="flex flex-shrink-0 items-center px-4">
                      <img
                          className="h-8 w-auto"
                          src="https://tailwindui.com/img/logos/mark.svg?color=white"
                          alt="Your Company"
                      />
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
                <div className="w-14 flex-shrink-0" aria-hidden="true">
                </div>
              </div>
            </Dialog>
          </Transition.Root>

          <div className="flex  flex-1   overflow-hidden">
            <div className=" flex flex-1 grid sm:flex sm:item-center">
                <div className="mx-auto sm:shrink-0 max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
                  <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
                    <img src="/img/creation/pot.png"/>
                  </section>
                </div>

              <aside className="block w-80 overflow-y-auto border-l border-gray-200 bg-white p-8 md:max-w-2xl ">
                  <div>
                    <h3 className="font-medium text-gray-900">Information</h3>

                    <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
                      <h2 id="gallery-heading" className="sr-only">
                        Recently viewed
                      </h2>
                      <ul
                          role="list"
                          className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-1 sm:gap-x-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 xl:gap-x-8"
                      >
                        {files.map((file) => (
                            <li key={file.name} className="relative">
                              <div
                                  className={classNames(
                                      file.current
                                          ? 'ring-2 ring-indigo-500 ring-offset-2'
                                          : 'focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100',
                                      'aspect-w-10 aspect-h-7 group block w-full overflow-hidden rounded-lg bg-gray-100'
                                  )}
                              >
                                <img
                                    src={file.source}
                                    alt=""
                                    className={classNames(
                                        file.current ? '' : 'group-hover:opacity-75',
                                        'pointer-events-none object-cover'
                                    )}
                                />
                                <button type="button" className="absolute inset-0 focus:outline-none">
                                  <span className="sr-only">View details for {file.name}</span>
                                </button>
                              </div>
                              <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">
                                {file.name}
                              </p>
                              <p className="pointer-events-none block text-sm font-medium text-gray-500">{file.size}</p>
                            </li>
                        ))}
                      </ul>
                    </section>

                  </div>
              </aside>
            </div>
          </div>
        </div>
      </>
  )
}
