
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Content from './Content'
import DataContext from "../../contexts";
import Navbar from "./Navbar";
import { chipClasses } from "@mui/material";
import { getCurrentDate, getNextWeekDate, getParasha } from '../../functions';
import ParashasNav from "./ParashasNav";





const Layout = ({userId}) => {
  const { logOut } = useContext(DataContext)
  const [parasha, setParasha] = useState(null);

// קבלת פרשה
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`https://www.hebcal.com/hebcal?cfg=json&s=on&start=${getCurrentDate()}&end=${getNextWeekDate()}`)
        const parasha = getParasha(response.data)
        setParasha(parasha)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchData();
  }, []);


// בדיקת טוקן
  useEffect(() => {
    async function checkToken() {
      try {
        const response = await axios.post('http://localhost:4002/api/login/isTokenExpired', {
          token: localStorage.getItem("Authorization")
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response.status);
        if (response.status !== 200) {
          console.log(response.status);
          logOut();
        }
      } catch (error) {
        console.log(error.message);
        logOut();
      }
    }

    checkToken();
  }, []);



  return (
      <span >
        <Navbar parasha={parasha} />
        <Content userId={userId} parasha={parasha}/>
      </span>
  )
}

export default Layout;
