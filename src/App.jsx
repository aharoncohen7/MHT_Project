
import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import DataContext from './contexts';
import SignIn from './components/login/SignIn';
import Layout from './components/layout/Layout';


function App() {
  const authValue = localStorage.getItem('auth');
  const [userId, setUserID] = useState(authValue ? authValue.split(':')[2] : null);
  const [userName, setUserName] = useState(authValue ? authValue.split(':')[0] : null);
  const [message, setMessage] = useState(null);
  const [isAdmin, setIsAdmin] = useState(0)
  const [adminMode, setAdminMode] = useState(false)
  const navigate = useNavigate();
  

    // זריקה החוצה
    function logOut() {
      localStorage.removeItem('auth');
      localStorage.removeItem('Authorization');
      window.location.href = "http://localhost:5173/"
    }
  
    // איפוס הודעות מערכת
    useEffect(() => {
      if (message !== "") {
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      }
    }, [message]);


    useEffect(() => {
      console.log(userId, userName, isAdmin);
    }, []);





  return (
    <DataContext.Provider value={{ userId, setUserID, setUserName, userName, navigate, logOut, message, setMessage, isAdmin, setIsAdmin, adminMode, setAdminMode }}>
      <div>
        <Routes>
          <Route
            path="/*"
            element={
              !localStorage.getItem("Authorization") ? (
                <SignIn
                  setUserName={(userName) => setUserName(userName)}
                  setUserID={(userId) => setUserID(userId)}
                />
              ) : (
                <Layout userId={userId}/>
              )
            }
          />
        </Routes>
      </div>
    </DataContext.Provider>
  )
}

export default App
