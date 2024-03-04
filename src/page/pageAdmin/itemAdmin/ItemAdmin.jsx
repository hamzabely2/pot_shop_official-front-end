import AlertApi from '../../../components/skeletons/AlertApi';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { fetchItem} from '../../../redux/item/itemAction';
import {fetchMaterial} from '../../../redux/material/materialAction';
import {fetchCategory} from '../../../redux/category/categoryAction';
import {fetchColor} from '../../../redux/color/colorAction';
import InfoEmpty from '../../../components/skeletons/InfoEmpty';

export default function ItemAdmin({setCurrentComponent, setItemId }) {
  const dispatch = useDispatch();
  const item = useSelector(state => state.item.data);
  let error = useSelector(state => state.item.isError);

  useEffect(() => {
    dispatch(fetchItem());
    dispatch(fetchMaterial());
    dispatch(fetchCategory());
    dispatch(fetchColor());
  }, [])


  if (error) {
    return (
        <AlertApi/>
    )
  }

  const DetailsItem = (item) => {
    setCurrentComponent("itemUpdated")
    setItemId(item)
  };

  const CreateItem= () => {
    setCurrentComponent("createItem")
  };

  return (
      <div className="py-10">
        <div className="sm:flex sm:items-center px-4 sm:px-6 lg:px-8">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Liste articles</h1>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
                onClick={() => CreateItem()}
                type="button"
                className="block rounded-md bg-gray-950 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-700  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Ajouter un article
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
                {item.length > 0 ? item.map((item) => (
                      <tr key={item.id} onClick={() => DetailsItem(item)}  className="text-red-700 hover:bg-gray-50  ">
                      <td className="whitespace-nowrap flex justify-center py-4 pl-4 h-24 w-20 text-sm font-medium text-gray-900 sm:pl-0 ">
                        <img
                            src={ item.images.length > 0 ? `data:image/jpeg;base64,${item.images[0].imageData}` : '/placeholder.jpg'}
                            alt={item.name}
                            className="h-full  object-cover object-center group-hover:opacity-75"
                        />
                      </td>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {item.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.description}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.price}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="flex">
                        {item.stock === 0 ? (
                            <div style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: 'red'}}></div>
                        ) : (
                            <div style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: 'green' }}></div>
                        )}
                        <spa className="ml-2" >{item.stock}</spa>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.createdDate}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      </td>
                      </tr>
                )): <InfoEmpty className="" message="Aucune articles trouve" />}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
  )
}
