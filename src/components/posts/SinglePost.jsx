import { Button, Chip, Tooltip } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../../contexts";
import DataContext from "../../contexts/dataContext";
import { importedDelete } from "../../functions/postFunctions";
import ParashaNav from "../layout/ParashaNav";
import MyRating from "../MyRating";
import TagList from "./TagList";
import { ButtonClick } from "../about/ButtonClick";

// פוסט בודד בעמוד נפרד - חדש
export default function SinglePost() {
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const { postId } = useParams();
  const { setMessage, message, logOut, adminMode } = useContext(UserContext);
  const { setOriginalData, originalData } = useContext(DataContext);

  // מצא פוסט בודד מתוך הרשימה
  useEffect(() => {
    async function fetchData() {
      const result = originalData.find((post) => post.id == postId);
      if (result) {
        setItem(result);
        console.log(result);
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
          <div className="grid max-w-2xl grid-cols-1 mx-auto text-right gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-y-10">
            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
              <div className="lg:pr-8 mt-20 lg:-mt-40">
                <div className="lg:max-w-lg mr-6 ">
                 <Tooltip label="תגית נושא" title="תגית נושא">
                 <Chip label={item.subtopic ? item.subtopic : "שם הפרשה"} color="primary" variant="outlined"   onClick={() => {
                      if (item.subtopic)
                        navigate(`/home/?parasha=${item.subtopic}`);
                    }}/>

                 </Tooltip>
                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    {item.title}
                  </h2>
                  <Tooltip  title="מחבר">

                  <Chip label={item.author } color="primary" variant="outlined" 
                    onClick={() => {
                      navigate(`/home/?author=${item.userId}`);
                    }}
                    />
                 </Tooltip>

                </div>
              </div>
            </div>
            <div className="z-10 -ml-8 -mt-12 p-12 lg:sticky lg:top-12 lg:col-start-2  lg:row-start-1 lg:overflow-hidden">
              {item.subtopic && (
                <img
                  className="mb-12 lg:mr-10
                w-[48rem]  rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[26rem]"
                  src={`https://www.breslev.org/wp-content/uploads/2019/07/${item.subtopic.replace(
                    " ",
                    "-"
                  )}.jpg`}
                  alt="תמונת הפרשה"
                />
              )}
              <span
                className="hidden lg:col-start-2 lg:row-start-2  lg:block mr-10  lg:sticky mb-5 
                w-[48rem] rounded-xl shadow-xl sm:w-[26rem]
                "
              >
                <ParashaNav />
              </span>
            </div>
            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
              <div className="lg:pr-4 lg:-mt-60">
                <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                  <ul role="list" className="mt-8 space-y-8 text-gray-600">
                  </ul>
                  <div className="mt-8">
                    <div
                      style={{ wordWrap: "break-word" }}
                      className=" whitespace-normal tracking-widest"
                      dangerouslySetInnerHTML={{ __html: item.body }}
                    />
                  </div>
                </div>
              

                <div className="flex justify-between pt-8 pb-8">
                  {item.tags !== null && <TagList postTags={item.tags} />}
                  <MyRating item={item} />
                </div>

                {/* כפתורי עריכה */}
                <div className="EditButtons">
                  <ButtonClick  onClick={() => navigate(-1)}>
                    חזור
                  </ButtonClick>
                  {message && <p style={{ color: "red" }}>{message}</p>}
                  {adminMode && (
                    <>
                      <Button
                        value="delete"
                        onClick={deletePost}
                        variant="contained"
                      >
                        🗑️
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => navigate(`/edit/${item.id}`)}
                      >
                        ערוך מאמר
                      </Button>
                    </>
                  )}
                </div>

                {/* <div className="hidden sm:ml-6 sm:block" style={{ top: '60px', right: '0px' }}><ParashaNav /></div> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// function processString(string) {
//   const words = string.split(" ");
//   if (words.length >= 2) {
//     if (words.length >= 3) {
//       words[1] = words[2].replace(" ", "-");
//     } else {
//       words[0] = words[1];
//     }
//     return words.slice(1).join(" ");
//   }
//   return string;
// }

// useEffect(() => { console.log(originalData, userId) }
//   ,[postId, originalData])

// // מחיקה
// async function deletePost() {

//   try {
//     let response = await fetch(`${SERVER_HOST}/posts/${item.id}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//
//         'authorization': localStorage.getItem('Authorization') || ''
//       },
//     });
//     if (!response.ok) {
//       console.log("problem deleting post");
//       throw new Error(`Failed to delete post! Status: ${response.status}`);
//     }
//     // alert(`Post ${item.id} deleted`)
//     setOriginalData(prevOriginalData => prevOriginalData.filter(obj => obj.id !== item.id));
//     setMessage([`Post ${item.id} deleted`, true])
//     alert(`Post ${item.id} deleted`)
//     navigate(`/`)
//   }
//   catch (error) {
//     alert(`Post ${item.id} not deleted`)
//     console.error(error.message);

//   }
// }
