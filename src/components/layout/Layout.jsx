import axios from "axios";
import { React, useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Message from "../../components/Message";
import UserContext from "../../contexts";
import DataContext from "../../contexts/dataContext";
import { getCurrentDate, getNextWeekDate, getParasha } from "../../helpers";
import { axiosReq } from "../../helpers/useAxiosReq";
import {
  getCurrentDateInfoFromAPI,
  getCurrentDateInfoFromJson,
} from "../../helpers/formatDate";
import Footer from "./Footer";
import Header from "./Header";
import ParashaNav from "./ParashaNav";
import AboutUs from "../about/AboutUs";

import Dashboard from "../dashboard/Dashboard";
// import { Edit } from "../Edit";
import SignIn from "../login/SignIn";
import NotFound from "../NotFound";
import AllPosts from "../posts/AllPosts";
import SinglePost from "../posts/SinglePost";
import ContactUsForm from "../about/ContactUsForm";
import NewPost from "../posts/NewPost";
import SupportTicketsDashboard from "../Questions";

const Layout = () => {
  const [parasha, setParasha] = useState(null);
  const [loading, setLoading] = useState(false);
  const [holiday, setHoliday] = useState(null);
  const [dayData, seDayData] = useState(null);
  const [title, setTitle] = useState(null);
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const { setMessage, message } = useContext(UserContext);
  const { isAdmin, adminMode } = useContext(UserContext);

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
      setParasha(dataFromAPI.currentParasha || dataFromJSON.currentParasha);
      setHoliday(dataFromJSON.upcomingHoliday);
      seDayData(dataFromAPI);
      console.log(dataFromAPI.firstEvent);
      setTitle(dataFromAPI.firstEvent);
    };
    fetchData();
  }, []);

  // קיבוע פוסטים
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await axiosReq({
          method: "GET",
          body: {},
          url: `/public-posts`,
        });
        if (data) {
          console.log(data);
          setOriginalData(data);
          setFilteredData(data);
          setLoading(false);
        }
      } catch (e) {
        setMessage(["Network response was not ok!", false]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Header
        parasha={parasha}
        holiday={holiday}
        title={title}
        dayData={dayData}
      />
      <DataContext.Provider
        value={{
          originalData,
          setOriginalData,
          filteredData,
          setFilteredData,
          parasha,
          loading,
          setLoading,
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "63px",
          }}
        >
          <Routes>
            <Route path="login/*" element={<SignIn />} />
            <Route path="addition/*" element={<NewPost />} />
            <Route path="questions/" element={isAdmin && adminMode ? <SupportTicketsDashboard />: <NotFound />} />
            <Route
              path="dashboard/"
              element={isAdmin && adminMode ? <Dashboard /> : <NotFound />}
            />
            <Route path="about/*" element={<AboutUs />} />
            <Route path="about/contact-us" element={<ContactUsForm />} />
            <Route path="home/*" element={<AllPosts />} />
            <Route path="post/:postId" element={<SinglePost />} />
            {/* <Route path="edit/:postId" element={<Edit />} /> */}
            <Route path="/" element={<AllPosts />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </span>
      </DataContext.Provider>
      <div className="hidden md:fixed border-t mt-10 max-w-80 top-0 left-40">
        <ParashaNav />
      </div>
      {message[0] && <Message />}
      <Footer />
    </>
  );
};

export default Layout;
