
import axios from 'axios'
import holidaysObject from "../dateData/holiday20Years.json"

// מידע רלוונטי עבור היום הנוכחי
export const getCurrentDateInfo = async () => {
  const data = {
    currentDate: getCurrentDateInIsrael(),
    currentHeDate: await getHebrewDateFromAPI(getCurrentDateInIsraelForAPI()),
    currentParasha: getCurrentParashaFromJSON(),
    upcomingHoliday: getUpcomingHolidayFromJSON(),
  }
  return data;
}

// קבלת פרשת השבוע
// שים ❤️ הפונקציה נראית מעט מסובכת וזה בגלל שהדרך הפשוטה נכשלה בין השעות 00:00 ל03:00 בלילה
export const getCurrentParashaFromJSON = () => {
  // השגת התאריך הנוכחי באזור זמן ישראל
  const todayDateStr = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jerusalem' }).split(",")[0];
  // מציאת מספר הימים עד השבת הקרובה
  const todayNunber = new Date(todayDateStr).getDay();
  const daysUntilSaturday = (6 - todayNunber + 7) % 7;
  // פונקציה להוספת הספרה 0 לפני המספר אם הוא פחות מ-10
  const padZero = (num) => (num < 10 ? `0${num}` : num);
  // פירוק התאריך
  const [month, day, year] = todayDateStr.split('/').map(Number);
  // console.log("🚀 ~ getCurrentParashaFromJSON ~ month, day, year:", month, day, year)
  // הרכבה מחדש של מבנה תאריך
  const nextSaturday = new Date(`${year}-${padZero(month)}-${padZero(day)}T00:00:00.001Z`);
  // הוספת ימים לתאריך וחישוב התאריך של השבת הקרובה
  nextSaturday.setDate(nextSaturday.getDate() + daysUntilSaturday);
  // חילוץ התאריך בלבד
  const nextSaturdayDateString = nextSaturday.toISOString().split('T')[0];
  // בדיקה אם קיימת פרשה לשבת הקרובה
  const nextParsha = parshiyotObject[nextSaturdayDateString]?.inHebrew;
  if (nextParsha) {
    console.log(`פרשת השבוע הקרובה (${nextSaturdayDateString}) היא: ${nextParsha}`);
    return nextParsha;
  } else {
    console.log(`לא נמצאה פרשה לשבת הקרובה (${nextSaturdayDateString}).`);
    return null;
  }
};

//  קבלת החג/אירוע המשמעותי הקרוב
export const getUpcomingHolidayFromJSON = () => {
  const today = new Date();
  const twoWeeksFromNow = new Date(today.getTime() + 34 * 24 * 60 * 60 * 1000);
  let upcomingHolidayWithTag = null;

  for (const [dateStr, holiday] of Object.entries(holidaysObject)) {
    const holidayDate = new Date(dateStr);

    if (holidayDate >= today && holidayDate <= twoWeeksFromNow) {
      if (holiday.mainTag !== null) {
        // מצאנו חג עם תג שאינו null - נחזיר אותו מיד
        console.log(`החג הקרוב הוא: ${holiday.inHebrew}, תג: ${holiday.mainTag}`);
        return holiday.mainTag;
      } else if (upcomingHolidayWithTag === null) {
        // נמשיך לחפש, אבל נשמור את החג הראשון למקרה שלא נמצא אחר עם תג
        upcomingHolidayWithTag = holiday;
      }
    }
  }

  // אם לא מצאנו חג עם תג שאינו null, נחזיר "אין חג"
  console.log('אין חגים עם תג בשבועיים הקרובים');
  return null;
}

// API
 //  - קבלת תאריך עברי נוכחי או לפי תאריך מסויים - במבנה חודש/יום/שנה
export const getHebrewDateFromAPI = async (date) => {
  // אם לא מתקבל תאריך מחזיר תאריך נוכחי
  const requestedDay = new Date(parseDate(date))
  if(requestedDay.getFullYear()==NaN) {
    throw "Invalid date requested"
  }
  try {
    const range = `https://www.hebcal.com/converter?cfg=json&gy=${requestedDay.getFullYear()}&gm=${requestedDay.getMonth() + 1}&gd=${requestedDay.getDate()}&g2h=1`;
    const response = await axios.get(range);
    const dateInHe = response.data?.hebrew?.replace(/[\u0591-\u05C7]/g, '') || null;
    console.log(dateInHe)
    return dateInHe;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


// קבלת תאריך לועזי בעברית
export const getDateInHe = (date) =>{
  const requestedDay = date ? new Date(date) : new Date();
  console.log("🚀 ~ getDateInHe ~ today:", requestedDay)
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  console.log(requestedDay.toLocaleDateString('he-IL', options))
  return requestedDay.toLocaleDateString('he-IL', options);
}

// תאריך לועזי נוכחי במבנה (יום חודש שנה) לפי שעון ישראל
export const getCurrentDateInIsrael = () => {
  const todayDateStr = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jerusalem' }).split(",")[0];
  // פונקציה להוספת הספרה 0 לפני המספר אם הוא פחות מ-10
  const padZero = (num) => (num < 10 ? `0${num}` : num);
  // פירוק התאריך
  const [month, day, year] = todayDateStr.split('/').map(Number);
  // הרכבה מחדש של מבנה תאריך
   console.log(`${padZero(day)}/${padZero(month)}/${year}`)
  return `${padZero(day)}/${padZero(month)}/${year}`;
};

// תאריך לועזי נוכחי במבנה (חודש יום שנה) לפי שעון ישראל
export const getCurrentDateInIsraelForAPI = () => {
  const todayDateStr = new Date().toLocaleString('en-US', { timeZone: 'Asia/Jerusalem' }).split(",")[0];
  // פונקציה להוספת הספרה 0 לפני המספר אם הוא פחות מ-10
  const padZero = (num) => (num < 10 ? `0${num}` : num);
  // פירוק התאריך
  const [month, day, year] = todayDateStr.split('/').map(Number);
  // הרכבה מחדש של מבנה תאריך
   console.log(`${padZero(month)}/${padZero(day)}/${year}`)
  return `${padZero(month)}/${padZero(day)}/${year}`;
};

// ממירה מחרוזת תאריך בלבד למבנה חודש יום שנה
export function parseDate(dateString=getCurrentDateInIsraelForAPI()) {
  // Define regex to match date formats with different delimiters and orders
  const regex = /^(\d{1,2})[\/\.\-](\d{1,2})[\/\.\-](\d{2}|\d{4})$/;
  const match = dateString.match(regex);

  if (!match) {
      throw new Error("Invalid date format");
  }

  let day, month, year;

  // Extract the date components
  let part1 = parseInt(match[1], 10);
  let part2 = parseInt(match[2], 10);
  let part3 = parseInt(match[3], 10);

  if (part3 < 100) {
      // Assuming part3 is year in two-digit format
      part3 += 2000;
  }

  // Determine the order of the date components based on common formats
  if (part1 > 12) {
      // Assuming part1 is day, part2 is month
      day = part1;
      month = part2;
  } else if (part2 > 12) {
      // Assuming part2 is day, part1 is month
      day = part2;
      month = part1;
  } else {
      // Ambiguous case, let's assume part1 is month and part2 is day
      // This can be adjusted based on the common format you expect more often
      month = part1;
      day = part2;
  }

  year = part3;

  // Ensure month and day are in correct format
  month = month < 10 ? `0${month}` : month;
  day = day < 10 ? `0${day}` : day;

  return `${month}/${day}/${year}`;
}

  // ממיר כל תאריך למחרוזת שנה חודש יום
const formatDateForAPI = (date) => {
  const requestedDay = date ? new Date(date) : new Date();
  const year = requestedDay.getFullYear();
  const month = (requestedDay.getMonth() + 1).toString().padStart(2, '0');
  const day = requestedDay.getDate().toString().padStart(2, '0');
  console.log(`${day}-${month}-${year}`)
  return `${day}-${month}-${year}`;
};

// לא בשימוש
// API
// קבלת פרשת השבוע הקרוב
export const getCurrentParashaFromAPI = async () => {
  const getCurrentDate = () => formatDateForAPI(new Date());
  const getNextWeekDate = () => formatDateForAPI(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));

  const parshiot = {
    "בראשית": "בראשית",
    "נח": "נח",
    "לך לך": "לך לך",
    "וירא": "וירא",
    "חיי שרה": "חיי שרה",
    "תולדות": "תולדות",
    "ויצא": "ויצא",
    "וישלח": "וישלח",
    "וישב": "וישב",
    "מקץ": "מקץ",
    "ויגש": "ויגש",
    "ויחי": "ויחי",
    "שמות": "שמות",
    "שמת": "שמות",
    "וארא": "וארא",
    "בא": "בא",
    "בשלח": "בשלח",
    "יתרו": "יתרו",
    "משפטים": "משפטים",
    "תרומה": "תרומה",
    "תצווה": "תצווה",
    "תצוה": "תצווה",
    "כי תשא": "כי תשא",
    "ויקהל": "ויקהל",
    "פקודי": "פקודי",
    "ויקרא": "ויקרא",
    "צו": "צו",
    "שמיני": "שמיני",
    "תזריע": "תזריע",
    "מצורע": "מצורע",
    "אחרי מות": "אחרי מות",
    "קדושים": "קדושים",
    "קדשים": "קדושים",
    "אמור": "אמור",
    "אמר": "אמור",
    "בהר": "בהר",
    "בחקותי": "בחקותי",
    "בחקתי": "בחקותי",
    "במדבר": "במדבר",
    "נשא": "נשא",
    "בהעלותך": "בהעלותך",
    "בהעלתך": "בהעלותך",
    "שלח": "שלח",
    "קרח": "קרח",
    "חוקת": "חוקת",
    "חקת": "חוקת",
    "בלק": "בלק",
    "פנחס": "פנחס",
    "פינחס": "פנחס",
    "מטות": "מטות",
    "מטת": "מטות",
    "מסעי": "מסעי",
    "דברים": "דברים",
    "ואתחנן": "ואתחנן",
    "עקב": "עקב",
    "ראה": "ראה",
    "שופטים": "שופטים",
    "שפטים": "שופטים",
    "כי תצא": "כי תצא",
    "כי תבא": "כי תבא",
    "נצבים": "נצבים",
    "וילך": "וילך",
    "האזינו": "האזינו",
    "וזאת הברכה": "וזאת הברכה"
  };

  const getParasha = (apiResponse) => {
    if (apiResponse.items && apiResponse.items.length > 0) {
      for (const item of apiResponse.items) {
        if (item.category === 'parashat') {
          const parashaHebrew = item.hebrew;
          const [first, second] = parashaHebrew.split(' ');
          const parasha = `${first} ${parshiot[second] || second}`;
          return parasha;
        }
      }
    }
    return null;
  };

  try {
    const range = `https://www.hebcal.com/hebcal?cfg=json&s=on&start=${getCurrentDate()}&end=${getNextWeekDate()}`;
    const response = await axios.get(range);
    const parasha = getParasha(response.data);
    return parasha.split(' ')[1];
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
