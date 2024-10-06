
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import UserContext from './contexts/';
import SignIn from './components/login/SignIn';
import Layout from './components/layout/Layout';
import Cookies from "js-cookie";
import { axiosReq } from './functions/useAxiosReq';
import { dark } from '@mui/material/styles/createPalette';
// const CLIENT_HOST = import.meta.env.VITE_CLIENT_HOST;

function App() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("אורח");
  const [isAdmin, setIsAdmin] = useState(0)
  const [adminMode, setAdminMode] = useState(Boolean(sessionStorage.getItem('isAdminMode')) || false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [message, setMessage] = useState([null, true]);

  // איפוס הודעות מערכת
  useEffect(() => {
    if (message[0] !== null) {
      setTimeout(() => {
        setMessage([null, false]);
      }, 3000);
    }
  }, [message]);

 // בדיקת טוקן
  useEffect(() => {
  const checkToken = async () => {
    if (Cookies.get('Authorization')) {
      try {
        const userData = await axiosReq({ method: 'POST', body: {}, url: `/login/checkToken` })
        console.log(userData)
        setIsAdmin(userData.isAdmin)
        setUserId(userData.userId)
        setUserName(userData.userName)
        setAdminMode(Boolean(sessionStorage.getItem('isAdminMode')) || false)
        sessionStorage

      } catch (e) {
        console.log(e, "שגיאה באימות טוקן");
        setAdminMode(false)
        sessionStorage.removeItem('isAdminMode')
        setMessage([" הסשן הסתיים, נא התחבר מחדש", false])
        logOut();

      }
    }
    else sessionStorage.removeItem('isAdminMode')
    setAdminMode(false)
  }
    checkToken();
  }, [])


   // זריקה החוצה
   function logOut() {
     Cookies.remove('Authorization');
    sessionStorage.removeItem('isAdminMode')
    setUserId(null);
    setUserName("אורח")
    setIsAdmin(0)
    setAdminMode(false)
  }



  const contextsList = {
    navigate,
    setMessage,
    logOut,
    setUserId,
    setIsAdmin,
    setAdminMode,
    setIsDarkMode,
    setUserName,
    message,
    userName,
    userId,
    isAdmin,
    adminMode,
    isDarkMode
  }


  return (
    <UserContext.Provider value={contextsList}>
      <Routes>
        {/* <Route path="/login" element={<SignIn />} /> */}
        <Route path="/*" element={<Layout />} />
      </Routes>
    </UserContext.Provider>
  )
}

export default App


// TODO לאחד 3 סטייטים הבאים
// const [userData, setUserData] = useState({
//   userId: null,
//   isAdmin: 0,
//   adminMode: false
// })

// const contexts = {
//   navigate,
//   message,
//   setMessage,
//   logOut,
//   setUserId : (userId) => setUserData({...userData, userId}),
//   setIsAdmin:  (isAdmin) => setUserData({...userData, isAdmin}),
//   setAdminMode : (adminMode) => setUserData({...userData, adminMode}),
//   userId:userData.userId,
//   isAdmin:userData.isAdmin,
//   adminMode:userData.adminMode,
// }