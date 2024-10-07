// // 


// import React, { useContext, useEffect, useRef, useState } from "react";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { useParams } from "react-router-dom";
// import UserContext from "../../contexts";
// import DataContext from "../../contexts/dataContext";
// import { importedAddNew, importedEdit } from "../../functions/postFunctions";
// import Select from "./Select";

// // עיצוב סרגל עורך טקסט
// const module = {
//   toolbar: [
//     ["bold", "italic", "underline"],
//     [{ header: 1 }, { header: 2 }],
//     [{ color: [] }, { background: [] }],
//   ],
// };

// export default function Editor({
//   send,
//   setSend,
//   setComplete,
//   setShowEditor,
//   initialPost,
// }) {
//   const { postId } = useParams();
//   const { logOut, userId, setMessage, message, navigate } =
//     useContext(UserContext);
//   const { originalData, setOriginalData } = useContext(DataContext);
//   const [selectedBook, setSelectedBook] = useState(
//     initialPost && initialPost.topic ? initialPost.topic : ""
//   );
//   const [selectedPortion, setSelectedPortion] = useState(
//     initialPost && initialPost.subtopic ? initialPost.subtopic : ""
//   );
//   const [title, setTitle] = useState(initialPost ? initialPost.title : "");
//   const [body, setBody] = useState(initialPost ? initialPost.body : "");
//   const [tags, setTags] = useState(
//     initialPost && initialPost.tags ? initialPost.tags : []
//   );
//   const [isAddingTag, setIsAddingTag] = useState(false);
//   const quillRef = useRef(null);

//   // מצא פוסט בודד מתוך הרשימה
//   useEffect(() => {
//     async function findPost() {
//       if (postId) {
//         console.log("Fetching data...");
//         const postToEdit = originalData.find((post) => post.id == postId);
//         // console.log(postToEdit);
//         if (postToEdit) {
//           setTitle(postToEdit.title);
//           setBody(postToEdit.body);
//           if (postToEdit.topic) {
//             setSelectedBook(postToEdit.topic);
//           }
//           if (postToEdit.subtopic) {
//             setSelectedPortion(postToEdit.subtopic);
//           }
//         } else {
//           navigate(`/`);
//         }
//       }
//     }
//     findPost();
//   }, [postId, originalData]);

//   // יצירת פוסט בפועל
//   useEffect(() => {
//     if (send) {
   
//       sendPost();
//       setShowEditor(false);
//       // if (quillRef.current) {
//       //     quillRef.current.setValue('');
//       //   }
//     }
//   }, [send]);

//   // מטפל תוכן מאמר
//   const handleContentChange = (newBody) => {
//     // console.log(newBody);
//     setBody(newBody);
//   };

//   //  הוספת תגית
//   const handleSaveTag = (value) => {
//     if (value) {
//       setTags([...tags, value]);
//       setIsAddingTag(false);
//     }
//   };

//   // מחיקת תגית
//   const handleRemoveTag = (index) => {
//     const newTags = [...tags];
//     newTags.splice(index, 1);
//     setTags(newTags);
//   };

//   // בדיקת אורך פוסט מינימלי
//   function checkBody() {
//     // פיצול ה- HTML לתוך מערך של מחרוזות על פי התגיות
//     const textParts = body.split(/<[^>]+>/).filter(Boolean);
//     // סכימת אורך כל המחרוזות בין התגיות
//     const sum = textParts.reduce((acc, text) => acc + text.trim().length, 0);
//     // console.log(sum);
//     // בדיקה האם הסכום גבוה מ־60 והחזרת תוצאה
//     return sum > 60;
//   }

//   // בדיקת תקינות שדות הכרחיים
//   function checkFields() {
//     if (
//       selectedBook &&
//       selectedPortion &&
//       title &&
//       title.length >= 20 &&
//       body &&
//       checkBody()
//     ) {
//       return true;
//     }
//     return false;
//   }

//   // בודק אם ניתן לשלוח פוסט - משחרר כפתור שליחה
//   useEffect(() => {
//     setComplete((prev) => {
//       if (!prev && checkFields()) {
//         // console.log(body);
//         return true;
//       }
//       if (prev && !checkFields()) {
//         return false;
//       }
//       // אם התנאים לא מתקיימים, חוזרים על הערך הקודם
//       return prev;
//     });
//   }, [selectedBook, selectedPortion, title, body]);

//   function sendPost() {
//     if (postId) {
//       importedEdit(
//         postId,
//         selectedBook,
//         selectedPortion,
//         title,
//         body,
//         tags,
//         setOriginalData,
//         setMessage,
//         setSend,
//         setShowEditor,
//         logOut,
//         navigate
//       );
//     } else {
//       importedAddNew(
//         userId,
//         selectedBook,
//         selectedPortion,
//         title,
//         body,
//         tags,
//         setOriginalData,
//         setMessage,
//         setSend,
//         setShowEditor,
//         logOut,
//         navigate
//       );
//     }
//   }

//   return (
//     <>
//       <Select
//         selectedBook={selectedBook}
//         setSelectedBook={setSelectedBook}
//         selectedPortion={selectedPortion}
//         setSelectedPortion={setSelectedPortion}
//       />
//       {selectedBook && selectedPortion && (
//         <div>
//           <input
//             className="bg-blue relative w-full inline-flex  justify-center gap-x-5.5 mt-10 px-3 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-600 hover:bg-gray-50 py-2 pl-3 pr-10 text-right bg-blue rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50"
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="בחר כותרת למאמר באורך של 20 תווים ומעלה"
//           />
//           {title && title.length > 19 && (
//             <ReactQuill
//               ref={quillRef}
//               theme="snow"
//               onChange={handleContentChange}
//               modules={module}
//               value={body}
//             />
//           )}

//           <div>
//             {checkBody() && isAddingTag ? (
//               <div>
//                 <input
//                   type="text"
//                   name="newTag"
//                   placeholder="הזן תגית חדשה"
//                   autoFocus
//                   onBlur={(event) => handleSaveTag(event.target.value)}
//                 />
//               </div>
//             ) : (
//               <div>
//                 {tags.map((tag, index) => (
//                   <div style={{ display: "flex" }} key={index}>
//                     {tag}
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveTag(index)}
//                     >
//                       הסר תגית -
//                     </button>
//                   </div>
//                 ))}
//                 {checkBody() && (
//                   <button type="button" onClick={() => setIsAddingTag(true)}>
//                     + הוסף תגית
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//       {message && <p style={{ color: "red" }}>{message}</p>}
//     </>
//   );
// }

import React, { useContext, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import UserContext from "../../contexts";
import DataContext from "../../contexts/dataContext";
import { importedAddNew, importedEdit } from "../../functions/postFunctions";
import Select from "./Select";

const module = {
  toolbar: [
    ["bold", "italic", "underline"],
    [{ header: 1 }, { header: 2 }],
    [{ color: [] }, { background: [] }],
  ],
};

export default function Editor({
  send,
  setSend,
  setComplete,
  setShowEditor,
  initialPost,
}) {
  const { postId } = useParams();
  const { logOut, userId, setMessage, message, navigate } = useContext(UserContext);
  const { originalData, setOriginalData } = useContext(DataContext);
  const [selectedBook, setSelectedBook] = useState(initialPost?.topic || "");
  const [selectedPortion, setSelectedPortion] = useState(initialPost?.subtopic || "");
  const [title, setTitle] = useState(initialPost?.title || "");
  const [body, setBody] = useState(initialPost?.body || "");
  const [tags, setTags] = useState(initialPost?.tags || []);
  const [isAddingTag, setIsAddingTag] = useState(false);
  const quillRef = useRef(null);

  useEffect(() => {
    async function findPost() {
      if (postId) {
        console.log("Fetching data...");
        const postToEdit = originalData.find((post) => post.id == postId);
        if (postToEdit) {
          setTitle(postToEdit.title);
          setBody(postToEdit.body);
          setSelectedBook(postToEdit.topic || "");
          setSelectedPortion(postToEdit.subtopic || "");
        } else {
          navigate(`/`);
        }
      }
    }
    findPost();
  }, [postId, originalData]);

  useEffect(() => {
    if (send) {
      sendPost();
      setShowEditor(false);
    }
  }, [send]);

  const handleContentChange = (newBody) => {
    setBody(newBody);
  };

  const handleSaveTag = (value) => {
    if (value) {
      setTags([...tags, value]);
      setIsAddingTag(false);
    }
  };

  const handleRemoveTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  function checkBody() {
    const textParts = body.split(/<[^>]+>/).filter(Boolean);
    const sum = textParts.reduce((acc, text) => acc + text.trim().length, 0);
    return sum > 60;
  }

  function checkFields() {
    return (
      selectedBook &&
      selectedPortion &&
      title &&
      title.length >= 10 &&
      body &&
      checkBody()
    );
  }

  useEffect(() => {
    setComplete((prev) => {
      if (!prev && checkFields()) {
        return true;
      }
      if (prev && !checkFields()) {
        return false;
      }
      return prev;
    });
  }, [selectedBook, selectedPortion, title, body]);

  function sendPost() {
    if (postId) {
      importedEdit(
        postId,
        selectedBook,
        selectedPortion,
        title,
        body,
        tags,
        setOriginalData,
        setMessage,
        setSend,
        setShowEditor,
        logOut,
        navigate
      );
    } else {
      importedAddNew(
        userId,
        selectedBook,
        selectedPortion,
        title,
        body,
        tags,
        setOriginalData,
        setMessage,
        setSend,
        setShowEditor,
        logOut,
        navigate
      );
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <Select
        selectedBook={selectedBook}
        setSelectedBook={setSelectedBook}
        selectedPortion={selectedPortion}
        setSelectedPortion={setSelectedPortion}
      />
      {/* {selectedBook && selectedPortion && ( */}
        <div className="mt-6 space-y-4">
          <input
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="בחר כותרת למאמר באורך של 10 תווים ומעלה"
            disabled={!selectedBook || !selectedPortion}
          />
            <div className="mt-4">
              <ReactQuill
                ref={quillRef}
                theme="snow"
                onChange={handleContentChange}
                modules={module}
                value={body}
                className="h-64 mb-12"
              />
            </div>


          <div className="mt-6">
            {checkBody() && isAddingTag ? (
              <div className="flex">
                <input
                  type="text"
                  name="newTag"
                  placeholder="הזן תגית חדשה"
                  autoFocus
                  onBlur={(event) => handleSaveTag(event.target.value)}
                  className="flex-grow px-3 py-2 text-gray-700 border rounded-l-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={() => setIsAddingTag(false)}
                  className="px-4 py-2 text-white bg-blue-500 rounded-r-lg hover:bg-blue-600 focus:outline-none"
                >
                  שמור
                </button>
              </div>
            ) : (
              <div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag, index) => (
                    <div key={index} className="flex items-center bg-gray-200 rounded-full px-3 py-1">
                      <span className="text-sm font-medium text-gray-700">{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(index)}
                        className="ml-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
                {checkBody() && (
                  <button
                    type="button"
                    onClick={() => setIsAddingTag(true)}
                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                  >
                    + הוסף תגית
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      {/* )} */}
      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
}