import React, { useContext, useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useParams } from "react-router-dom";
import UserContext from "../../contexts";
import DataContext from "../../contexts/dataContext";
import { importedAddNew, importedEdit } from "../../helpers/postFunctions";
import Select from "./Select";
import { ButtonClick } from "../buttons/ButtonClick";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Send";

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
  setShowEditor,
  initialPost,
}) {
  const { postId } = useParams();
  const { logOut, userId, setMessage, message, navigate } =
    useContext(UserContext);
  const { originalData, setOriginalData } = useContext(DataContext);
  const [selectedBook, setSelectedBook] = useState(initialPost?.topic || "");
  const [selectedPortion, setSelectedPortion] = useState(
    initialPost?.subtopic || ""
  );
  const [title, setTitle] = useState(initialPost?.title || "");
  const [body, setBody] = useState(initialPost?.body || "");
  const [tags, setTags] = useState([]);
// 
  const [isAddingTag, setIsAddingTag] = useState(false);
  const quillRef = useRef(null);

  // useEffect(() => {
  //   async function findPost() {
  //     if (postId) {
  //       console.log("Fetching data...");
  //       const postToEdit = originalData.find((post) => post.id == postId);
  //       if (postToEdit) {
  //         console.log(postToEdit)
  //         setTitle(postToEdit.title);
  //         setBody(postToEdit.body);
  //         setSelectedBook(postToEdit.topic || "");
  //         setSelectedPortion(postToEdit.subtopic || "");
  //       }
  //     }
  //   }
  //   findPost();
  // }, []);

  useEffect(() => {
    if (send) {
      sendPost();
      setTimeout(() =>{

        setShowEditor(false);
      },3000)
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
    <div className="max-w-4xl p-2 bg-white shadow-lg rounded-lg">
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
          // disabled={!selectedBook || !selectedPortion}
        />
        <div className="mt-4">
          <ReactQuill
            ref={quillRef}
            theme="snow"
            onChange={handleContentChange}
            modules={module}
            value={body}
            className="h-64 mb-16 w-full"
          />
        </div>

        <span className="">
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-200 rounded-full px-3 py-1"
              >
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

          <span className="flex justify-between gap-2">
            {checkBody() && isAddingTag ? (
              <div className="flex gap-1">
                <input
                  type="text"
                  name="newTag"
                  placeholder="הזן תגית חדשה"
                  autoFocus
                  onBlur={(event) => handleSaveTag(event.target.value)}
                  className="flex px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={() => setIsAddingTag(false)}
                  className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                >
                  שמור
                </button>
              </div>
            ) : (
              <span className="">
                {checkBody() && (
                  <button
                    // type="button"
                    onClick={() => setIsAddingTag(true)}
                    className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
                  >
                    + הוסף תגית
                  </button>
                )}
              </span>
            )}
            <span className="flex justify-between items-center gap-1">
              <ButtonClick onClick={() => setShowEditor(false)}>
                ביטול
                <DeleteIcon />
              </ButtonClick>
              <ButtonClick
                className="ml-4"
                disabled={!checkFields()}
                onClick={() => setSend(true)}
              >
                שלח
                <SendIcon />
              </ButtonClick>
            </span>
          </span>
        </span>
      </div>

      {message && <p className="mt-4 text-red-500">{message}</p>}
    </div>
  );
}


