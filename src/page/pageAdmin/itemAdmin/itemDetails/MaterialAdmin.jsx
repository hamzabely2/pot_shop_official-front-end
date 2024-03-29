import AlertApi from '../../../../components/skeletons/AlertApi';
import {useDispatch, useSelector} from 'react-redux';
import {fetchMaterial} from '../../../../redux/material/materialAction';
import {useEffect, useState} from 'react';
import MaterialDialog from '../dialogsItem/MaterialDialog';

export default function MaterialAdmin() {
  const dispatch = useDispatch();
  let materials = useSelector(state => state.material.material);
  let error = useSelector(state => state.material.isError);
  const [dialogMaterial, setDialogMaterial] = useState(false);

  const CreateMaterial = () =>{
      setDialogMaterial(true)
  }

  const openDialogMaterial = () => {
    setDialogMaterial(true);
  };
  const closeDialogMaterial = () => {
    setDialogMaterial(false);
  };
  useEffect(()=> {
    dispatch(fetchMaterial());
  }, [])

  if (error) {
    return (
      <AlertApi/>
    )
  }

  return (
      <div className="py-10">
        <MaterialDialog isOpen={dialogMaterial} openModal={openDialogMaterial} closeModal={closeDialogMaterial} />
        <div className="sm:flex sm:items-center px-4 sm:px-6 lg:px-8">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">List catégories</h1>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
                onClick={CreateMaterial}
                type="button"
                className="block rounded-md bg-gray-950 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Ajouter un catégorie
            </button>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="  divide-gray-300 ">
                <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Name
                  </th>
                  <th scope="col" className=" text-gray-900 text-base leading-7 text-gray-600">
                    Description
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0 ">
                  </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 " >
                {materials.map((material) => (
                    <tr key={material.id} >
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 ">
                        {material.label}
                      </td>
                      <td className="whitespace-nowrap w-44 px-3 py-4 text-sm text-gray-500 xl:grid-cols-3 xl:col-start-4 ">{material.description}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <a href="src/page/pageAdmin/itemAdmin#" className="text-red-600 hover:text-red-50000">
                          Supprimer<span className="sr-only ">, {material.Name}</span>
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
