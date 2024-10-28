import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import useAxiosReq, { axiosReq } from "../../helpers/useAxiosReq";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import Switch from "@mui/material/Switch";
import { useContext } from "react";
import UserContext from "../../contexts";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FieldToCopy from "../CopiedField";
import { formatDate } from "../../helpers";

const UsersTable = () => {
  const { setMessage } = useContext(UserContext);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [permissionType, setPermissionType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const {
    data: users,
    error,
    loading,
    setLoading,
    fetchData: getUsers,
  } = useAxiosReq({ method: "GET", body: {}, url: `/users` });

  useEffect(() => {
    if (error) {
      setMessage(["שגיאה בקבלת הנתונים", false]);
      console.log("הפעולה נכשלה" + error.message);
    }
  }, [error]);

  const handleSort = (key) => {
    const order = sortKey === key && sortOrder === "asc" ? "desc" : "asc";
    setSortKey(key);
    setSortOrder(order);
  };

  const handleSetCurrentPage = (page) => {
    setLoading(true);
    setTimeout(() => {
      setCurrentPage(page);
      setLoading(false);
    }, 200);
  };

  const setPermission = async (id, permission) => {
    // התחלת אפקט טעינה
    setLoading(true);
    try {
      const result = await axiosReq({
        method: "PATCH",
        url: `users/set-permission/${id}`,
        body: { permission },
      });
      if (result) {
        getUsers();
      } else {
        setMessage(["הפעולה נכשלה", false]);
      }
    } catch (e) {
      setMessage(["הפעולה נכשלה", false]);
    } finally {
      // הפסקת אפקט טעינה
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    // התחלת אפקט טעינה
    setLoading(true);
    try {
      const result = await axiosReq({ method: "DELETE", url: `users/${id}` });
      if (result) {
        getUsers();
      } else {
        setMessage(["הפעולה נכשלה", false]);
      }
    } catch (e) {
      setMessage(["הפעולה נכשלה", false]);
    } finally {
      // הפסקת אפקט טעינה
      setLoading(false);
    }
  };

  const filteredUsers = filterData(users, search, permissionType);
  const sortedUsers = sortData(filteredUsers, sortKey, sortOrder);
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
  console.log("🚀 ~ UsersTable ~ totalPages:", totalPages);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = sortedUsers.slice(startIndex, startIndex + itemsPerPage);
  console.log(currentUsers.length);

  return (
    <div className="p-4">
      <div className="flex mb-4">
        <select
          className="border p-2"
          value={permissionType}
          onChange={(e) => setPermissionType(e.target.value)}
        >
          <option value="all">הצג הכל</option>
          <option value={1}>עורכים בלבד</option>
          <option value={0}>פעילים</option>
          <option value={-1}>ממתינים לאימות</option>
          <option value={-5}>מחוקים</option>
        </select>
        <input
          type="text"
          className="border px-8 mr-2"
          placeholder="חפש בשם משתמש או אימייל"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <h1 className="pr-20 text-xl font-bold font-mono">
          רשימת המשתמשים הרשומים
        </h1>
      </div>
      <table className="min-w-full cursor-arrow ">
        <thead>
          <tr>
            <th
              className="py-2 px-4 border cursor-pointer "
              onClick={() => handleSort("name")}
            >
              <span className="flex gap-4 items-center justify-center">
                שם
                {sortKey == "name" && (
                  <>{sortOrder == "asc" ? <FaArrowDown /> : <FaArrowUp />}</>
                )}
              </span>
            </th>
            <th
              className="py-2 px-4 border cursor-pointer flex gap-4 items-center justify-center"
              onClick={() => handleSort("username")}
            >
              <span className="flex gap-4 items-center justify-center px-2">
                שם משתמש
                {sortKey == "username" && (
                  <>{sortOrder == "asc" ? <FaArrowDown /> : <FaArrowUp />}</>
                )}
              </span>
            </th>
            <th className="py-2 px-4 border text-gray-600">מזהה</th>
            <th className="py-2 px-4 border text-gray-600">טלפון</th>
            <th
              className="py-2 px-4 border cursor-pointer flex gap-4 items-center justify-center"
              onClick={() => handleSort("email")}
            >
              <span className="flex gap-4 items-center justify-center">
                אימייל
                {sortKey == "email" && (
                  <>{sortOrder == "asc" ? <FaArrowDown /> : <FaArrowUp />}</>
                )}{" "}
              </span>
            </th>
            <th className="py-2 px-4 border text-gray-600">מאמרים</th>
            <th className="py-2 px-4 border text-gray-600">פעילות אחרונה</th>
            <th className="py-2 px-4 border text-gray-600">סטטוס משתמש</th>
            <th className="py-2 px-4 border text-gray-600">האם מנהל</th>
            <th className={`py-2 px-4 border text-${permissionType == -5 ? "red" : "gray"}-600`}>{permissionType == -5 ? "מחיקה לצמיתות" : "מחיקה"}</th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? [...Array(itemsPerPage)].map((_, index) => (
                <SkeletonRow key={index} />
              ))
            : currentUsers.map((user) => (
                <tr key={user.id} className="text-center">
                  <td className="py-2 px-4 border font-hebbo">{user.name}</td>
                  <td className="py-2 px-4 border font-hebbo">
                    {user.username}
                  </td>
                  <td className="py-2 px-4 border font-hebbo">{user.id}</td>
                  <td className="py-2 px-4 border font-hebbo">{user.phone}</td>
                  {/* <td className="py-2 px-4 border font-hebbo">{user.email}</td> */}
                  <td className="py-2 px-4 border font-hebbo">
                    <FieldToCopy valueToCopy={user.email} valueToShow={"..."} />
                  </td>
                  <td className="py-2 px-4 border font-hebbo">
                    {user.posts_sum}
                  </td>
                  <td className="py-2 px-4 border font-hebbo">
                    {formatDate(user.last_post_date)}
                  </td>
                  <td
                    className={`py-2 px-4 border ${
                      user.isAdmin > -1 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <Switch
                      className="hidden sm:ml-2 sm:block"
                      checked={user.isAdmin > -1}
                      onChange={() => {
                        setPermission(user.id, user.isAdmin == -1 ? 0 : -1);
                      }}
                      name="loading"
                      color="primary"
                    />
                    {user.isAdmin == -1 ? "ממתין" : "מאומת"}
                  </td>
                  <td
                    className={`py-2 px-4 border ${
                      user.isAdmin > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <Switch
                      className="hidden sm:ml-2 sm:block"
                      checked={user.isAdmin > 0}
                      onChange={() => {
                        setPermission(user.id, user.isAdmin == 0 ? 1 : 0);
                      }}
                      name="loading"
                      color="primary"
                    />
                    {user.isAdmin > 0 ? "כן" : "לא"}
                  </td>
                  <td className={`py-2 px-4 border`}>
                    <Button
                      variant="outlined"
                      startIcon={<DeleteIcon />}
                      onClick={() => {
                        if (user.isAdmin === - 5) {
                          deleteUser(user.id);
                        } else {
                          setPermission(user.id, -5);
                        }
                      }}
                    />
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handleSetCurrentPage}
        currentLength={currentUsers.length}
        totalLength={sortedUsers.length}
      />
    </div>
  );
};

export default UsersTable;

const SkeletonRow = () => (
  <tr>
    {[...Array(6)].map((_, index) => (
      <td key={index} className="py-3 px-4 border">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
      </td>
    ))}
  </tr>
);

export const sortData = (data, key, order = "asc") => {
  if (!data) return [];
  return data.sort((a, b) => {
    if (a[key] < b[key]) return order === "asc" ? -1 : 1;
    if (a[key] > b[key]) return order === "asc" ? 1 : -1;
    return 0;
  });
};

export const filterData = (data, search, isAdmin) => {
  const str = search.toLowerCase();
  if (!data) return [];
  return data.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(str) ||
      user.email.toLowerCase().includes(str) ||
      user.username.toLowerCase().includes(str);
    const matchesStatus =
      (isAdmin === "all" && user.isAdmin.toString() !== -5) ||
      user.isAdmin.toString() === isAdmin;
    return matchesSearch && matchesStatus;
  });
};

