
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
        console.log("פרשת השבוע:", parashaHebrew)
        const parasha = parashaHebrew.split(' ')[0] + " " + parshiot[parashaHebrew.split(' ')[1]];
        console.log("🚀 ~ getParasha ~ parasha:", parasha)
        return parasha;
      }
    }
  }
}


// שינוי מבנה תאריך יצירת מאמר
export function formatDate(dateString) {
  const parts = dateString.split('T')[0].split("-");
  return `${parts[2]}-${parts[1]}-${parts[0].slice(2)}`;
}

export const emailValidator = (value) => {
  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(value)) return "כתובת אימייל לא תקינה";
  return "";
};


export const phoneValidator = (phone) => {
  // Remove all non-digit characters except for the leading '+'
  const cleanedValue = phone.replace(/[^\d+]/g, "");

  // Check if the number starts with +972 or 0
  if (!/^(\+972|0)/.test(cleanedValue)) {
    return "מספר הטלפון חייב להתחיל ב-0 או +972";
  }

  // Remove the prefix for further validation
  const numberWithoutPrefix = cleanedValue.replace(/^(\+972|0)/, "");

  // Validate numbers starting with 2, 3, 4, 8, 9
  if (/^[23489]\d{7}$/.test(numberWithoutPrefix)) {
    return ""; // Valid number
  }

  // Validate numbers starting with 5 or 7
  if (/^[57]\d{8}$/.test(numberWithoutPrefix)) {
    return ""; // Valid number
  }

  // Check for invalid starting digits
  if (/^[16]/.test(numberWithoutPrefix)) {
    return "קידומת שגויה";
  }

  if (phone.length < 10) {
    return "אנא השלם את המספר";
  }

  // If we've reached this point, the number is invalid
  return "מספר טלפון לא תקין. אנא בדוק את המספר ונסה שוב";
};


export const parshiot = {
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
  "כי־תשא": "כי תשא",
  "ויקהל": "ויקהל",
  "פקודי": "פקודי",
  "ויקהל־פקודי": "ויקהל-פקודי",
  "ויקרא": "ויקרא",
  "צו": "צו",
  "שמיני": "שמיני",
  "תזריע": "תזריע",
  "מצורע": "מצורע",
  "תזריע־מצורע": "תזריע-מצורע",
  "אחרי מות": "אחרי מות",
  "אחרי־מות": "אחרי מות",
  "אחרי-מות": "אחרי מות",
  "קדושים": "קדושים",
  "קדשים": "קדושים",
  "אחרי מות־קדושים": "אחרי מות-קדושים",
  "אחרי־מות-קדושים": "אחרי מות-קדושים",
  "אחרי־מות קדושים": "אחרי מות-קדושים",
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
  "מטות־מסעי" : "מטות-מסעי",
  "מטות-מסעי" : "מטות-מסעי",
  "מטות מסעי" : "מטות-מסעי",
  "דברים": "דברים",
  "ואתחנן": "ואתחנן",
  "עקב": "עקב",
  "ראה": "ראה",
  "שופטים": "שופטים",
  "שפטים": "שופטים",
  "כי־תצא": "כי תצא",
  "כי תצא": "כי תצא",
  "כי-תצא": "כי תצא",
  "כי־תבא": "כי תבא",
  "כי תבא": "כי תבא",
  "כי-תבא": "כי תבא",
  "נצבים": "נצבים",
  "נצבים־וילך": "נצבים-וילך",
  "נצבים וילך": "נצבים-וילך",
  "נצבים-וילך": "נצבים-וילך",
  "וילך": "וילך",
  "האזינו": "האזינו",
  "וזאת הברכה": "וזאת הברכה",
  "וזאת־הברכה": "וזאת הברכה",
  "וזאת-הברכה": "וזאת הברכה"
};


