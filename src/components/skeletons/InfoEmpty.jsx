import React from 'react';
import {InformationCircleIcon} from '@heroicons/react/16/solid';

function InfoEmpty({ message }) {
  return (
      <div>
        <div className="rounded-md  p-4 flex justify-center">
          <div className="flex justify-center">
            <div className="flex-shrink-0">
              <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
            </div>
            <div className="ml-3 flex-1 md:flex md:justify-between">
              <p className="text-sm text-blue-700">{message}</p>
              <p className="mt-3 text-sm md:ml-6 md:mt-0">

              </p>
            </div>
          </div>
        </div>
      </div>
  );
}

export default InfoEmpty;