import { Tooltip } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosCloseCircleOutline } from "react-icons/io";
import DataContext from "../../contexts/dataContext";

export default function Search({ setSortedList }) {
  const { originalData, filteredData, setFilteredData, parasha } =
  useContext(DataContext);

  const [showSearch, setShowSearch] = useState(true);
  const [filter, setFilter] = useState("creation date ↑");
  const [input, setInput] = useState("");
  const [idToSearch, setIdToSearch] = useState("");
  const searchParams = new URLSearchParams(window.location.search);
  const tag = searchParams.get("tag");
  const subtopic = searchParams.get("parasha");
  const authorId = searchParams.get("author");
  const postId = searchParams.get("post");


  //פונקציית המיון
  useEffect(() => {
  
    if (originalData !== "") {
      if (tag !== null) {
        setSortedList(
          sortBy(filter).filter(
            (elm) =>
              elm.tags != null &&
              elm.tags.split(",").includes(
                tag
                // .trim()
              ) || elm.subtopic && elm.subtopic == tag
          )
        );
        return;
      }
      // אם יש פרשה בנתיב
      if (subtopic !== null) {
        if (subtopic === "all") {
          setSortedList(sortBy(filter));
          return;
        }
        setSortedList(
          sortBy(filter).filter(
            (elm) => elm.subtopic != null && elm.subtopic == subtopic
          )
        );
        return;
      }
      // אם יש מזהה מחבר בנתיב
      if (authorId !== null) {
        setSortedList(sortBy(filter).filter((elm) => elm.userId == authorId));
        return;
      }
      // if (postId !== null) {
      //   setSortedList(filter((elm) => elm.id == postId));
      //   return;
      // }
      if (parasha) {
        const parashaName = parasha;
        // console.log("🚀 ~ useEffect ~ parashaName:", parashaName)
        
        if (parashaName.split("-").length) {
          const parashaName1 = parashaName.split("-")[0];
          const parashaName2 = parashaName.split("-")[1];
          setSortedList(
            sortBy(filter).filter(
              (elm) =>
                elm.subtopic != null &&
                (elm.subtopic === parashaName1 || elm.subtopic === parashaName2)
            )
          );
          return;
        } else {
          setSortedList(
            sortBy(filter).filter(
              (elm) => elm.subtopic != null && elm.subtopic === parashaName
            )
          );
          return;
        }
      }
      setSortedList(sortBy(filter));
    }
  }, [filteredData, filter, tag, authorId, subtopic]);

  // קובע סוג מיון
  function handleSortChange(e) {
    setFilter(e.target.value);
  }

  //בורר סוגי מיון
  const sortBy = (sortBy) => {
    switch (sortBy) {
      case "random":
        return [...filteredData].sort(() => Math.random() - 0.5);
      case "alphabetical ↓":
        return [...filteredData].sort((a, b) => a.title - b.title);
      case "alphabetical ↑":
        return [...filteredData].sort((a, b) => a.title - b.title).reverse();
      case "rating ↑":
        return [...filteredData].sort((a, b) => a.rating - b.rating);
      case "rating ↓":
        return [...filteredData].sort((a, b) => a.rating - b.rating).reverse();
      case "creation date ↓":
        return [...filteredData].sort(
          (a, b) => Date.parse(a.date) - Date.parse(b.date)
        );
      case "creation date ↑":
        return [...filteredData]
          .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
          .reverse();
      default:
        return filteredData;
    }
  };

  //  סינון לפי תוכן
  useEffect(() => {
    if (input === "") {
      setFilteredData(originalData);
      return;
    }
    setFilteredData(
      originalData.filter(
        (elm) => elm.title.includes(input) || elm.body.includes(input)
      )
    );
  }, [input]);

  //  - סינון לפי מזהה - עבור אדמין
  useEffect(() => {
    if (idToSearch === "") {
      setFilteredData(originalData);
      return;
    }
    setFilteredData(
      originalData.filter((elm) => elm.id === parseInt(idToSearch))
    );
  }, [idToSearch]);

  return (
    <div
      className={`sm:flex fixed p-1 pr-2 left-1/2 w-5/5 sm:w-3/6  md:w-2/5 lg:w-2/5 xl:w-2/5 top-28 ${
        showSearch ? "bg-gray-300 border border-gray-400 shadow-md " : ""
      }  text-center justify
        items-center transform -translate-x-1/2 -translate-y-1/2  rounded-full z-10  `}
    >
      <Tooltip title={showSearch ? "סגור" : "לחץ כדי להציג אפשרויות חיפםוש ומיון"}>
          <button
            type="button"
            className="hidden sm:flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-400 focus:outline-none focus:ring-1"
            onClick={() => setShowSearch(!showSearch)}
          >
            {showSearch ? (
              <IoIosCloseCircleOutline size="40px" />
            ) : (
              <span>
                <CiSearch size="30px" />
              </span>
            )}
          </button>
      </Tooltip>

      {showSearch && (
        <div className="flex items-center justify-center gap-2 p-2">
          <input
            id="input1"
            type="text"
            className="hidden xl:block w-full p-2 rounded-3xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-right "
            onChange={(event) => setIdToSearch(event.target.value)}
            placeholder="חפש לפי מזהה"
          />

          <input
            id="input2"
            type="text"
            className="block w-44 sm:w-full p-2 rounded-3xl focus:outline-none focus:ring-1 focus:ring-blue-500 text-right "
            onChange={(event) => setInput(event.target.value)}
            placeholder=" חפש בתוכן מאמר"
          />

          <div className="flex items-center justify-center rtl  ">
            <select
              id="sort"
              onChange={handleSortChange}
              className=" px-2 py-1 h-10 border rounded-3xl focus:outline-none focus:ring-1 focus:ring-blue-500"
              value={filter}
            >
              {/* <option className="" value="sequential">Sequential</option>
                  <option className="" value="alphabetical ↓">א-ת </option>
                  <option className="" value="alphabetical ↑">ת-א </option> */}
              <option className="" value="random">
                מיין בסדר אקראי
              </option>
              <option className="" value="rating ↓">
                לפי דירוג משתמשים
              </option>
              {/* <option className="" value="rating ↑">מדורג נמוך</option> */}
              <option className="" value="creation date ↓">
                מיין מהישן לחדש
              </option>
              <option className="" value="creation date ↑">
                מיין מהחדש לישן
              </option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
