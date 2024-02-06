import serviceItem, {GetAllItem} from '../../../service/ServiceItem';
import AlertApi from '../../../components/skeletons/AlertApi';
import {useEffect, useState} from 'react';
import ServiceItem from '../../../service/ServiceItem';

export default function ItemAdmin() {

  const [item, setItem] = useState([]);
  let [errorMessage , setErrorMessage] = useState(false);

  useEffect(() => {
    ServiceItem.GetAllItem()
        .then(data => {
          setItem(data.data.result);
        })
        .catch(error => {
          setErrorMessage(true)
          console.error('Erreur de requête :', error);
        });
  }, [])

  if (errorMessage) {
    return (
        <div >
          <div className="sm:flex sm:items-center px-4 sm:px-6 lg:px-8">
            <div className="sm:flex-auto">
              <h1 className="text-base font-semibold leading-6 text-gray-900">Listes Produits</h1>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
              <button
                  type="button"
                  className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Ajouter un produit
              </button>
            </div>
          </div>
          <AlertApi/>
        </div>
    )
  }

  return (
      <div className="py-10">
        <div className="sm:flex sm:items-center px-4 sm:px-6 lg:px-8">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">List Produits</h1>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
                type="button"
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add user
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Title
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Role
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                {item.map((item) => (
                    <tr key={item.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {item.Name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.Price}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.Stock ? 'In Stock' : 'Out of Stock'}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.Description}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.CreatedDate}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.UpdateDate}</td>

                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                          Edit<span className="sr-only">, {item.Name}</span>
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
