import React, {useState} from 'react';
import {Switch} from '@headlessui/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}
export default  function UserProfile( ) {
  const [availableToHire, setAvailableToHire] = useState(true)
  const [privateAccount, setPrivateAccount] = useState(false)
  const [allowCommenting, setAllowCommenting] = useState(true)
  const [allowMentions, setAllowMentions] = useState(true)
console.log()

  return (
      <div>

        <p>hamza</p>
      </div>
  );
}