import React, { useContext, useState } from "react";
import { FiFeather, FiTrash2 } from "react-icons/fi";
import UserContext from "../../contexts";
import {
  importedAdminEdit,
  importedDelete,
} from "../../functions/postFunctions";
import ErrorBoundary from "../ErrorBoundary";
import PopUp from "../PopUp";
import ParashaNav from "../layout/ParashaNav";
import { formatDate } from "./../../functions";
import Search from "./Search";
import DataContext from "../../contexts/dataContext";
import { Rating, Tooltip } from "@mui/material";
import Spinner from "../Spinner";

export default function AllPosts({}) {
  const { userId, adminMode, setMessage, message, logOut, navigate } =
    useContext(UserContext);
  const { setOriginalData, loading } = useContext(DataContext);
  const [showEditor, setShowEditor] = useState(false);
  const [sortedList, setSortedList] = useState([]);

  function deletePost(item) {
    importedDelete(item, setOriginalData, setMessage, logOut, navigate);
  }

  function edit_as_admin(item) {
    importedAdminEdit(item, setOriginalData, setMessage, logOut, navigate);
  }

  function handleNewPost() {
    if (userId) {
      setShowEditor(true);
    } else {
      setMessage(["כדי לפרסם פוסט עליך להיות מחובר", false]);
    }
  }

  function extractTextBetweenTags(html) {
    const regex = /<[^>]+>([^<]*)<\/[^>]+>/g; // פסקלות רגולריות לזיהוי תגיות HTML
    const matches = html.matchAll(regex); // מצא את כל ההתאמות לתגיות בטקסט
    let result = ""; // תוכן הטקסט בין התגיות

    for (const match of matches) {
      result += match[1].trim(); // הוסף את התוכן שנמצא בין התגיות לתוך התוצאה
    }
    return result.substring(0, 50);
  }

  const textStyle = {
    direction: "rtl",
    wordWrap: "break-word",
    whiteSpace: "nowrap" /* מונע מהטקסט לרדת שורה */,
    overflow: "hidden" /* מוודא שהטקסט ייחתך אם הוא עובר את גבול הקופסה */,
    textOverflow: "ellipsis" /* מציג שלוש נקודות אם הטקסט לא נכנס */,
    display: "block" /* מאפשר תכונות overflow ו-text-overflow לעבוד */,
    width: "100%" /* הגדר רוחב שתואם ל-DIV */,
  };

  return (
    <ErrorBoundary>
      <div className={""}>
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          {!showEditor && <Search setSortedList={setSortedList} />}
          {!showEditor && userId && (
            <button
              className="z-20 fixed bottom-6 sm:bottom-14 left-6 sm:left-14 bg-gray-700 rounded-full text-gray-700 hover:bg-gray-900 hover:text-gray h-14 sm:h-20 w-14 sm:w-20 px-4 sm:px-5 text-sm font-medium"
              onClick={() => handleNewPost()}
            >
              <FiFeather className="text-white size-6 sm:size-10 ml-0" />{" "}
            </button>
          )}

          {message && <p style={{ color: "red" }}>{message}</p>}
          <div className="grid py-24 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 max-w-2xl mx-auto border-t border-gray-300 gap-x-8 gap-y-8 sm:mt-30 lg:mt-30 lg:max-w-none ">
            {loading ? (
              <Spinner />
            ) : sortedList.length == 0 ? (
              <p className="text-center text-gray-600">
                עדיין אין מאמרים לנושא זה, הנך מוזמן להוסיף
              </p>
            ) : (
              sortedList.map((post) => (
                <article
                  key={post.id}
                  style={{ direction: "ltr" }}
                  className="p-4 bg-white flex flex-col items-center justify-between max-w-xl hover:bg-gray-100 border border-gray-300 shadow-md truncate rounded-xl"
                >
                  <div className="flex items-center text-xs gap-x-4 w-full justify-between">
                    <p className="text-gray-500">
                      {formatDate(post.created_at)}
                    </p>

                    <Tooltip
                      title="לחץ כדי להציג מאמרים בנושא"
                      placement="top"
                      arrow
                    >
                      <a
                        className="relative z-1 rounded-2xl bg-blue-50 px-4 py-2 font-medium text-gray-600 hover:bg-gray-300 "
                        onClick={() => {
                          if (post.subtopic)
                            navigate(`/home/?parasha=${post.subtopic}`);
                        }}
                      >
                        {post.subtopic}
                      </a>
                    </Tooltip>
                  </div>

                  <div
                    className="relative group px-1"
                    style={{ width: "100%" }}
                  >
                    <h3 className="mt-3 text-xl font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      <p
                        style={textStyle}
                        className="cursor-pointer text-right overflow-wrap-normal "
                        onClick={() => {
                          navigate(`/post/${post.id}`);
                        }}
                      >
                        {post.title}
                      </p>
                      <p
                        style={textStyle}
                        className="py-2 text-sm leading-8 text-gray-500 line-clamp-8 text-right overflow-wrap-normal"
                      >
                        {extractTextBetweenTags(post.body)}
                      </p>

                      <p
                        style={{ direction: "rtl" }}
                        className="font-semibold text-gray-900 cursor-pointer text-sm leading-6"
                        onClick={() => {
                          navigate(`/home/?author=${post.userId}`);
                        }}
                      >
                        <Tooltip
                          title="מצא עוד פוסטים של מחבר זה"
                          placement="top"
                          arrow
                        >
                          {"מאת: " + post.author}
                        </Tooltip>
                      </p>
                    </h3>
                  </div>
                  <div className="  flex items-center justify-between w-full p-1">
                    <p
                      className="cursor-pointer bg-gray-100 hover:bg-gray-300 rounded-full px-2 py-1 text-md leading-6 text-gray-600 line-clamp-3 items-start"
                      onClick={() => {
                        navigate(`/post/${post.id}`);
                      }}
                    >
                      <Tooltip title="לתוכן המאמר" placement="top" arrow>
                        {"<< לקריאה"}
                      </Tooltip>
                    </p>

                    <span className="flex justify-center items-center gap-2 h-10">
                      {adminMode ? (
                        <>
                          <Tooltip title="מחיקה" placement="top" arrow>
                            <button
                              type="button"
                              className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                              onClick={() => deletePost(post)}
                            >
                              <span className="text-lg font-bold text-gray-500">
                                <FiTrash2 />
                              </span>
                            </button>
                          </Tooltip>
                          <Tooltip title="עריכה" placement="top" arrow>
                            <button
                              type="button"
                              className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                              onClick={() => edit_as_admin(post)}
                            >
                              <span className="text-lg font-bold text-gray-500">
                                ✏️
                              </span>
                            </button>
                          </Tooltip>
                        </>
                      ):
                      <Rating name="read-only" value={post.rating} size="small"  style={{ color: "rgba(6, 119, 221, 0.8)"
                         , direction: "ltr" }} readOnly />
                      }
                    </span>
                  </div>
                </article>
              ))
            )}
          </div>
          <div className="border-t mt-10 ">
            <ParashaNav />
          </div>
        </div>
      </div>
      {showEditor && (
        <PopUp
          userId={userId}
          showEditor={showEditor}
          setShowEditor={setShowEditor}
        />
      )}
    </ErrorBoundary>
  );
}
