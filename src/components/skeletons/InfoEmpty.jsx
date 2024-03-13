import React from 'react';
import {InformationCircleIcon} from '@heroicons/react/16/solid';

function InfoEmpty({ message }) {
  return (
      <div>
        <div className="flex-shrink-0">
          <div className="flex justify-center m-3">
            <img className="w-56" src="/video/paglia.gif"/>
          </div>
          <div className="flex justify-center m-3">
            <InformationCircleIcon className="mr-2 h-5 w-5 text-gray-950" aria-hidden="true" />
            <p className="text-sm text-gray-950">{message}</p>
          </div>
        </div>
      </div>
  );
}

export default InfoEmpty;