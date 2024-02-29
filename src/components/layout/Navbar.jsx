import { Fragment, useContext } from 'react'
import DataContext from '../../contexts';
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom';
import { FiUser } from "react-icons/fi";
import Switch from '@mui/material/Switch';

const navigation = [
    { name: 'Home', href: '/home', current: true },
    { name: 'Addition', href: '/addition', current: false },
    { name: 'About', href: '/about', current: false },
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

// זריקה החוצה
function logOut() {
    localStorage.removeItem('auth');
    localStorage.removeItem('Authorization');
    window.location.href = "http://localhost:5173/"
}

export default function Navbar({ parasha }) {
    const { userName, isAdmin, adminMode, setAdminMode } = useContext(DataContext)
    console.log(parasha, userName, isAdmin);
    const navigate = useNavigate()


    return (
        <Disclosure as="nav" className="fixed top-0 z-10 w-full bg-gray-800 ">
            {({ open }) => (
                <>
                    <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button*/}
                                <Disclosure.Button className="relative inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                                    ) : (
                                        <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                                    )}
                                </Disclosure.Button>
                            </div>

                            <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                                <div className="flex items-center flex-shrink-0">
                                    <img
                                        className="w-auto h-10"
                                        src="https://i.postimg.cc/3rPkvYTs/logo.png"
                                        alt="לוגו"
                                    />
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                // href={item.href}
                                                onClick={() => { navigate(item.href) }}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="min-w-0 flex-1">
                                <h2 className="text-m font-bold leading-7 text-white sm:truncate sm:text-2xl sm:tracking-tight">{parasha}</h2>

                            </div>

                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                {/* <button
                                    type="button"
                                    className="relative hidden p-1 text-gray-400 bg-gray-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 sm:block"
                                >
                                    <span className="absolute -inset-1.5" />
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="w-6 h-6" aria-hidden="true" />
                                </button> */}

    
                         { !!isAdmin &&  <span className="text-white hidden sm:ml-6 sm:block">{ adminMode ? "Admin mode" : "User mode"}
                            <Switch
                                className='hidden sm:ml-6 sm:block'
                                checked={adminMode}
                                onChange={() => setAdminMode(!adminMode)}
                                name="loading"
                                color="primary"
                            />
                            </span>}

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="relative flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="w-8 h-8 rounded-full"
                                                src="http://www.uploads.co.il/uploads/images/354664585.jpg"
                                                alt=""
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            {/* <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Your Profile
                                                    </a>
                                                )}
                                            </Menu.Item> */}
                                            {/* <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        href="#"
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Settings
                                                    </a>
                                                )}
                                            </Menu.Item> */}
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <a
                                                        onClick={() => { logOut(); }}
                                                        className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Sign out
                                                    </a>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="sm:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}
