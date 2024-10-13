import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import DataContext from "../../contexts/dataContext";
const SERVER_HOST = import.meta.env.VITE_SERVER_HOST;

export default function MyRating({ item }) {
  const { setOriginalData } = useContext(DataContext);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (message) {
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  }, [message]);

  // דירוג פוסט
  async function updateRating(event) {
    const newRating = event.target.value;
    console.log(newRating);
    try {
      const response = await fetch(`${SERVER_HOST}/posts/rating/${item.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          newRating,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",

          authorization: Cookies.get("Authorization") || "",
        },
      });
      if (response.ok == false) {
        if (response.status == 401) {
          setMessage(["כדי לדרג תוכן באתר עליך להיוך מחובר", false]);
          return;
        }
        if (response.status == 404) {
          setMessage(["לא ניתן לדרג יותר מפעם אחת", false]);
          return;
        }

        setMessage(["פעולת הדירוג לא הצליחה", false]);
        return;
        // throw new Error(`Failed to update rating! Status: ${response.status}`);
      } else {
        const editedPost = await response.json();
        setOriginalData((prevOriginalData) => {
          const updatedOriginalData = [...prevOriginalData].map((obj) => {
            if (obj.id === item.id) {
              return { ...obj, rating: editedPost.rating };
            }
            return obj;
          });
          return updatedOriginalData;
        });
        setMessage(["דירוג בוצע בהצלחה", true]);
      }
    } catch (error) {
      setMessage(["שגיאה" + error.message, false]);
      console.error(error.message);
    }
  }

  return (
    <span className="flex flex-col ">
      <Stack spacing={1}>
        <Rating
          name="half-rating"
          style={{ color: "rgba(6, 119, 221, 0.8)", direction: "ltr" }}
          value={parseFloat(item.rating)}
          defaultValue={0.0}
          precision={0.5}
          onChange={updateRating}
        />
      </Stack>
      {message && (
        <div
          className={`h-4 ${message[1] ? "text-green-300" : "text-red-300"} `}
          style={{ color: message[1] ? "green" : "red" }}
        >
          {message[0]}
        </div>
      )}
    </span>
  );
}
