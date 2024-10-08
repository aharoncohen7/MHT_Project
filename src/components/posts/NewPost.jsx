import ClearIcon from "@mui/icons-material/Clear";
import { Box, Dialog } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useContext, useState } from "react";
import { FiFeather } from "react-icons/fi";
import UserContext from "../../contexts";
import Editor from "./Editor";

export default function NewPost() {
  const { navigate, setMessage, userId } = useContext(UserContext);
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [send, setSend] = useState(false);
  const handleClosePopUp = () => {
    setIsPopUpOpen(false);
  };

  const showPopUp = () => {
    setIsPopUpOpen(true);
  };

  return (
    <>
      <Dialog
        open={isPopUpOpen}
        onClose={()=>setIsPopUpOpen(false)}
        maxWidth="md"
        fullHeight
        fullWidth
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 1 }}>
          <Button onClick={handleClosePopUp}>
            <ClearIcon />
          </Button>
        </Box>
        <Editor
          setShowEditor={setIsPopUpOpen}
          send={send}
          setSend={setSend}
        />
      </Dialog>
      <div className=" max-w-lg p-6 mx-auto bg-white rounded-lg shadow-md ">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-900">
          הוראות לפני יצירת מאמר חדש
        </h2>
        <p className="text-right">
          <strong>כותרת:</strong>
          <br />
          הכותרת צריכה להיות בת 20 תווים לפחות. הכותרת צריכה להיות תמציתית
          ואינפורמטיבית, מתארת את נושא המאמר בצורה ברורה.
        </p>
        <p className="mt-4 text-right">
          <strong>תוכן המאמר:</strong>
          <br />
          המאמר צריך להיות בן 140 תווים לפחות. תוכן המאמר צריך להיות מנוסח בצורה
          ברורה, מתאר את הנושא בצורה מובנית ונכונה. המאמר צריך להציג את היתרונות
          והאתגרים הנוגעים לנושא באופן מאוד ברור ומובנה.
        </p>
        <p className="mt-4 text-right">
          <strong>תגיות:</strong>
          <br />
          ניתן להוסיף תגיות למאמר. כל תגית צריכה להיות קשורה לנושא המאמר. כל
          תגית צריכה להגדיר את נושא המאמר במילה אחת עד 2.
        </p>
        <p className="mt-4 text-right">
          בתום הכתיבה, כדאי לבדוק שהכותרת והתוכן עומדים בדרישות המצוינות
          ושהתגיות רלוונטיות לנושא המאמר.
        </p>

        <div className="flex justify-center mt-8 gap-4">
          <button
            className="px-10 py-2 font-bold text-white bg-blue-500 border rounded hover:bg-blue-700"
            onClick={() => {
              if (userId) {
                showPopUp();
              } else {
                setMessage(["כדי לפרסם פוסט עליך להיות מחובר", false]);
                navigate(-1);
              }
            }}
          >
            <svg
              className="w-20 h-6 mr-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <FiFeather size={"20px"} />
            </svg>
            צור מאמר חדש
          </button>
          <button
            className="px-10 py-2 font-bold text-white bg-blue-500 border rounded hover:bg-blue-700"
            onClick={() => navigate("/")}
          >
            ביטול
          </button>
        </div>
      </div>
    </>
  );
}
