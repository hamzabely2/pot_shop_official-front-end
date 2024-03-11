import {  useEffect, useState } from 'react';
import { Disclosure, } from '@headlessui/react';
import {
  KeyIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { FaRegAddressCard } from 'react-icons/fa';
import { TbTruckDelivery } from 'react-icons/tb';
import PasswordProfile from './PasswordProfile';
import OrderProfile from './OrderProfile';
import AddressProfile from './AddressProfile';
import UserProfile from './UserProfile';
import {useDispatch, useSelector} from 'react-redux';
import { getUser} from '../../../redux/user/userAction';

const navigation = [
  { name: 'Profile', to: 'user', icon: UserCircleIcon },
  { name: 'Adresse', to: 'address', icon: FaRegAddressCard },
  { name: 'Password', to: 'password', icon: KeyIcon },
  { name: 'Commande', to: 'commande', icon: TbTruckDelivery },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function HomeProfile() {
  const [currentComponent, setCurrentComponent] = useState('user');
  const dispatch = useDispatch();
  let user = useSelector(state => state.user.user);

  useEffect(() => {
    dispatch((getUser()))
  }, []);

  const componentsMap = {
    user: <UserProfile user={user} />,
    address: <AddressProfile user={user} />,
    password: <PasswordProfile user={user} />,
    commande: <OrderProfile user={user} />,
  };

  const backgroundStyle = {
    backgroundImage: "url(/img/imgPage/imgHome.jpg)",
    backgroundSize: "100%",
    borderRadius: "20px"
  };

  const changeComponent = (component) => {
    setCurrentComponent(component);
  };

  return (
      <div>
        <Disclosure as="div" className="relative overflow-hidden mt-5 p-5 ">
          <div style={backgroundStyle} className="relative rounded-3xl h-96 bg-white overflow-hidden"></div>
        </Disclosure>
        <main className="relative -mt-32">
          <div className="mx-auto max-w-screen-xl px-4 pb-6 sm:px-6 lg:px-8 lg:pb-16">
            <div className="overflow-hidden rounded-lg bg-white shadow">
              <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-x lg:divide-y-0">
                <aside className="py-6 lg:col-span-3">
                  <nav className="space-y-1">
                    {navigation.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => changeComponent(item.to)}
                            className={classNames(
                                currentComponent === item.to ? 'border-gray-950 bg-teal-50 text-gray-950 hover:bg-teal-50 hover:text-gray-950' : 'border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900',
                                'group flex items-center border-l-4 px-3 py-2 text-sm font-medium'
                            )}
                        >
                          <item.icon
                              className={classNames(
                                  currentComponent === item.to ? 'text-gray-950 group-hover:text-gray-950 ' : 'text-gray-400 group-hover:text-gray-500',
                                  '-ml-1 mr-3 h-6 w-6 flex-shrink-0'
                              )}
                              aria-hidden="true"
                          />
                          <span className="truncate">{item.name}</span>
                        </button>
                    ))}
                  </nav>
                </aside>
                <div className="divide-y divide-gray-200 lg:col-span-9 w-full">
                  {componentsMap[currentComponent]}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
  )
}