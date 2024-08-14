import React, { useState } from 'react';
import Pagination from './Pagination';
import useAxiosReq, { axiosReq } from '../../functions/useAxiosReq';
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import Switch from '@mui/material/Switch';
import { useContext } from 'react';
import DataContext from '../../contexts';



const UserTable = () => {
  const { setMessage } = useContext(DataContext)
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isAdmin, setIsAdmin] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { data: users, error, loading, setLoading, fetchData: getUsers } = useAxiosReq({ method: 'GET', body: {}, url: `/users` });


  const handleSort = (key) => {
    const order = sortKey === key && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortKey(key);
    setSortOrder(order);
  };
  const handleSetCurrentPage = (page) => {
    setLoading(true)
    setTimeout(() => {
      setCurrentPage(page);
      setLoading(false)
    }, 200);
  };

  const SetAdmin = async (id) => {
    // התחלת אפקט טעינה
    setLoading(true)
    try {
      const result = await axiosReq({ method: "PATCH", url: `users/set-admin/${id}`, body: { permission: 1 } })
      if (result) {
        getUsers();
      } else {
        setMessage(['הפעולה נכשלה', false]);
      }
    } catch (e) {
      setMessage(['הפעולה נכשלה', false]);
    } finally {
      // הפסקת אפקט טעינה
      setLoading(false)

    }
  }

  const filteredUsers = filterData(users, search, isAdmin);
  const sortedUsers = sortData(filteredUsers, sortKey, sortOrder);
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
  console.log("🚀 ~ UserTable ~ totalPages:", totalPages)
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = sortedUsers.slice(startIndex, startIndex + itemsPerPage);
  console.log(currentUsers.length)

  return (
    <div className="p-4">
      <div className="flex mb-4">
        <input
          type="text"
          className="border p-2 mr-2"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => { setCurrentPage(1); setSearch(e.target.value) }}
        />
        <select className="border p-2" value={isAdmin} onChange={(e) => setIsAdmin(e.target.value)}>
          <option value="all">All</option>
          <option value={1}>Admin</option>
          <option value={0}>User</option>
        </select>
      </div>
      <table className="min-w-full cursor-arrow">
        <thead >
          <tr>
            <th className="py-2 px-4 border cursor-pointer " onClick={() => handleSort('name')}>
              <span className='flex gap-4 items-center justify-center'>Name
                {sortKey == "name" && <>{sortOrder == 'asc' ? <FaArrowDown /> : <FaArrowUp />}</>}</span>
            </th>
            <th className="py-2 px-4 border cursor-pointer flex gap-4 items-center justify-center" onClick={() => handleSort('username')}>
              <span className='flex gap-4 items-center justify-center px-2'>user name
                {sortKey == "username" && <>{sortOrder == 'asc' ? <FaArrowDown /> : <FaArrowUp />}</>}</span>
            </th>
            <th className="py-2 px-4 border text-gray-600">ID</th>
            <th className="py-2 px-4 border text-gray-600">Phone</th>
            <th className="py-2 px-4 border cursor-pointer flex gap-4 items-center justify-center" onClick={() => handleSort('email')}>
              <span className='flex gap-4 items-center justify-center'>Email
                {sortKey == "email" && <>{sortOrder == 'asc' ? <FaArrowDown /> : <FaArrowUp />}</>} </span>
            </th>
            <th className="py-2 px-4 border text-gray-600">is Admin</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            [...Array(itemsPerPage)].map((_, index) => <SkeletonRow key={index} />)
          ) : (
            currentUsers.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="py-2 px-4 border">{user.name}</td>
                <td className="py-2 px-4 border">{user.username}</td>
                <td className="py-2 px-4 border">{user.id}</td>
                <td className="py-2 px-4 border">{user.phone}</td>
                <td className="py-2 px-4 border">{user.email}</td>
                <td className={`py-2 px-4 border ${user.isAdmin ? "text-green-600" : "text-red-600"}`}>
                  <Switch
                    className='hidden sm:ml-2 sm:block'
                    checked={user.isAdmin}
                    onChange={() => {SetAdmin(user.id)}}
                    name="loading"
                    color="primary"
                  />
                  {user.isAdmin ? 'Yes' : 'No'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Pagination currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handleSetCurrentPage}
        currentLength={currentUsers.length}
        totalLength={sortedUsers.length}
      />
    </div>
  );
};

export default UserTable;





const SkeletonRow = () => (
  <tr>
    {[...Array(6)].map((_, index) => (
      <td key={index} className="py-3 px-4 border">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
      </td>
    ))}
  </tr>
);


export const sortData = (data, key, order = 'asc') => {
  if (!data) return []
  return data.sort((a, b) => {
    if (a[key] < b[key]) return order === 'asc' ? -1 : 1;
    if (a[key] > b[key]) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

export const filterData = (data, search, isAdmin) => {
  const str = search.toLowerCase()
  if (!data) return []
  return data.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(str) || user.email.toLowerCase().includes(str) || user.username.toLowerCase().includes(str);
    const matchesStatus = isAdmin === 'all' || user.isAdmin.toString() === isAdmin
    return matchesSearch && matchesStatus;
  });
};
