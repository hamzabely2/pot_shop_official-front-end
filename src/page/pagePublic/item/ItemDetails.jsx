import {useState} from 'react';
import { Disclosure, RadioGroup, Tab } from '@headlessui/react'
import { StarIcon } from '@heroicons/react/20/solid'
import { HeartIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'
import {useLocation} from 'react-router-dom';
import Cookies from 'universal-cookie';
import {
  ToastInfo,
} from '../../../components/poPup/Toast';
import {createCart} from '../../../redux/cart/cartAction';
import {useDispatch} from 'react-redux';
const cookies = new Cookies();

const product = {
  name: 'Zip Tote Basket',
  price: '$140',
  rating: 3,
  images: [
    {
      id: 1,
      name: 'Angled view',
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg',
      alt: 'Angled front view with bag zipped and handles upright.',
    },
    // More images...
  ],
  colors: [
    { name: 'Washed Black', bgColor: 'bg-gray-700', selectedColor: 'ring-gray-700' },
    { name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
    { name: 'Washed Gray', bgColor: 'bg-gray-500', selectedColor: 'ring-gray-500' },
  ],
  description: `
    <p>The Zip Tote Basket is the perfect midpoint between shopping tote and comfy backpack. With convertible straps, you can hand carry, should sling, or backpack this convenient and spacious bag. The zip top and durable canvas construction keeps your goods protected for all-day use.</p>
  `,
  details: [
    {
      name: 'Features',
      items: [
        'Multiple strap configurations',
        'Spacious interior with top zip',
        'Leather handle and tabs',
        'Interior dividers',
        'Stainless strap loops',
        'Double stitched construction',
        'Water-resistant',
      ],
    },
    {
      name: 'Features',
      items: [
        'Multiple strap configurations',
        'Spacious interior with top zip',
        'Leather handle and tabs',
        'Interior dividers',
        'Stainless strap loops',
        'Double stitched construction',
        'Water-resistant',
      ],
    },
    // More sections...
  ],
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function ItemDetails() {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [quantity, setQuantity] = useState(1)
  const location = useLocation();
  const { item } = location.state;
  const dispatch = useDispatch();
  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };
  const CreateCart = (event) => {
    event.preventDefault();
    if(!cookies.get('token')){
        ToastInfo("Pour ajouter un produit à votre panier, vous devez vous connecter ou créer un nouveau compte")
    }else{
      let payload  = {
        ItemId: item.id,
        Quantity: quantity
      }
      dispatch(createCart({ token: cookies.get('token'),data : payload }))
    }
  };


  return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Tab.Group as="div" className="flex flex-col-reverse">
              <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6">
                  {item.images.map((image, index) => (
                      <Tab
                          key={index}
                          className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-950 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                      >
                        {({ selected }) => (
                            <>
                              <span className="sr-only">{image.name}</span>
                              <span className="absolute inset-0 overflow-hidden rounded-md">
                          <img src={`data:image/jpeg;base64,${image}`} alt="" className="h-full w-full object-cover object-center" />
                        </span>
                              <span
                                  className={classNames(
                                      selected ? 'ring-gray-950' : 'ring-transparent',
                                      'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2'
                                  )}
                                  aria-hidden="true"
                              />
                            </>
                        )}
                      </Tab>
                  ))}
                </Tab.List>
              </div>
              <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
                {item.images.map((image, index) => (
                    <Tab.Panel key={index}>
                      <img
                          src={`data:image/jpeg;base64,${image}`}
                          alt={image.alt}
                          className="h-full w-full object-cover object-center sm:rounded-lg"
                      />
                    </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{item.name}</h1>

              <div className="mt-3">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">{item.price} $</p>
              </div>
              <div className="mt-3">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                            key={rating}
                            className={classNames(
                                product.rating > rating ? 'text-yellow-500' : 'text-gray-300',
                                'h-5 w-5 flex-shrink-0'
                            )}
                            aria-hidden="true"
                        />
                    ))}
                  </div>
                  <p className="sr-only">{product.rating} out of 5 stars</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="sr-only">Description</h3>

                <div
                    className="space-y-6 text-base text-gray-700"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>

              <form  className="mt-6">
                <div>
                  <h3 className="text-sm text-gray-600">Couleur</h3>

                  <RadioGroup value={selectedColor} onChange={setSelectedColor} className="mt-2">
                    <RadioGroup.Label className="sr-only">Couleur</RadioGroup.Label>
                    <span className="flex items-center space-x-3">
                    {item.colors.map((color) => (
                        <RadioGroup.Option
                            key={color.hex}
                            value={color}
                            className={({ active, checked }) =>
                                classNames(
                                    color.hex,
                                    active && checked ? 'ring ring-offset-1' : '',
                                    !active && checked ? 'ring-2' : '',
                                    'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none'
                                )
                            }
                        >
                          <RadioGroup.Label as="span" className="sr-only">
                            {color.hex}
                          </RadioGroup.Label>
                          <span
                              aria-hidden="true"
                              style={{ backgroundColor: `${color.hex}` }}
                              className={classNames(
                                  color.hex,
                                  'h-8 w-8 rounded-full border border-black border-opacity-10'
                              )}
                          />
                        </RadioGroup.Option>
                    ))}
                  </span>
                  </RadioGroup>
                </div>
                <div>
                  <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900 mt-5">
                    Quantité
                  </label>
                  <select
                      id="location"
                      name="location"
                      value={quantity}
                      onChange={handleQuantityChange}
                      className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                  </select>
                </div>

                <div className="mt-10 flex">
                  <button
                      onClick={CreateCart}
                      className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-gray-950 px-8 py-3 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-950 sm:w-full"
                  >
                    Ajouter au panier
                  </button>

                  <button
                      type="button"
                      className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                  >
                    <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                    <span className="sr-only">Add to favorites</span>
                  </button>
                </div>
              </form>

              <section aria-labelledby="details-heading" className="mt-12">
                <h2 id="details-heading" className="sr-only">
                  Additional details
                </h2>

                <div className="divide-y divide-gray-200 border-t">
                      <Disclosure as="div" >
                        {({ open }) => (
                            <>
                              <h3>
                                <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                            <span
                                className={classNames(open ? 'text-text-gray-500' : 'text-gray-900', 'text-sm font-medium')}
                            >
                              {item.categories.label}
                            </span>
                                  <span className="ml-6 flex items-center">
                              {open ? (
                                  <MinusIcon
                                      className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                      aria-hidden="true"
                                  />
                              ) : (
                                  <PlusIcon
                                      className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                      aria-hidden="true"
                                  />
                              )}
                            </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel as="div" className="prose prose-sm pb-6">
                                <ul role="list">
                                      <li >{item.categories.description}</li>
                                </ul>
                              </Disclosure.Panel>
                            </>
                        )}
                      </Disclosure>

                  <Disclosure as="div" >
                    {({ open }) => (
                        <>
                          <h3>
                            <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                            <span
                                className={classNames(open ? 'text-gray-500' : 'text-gray-950', 'text-sm font-medium')}
                            >
                              {item.materials.label}
                            </span>
                              <span className="ml-6 flex items-center">
                              {open ? (
                                  <MinusIcon
                                      className="block h-6 w-6 text-gray-500 group-hover:text-indigo-500"
                                      aria-hidden="true"
                                  />
                              ) : (
                                  <PlusIcon
                                      className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                      aria-hidden="true"
                                  />
                              )}
                            </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel as="div" className="prose prose-sm pb-6">
                            <ul role="list">
                              <li >{item.materials.description}</li>
                            </ul>
                          </Disclosure.Panel>
                        </>
                    )}
                  </Disclosure>

                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
  )
}
