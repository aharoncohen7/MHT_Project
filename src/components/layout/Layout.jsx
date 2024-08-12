
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Content from './Content'
import DataContext from "../../contexts";
import Navbar from "./Navbar";
import { getCurrentDate, getNextWeekDate, getParasha } from '../../functions';
import Cookies from "js-cookie";
import Message from '../../components/Message'
import ParashaNav from "./ParashaNav";


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



  return (
    <span >
      <Navbar parasha={parasha} />
      <Content parasha={parasha} />
      <div className="hidden md:fixed border-t mt-10 max-w-80 top-0 left-40">
        <ParashaNav />
      </div>
      {message[0] &&
        <Message message={message} />}
    </span>
  )
}

export default Layout;
