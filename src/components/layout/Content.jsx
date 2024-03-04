import React, { useEffect, useState, useContext } from "react";
import { Routes, Route } from 'react-router-dom';
import AllPosts from "../posts/AllPosts";
import SinglePost from "../posts/SinglePost";
import Addition from "../posts/Addition";
import Aaa from "../posts/Aaa";
import NotFound from '../NotFound'
import DataContext from '../../contexts';
import DataContext2 from '../../contexts/index2';
import SignIn from "../login/SignIn";
import AboutUs from "../AboutUs";
import Cookies from "js-cookie";
import { Edit } from "../Edit";


const Content = ({ parasha}) => {
  const {userId, logOut, setMessage, adminMode} = useContext(DataContext)
  console.log(userId); 
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  // console.log(parasha || "שם הפרשה")
  // console.log(adminMode);

  // קבלת פוסטים
  useEffect(() => {
    const getAllPosts = async () => {
      try {
        const urlPosts = "http://localhost:4002/api/posts/";
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 'auth': localStorage.getItem('auth') || '',
            'authorization': localStorage.getItem('Authorization') || ''
          },
        };
        const response = await fetch(urlPosts, requestOptions);
        if (!response.ok) {
          if (response.status == 401) {
            logOut()
          }
          setMessage("Network response was not ok!")
          throw new Error(`Network response was not ok! status: ${response.status}`);
        }
        const data = await response.json();
        // console.log(data);
        setOriginalData(data);
        setFilteredData(data);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    getAllPosts();
  }, []);


  return (
    <DataContext2.Provider value={{ originalData, setOriginalData, filteredData, setFilteredData}}>
        <Routes>
          <Route path="home/*" element={<AllPosts parasha={parasha} userId={userId} adminMode={adminMode}/>} />
          <Route path="post/:postId" element={<SinglePost />} />
          {/* <Route path="edit/:postId" element={< Aaa />} /> */}
          <Route path="edit/:postId" element={< Edit />} />
          <Route path="addition" element={<Addition />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="login" element={<SignIn />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
    </DataContext2.Provider>

  )
}

export default Content