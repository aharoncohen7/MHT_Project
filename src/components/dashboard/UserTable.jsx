import { useState } from 'react';
import { users, sortData, filterData } from './data';
import Pagination from './Pagination';

const UserTable = () => {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isActive, setIsActive] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  

  const handleSort = (key) => {
    const order = sortKey === key && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortKey(key);
    setSortOrder(order);
  };

  const filteredUsers = filterData(users, search, isActive);
  const sortedUsers = sortData(filteredUsers, sortKey, sortOrder);
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = sortedUsers.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-4">
      <div className="flex mb-4">
        <input
          type="text"
          className="border p-2 mr-2"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select className="border p-2" value={isActive} onChange={(e) => setIsActive(e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="py-2 px-4 border cursor-pointer" onClick={() => handleSort('name')}>Name</th>
            <th className="py-2 px-4 border cursor-pointer" onClick={() => handleSort('username')}>userName</th>
            <th className="py-2 px-4 border text-gray-600">ID</th>
            <th className="py-2 px-4 border text-gray-600">Phone</th>
            {/* <th className="py-2 px-4 border cursor-pointer" onClick={() => handleSort('age')}>Age</th> */}
            <th className="py-2 px-4 border cursor-pointer" onClick={() => handleSort('email')}>Email</th>
            {/* <th className="py-2 px-4 border text-gray-600">Status</th> */}
            {/* <th className="py-2 px-4 border cursor-pointer" onClick={() => handleSort('money')}>Money</th> */}
            <th className="py-2 px-4 border text-gray-600">Admin</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id} className="text-center">
              <td className="py-2 px-4 border">{user.name}</td>
              <td className="py-2 px-4 border">{user.username}</td>
              <td className="py-2 px-4 border">{user.id}</td>
              <td className="py-2 px-4 border">{user.phone}</td>
              {/* <td className="py-2 px-4 border">{user.age}</td> */}
              <td className="py-2 px-4 border">{user.email}</td>
              {/* <td className={`py-2 px-4 border ${user.isActive ? 'text-green-500' : 'text-red-500'}`}>{user.status}</td> */}
              {/* <td className="py-2 px-4 border">${user.money}</td> */}
              <td className="py-2 px-4 border">{user.isAdmin ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />

    </div>
  );
};

export default UserTable;
