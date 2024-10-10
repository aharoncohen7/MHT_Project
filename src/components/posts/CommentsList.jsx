import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import UserContext from "../../contexts";
import { Button } from "../buttons/Button";
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;

const CommentList = ({ postId, userEmail, showComments }) => {
  const urlComments = `${SERVER_HOST}/comments/${postId}`;
  const [comments, setComments] = useState([]);
  const {setMessage} = useContext(UserContext)

  function logOut() {
    localStorage.removeItem("Authorization");
    Cookies.remove("Authorization");
    // window.location.href = "https://vortly.onrender.com/";
  }

  // הוספת חדש
  async function addNewComment() {
    try {
      const result = await Swal.fire({
        title: "כתוב תגובה",
        html: '<textarea id="body"  style=" background-color: rgba(172, 192, 389, 0.74); width: 350px; text-align: right; font-size: 26px;" class="swal2-input" placeholder="כתוב תגובה (עד 20 תווים)">',
        showCancelButton: true,
        confirmButtonText: "אישור",
        cancelButtonText: "ביטול",
        preConfirm: () => {
          const body = document.getElementById("body").value;
          if (!body) {
            Swal.showValidationMessage("אנא מלא את השדות");
          }
          return { body };
        },
      });
      if (result.value) {
        const { body } = result.value;
        const response = await fetch(
          `${SERVER_HOST}/comments`,
          {
            method: "POST",
            body: JSON.stringify({
              postId,
              body,
            }),
            headers: {
              "Content-Type": "application/json",
              authorization: Cookies.get("Authorization") || "",
            },
          }
        );
        if (!response.ok) {
          console.log(response);
          setMessage(["Failed to add comment", false]);
          if (response.status == 401) {
            logOut();
          }
          throw new Error(`Failed to add comment! Status: ${response.status}`);
        }
        const [newComment] = await response.json();
        // console.log(newComment);
        setComments(
          (prevOriginalData) => [...prevOriginalData, newComment],
          () => {
            console.log("Created", comments);
          }
        );
        // setMessage(["Comment added successfully", true]);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  // מחיקה
  async function deleteComment(commentId) {
    const response = await fetch(
      `${SERVER_HOST}/comments/${commentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: Cookies.get("Authorization") || "",
        },
      }
    );
    if (!response.ok) {
      setMessage([
        `Failed to delete comment! Status: ${response.status}`,
        false,
      ]);
      return;
    }
    setComments((prevFilteredData) =>
      prevFilteredData.filter((obj) => obj.id !== commentId)
    );
    setMessage([`comment ${commentId} deleted`, true]);
  }

  // קבלת תגובות לפוסט
  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            // 'auth': localStorage.getItem('auth') || ''.getItem('auth') || '',
            
            authorization: Cookies.get("Authorization") || "",
          },
        };
        const response = await fetch(urlComments, requestOptions);
        const data = await response.json();
        setComments(data);
      } catch (error) {
        setMessage(["Error fetching comments!", false]);
        console.error("Error fetching comments:", error);
      }
    };
    fetchData();
  }, [postId]);

  return (
    <ul className={`mt-4 space-y-4 ${showComments ? 'block' : 'hidden'}`}>
      <button 
        onClick={addNewComment}
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        הוסף תגובה
      </button>

      {comments.map((comment) => (
        <li key={comment.id} className="bg-white shadow-md rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              {/* <p className="text-gray-600 text-sm">#{comment.id}</p> */}
              <p className="text-lg font-medium">{comment.body}</p>
              <p className="text-sm text-gray-500">שם: {comment.name}</p>
              <p className="text-sm text-gray-500">אימייל: {comment.email}</p>
            </div>
            <Button 
              onClick={() => deleteComment(comment.id)}
              className="text-white font-bold py-1 px-2 rounded text-sm"
              disabled={comment.email !== userEmail}
            >
              מחיקה
            </Button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CommentList;
