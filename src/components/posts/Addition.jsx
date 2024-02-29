import React, { useState, useContext, useEffect } from 'react'
import PostCreation from './PostCreation';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';
import DataContext from '../../contexts';
import Message from '../Message'


export default function Addition() {
  const { userId, navigate } = useContext(DataContext)
  const [showEditor, setShowEditor] = useState(false);
  const [complete, setComplete] = useState(false)
  const [send, setSend] = useState(false)
  const [message, setMessage] = useState(null);

  // איפוס הודעות מערכת
  useEffect(() => {
    if (message !== "") {
      setTimeout(() => {
        setMessage(null);
      }, 8000);
    }
  }, [message]);


  return (

    <>
      <div className=" max-w-md p-6 mx-auto bg-white rounded-lg shadow-md ">
        {!showEditor &&
          <>
            <h2 className="mb-6 text-2xl font-bold text-center text-gray-900">הוראות לפני יצירת מאמר חדש</h2>
            <p className="text-right">
              <strong>כותרת:</strong><br />
              הכותרת צריכה להיות בת 20 תווים לפחות.
              הכותרת צריכה להיות תמציתית ואינפורמטיבית, מתארת את נושא המאמר בצורה ברורה.
            </p>
            <p className="mt-4 text-right">
              <strong>תוכן המאמר:</strong><br />
              המאמר צריך להיות בן 140 תווים לפחות.
              תוכן המאמר צריך להיות מנוסח בצורה ברורה, מתאר את הנושא בצורה מובנית ונכונה.
              המאמר צריך להציג את היתרונות והאתגרים הנוגעים לנושא באופן מאוד ברור ומובנה.
            </p>
            <p className="mt-4 text-right">
              <strong>תגיות:</strong><br />
              ניתן להוסיף תגיות למאמר.
              כל תגית צריכה להיות קשורה לנושא המאמר.
              כל תגית צריכה להגדיר את נושא המאמר במילה אחת עד 2.
            </p>
            <p className="mt-4 text-right">
              בתום הכתיבה, כדאי לבדוק שהכותרת והתוכן עומדים בדרישות המצוינות ושהתגיות רלוונטיות לנושא המאמר.
            </p>

            <div className="flex justify-center mt-8">
              <button className="px-10 py-2 font-bold text-white bg-blue-500 border rounded hover:bg-blue-700" onClick={() => setShowEditor(true)}>
                <svg className="w-20 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                צור מאמר חדש
              </button>
            </div>
          </>}

        {showEditor &&
          <>
            <div style={{ position: "fixed", top: "100px" }}>
              <PostCreation setShowEditor={setShowEditor} setMessage={setMessage} send={send} setComplete={setComplete} setSend={setSend}/>
            </div>
            <div style={{ position: "absolute", left: "200px", bottom: "10px", display: "flex", gap: "1rem" }}>
              <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => setShowEditor(false)}>סגור</Button>
              <Button disabled={!complete} variant="contained" endIcon={<SendIcon />} onClick={() => { setSend(true) }}  >שלח</Button>
            </div>
          </>
        }
      </div>

      {message && <Message message={message} />}
    </>

  )
}





{/* {!showEditor && <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-900">הוראות לפני יצירת מאמר חדש</h2>
        <p className="text-right">
          <strong>כותרת:</strong><br />
          הכותרת צריכה להיות בת 20 תווים לפחות.
          הכותרת צריכה להיות תמציתית ואינפורמטיבית, מתארת את נושא המאמר בצורה ברורה.
        </p>
        <p className="mt-4 text-right">
          <strong>תוכן המאמר:</strong><br />
          המאמר צריך להיות בן 140 תווים לפחות.
          תוכן המאמר צריך להיות מנוסח בצורה ברורה, מתאר את הנושא בצורה מובנית ונכונה.
          המאמר צריך להציג את היתרונות והאתגרים הנוגעים לנושא באופן מאוד ברור ומובנה.
        </p>
        <p className="mt-4 text-right">
          <strong>תגיות:</strong><br />
          ניתן להוסיף תגיות למאמר.
          כל תגית צריכה להיות קשורה לנושא המאמר.
          כל תגית צריכה להגדיר את נושא המאמר במילה אחת עד 2.
        </p>
        <p className="mt-4 text-right">
          בתום הכתיבה, כדאי לבדוק שהכותרת והתוכן עומדים בדרישות המצוינות ושהתגיות רלוונטיות לנושא המאמר.
        </p>

        
      // <div className="flex justify-center">
      //   {!showEditor && (
      //     <button className="px-10 py-2 font-bold text-white bg-blue-500 border rounded hover:bg-blue-700" onClick={() => setShowEditor(true)}>
      //       <svg className="w-20 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      //         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      //       </svg>
      //       צור מאמר חדש
      //     </button>
      //   )}
      // </div> */}

{/* <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => { setShowEditor(true) }}>צור מאמר חדש</Button> */ }
{/* </div>} */ }
{/* 
      {showEditor && <PostCreation setShowEditor={setShowEditor} setMessage={setMessage} />}
      {message && <Message message={message} />} */}


{/* <div style={{ position: "absolute", bottom: "10px", display: "flex", gap: "1rem" }}> */ }
{/* <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => setShowEditor(false)}>Close</Button> */ }
{/* <Button variant="contained" endIcon={<SendIcon />} onClick={() => setSend(true)}  >Send</Button> */ }
{/* </div> */ }