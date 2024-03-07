import { torah } from '../../data/parshiot.json';


export default function Select({ selectedBook, setSelectedBook, selectedPortion, setSelectedPortion }) {

  // פונקציה לבניית רשימת אפשרויות לסלקט
  function buildOptions(data) {
    return Object.keys(data).map((book) => (
      <option key={book} value={book}>
        {book}
      </option>
    ));
  }

  // אירוע בחירת חומש
  const handleBookChange = (event) => {
    setSelectedBook(event.target.value);
    setSelectedPortion(null); // לאחר בחירת חומש, איפוס בחירת הפרשיה
  };


  return (
    <div className=" flex flex-row-reverse">

      {/* סלקט החומשים */}
      <select className='relative py-2 pl-3 pr-10 text-right bg-white rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50' value={selectedBook} onChange={handleBookChange}>
        <option className='block w-full px-4 text-right text-gray-900 bg-gray-100 py-21' value="" >בחר חומש</option>
        {buildOptions(torah)}
      </select>

      {/* סלקט הפרשיות  */}
      <select className='relative py-2 pl-3 pr-10 mr-2 text-right bg-white rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50' disabled={!selectedBook} value={selectedPortion} onChange={(event) => { setSelectedPortion(event.target.value) }}>
        <option className='' value="">בחר פרשה</option>
        {selectedBook &&
          torah[selectedBook].map((portion) => (
            <option className='block w-full px-4 py-2 text-right text-gray-900 bg-gray-100'
              key={portion} value={portion}>
              {portion}
            </option>
          ))}
      </select>
    </div>



  );
}














import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }


{/* <Menu as="div" className="space-y-4">
        <div>
          <Menu.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50">
            <span className="block truncate">{selectedBook ? selectedBook : "בחר חומש"}</span>
            <ChevronDownIcon className="absolute inset-y-0 right-0 w-5 h-full mx-2 text-gray-400 pointer-events-none" aria-hidden="true" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 w-full py-1 mt-2 overflow-auto text-base bg-white rounded-md shadow-lg max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none">
              {Object.keys(torah).map((book) => (
                <Menu.Item key={book}>
                  {({ active }) => (
                    <button
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block w-full px-4 py-2 text-left'
                      )}
                      onClick={() => {
                        setSelectedBook(book);
                        setSelectedPortion(null);
                      }}
                    >
                      {book}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </div>

        {selectedBook && (
          <div>
            <Menu.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50">
              <span className="block truncate">{selectedPortion ? selectedPortion : "בחר פרשה"}</span>
              <ChevronDownIcon className="absolute inset-y-0 right-0 w-5 h-full mx-2 text-gray-400 pointer-events-none" aria-hidden="true" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 z-10 w-full py-1 mt-2 overflow-auto text-base bg-white rounded-md shadow-lg max-h-56 ring-1 ring-black ring-opacity-5 focus:outline-none">
                {torah[selectedBook].map((portion) => (
                  <Menu.Item key={portion}>
                    {({ active }) => (
                      <button
                        className={classNames(
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                          'block w-full px-4 py-2 text-left'
                        )}
                        onClick={() => setSelectedPortion(portion)}
                      >
                        {portion}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </div>
        )}
      </Menu> */}


