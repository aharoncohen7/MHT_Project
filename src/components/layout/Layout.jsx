
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Content from './Content'
import DataContext from "../../contexts";
import Navbar from "./Navbar";
import { getCurrentDate, getNextWeekDate, getParasha } from '../../functions';
import Cookies from "js-cookie";
import Message from '../../components/Message'


const Layout = () => {
  const [parasha, setParasha] = useState(null);
  const { logOut, setMessage, message } = useContext(DataContext)

  // קבלת פרשה
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`https://www.hebcal.com/hebcal?cfg=json&s=on&start=${getCurrentDate()}&end=${getNextWeekDate()}`)
        const parasha = getParasha(response.data)
        console.log(parasha);
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
          setMessage(["הסשן הסתיים, נא להכנס שוב", false])
          logOut();
        }
      } catch (error) {
        console.log(error.message);
        setMessage([" התרחשה תקלה בניסיון האימות" + error.message, false])
        logOut();
      }
    }

    checkToken();
  }, []);



  return (
    <span >
      <Navbar parasha={parasha} />
      <Content parasha={parasha} />
      {message[0] &&
        <Message message={message} />}
    </span>
  )
}

export default Layout;
