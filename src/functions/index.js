import Login from "../components/login/Login";

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


