import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import "../pagePublic.css"
import { StarIcon} from '@heroicons/react/20/solid';
import {useDispatch, useSelector} from 'react-redux';
import {fetchItem} from '../../../redux/item/itemAction';
import AlertApi from '../../../components/skeletons/AlertApi';

export default function ListItem ({ maxItemsToShow,list } ) {
  const dispatch = useDispatch();
  let item = useSelector(state => state.item.data);
  let error = useSelector(state => state.item.isError);
  item = list ? list : item

  useEffect(() => {
    dispatch((fetchItem()))
  }, [])


  if (error) {
    return (
        <AlertApi/>
    )
  }
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  return (
      <div className="bg-white">
        <div className="mx-auto max-w-[1500px] overflow-hidden sm:px-6 lg:px-8">
          <div className="-mx-px grid grid-cols-2   sm:mx-0 md:grid-cols-3 lg:grid-cols-5">
            {item.map((item) => (
                <Link  to={`/public/item/details/${item.id}`} state={{item :item}}  key={item.id} className="group relative    p-4 sm:p-6">
                  <div className="aspect-h-1 flex justify-center overflow-hidden rounded-lg  group-hover:opacity-75">
                    <img
                        src={item.images && item.images.length > 0 ? `data:image/jpeg;base64,${item.images[0]}` : '/placeholder.jpg'}
                        alt={item.name}
                        className="h-48  object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <div className="pb-4 pt-10 text-center">
                    <h3 className="text-sm font-medium text-gray-900">
                      <p>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {item.name}
                      </p>
                    </h3>
                    <div className="mt-3 flex flex-col items-center">
                      <p className="sr-only">{item.rating} out of 5 stars</p>
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                            <StarIcon
                                key={rating}
                                className={classNames(
                                    item.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                                    'h-5 w-5 flex-shrink-0'
                                )}
                                aria-hidden="true"
                            />
                        ))}
                      </div>
                      <ul role="list" className="mt-auto flex items-center justify-center space-x-3 pt-6">
                        {item.colors.map((color) => (
                            <li
                                key={color.hex}
                                className="h-4 w-4 rounded-full border border-black border-opacity-10"
                                style={{ backgroundColor: `${color.hex}` }}
                            >
                              <span className="sr-only">{color.hex}</span>
                            </li>
                        ))}
                      </ul>                             </div>
                    <p className="mt-4 text-base font-medium text-gray-900">{item.price}</p>
                  </div>
                </Link>
            ))}
          </div>
        </div>
      </div>
  );
};

