import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "@mui/material";
import Switch from "@mui/material/Switch";
import { Fragment, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "../../contexts";

const logo1 = "https://www.uploads.co.il/uploads/images/106030801.png";
const logo2 = "https://img.uniquemu.co.il/upload/bIj1Npo.png";
const logo3 = "http://img.uniquemu.co.il/upload/WrcvRJe.png";
const avatar = "http://img.uniquemu.co.il/upload/4BSyycN.jpeg";
const avatar2 = "http://img.uniquemu.co.il/upload/udYCav4.jpeg";

// סרגל ראשי עליון
export default function Header({ parasha, holiday, title, dayData }) {
  const {
    logOut,
    isAdmin,
    adminMode,
    setAdminMode,
    userId,
    setIsDarkMode,
    isDarkMode,
    userName,
  } = useContext(UserContext);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!userId;

  const navButtons = [
    {
      id: 0,
      name: parasha ? "פרשת " + parasha : null,
      href: parasha ? `/` : "/home/?parasha=all",
    },
    {
      id: 1,
      name: holiday || null,
      href: holiday ? `/home/?parasha=${holiday}` : `/`,
    },
    { id: 2, name: "כללי", href: "/home/?parasha=all" },
    {
      id: 3,
      name: adminMode ? "ניהול" : "אודות",
      href: adminMode ? "/dashboard" : "/about",
    },
    {
      id: 4,
      name: isLoggedIn ? "כתוב מאמר" : "התחבר",
      href: isLoggedIn ? "/addition" : "/login",
    },
    // { id: 3, name: isDarkMode ? 'LightMode' : "DarkMode", href: "/" }
  ];
  const navButtonsForMobile = [
    {
      id: 0,
      name: parasha ? "וורטים על פרשת " + parasha : null,
      href: parasha ? `/` : "/home/?parasha=all",
    },
    {
      id: 1,
      name: holiday ? "וורטים על " + holiday : null,
      href: holiday ? `/home/?parasha=${holiday}` : `/`,
    },
    { id: 2, name: "לכל התוכן", href: "/home/?parasha=all" },
    {
      id: 3,
      name: "אודות",
      href: "/about",
    },
    {
      id: 4,
      name: isLoggedIn ? "כתוב מאמר" : "התחבר",
      href: isLoggedIn ? "/addition" : "/login",
    },
    // { id: 4, name: isDarkMode ? 'LightMode' : "DarkMode", href: "/" }
  ];

  const handleNavigationClick = (button) => {
    setActiveIndex(button.id);
    navigate(button.href);
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  // התחברות
  const goToLoginAndBack = () => {
    navigate("/login", { state: { from: location } });
  };

  return (
    <Disclosure as="nav" className={`fixed top-0 z-20 w-full blue-gradient`}>
      {({ open }) => (
        <>
          <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className=" relative  items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block w-6 h-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block w-6 h-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="hidden sm:flex items-center justify-center flex-6 sm:items-stretch sm:justify-start">
                <Tooltip title={"לדף הבית"} placement="bottom" arrow>
                  <div
                    className="cursor-pointer flex items-center flex-shrink-0"
                    onClick={() => {
                      navigate("/");
                    }}
                  >
                    <img className="w-auto h-14 " src={logo3} alt="logo" />
                  </div>
                </Tooltip>
                <div className="hidden sm:ml-0 sm:block px-2 ">
                  <div className="flex gap-1 text-center items-center justify-center ">
                    {navButtons.map((item, index) => {
                      if (item.name) {
                        return (
                          <span
                            key={item.name}
                            onClick={() => {
                              handleNavigationClick(item);
                            }}
                            className={classNames(
                              item.id === activeIndex
                                ? "blue-gradient text-white shadow-sm shadow-white"
                                : "text-gray-300 hover:bg-blue-700",
                              " flex justify-center items-center whitespace-break-spaces h-14 w-14 rounded-md  cursor-pointer select-none text-md font-semibold"
                            )}
                            aria-current={
                              // item.current
                              index === activeIndex ? "page" : undefined
                            }
                          >
                            {item.name}
                          </span>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              </div>

              <div className="min-w-0 flex-1 lg:ml-12">
                <h2
                  onClick={() => {
                    navigate(navButtons[0].href);
                  }}
                  className="text-center text-2xl font-bold font-bona_nova leading-7 text-white sm:truncate sm:text-3xl sm:tracking-right select-none"
                >
                  <span>{`וורטלי`}</span>
                  {/* <span>{title ? ` - ${title}` : ""}</span> */}
                  {(parasha || holiday) ?  <span>{parasha ? ` - ${parasha}` : ` - ${holiday}`}</span> : "פרשת השבוע"}
                <p className="hidden sm:block text-sm">{dayData?.currentHeDate ? dayData?.currentHeDate : null}</p>
                </h2>
              </div>

              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {!!isAdmin && (
                  <span className="text-white hidden sm:ml-2 sm:inline select-none">
                    {adminMode ? "מצב עורך" : "מצב רגיל"}
                    <Switch
                      className="hidden sm:ml-2 sm:block"
                      checked={adminMode}
                      onChange={() => {
                        sessionStorage.setItem("isAdminMode", !adminMode);
                        setAdminMode(!adminMode);
                      }}
                      name="loading"
                      color="secondary"
                    />
                  </span>
                )}
                {!isAdmin ? (
                  <span className="text-white hidden sm:ml-2 sm:inline select-none">
                    {userName}
                  </span>
                ) : null}

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex text-sm bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <Tooltip title={"הצג תפריט"} placement="right" arrow>
                        <>
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className={`${
                              isLoggedIn ? "" : "grayscale opacity-50"
                            } w-8 h-8 rounded-full`}
                            src={avatar}
                            alt="avatar"
                            title="הצג תפריט"
                          />
                        </>
                      </Tooltip>
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
                    <Menu.Items className="absolute -right-6 z-10 w-24 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                          <span
                            onClick={isLoggedIn ? logOut : goToLoginAndBack}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-2 py-2 text-sm text-gray-700 cursor-pointer"
                            )}
                          >
                            {isLoggedIn ? " התנתק" : "התחבר/הרשם"}
                          </span>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <span
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-2 py-2 text-sm text-gray-700 cursor-pointer"
                            )}
                          >
                            {isDarkMode ? "מצב יום" : "מצב לילה"}
                          </span>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden ">
            <div className="px-2 pt-2 pb-3 space-y-1 ">
              {navButtonsForMobile.map((item, index) => (
                <>
                  {item.name && (
                    <Disclosure.Button
                      key={item.name}
                      onClick={(e) => {
                        e.preventDefault(); // מונע רענון דף
                        handleNavigationClick(item);
                      }}
                      className={classNames(
                        // item.current
                        index === activeIndex
                          ? "blue-gradient text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block rounded-md px-3 py-2 text-base font-medium cursor-pointer"
                      )}
                      aria-current={
                        // item.current
                        index === activeIndex ? "page" : undefined
                      }
                    >
                      {item.name}
                    </Disclosure.Button>
                  )}
                </>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
