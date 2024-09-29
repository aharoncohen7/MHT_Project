import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Message from "../../components/Message";
import UserContext from "../../contexts";
import { getCurrentDate, getNextWeekDate, getParasha } from "../../functions";
import { axiosReq } from "../../functions/useAxiosReq";
import Footer from "../Footer";
import Content from "./Content";
import Navbar from "./Header";
import ParashaNav from "./ParashaNav";
import {
  getCurrentDateInfoFromAPI,
  getCurrentDateInfoFromJson,
} from "../../helpers/formatDate";
import DataContext from "../../contexts/dataContext";

const Layout = () => {
  const [parasha, setParasha] = useState(null);
  const [holiday, setHoliday] = useState(null);
  const [title, setTitle] = useState(null);
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { logOut, setMessage, message } = useContext(UserContext);

  // קבלת פרשה
  useEffect(() => {
    async function fetchData1() {
      try {
        const response = await axios.get(
          `https://www.hebcal.com/hebcal?cfg=json&s=on&start=${getCurrentDate()}&end=${getNextWeekDate()}`
        );
        const parasha = getParasha(response.data);
        setParasha(parasha);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    const fetchData = async () => {
      const dataFromAPI = await getCurrentDateInfoFromAPI();
      console.log(dataFromAPI);
      const dataFromJSON = await getCurrentDateInfoFromJson();
      console.log(dataFromJSON);
      setParasha(
        "פרשת " + dataFromAPI.currentParasha || dataFromJSON.currentParasha
      );
      setHoliday(dataFromJSON.upcomingHoliday);
      console.log(dataFromAPI.firstEvent);
      setTitle(dataFromAPI.firstEvent);
    };
    fetchData();
  }, []);

  // קיבוע פוסטים
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axiosReq({ method: "GET", body: {}, url: `/posts` });
        if (data) {
          console.log(data);
          setOriginalData(data);
          setFilteredData(data);
        }
      } catch (e) {
        setMessage(["Network response was not ok!", false]);
      }
    };

    fetchData();
  }, []);

  // במקרה של שינוי במערך השמה מחדש

  return (
    <span>
      <Navbar parasha={parasha} holiday={holiday} title={title} />
      {/* <Navbar parasha={title} holiday={holiday} title={title} /> */}
      import DataContext from "../../contexts/dataContext";
      <DataContext.Provider
        value={{
          originalData,
          setOriginalData,
          filteredData,
          setFilteredData,
          parasha,
        }}
      >
        <Content/>
      </DataContext.Provider>
      <div className="hidden md:fixed border-t mt-10 max-w-80 top-0 left-40">
        <ParashaNav />
      </div>
      {message[0] && <Message message={message} />}
      <Footer />
      {/* <div
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div> */}
    </span>
  );
};

export default Layout;
