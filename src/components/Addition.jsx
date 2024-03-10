import React, { useState, useContext } from 'react'
import Editor from './posts/Editor';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import DataContext from '../contexts';
import { FiFeather } from 'react-icons/fi';


export default function Addition() {
  const { navigate, setMessage } = useContext(DataContext)
  const [showEditor, setShowEditor] = useState(false);
  const [complete, setComplete] = useState(false)
  const [send, setSend] = useState(false)


  return (
    <>
      <div className=" max-w-md p-6 mx-auto bg-white rounded-lg shadow-md ">
        {!showEditor &&
          <>
            <h2 className="mb-6 text-2xl font-bold text-center text-gray-900">הוראות לפני יצירת מאמר חדש</h2>
            <p className="text-right">
              <strong>:כותרת</strong><br />
              הכותרת צריכה להיות בת 20 תווים לפחות.
              הכותרת צריכה להיות תמציתית ואינפורמטיבית, מתארת את נושא המאמר בצורה ברורה.
            </p>
            <p className="mt-4 text-right">
              <strong>:תוכן המאמר</strong><br />
              המאמר צריך להיות בן 140 תווים לפחות.
              תוכן המאמר צריך להיות מנוסח בצורה ברורה, מתאר את הנושא בצורה מובנית ונכונה.
              המאמר צריך להציג את היתרונות והאתגרים הנוגעים לנושא באופן מאוד ברור ומובנה.
            </p>
            <p className="mt-4 text-right">
              <strong>:תגיות</strong><br />
              ניתן להוסיף תגיות למאמר.
              כל תגית צריכה להיות קשורה לנושא המאמר.
              כל תגית צריכה להגדיר את נושא המאמר במילה אחת עד 2.
            </p>
            <p className="mt-4 text-right">
              בתום הכתיבה, כדאי לבדוק שהכותרת והתוכן עומדים בדרישות המצוינות ושהתגיות רלוונטיות לנושא המאמר.
            </p>

            <div className="flex justify-center mt-8">
              <button className="px-10 py-2 font-bold text-white bg-blue-500 border rounded hover:bg-blue-700" onClick={() => navigate("/home")}>
                סיום
              </button>
              <button className="px-10 py-2 font-bold text-white bg-blue-500 border rounded hover:bg-blue-700" onClick={() => setShowEditor(true)}>
                <svg className="w-20 h-6 mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
                <FiFeather size={"20px"} />
                </svg>
                צור מאמר חדש
              </button>
            </div>
          </>}

        {showEditor &&
          <>
            <div style={{ position: "fixed", top: "100px" }}>
              <Editor setShowEditor={setShowEditor} send={send} setComplete={setComplete} setSend={setSend}/>
            </div>
            <div style={{ position: "absolute", left: "200px", bottom: "10px", display: "flex", gap: "1rem" }}>
              <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => setShowEditor(false)}>סגור</Button>
              <Button disabled={!complete} variant="contained" endIcon={<SendIcon />} onClick={() => { setSend(true) }}  >שלח</Button>
            </div>
          </>
        }
      </div>
    </>

  )
}


