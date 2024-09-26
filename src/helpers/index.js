import axios from "axios"
 const token = 
"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzcsImlzQWRtaW4iOjEsInVzZXJuYW1lIjoiYV9jb2hlbiIsInBhc3N3b3JkIjoiYWMxOTg1IiwiaWF0IjoxNzE3MzE1MjMzLCJleHAiOjE3MTczMjcyMzN9.r61dH7cGArIf7f7smMBB5cuKQ5mQZfG9dzDlhuckDmA"
// בקשת שרת גנרית
export const axiosReqToRender = async ({ method = 'POST', body, url }) => {
    try {
       // axios.defaults.baseURL = 'http://localhost:4000/api/'
       console.log('api req 😘 \n', { url, method, body })
       const { data: result } = await axios({
          baseURL: `https://vortly-db.onrender.com/api/`,
          method,
          data: body || {},
          url,
          headers: {
            //  Authorization: localStorage.token || ''
             authorization: token
          }
       })
       console.log('api req result 🐱 \n', { result })
       return result;
    } catch (error) {
       console.log('api error 🤢 \n', { error })
       throw error.response?.data?.my  ? error.response?.data?.message || 'something went wrong' : 'something went wrong'
    }
 }



 // בקשת שרת גנרית
export const axiosReq = async ({ method = 'POST', body, url }) => {
    try {
       // axios.defaults.baseURL = 'http://localhost:4000/api/'
       console.log('api req 😘 \n', { url, method, body })
       const { data: result } = await axios({
          baseURL: 'http://localhost:3000/api/',
          method,
          data: body || {},
          url,
          headers: {
            //  Authorization: localStorage.token || ''
             authorization: token
          }
       })
       console.log('api req result 🐱 \n', { result })
       return result;
    } catch (error) {
       console.log('api error 🤢 \n', { error })
       throw error.response?.data?.my  ? error.response?.data?.message || 'something went wrong' : 'something went wrong'
    }
 }


// פונקציה לקבלת תיאור יחסי לתאריך
function getRelativeDate(date) {
    const currentDate = new Date();
    const inputDate = new Date(date);
    const timeDifference = currentDate.getTime() - inputDate.getTime();
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
    const oneWeek = 7 * oneDay; // milliseconds in a week

    if (timeDifference < oneDay) {
        return "Today";
    } else if (timeDifference < 2 * oneDay) {
        return "Yesterday";
    } else if (timeDifference < oneWeek) {
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return daysOfWeek[inputDate.getDay()];
    } else {
        return "Last week";
    }
}

// פונקציה לקבלת השעה במבנה של 00:00
function getTime(timeString) {
    const parts = timeString.split("T")[1].split(":");
    const hours = parts[0].padStart(2, "0");
    const minutes = parts[1].padStart(2, "0");
    return `${hours}:${minutes}`;
}

// פונקציה לקבלת התאריך במבנה של כיוונית 23/04/24
function getDate(dateString) {
    const parts = dateString.split("T")[0].split("-");
    const year = parts[0].slice(-2);
    const month = parts[1];
    const day = parts[2];
    return `${day}/${month}/${year}`;
}

// פונקציה המשלבת את תוצאות שלשת הפונקציות הקודמות 
export function formatDateTime(dateTimeString) {
    const relativeDate = getRelativeDate(dateTimeString);
    const time = getTime(dateTimeString);
    const date = getDate(dateTimeString);
    return `${relativeDate}, ${date}, ${time}`;
}



export function getDescriptionOrTime(timeString) {
    const currentDate = new Date();
    const inputDate = new Date(timeString);
    const timeDifference = currentDate.getTime() - inputDate.getTime();
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day

    if (timeDifference < oneDay) {
        const parts = timeString.split("T")[1].split(":");
        const hours = parts[0].padStart(2, "0");
        const minutes = parts[1].padStart(2, "0");
        return `${hours}:${minutes}`;
    } else {
        return getRelativeDate(timeString);
    }
}


export function changeColorLinks(htmlString){
const linkRegex = /https?:\/\/[^<\s]+/gi;

// מציאת כל הקישורים בתוך הטקסט
const links = htmlString.match(linkRegex);

// החלת סגנון CSS על כל קישור בתוך הטקסט
const coloredText = htmlString.replace(linkRegex, '<a href="$&" style="color: #00A389;" target="_blank">$&</a>');
return coloredText 
}



// תאריך נוכחי
export function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

// תאריך בעוד שבוע
export function getNextWeekDate() {
    const currentDate = new Date();
    const nextWeekDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000); 
    const year = nextWeekDate.getFullYear();
    const month = (nextWeekDate.getMonth() + 1).toString().padStart(2, '0'); 
    const day = nextWeekDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

// קביעת פרשת השבוע
export function getParasha(apiResponse) {
  if (apiResponse.items && apiResponse.items.length > 0) {
    for (const item of apiResponse.items) {
      if (item.category === 'parashat') {
        const parashaHebrew = item.hebrew;
        console.log(parashaHebrew);
        return parashaHebrew;
      }
    }
  }
}


// שינוי מבנה תאריך יצירת מאמר
export function formatDate(dateString) {
  const parts = dateString.split('T')[0].split("-");
  return `${parts[2]}-${parts[1]}-${parts[0].slice(2)}`;
}













// export function formatDateTime(dateTimeString){
//     var parts = dateTimeString.split("T"); // מפרק את המחרוזת לשני חלקים על פי התו 'T'
//     var datePart = parts[0]; // חלק הראשון שמכיל את התאריך
//     var timePart = parts[1]; // חלק השני שמכיל את השעה

//     // מפרקים את התאריך לשנה, חודש ויום
//     var dateParts = datePart.split("-");
//     var year = dateParts[0].slice(-2); // משנה את השנה לצורת שני ספרות (כך שהתוצאה תהיה "24" במקרה זה)
//     var month = dateParts[1];
//     var day = dateParts[2];
    
//     // מרכיבים מחדש את התאריך בפורמט הרצוי (יום/חודש/שנה)
//     var newDatePart = day + "/" + month + "/" + year;
    
    
//     // מפרקים את החלק השני (שעות, דקות, שניות)
//     var timeParts = timePart.split(":");
//     var hours = timeParts[0];
//     var minutes = timeParts[1];
    
//     // מפרקים את השעות לתצוגה במבנה של ארבע ספרות (כגון "23")
//     hours = hours.padStart(2, "0"); // מוסיף אפס במידה והמספר קטן מ־10
//     var newTimePart = hours + ":" + minutes; // מרכיב מחדש את חלק השעה
//     var newString = newDatePart + ", " + newTimePart; // מרכיב מחדש את המחרוזת החדשה, מופרדת בפסיק
//     var relativeDate = getRelativeDate(dateTimeString); // מרכי�� מחד
//   return relativeDate  + newString
// }




// function getRelativeDate(date) {
//   //השוואה לתאריך עדכני
//   const currentDate = new Date();
//   const inputDate = new Date(date);
//   const timeDifference = currentDate.getTime() - inputDate.getTime();
//   const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
//   const oneWeek = 7 * oneDay; // milliseconds in a week

//   if (timeDifference < oneDay) {
//       return "Today, ";
//   } else if (timeDifference < 2 * oneDay) {
//       return "Yesterday, ";
//   } else if (timeDifference < oneWeek) {
//       // Check the day of the week
//       const daysOfWeek = ["Sunday, ", "Monday, ", "Tuesday, ", "Wednesday, ", "Thursday, ", "Friday, ", "Saturday, "];
//       return daysOfWeek[inputDate.getDay()];
//   } else {
//       return "last week, ";
//   }
// }


 // const someElement = document.createElement('span');
    // someElement.innerHTML = 'חוכמת אתונה';
    // document.body.appendChild(someElement);
    // const direction = window.getComputedStyle(someElement).direction;
    // if (direction === 'rtl') {
    //     // הגדרת המקלדת היא כנראה עברית
    //     console.log("he");
    // } else {
    //     console.log("en");
    //     // הגדרת המקלדת היא כנראה לא עברית
    // }
    // document.body.removeChild(someElement);


    //   window.addEventListener('load', () => {
    //   const userLanguage = navigator.language || navigator.languages[0];

    //   if (userLanguage.startsWith('he')) {
    //     // שפת המקלדת הנוכחית היא עברית
    //     console.log('Hebrew keyboard layout detected');
    //   } else {
    //     // שפת המקלדת הנוכחית היא אנגלית או אחרת
    //     console.log('Non-Hebrew keyboard layout detected');
    //   }
    // });