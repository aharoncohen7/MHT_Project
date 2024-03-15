import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Select from './Select'
import DataContext from '../../contexts';
import DataContext2 from '../../contexts/index2';
import { editPost2 } from "../../functions/postFunctions"
import { addNewPost2 } from "../../functions/postFunctions"
import { error } from 'pdf-lib'
import axios from 'axios'
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Cookies from "js-cookie";



export default function Editor({ send, setSend, setComplete, setShowEditor, initialPost }) {
    const { postId } = useParams()
    const {  logOut, userId, setMessage, message, navigate } = useContext(DataContext)
    const { originalData, setOriginalData } = useContext(DataContext2)
    const [selectedBook, setSelectedBook] = useState(initialPost && initialPost.topic ? initialPost.topic : undefined);
    const [selectedPortion, setSelectedPortion] = useState(initialPost && initialPost.subtopic ? initialPost.subtopic : undefined);
    const [title, setTitle] = useState(initialPost ? initialPost.title : '');
    const [body, setBody] = useState(initialPost ? initialPost.body : '');
    const [tags, setTags] = useState(initialPost && initialPost.tags ? initialPost.tags : [])
    const [isAddingTag, setIsAddingTag] = useState(false);


    // מצא פוסט בודד מתוך הרשימה
    useEffect(() => {
        async function findPost() {
            if (postId) {
                // console.log("Fetching data...");
                const postToEdit = originalData.find(post => post.id == postId);
                // console.log(postToEdit);
                if (postToEdit) {
                    setTitle(postToEdit.title)
                    setBody(postToEdit.body)
                    if (postToEdit.topic) {
                        setSelectedBook(postToEdit.topic)
                    }
                    if (postToEdit.subtopic) {
                        setSelectedPortion(postToEdit.subtopic)
                    }
                }
                else {
                    navigate(`/home`)
                }
            }
        }
        findPost();
    }, [postId, originalData]);


    // עיצוב סרגל עורך טקסט
    const module = {
        toolbar: [
            ['bold', 'italic', 'underline'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'color': [] }, { 'background': [] }],
        ]
    }

    // יצירת פוסט בפועל
    useEffect(() => {
        if (send) {
            importedEdit();
            setShowEditor(false)
        }
    }, [send]);

    // מטפל תוכן מאמר
    const handleContentChange = (newBody) => {
        setBody(newBody);
    };

    //  הוספת תגית
    const handleSaveTag = (value) => {
        if (value) {
            setTags([...tags, value]);
            setIsAddingTag(false);
        }
    };

    // מחיקת תגית
    const handleRemoveTag = (index) => {
        const newTags = [...tags];
        newTags.splice(index, 1);
        setTags(newTags);
    };

    // בדיקת אורך פוסט מינימלי
    function checkBody() {
        // פיצול ה- HTML לתוך מערך של מחרוזות על פי התגיות
        const textParts = body.split(/<[^>]+>/).filter(Boolean);
        // סכימת אורך כל המחרוזות בין התגיות
        const sum = textParts.reduce((acc, text) => acc + text.trim().length, 0);
        console.log(sum);
        // בדיקה האם הסכום גבוה מ־60 והחזרת תוצאה
        return sum > 60;
    }

    // בדיקת תקינות שדות הכרחיים
    function checkFields() {
        if (selectedBook && selectedPortion && title && title.length >= 20 && body && checkBody()) {
            return true;
        }
        return false;
    }

    // בודק אם ניתן לשלוח פוסט - משחרר כפתור שליחה
    useEffect(() => {
        setComplete(prev => {
            if (!prev && checkFields()) {
                console.log(body);
                return true;
            }
            if (prev && !(checkFields())) {
                return false;
            }
            // אם התנאים לא מתקיימים, חוזרים על הערך הקודם
            return prev;
        });
    }, [selectedBook, selectedPortion, title, body]);



    function importedEdit() {
        if(postId){
            editPost2(postId, selectedBook, selectedPortion, title, body, tags, setOriginalData,  setMessage, setSend, setShowEditor, logOut, navigate)
        }
        else{
            addNewPost2(userId, selectedBook, selectedPortion, title, body, tags, setOriginalData, setMessage, setSend, setShowEditor, logOut, navigate)
        }
                        
    }


    return (
        < >
            <Select selectedBook={selectedBook} setSelectedBook={setSelectedBook} selectedPortion={selectedPortion} setSelectedPortion={setSelectedPortion} />
            {selectedBook && selectedPortion &&
                <div >
                    <input className=' relative w-full inline-flex  justify-center gap-x-5.5 mt-10 px-3 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-600 hover:bg-gray-50 py-2 pl-3 pr-10 text-right bg-white rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50' type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='בחר כותרת למאמר באורך של 20 תווים ומעלה' />
                    {title && title.length > 19 &&
                        <ReactQuill theme="snow" onChange={handleContentChange} modules={module} value={body} />}

                    <div>
                        {checkBody() && isAddingTag ? (
                            <div>
                                <input
                                    type="text"
                                    name="newTag"
                                    placeholder="הזן תגית חדשה"
                                    autoFocus
                                    onBlur={(event) => handleSaveTag(event.target.value)}
                                />
                            </div>
                        ) : (
                            <div>
                                {tags.map((tag, index) => (
                                    <div style={{ display: "flex" }} key={index}>
                                        {tag}
                                        <button type="button" onClick={() => handleRemoveTag(index)}>
                                            הסר תגית -
                                        </button>
                                    </div>
                                ))}
                                {checkBody() && <button type="button" onClick={() => setIsAddingTag(true)}>
                                    + הוסף תגית
                                </button>}
                            </div>
                        )}
                    </div>
                </div>}
                {message && <p style={{ color: 'red' }}>{message}</p>}
        </>
    )
}


























// עריכה
// async function editPost() {
//     try {
//         const response = await fetch(`https://vortly-db.onrender.com/api/posts/${postId}`, {
//             method: 'PATCH',
//             body: JSON.stringify({
//                 selectedBook,
//                 selectedPortion,
//                 title,
//                 body,
//                 ...(tags.length > 0 && { tags }),
//             }),
//             headers: {
//                 'Content-type': 'application/json; charset=UTF-8',
//                
//                 'authorization': localStorage.getItem('Authorization') || ''
//             },
//         });
//         console.log(response);
//         if (response.status === 400 || response.status === 404) {
//             console.log("400/404");
//             const errorMessage = await response.text();
//             console.log('Post not updated' + errorMessage);
//             setMessage(['Post not updated ' + errorMessage, false]);
//             alert('Post not updated ' + errorMessage)
//             setSend(false)
//             setShowEditor(false)
//             if (response.status == 401) {
//                 logOut()
//             }
//             // navigate(`/post/${postId}`)
//             alert('Post not updated')
//             throw new Error(`Failed to update post! Status: ${response.status}`);

//         }
//         const newPost = await response.json();
//         console.log(newPost);
//         setOriginalData(prevOriginalData => [...prevOriginalData, newPost]);
//         setMessage(['Post updated successfully', true]);
//         alert('Post updated successfully')
//         setSend(false)
//         setShowEditor(false)
//         // navigate(`/post/${postId}`)
//         window.location.href = `https://vortly-db.onrender.com/post/${postId}`

//     }
//     catch (error) {
//         console.error(error.message);
//     }
// }




// // אם לא נמצא, בקשת הט מהשרת
// useEffect(() => {
//     if (originalData.length == 0) {
//         axios.get('https://vortly-db.onrender.com/api/posts/' + postId, {
//             headers: {
//                
//                 'authorization': localStorage.getItem('Authorization') || ''
//             }
//         })
//             .then(response => {
//                 console.log(response);
//                 if (response.data.length == 0) {
//                     navigate(`/notfound`)
//                 }
//                 // setOldPost(response.data);
//                 setSelectedBook(response.data.topic)
//                 setSelectedPortion(response.data.subtopic)
//                 setTitle(response.data.title)
//                 setBody(response.data.body)
//                 // setTags(response.data)
//             })
//             .catch(error => {

//                 console.error('Error fetching data:', error);
//                 navigate(`/notfound`)
//             });
//     }

// }, []);




//   async function handleSave() {
//     try {
//         const response = await fetch(`https://vortly-db.onrender.com/api/posts/${oldPost.id}`, {
//             method: 'PATCH',
//             body: JSON.stringify({
//                 title: result.value.title,
//                 body: result.value.body
//             }),
//             headers: {
//                 'Content-type': 'application/json; charset=UTF-8',
//                 'auth': localStorage.getItem('auth') || '',
//                 'authorization': localStorage.getItem('Authorization') || ''
//             },
//         })
//         if (!response.ok) {
//             setMessage(["Failed to edit post"' false])
//             throw new Error(`Failed to edit post! Status: ${response.status}`);
//         }



//     }
//     catch (error) {
//         console.error(error.message);
//     }
// }
