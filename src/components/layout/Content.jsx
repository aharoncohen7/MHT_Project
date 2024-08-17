import React, { useEffect, useState, useContext } from "react";
import { Routes, Route } from 'react-router-dom';
import AllPosts from "../posts/AllPosts";
import SinglePost from "../posts/SinglePost";
import Addition from "../Addition";
import NotFound from '../NotFound'
import DataContext from '../../contexts';
import DataContext2 from '../../contexts/index2';
import SignIn from "../login/SignIn";
import AboutUs from "../AboutUs";
import Cookies from "js-cookie";
import { Edit } from "../Edit";
import useAxiosReq from "../../functions/useAxiosReq";
import Dashboard from "../dashboard/Dashboard";


const Content = ({ parasha }) => {
  const { setMessage, isAdmin, adminMode, } = useContext(DataContext)
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
    // קבלת פוסטים
  const {data, error} = useAxiosReq({method: 'GET',body:{}, url:`/posts` })
  console.log(data);
  
    // קיבוע פוסטים
  useEffect(()=>{
    if(data){
      setOriginalData(data);
      setFilteredData(data)
    }
  },[data])

  // טיפול בשגיאות
  useEffect(()=>{
    if(error){
      setMessage(["Network response was not ok!", false])
    }
  },[error])

  // במקרה של שינוי במערך השמה מחדש
  useEffect(() => {
    setFilteredData(originalData)
   }, [originalData])



  return (
    <DataContext2.Provider value={{ originalData, setOriginalData, filteredData, setFilteredData, parasha }}>
      <Routes>
        <Route path="/" element={<AllPosts setOriginalData={setOriginalData}/>} />
        <Route path="home/*" element={<AllPosts setOriginalData={setOriginalData}/>} />
        <Route path="post/:postId" element={<SinglePost />} />
        <Route path="edit/:postId" element={< Edit />} />
        <Route path="addition" element={<Addition />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="dashboard" element={isAdmin && adminMode ?<Dashboard /> : <NotFound />} />
        {/* <Route path="login" element={<SignIn />} /> */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </DataContext2.Provider>

  )
}

export default Content