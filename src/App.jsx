
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import DataContext from './contexts/';
import SignIn from './components/login/SignIn';
import Layout from './components/layout/Layout';
import Cookies from "js-cookie";
import { axiosReq } from './functions/useAxiosReq';

function App() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(0)
  const [adminMode, setAdminMode] = useState(Boolean(sessionStorage.getItem('isAdminMode')) || false);
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
        setIsAdmin(userData.isAdmin)
        setUserId(userData.userId)
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
    setIsAdmin(0)
    setAdminMode(false)
    // window.location.href = "https://vortly.onrender.com/"
  }



  const contexts = {
    navigate,
    setMessage,
    logOut,
    setUserId,
    setIsAdmin,
    setAdminMode,
    message,
    userId,
    isAdmin,
    adminMode,
  }


  return (
    <DataContext.Provider value={contexts}>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route path="/*" element={<Layout />} />
      </Routes>
    </DataContext.Provider>
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