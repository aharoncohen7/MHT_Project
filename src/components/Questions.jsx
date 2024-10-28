
import React, { useState, useMemo } from 'react';
import useAxiosReq from '../helpers/useAxiosReq';

const SupportTicketsDashboard = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const {
    data: tickets,
    error,
    loading,
    setLoading,
    fetchData,
  } = useAxiosReq({ method: "GET", body: {}, url: "/questions" });
  console.log(tickets);

  const filteredTickets = useMemo(() => {
    if (!tickets || !tickets.questions) {
      return [];
    }
    if (activeFilter === 'all') {
      return tickets.questions;
    } else {
      return tickets.questions.filter(ticket => ticket.status === activeFilter);
    }
  }, [tickets, activeFilter]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handleDelete = (ticketId) => {
    // פעולה למחיקת הפנייה
    console.log(`Deleting ticket with ID: ${ticketId}`);
  };

  const handleUpdate = (ticketId) => {
    // פעולה לעדכון הפנייה
    console.log(`Updating ticket with ID: ${ticketId}`);
  };

  return (
    <>
      {tickets && tickets.questions &&
        <div className="w-full border rounded-lg shadow-md">
          <div className="bg-gray-200 px-4 py-3 flex justify-between items-center">
            <h2 className="text-lg font-medium">רשימת פניות</h2>
            <div className="space-x-2">
              <button
                className={`px-4 py-2 rounded-md ${activeFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                onClick={() => handleFilterChange('all')}
              >
                הכל
              </button>
              <button
                className={`px-4 py-2 rounded-md ${activeFilter === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                onClick={() => handleFilterChange('pending')}
              >
                בטיפול
              </button>
              <button
                className={`px-4 py-2 rounded-md ${activeFilter === 'closed' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                onClick={() => handleFilterChange('closed')}
              >
                סגור
              </button>
            </div>
          </div>
          <div className="p-4">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-2 border-b">נושא</th>
                  <th className="text-left p-2 border-b">מצב</th>
                  <th className="text-left p-2 border-b">תאריך</th>
                  <th className="text-left p-2 border-b">פרטי התקשרות</th>
                  <th className="text-left p-2 border-b">פעולות</th>
                </tr>
              </thead>
              <tbody>
                {!loading && filteredTickets.map((ticket, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                    <td className="p-2">{ticket.subject}</td>
                    <td className="p-2">{ticket.status}</td>
                    <td className="p-2">{new Date(ticket.date).toLocaleString()}</td>
                    <td className="p-2">{ticket.contactDetails.contactBy}: {ticket.contactDetails.email}</td>
                    <td className="p-2">
                      <button
                        className="text-blue-500 hover:text-blue-700 mr-2"
                        onClick={() => handleUpdate(ticket.id)}
                      >
                        עדכון
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(ticket.id)}
                      >
                        מחיקה
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
    </>
  );
};

export default SupportTicketsDashboard;


// import React, { useState, useMemo } from 'react';
// import useAxiosReq from '../helpers/useAxiosReq';

// const SupportTicketsDashboard = () => {
//   const [activeFilter, setActiveFilter] = useState('all');
//   const {
//     data: tickets,
//     error,
//     loading,
//     setLoading,
//     fetchData,
//   } = useAxiosReq({ method: "GET", body: {}, url: "/questions" });
//   console.log(tickets)

//   const filteredTickets = useMemo(() => {
//     if (!tickets || !tickets.questions) {
//       return [];
//     }
//     if (activeFilter === 'all' ) {
//       return tickets.questions;
//     } else {
//       return tickets.questions.filter(ticket => ticket.status === activeFilter);
//     }
//   }, [tickets, activeFilter]);

//   const handleFilterChange = (filter) => {
//     setActiveFilter(filter);
//   };

//   return (
//     <>
//     {tickets && tickets.questions && 
//         <div className="w-full border rounded-lg shadow-md">
//         <div className="bg-gray-200 px-4 py-3 flex justify-between items-center">
//           <h2 className="text-lg font-medium">רשימת פניות</h2>
//           <div className="space-x-2">
//             <button
//               className={`px-4 py-2 rounded-md ${activeFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
//               onClick={() => handleFilterChange('all')}
//             >
//               הכל
//             </button>
//             <button
//               className={`px-4 py-2 rounded-md ${activeFilter === 'pending' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
//               onClick={() => handleFilterChange('pending')}
//             >
//               בטיפול
//             </button>
//             <button
//               className={`px-4 py-2 rounded-md ${activeFilter === 'closed' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
//               onClick={() => handleFilterChange('closed')}
//             >
//               סגור
//             </button>
//           </div>
//         </div>
//         <div className="p-4">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr>
//                 <th className="text-left p-2 border-b">נושא</th>
//                 <th className="text-left p-2 border-b">מצב</th>
//                 <th className="text-left p-2 border-b">תאריך</th>
//                 <th className="text-left p-2 border-b">פרטי התקשרות</th>
//               </tr>
//             </thead>
//             <tbody>
//               { !loading && filteredTickets.map((ticket, index) => (
//                 <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
//                   <td className="p-2">{ticket.subject}</td>
//                   <td className="p-2">{ticket.status}</td>
//                   <td className="p-2">{new Date(ticket.date).toLocaleString()}</td>
//                   <td className="p-2">{ticket.contactDetails.contactBy}: {ticket.contactDetails.email}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     }
    
//     </>
//   );
// };

// export default SupportTicketsDashboard;
// import React, { useState, useMemo, useContext } from 'react';
// import useAxiosReq from '../helpers/useAxiosReq';
// import { Button, Switch } from "@mui/material";
// import UserContext from '../contexts';
// import Pagination from './dashboard/Pagination';

// const SupportTicketsDashboard = () => {
//   const { setMessage } = useContext(UserContext); // For displaying messages
//   const [activeFilter, setActiveFilter] = useState('all');
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;  // Adjust as needed
//   const {
//     data: tickets,
//     error,
//     loading,
//     fetchData,
//   } = useAxiosReq({ method: "GET", body: {}, url: "/questions" });
  
//   const filteredTickets = useMemo(() => {
//     if (!tickets || !tickets.questions) return [];
//     return activeFilter === 'all'
//       ? tickets.questions
//       : tickets.questions.filter(ticket => ticket.status === activeFilter);
//   }, [tickets, activeFilter]);

//   const handleFilterChange = (filter) => setActiveFilter(filter);

//   const updateStatus = async (ticketId, newStatus) => {
//     try {
//       await axiosReq({
//         method: "PATCH",
//         url: `/questions/${ticketId}/status`,
//         body: { status: newStatus },
//       });
//       fetchData();  // Refresh the data
//       setMessage(["Status updated successfully!", true]);
//     } catch (e) {
//       setMessage(["Failed to update status", false]);
//     }
//   };

//   const handlePageChange = (page) => setCurrentPage(page);

//   return (
//     <>
//       <div className="w-full border rounded-lg shadow-md p-4">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-lg font-medium">רשימת פניות</h2>
//           <div className="space-x-2">
//             {['all', 'pending', 'closed'].map((status) => (
//               <Button
//                 key={status}
//                 variant={activeFilter === status ? 'contained' : 'outlined'}
//                 color={activeFilter === status ? 'primary' : 'default'}
//                 onClick={() => handleFilterChange(status)}
//               >
//                 {status === 'all' ? 'הכל' : status === 'pending' ? 'בטיפול' : 'סגור'}
//               </Button>
//             ))}
//           </div>
//         </div>
        
//         <table className="w-full border-collapse">
//           <thead>
//             <tr>
//               <th className="text-left p-2 border-b">נושא</th>
//               <th className="text-left p-2 border-b">מצב</th>
//               <th className="text-left p-2 border-b">תאריך</th>
//               <th className="text-left p-2 border-b">פרטי התקשרות</th>
//               <th className="text-left p-2 border-b">שינוי מצב</th>
//             </tr>
//           </thead>
//           <tbody>
//             {!loading && filteredTickets.slice(
//               (currentPage - 1) * itemsPerPage,
//               currentPage * itemsPerPage
//             ).map((ticket) => (
//               <tr key={ticket.id} className="hover:bg-gray-100">
//                 <td className="p-2">{ticket.subject}</td>
//                 <td className="p-2">{ticket.status}</td>
//                 <td className="p-2">{new Date(ticket.date).toLocaleString()}</td>
//                 <td className="p-2">{ticket.contactDetails.contactBy}: {ticket.contactDetails.email}</td>
//                 <td className="p-2">
//                   <Switch
//                     checked={ticket.status === 'closed'}
//                     onChange={() => updateStatus(ticket.id, ticket.status === 'closed' ? 'pending' : 'closed')}
//                     color="primary"
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Optional Pagination Component */}
//         <Pagination
//           currentPage={currentPage}
//           totalItems={filteredTickets.length}
//           itemsPerPage={itemsPerPage}
//           onPageChange={handlePageChange}
//         />
//       </div>
//     </>
//   );
// };

// export default SupportTicketsDashboard;
