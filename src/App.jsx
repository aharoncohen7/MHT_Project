
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import DataContext from './contexts/';
import SignIn from './components/login/SignIn';
import Layout from './components/layout/Layout';
import axios from "axios";
import Cookies from "js-cookie";


function App() {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [message, setMessage] = useState(null);
  const [isAdmin, setIsAdmin] = useState(0)
  const [adminMode, setAdminMode] = useState(false)
  console.log("userId: ", userId, "userName: ", userName, "isAdmin: ", isAdmin, "adminMode: ", adminMode);
  const navigate = useNavigate();


  // בדיקת טוקן
  useEffect(() => {
    async function checkToken() {
      if (localStorage.getItem('Authorization')) {
        try {
          const response = await axios.post('http://localhost:4002/api/login/checkToken', {}, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem('Authorization')
            }
          });
          if (response.status !== 200) {
            console.log(response.status, "שגיאה באימות טוקן");
            logOut();
          }
          setIsAdmin(response.data.isAdmin)
          setUserId(response.data.userId)
        } catch (error) {
          console.log(error.message, "שגיאה באימות טוקן");
          alert(error.message, "שגיאה באימות טוקן")
          logOut();
        }
      }
    }
    checkToken();
  }, []);


  // זריקה החוצה
  function logOut() {
    localStorage.removeItem('Authorization');
    window.location.href = "http://localhost:5173/"
  }

  // // איפוס הודעות מערכת
  useEffect(() => {
    if (message !== "") {
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  }, [message]);



  return (
    <DataContext.Provider value={{ navigate, logOut, setUserId, setUserName, setMessage, setIsAdmin, setAdminMode,  userId, userName, isAdmin,adminMode, message}}>
      <div>
        <Routes>
          <Route
            path="/*"
            element={
              !localStorage.getItem("Authorization") ? (
                <SignIn />
              ) : (
                <Layout />
              )
            }
          />
        </Routes>
      </div>
    </DataContext.Provider>
  )
}

export default App
