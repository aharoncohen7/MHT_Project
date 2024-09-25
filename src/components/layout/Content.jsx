import React, { useContext } from "react";
import { Route, Routes } from 'react-router-dom';
import UserContext from '../../contexts';
import DataContext from '../../contexts/dataContext';
import ContactUsForm from "../about/ContactUsForm";
import AboutUs from "../AboutUs";
import Addition from "../Addition";
import Dashboard from "../dashboard/Dashboard";
import { Edit } from "../Edit";
import SignIn from "../login/SignIn";
import NotFound from '../NotFound';
import AllPosts from "../posts/AllPosts";
import SinglePost from "../posts/SinglePost";


const Content = ({ parasha, originalData, setOriginalData, filteredData, setFilteredData }) => {
  const { isAdmin, adminMode, } = useContext(UserContext)
  return (
 
    <span style={{display: "flex", alignItems: "center", justifyContent:"center"}}>
      
      <DataContext.Provider value={{ originalData, setOriginalData, filteredData, setFilteredData, parasha }}>
  <Routes>
    <Route path="login" element={<SignIn />} />
    <Route path="addition" element={<Addition />} />
    <Route path="dashboard" element={isAdmin && adminMode ? <Dashboard /> : <NotFound />} />
    <Route path="about" element={<AboutUs />} />
    <Route path="about/contact-us" element={<ContactUsForm />} />
    <Route path="/" element={<AllPosts setOriginalData={setOriginalData}/>} />
    <Route path="home/*" element={<AllPosts setOriginalData={setOriginalData}/>} />
    <Route path="post/:postId" element={<SinglePost />} />
    <Route path="edit/:postId" element={<Edit />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</DataContext.Provider>
      
      
      
      </span>


  )
}

export default Content