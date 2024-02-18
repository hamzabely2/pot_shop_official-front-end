import AlertApi from '../../../components/skeletons/AlertApi';
import React, {useEffect, useState} from 'react';
import ServiceItem from '../../../service/ServiceItem';
import {ToastError} from '../../../components/poPup/Toast';
import {Link} from 'react-router-dom';
import ColorDialog from './itemDetails/dialogsItem/ColorDialog';

export default function ItemAdmin({ }) {
  const [item, setItem] = useState([]);
  let [errorMessage , setErrorMessage] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  let [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    ServiceItem.GetAllItem()
        .then(data => {
          setItem(data.data.result);
        })
        .catch(error => {
          ToastError(error)
          setErrorMessage(true)
          console.error('Erreur de requête :', error);
        });
  }, [])
  console.log(item)

  const openColorDialog = () => {
    setIsCartOpen(true);
  }

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };


  if (errorMessage) {
    return (
        <div >
          <div className="sm:flex sm:items-center px-4 sm:px-6 lg:px-8">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">Liste articles</h1>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                  type="button"
                  className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Ajouter un article
              </button>
            </div>
          </div>
          <AlertApi/>
        </div>
    )
  }

  return (
      <div className="py-10">
        <ColorDialog  isOpen={isCartOpen} openModal={openCart} closeModal={closeCart}/>
        <div className="sm:flex sm:items-center px-4 sm:px-6 lg:px-8">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">List produits</h1>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Link
                to={"/admin/item/create"}
                type="button"
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Ajouter un produit
            </Link>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">

                  </th>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Description
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Price
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Stock
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Data di Creazione
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 " >
                {item.map((item) => (
                    <tr key={item.id} >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 ">
                        <img
                            src={item.images && item.images.length > 0 ? `data:image/jpeg;base64,${item.images[0]}` : '/placeholder.jpg'}
                            alt={item.name}
                            className="h-full w-20 object-cover object-center group-hover:opacity-75"
                        />
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {item.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.description}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.price}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500" style={{ display: 'flex', alignItems: 'center' }}>
                        {item.stock === 0 ? (
                            <div style={{marginBottom : "1px", width: '15px', height: '15px', borderRadius: '50%', backgroundColor: 'red'}}></div>
                        ) : (
                            <div style={{marginBottom :"1px", width: '15px', height: '15px', borderRadius: '50%', backgroundColor: 'green' }}></div>
                        )}
                        <span style={{ marginLeft: '5px' }}>{item.stock}</span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.createdDate}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button onClick={() => openColorDialog(item.id)}>
                          <span className="mr-2 inline-flex items-center rounded-md bg-gray-950 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-pink-400/20">
                            Ajouter une couleur
                          </span>
                        </button>

                        <button>
                          <span className="mr-2 inline-flex items-center rounded-md bg-gray-950 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-pink-400/20">
                            Ajouter une image
                          </span>
                        </button>
                        <a href="#" className="text-gray-950 hover:text-gray-900 mr-3">
                          Modifier<span className="sr-only ">, {item.Name}</span>
                        </a>
                        <a href="#" className="text-red-600 hover:text-red-50000">
                          Supprimer<span className="sr-only ">, {item.Name}</span>
                        </a>
                      </td>
                    </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  )
}
