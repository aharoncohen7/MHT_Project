import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import UserContext from "../../contexts";
import { axiosReq } from "../../helpers/useAxiosReq";
import { Button } from "../buttons/Button";
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;

const CommentList = ({ postId, setLength }) => {
  const [comments, setComments] = useState([]);
  const { setMessage, userId } = useContext(UserContext);

  async function addNewComment() {
    if (!userId) return;
    try {
      const result = await Swal.fire({
        title: "הגב למאמר",
        html: '<textarea id="body"  style=" background-color: rgba(172, 192, 389, 0.14); width: 450px; height: 120px; box-shadow: 1px 1px 15px 2px #fff;  text-align: right; font-size: 18px;" class="swal2-input" placeholder=" תוכן תגובה (עד 50 תווים)">',
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
        const response = await axiosReq({
          method: "POST",
          body: {
            postId,
            body,
          },
          url: `/comments`,
        });
        if (!response) {
          throw new Error(`Failed to add comment: ${response}`);
        }
        const [newComment] = response;
        console.log(newComment);
        setComments((prevOriginalData) => [...prevOriginalData, newComment]);
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  async function deleteComment(commentId) {
    try {
      const response = await axiosReq({
        method: "DELETE",
        url: `/comments/${commentId}`,
      });
      console.log(response);
      if (response) {
        setComments((prevFilteredData) =>
          prevFilteredData.filter((obj) => obj.id !== commentId)
        );
      }
    } catch (error) {
      console.error(error.message);
      setMessage([
        `שגיאה בעת מחיקת תגובה, בדוק את החיבור או נסה מאוחד יותר`,
        false,
      ]);
    }
  }

  // קבלת תגובות לפוסט
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await axiosReq({
          method: "GET",
          body: {},
          url: `/public-comments/${postId}`,
        });
        console.log("🚀 ~ fetchData ~ data:", data);
        setComments(data);
        setLength(data.length);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <ul className={`mt-4 space-y-4 block`}>
      {!comments.length && (
        <p className="text-center text-gray-500">עדיין אין תגובות</p>
      )}
      {userId && (
        <button
          onClick={addNewComment}
          className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          הוסף תגובה
        </button>
      )}

      {comments.length
        ? comments.map((comment) => (
            <li key={comment.id} className="bg-white shadow-md rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  {/* <p className="text-gray-600 text-sm">#{comment.id}</p> */}
                  <p
                    className="text-lg max-w-80 font-medium whitespace-break-spaces"
                    style={{
                      wordWrap: "break-word",
                      wordwrap: "break-word",
                      overflowWrap: "break-word",
                      whiteSpace: "normal",
                    }}
                  >
                    {comment.body}
                  </p>
                  <p className="text-sm text-gray-500">שם: {comment.name}</p>
                  <span className="flex gap-2 text-sm text-gray-500 items-left">
                    <p>אימייל:</p>
                    <p>{`${comment.email.substring(3, comment.email.length)}****`}</p>
                  </span>
                </div>
                <Button
                  onClick={() => deleteComment(comment.id)}
                  className="text-white font-bold py-1 px-2 rounded text-sm"
                  disabled={comment.userId !== userId}
                >
                  מחיקה
                </Button>
              </div>
            </li>
          ))
        : null}
    </ul>
  );
};

export default CommentList;
