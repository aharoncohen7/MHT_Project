
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import DataContext from './contexts/';
import SignIn from './components/login/SignIn';
import Layout from './components/layout/Layout';
import axios from "axios";
import Cookies from "js-cookie";


function App() {
  console.log("app is up");
  const [userId, setUserId] = useState(null);
  // const [userName, setUserName] = useState(null);
  const [message, setMessage] = useState([null, true]);
  const [isAdmin, setIsAdmin] = useState(0)
  const [adminMode, setAdminMode] = useState(false)
  console.log("userId: ", userId, "isAdmin: ", isAdmin, "adminMode: ", adminMode);
  const navigate = useNavigate();

  // בדיקת טוקן
  useEffect(() => {
    async function checkToken() {
      if (localStorage.getItem('Authorization')) {
        try {
          const response = await axios.post('https://vortly-db.onrender.com/api/login/checkToken', {}, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem('Authorization')
            }
          });
          if (response.status !== 200) {
            console.log(response.status, "שגיאה באימות טוקן");
            logOut();
            return;
          }
          const userData = response.data;
          console.log(userData);
          setIsAdmin(userData.isAdmin)
          setUserId(userData.userId)
        } catch (error) {
          console.log(error.message, "שגיאה באימות טוקן");
          setMessage([error.message +  " שגיאה באימות טוקן", false])
          logOut();
        }
      }
    }
    checkToken();
  }, []);


  // זריקה החוצה
  function logOut() {
    localStorage.removeItem('Authorization');
    setUserId(null);
    // setUserName(null);
    setIsAdmin(0)
    setAdminMode(false)
    // window.location.href = "https://vortly.onrender.com/"
  }

  // // איפוס הודעות מערכת
  useEffect(() => {
    if (message[0] !== null) {
      setTimeout(() => {
        setMessage([null, false]);
      }, 3000);
    }
  }, [message]);



  return (
    <DataContext.Provider value={{ navigate, logOut, setUserId, setMessage, setIsAdmin, setAdminMode, userId, isAdmin, adminMode, message }}>
      <>
        <Routes>
          <Route path="/login" element={<SignIn />} />
          <Route
            path="/*"
            element={
              // !localStorage.getItem("Authorization") ? (
              // <SignIn />
              // ) : (
              <Layout />
              // )
            }
          />
        </Routes>




      </>
    </DataContext.Provider>
  )
}

export default App
