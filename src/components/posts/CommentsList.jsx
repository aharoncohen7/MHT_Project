import React,{ useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { json } from 'react-router';
import Cookies from "js-cookie";


const CommentList = ({ postId, showComments, setMessage }) => {
  const urlComments = `s://vortly-db.onrender.com/api/comments/${postId}`;
  const [comments, setComments] = useState([]);


  function logOut(){
    localStorage.removeItem('Authorization');
    Cookies.remove('Authorization');
    window.location.href = "https://vortly.onrender.com/"
 }

  // הוספת חדש
  async function addNewComment() {
    try {
      const result = await Swal.fire({
        title: "כתוב תגובה",
        html: '<textarea id="body"  style=" background-color: rgba(172, 192, 389, 0.74); width: 350px; text-align: right; font-size: 26px;" class="swal2-input" placeholder="כתוב תגובה (עד 20 תווים)">',
        showCancelButton: true,
        confirmButtonText: 'אישור',
        cancelButtonText: 'ביטול',
        preConfirm: () => {
          const body = document.getElementById('body').value;
          if (!body) {
            Swal.showValidationMessage('אנא מלא את השדות');
          }
          return { body };
        }
      });
      if (result.value) {
        const { body } = result.value;
        const response = await fetch('https://vortly-db.onrender.com/api/comments', {
          method: 'POST',
          body: JSON.stringify({
            postId,
            body
          }),
          headers: {
            'Content-Type': 'application/json',
           
            // 'authorization': localStorage.getItem('Authorization') || ''
            'authorization': Cookies.get('Authorization') || ''
          },
        });
        if (!response.ok) {
          setMessage(["Failed to add comment", true])
          if(response.status==401){
            logOut()
        }
          throw new Error(`Failed to add comment! Status: ${response.status}`);

        }
        const [newComment] = await response.json();
        // console.log(newComment);
        setComments(prevOriginalData => [...prevOriginalData, newComment], () => {
          console.log("Created", comments);
        });
        setMessage(['Comment added successfully', true]);


      }
    }
    catch (error) {
      console.error(error.message);
    }
  }

  // מחיקה
  async function deleteComment(commentId, email) {
    const response = await fetch(`https://vortly-db.onrender.com/api/comments/${commentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
       
        // 'authorization': localStorage.getItem('Authorization') || ''
        'authorization': Cookies.get('Authorization') || ''
      },
    });
    if (!response.ok) {
      setMessage([`Failed to delete comment! Status: ${response.status}`, false]);
      return;
    }
    setComments(prevFilteredData => prevFilteredData.filter(obj => obj.id !== commentId));
    setMessage([`comment ${commentId} deleted`, true])
  }


  // קבלת תגובות לפוסט
  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // 'auth': localStorage.getItem('auth') || ''.getItem('auth') || '',
            // 'authorization': localStorage.getItem('Authorization') || ''
            'authorization': Cookies.get('Authorization') || ''
          },
        };
        const response = await fetch(urlComments, requestOptions);
        const data = await response.json();
        setComments(data)
      } catch (error) {
        setMessage(["Error fetching comments!", false])
        console.error("Error fetching comments:", error);
      }
    };
    fetchData();
  }, [postId]);




  return (
    <ul style={showComments ? { display: "block" } : { display: "none" }}>
      <button onClick={addNewComment}> כתוב תגובה</button>
      {/* <button onClick={loadComments}> טען תגובות לפוסט</button> */}

      {comments
        // .slice(0, counter)
        .map((comment) => (

          <div style={style.comments}>
            <h5>{comment.id}</h5>
            <span> {comment.body}</span>
            <h6>name: {comment.name}</h6>
            <h6>email: {comment.email}</h6>
            <button onClick={() => deleteComment(comment.id, comment.email)}> מחק תגובה</button>
          </div>
        ))}


    </ul>

  );
};

export default CommentList;