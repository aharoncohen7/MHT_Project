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



