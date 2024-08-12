const Pagination = ({ currentPage, totalPages, onPageChange }) => {
   const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

   return (
      <div className="flex justify-center items-center gap-4 mt-4">
         {pages.map((page) => (
            <button
               key={page}
               onClick={() => onPageChange(page)}
               className={`border p-2 mx-1 rounded ${page === currentPage ? 'bg-blue-500 text-white' : ''}`}
            >
               {page}
            </button>
         ))}

         <p>
            showing 66 items from 1090
         </p>
      </div>
   );
};

export default Pagination;
