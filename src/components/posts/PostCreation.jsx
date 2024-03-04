import React, { useState, useEffect, useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Select from './Select'
import DataContext from '../../contexts';
import DataContext2 from '../../contexts/index2';
import { useNavigate } from 'react-router-dom';
import { error } from 'pdf-lib';
import Cookies from "js-cookie";


export default function PostCreation({ send, setComplete, setMessage, setShowEditor, setSend}) {
  const { logOut, userId, message} = useContext(DataContext)
  const { setOriginalData, setFilteredData} = useContext(DataContext2)
 
  console.log(userId, message);
  const navigate = useNavigate();
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedPortion, setSelectedPortion] = useState(null);
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
 

  // const schema = Yup.object().shape({
  //   fullName: Yup.string().required('שם מלא הוא שדה חובה'),
  //   email: Yup.string().email('כתובת דוא"ל לא תקינה').required('דוא"ל הוא שדה חובה'),
  //   phone: Yup.string().matches(/^[0-9]+$/, 'מספר הטלפון יכול לכלול רק מספרים').required('מספר טלפון הוא שדה חובה'),
  // });
  // const { register, handleSubmit, formState: { errors } } = useForm({
  //   resolver: yupResolver(schema)
  // });






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
        addNewPost();
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


  //פוסט חדש
  async function addNewPost() {
    try {
      const response = await fetch('http://localhost:4002/api/posts', {
        method: 'POST',
        body: JSON.stringify({
          selectedBook,
          selectedPortion,
          title,
          body,
          userId,
          ...(tags.length > 0 && { tags }),
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          // 'auth': localStorage.getItem('auth') || '',
          'authorization': localStorage.getItem('Authorization') || ''
        },
      });
      console.log(response);
      if (response.status === 400 || response.status === 404) {
        console.log("400/404");
        const errorMessage = await response.text();
        console.log('Post not created' + errorMessage);
        setMessage('Post not created ' + errorMessage);
        alert('Post not created ' + errorMessage)
        setSend(false)
        setShowEditor(false)
        if (response.status == 401) {
          logOut()
        }
        throw new Error(`Failed to create post! Status: ${response.status}`);
      }
      const newPost = await response.json();
      console.log(newPost);
      setOriginalData(prevOriginalData => [...prevOriginalData, newPost]);
      setFilteredData(prevOriginalData => [...prevOriginalData, newPost], () => {
      });
      setMessage('Post created successfully');
      setSend(false)
      setShowEditor(false)
      
    }
    catch (error) {
      console.error(error.message);
    }
  }




  return (
    < >
      <Select selectedBook={selectedBook} setSelectedBook={setSelectedBook} selectedPortion={selectedPortion} setSelectedPortion={setSelectedPortion} />
      {selectedBook && selectedPortion && 
      <div >
        <input className='overflow-wrap-normal whitespace-normal relative w-full inline-flex  justify-center gap-x-5.5 px-3 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-600 hover:bg-gray-50 py-2 pl-3 pr-10 text-right bg-white rounded-md shadow-sm cursor-pointer focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50' type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder='בחר כותרת למאמר באורך של 20 תווים ומעלה' maxlength="40"/>
        {title && title.length > 19 &&
          <ReactQuill  theme="snow" onChange={handleContentChange} modules={module} value={body} />}
        
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
                    -
                  </button>
                </div>
              ))}
              {checkBody() &&<button type="button" onClick={() => setIsAddingTag(true)}>
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



//  עיצוב סרגל מלא עורך טקסט
// const module2 = {
//   toolbar: [
//     ['bold', 'italic', 'underline' , 'strike'],
//     [{ 'header': 1 }, { 'header': 2 }],
//     [{ 'direction': 'rtl' }],
//     [{ 'size': ['small', false, 'large', 'huge'] }],
//     [{ 'header': [] }],
//     [{ 'color': [] }, { 'background': [] }],
//     [{ 'font': [] }],
//     [{ 'align': [] }],
//     ['clean']
//   ]
// }