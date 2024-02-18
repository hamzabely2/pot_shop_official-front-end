import React, {Fragment, useState} from 'react';
import {Listbox, Transition} from '@headlessui/react';
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid';

const colors = [
  { name: 'Rouge', hex: '#FF0000' },
  { name: 'Vert', hex: '#00FF00' },
  { name: 'Bleu', hex: '#0000FF' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}
function ListBoxColorsItem({ onSelect } ) {
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  return (
      <div>
        <Listbox value={selectedColor} onChange={setSelectedColor}>
          {({ open }) => (
              <>
                <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Choisir une couleur</Listbox.Label>
                <div className="relative mt-2">
                  <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <span
                    className="inline-block h-4 w-4 flex-shrink-0 rounded-full"
                    style={{ backgroundColor: selectedColor.hex }}
                />
                <span className="ml-3 block truncate">{selectedColor.name}</span>
              </span>
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
                      {colors.map((color, index) => (
                          <Listbox.Option
                              key={index}
                              onClick={() => {
                                setSelectedColor(color); // Met à jour la sélection locale
                                onSelect(color); // Appelle la fonction de rappel avec la couleur sélectionnée
                              }}
                              className={({ active }) =>
                                  classNames(
                                      active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                      'relative cursor-default select-none py-2 pl-3 pr-9'
                                  )
                              }
                              value={color}
                          >
                            {({ selected, active }) => (
                                <>
                                  <div className="flex items-center">
                          <span
                              className="inline-block h-4 w-4 flex-shrink-0 rounded-full"
                              style={{ backgroundColor: color.hex }}
                          />
                                    <span
                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                    >
                            {color.name} ({color.hex})
                          </span>
                                  </div>

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



      </div>
  );
}

export default ListBoxColorsItem;