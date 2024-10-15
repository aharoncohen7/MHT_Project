import ClearIcon from "@mui/icons-material/Clear";
import { Box, Button, Chip, Dialog, Tooltip } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../../contexts";
import DataContext from "../../contexts/dataContext";
import { formatDate } from "../../helpers";
import { importedDelete } from "../../helpers/postFunctions";
import { ButtonClick } from "../buttons/ButtonClick";
import ParashaNav from "../layout/ParashaNav";
import CommentList from "./CommentsList";
import Editor from "./Editor";
import MyRating from "./MyRating";
import SanitizedHTML from "./SanitizedHTML";
import TagList from "./TagList";
import { FaRegComments } from "react-icons/fa";

// פוסט בודד בעמוד נפרד - חדש
export default function SinglePost() {
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [imgError, setImgError] = useState(false);
  const { postId } = useParams();
  const { setMessage, message, logOut, adminMode } = useContext(UserContext);
  const { setOriginalData, originalData } = useContext(DataContext);
  const [send, setSend] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [length, setLength] = useState(0);
  const [isCommentListOpen, setIsCommentListOpen] = useState(false);

  // מצא פוסט בודד מתוך הרשימה
  useEffect(() => {
    async function fetchData() {
      const result = originalData.find((post) => post.id == postId);
      if (result) {
        setItem(result);
        // console.log(result);
      }
    }
    fetchData();
  }, [postId, originalData]);

  // מחיקה
  function deletePost() {
    importedDelete(item, setOriginalData, setMessage, logOut, navigate);
  }

  return (
    <>
      {item && (
        <div className="relative flex items-center justify-center px-6 overflow-hidden isolate sm:py-2 lg:overflow-visible lg:px-14">
          <div className="grid max-w-2xl grid-cols-1 mx-auto text-right sm:gap-x-8 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-y-10">
            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
              <div className="mt-10 lg:-mt-60">
                <div className="lg:max-w-lg mr-6 flex-row gap-8">
                  <Tooltip label="תגית נושא" title="תגית נושא">
                    <Chip
                      label={item.subtopic ? item.subtopic : "שם הפרשה"}
                      color="primary"
                      variant="outlined"
                      onClick={() => {
                        if (item.subtopic)
                          navigate(`/home/?parasha=${item.subtopic}`);
                      }}
                    />
                  </Tooltip>
                  <h2 className="pt-2 pb-8 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    {item.title}
                  </h2>
                  <span className="flex justify-between pb-6">
                    <Tooltip title="מחבר">
                      <Chip
                        label={item.author}
                        color="primary"
                        variant="outlined"
                        onClick={() => {
                          navigate(`/home/?author=${item.userId}`);
                        }}
                      />
                    </Tooltip>
                    <span className="hidden sm:flex px-2 justify-center gap-2">
                      <Tooltip title={"לחץ כדי לדרג"}>
                        <span>{`דרג את המאמר :`}</span>
                      </Tooltip>

                      <MyRating item={item} />
                    </span>
                    <a href="#comments">
                    <span
                      className={`flex gap-1 ${
                        length ? "text-blue-400" : "text-gray-400"
                      }`}
                    >
                      {`${length}`}
                      <FaRegComments size={24} />
                    </span>
                    </a>
                    <Tooltip title="תאריך יצירה">
                      <Chip
                        label={formatDate(item.created_at)}
                        // color="primary"
                        variant="outlined"
                      ></Chip>
                    </Tooltip>
                  </span>
                </div>
              </div>
              <span className="flex p-4 px-10 items-center justify-between sm:hidden">
                <Tooltip title={"לחץ כדי לדרג"}>
                  <p>{`דרג את המאמר :`}</p>
                </Tooltip>
                <MyRating item={item} />
              </span>
            </div>

            <div className="z-10 sm:-ml-8 -mt-12 sm:p-2 lg:sticky lg:top-12 lg:col-start-2  lg:row-start-1 lg:overflow-hidden">
              <span
                className="hidden lg:col-start-2 lg:row-start-2  lg:block mr-10  lg:sticky mb-5 
                w-[48rem] rounded-xl shadow-xl sm:w-[26rem]
                "
              >
                <ParashaNav />
              </span>
              {item.subtopic && !imgError ? (
                <img
                  className="sm:mb-12 lg:mr-10 min-h-60
                w-[48rem]  rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[26rem]"
                  src={`https://www.breslev.org/wp-content/uploads/2019/07/${item.subtopic.replace(
                    " ",
                    "-"
                  )}.jpg`}
                  onError={() => setImgError(true)}
                  alt="תמונת הפרשה"
                />
              ) : (
                <div className="h-60 hidden sm:block"></div>
              )}
            </div>
            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
              <div className="lg:pr-4 -mt-30 lg:-mt-40 ">
                <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                  <ul role="list" className="mt-8 space-y-8 text-gray-600"></ul>
                  <div className="mt-8 lg:-mt-60">
                    {/* <div
                      style={{ wordWrap: "break-word" }}
                      className=" whitespace-normal tracking-widest"
                      dangerouslySetInnerHTML={{ __html: item.body }}
                    /> */}
                    <SanitizedHTML htmlContent={item.body} />
                  </div>
                </div>

                <div className="h3 bg-gray-200 py-2 my-2 font-semibold">
                  תגיות קשורות:
                  {item.tags !== null && (
                    <div className="flex justify-between py-4">
                      <TagList postTags={item.tags} />
                    </div>
                  )}
                </div>
                {/* כפתורי עריכה */}
                <div className="flex justify-between">
                  {adminMode && (
                    <span className="flex gap-2">
                      <ButtonClick
                        value="delete"
                        onClick={deletePost}
                        variant="contained"
                      >
                        🗑️ מחק
                      </ButtonClick>
                      <ButtonClick
                        variant="contained"
                        // onClick={() => navigate(`/edit/${item.id}`)}
                        onClick={() => setIsEditorOpen(true)}
                      >
                        ערוך מאמר
                      </ButtonClick>
                    </span>
                  )}

                  {/* {message && <p style={{ color: "red" }}>{message}</p>} */}
                  <button
                  id="comments"
                  
                    onClick={() => setIsCommentListOpen((prev) => !prev)}
                    className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    {isCommentListOpen ? "הסתר תגובות" : "הצג תגובות"}
                  </button>
                  <button
                    onClick={() => navigate(-1)}
                    className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    חזור אחורה
                  </button>
                </div>
                <span className={`${isCommentListOpen ? "" : "hidden"}`}>
                  <CommentList postId={item.id} setLength={setLength} />
                </span>

                {/* <div className="hidden sm:ml-6 sm:block" style={{ top: '60px', right: '0px' }}><ParashaNav /></div> */}
              </div>
            </div>
          </div>
        </div>
      )}

      <Dialog
        open={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
          <Button onClick={() => setIsEditorOpen(false)}>
            <ClearIcon />
          </Button>
        </Box>

        <Editor
          setShowEditor={setIsEditorOpen}
          send={send}
          setSend={setSend}
          initialPost={item}
        />
      </Dialog>
    </>
  );
}
