import { useContext } from "react"
import UserContext from "../../contexts"

const logo = "https://img.uniquemu.co.il/upload/bIj1Npo.png";

export default function Accessibility() {
  const { isDarkMode } = useContext(UserContext)

  return (
    <div className={`relative py-24 overflow-hidden 
       ${isDarkMode ? "bg-gray-900" : ""}
     isolate sm:py-32`}>
      <img
        src={logo}
        className="absolute inset-0 object-cover object-right w-full h-full opacity-5 -z-10 md:object-center"
      />
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className={`text-4xl font-bold tracking-tight 
           ${isDarkMode ? "text-white" : ""}
          sm:text-6xl`}>סטטוס נגישות האתר</h2>

          <p className={`mt-6 text-lg leading-8 
           ${isDarkMode ? "text-gray-300" : ""}
          `}>
            אתר וורטלי נמצא כעת בשלבי פיתוח מתקדמים. במסגרת תהליך הפיתוח, אנו פועלים להתאמת האתר לתקנות הנגישות בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), תשע"ג-2013.
          </p>

          <p className={`mt-6 text-lg leading-8 
           ${isDarkMode ? "text-gray-300" : ""}
          `}>
            חשוב לציין כי בשלב זה האתר טרם הונגש באופן מלא, ואנו מודעים לכך שייתכנו קשיים בשימוש בו עבור משתמשים מסוימים. אנו עובדים באופן שוטף על שיפור נגישות האתר והתאמתו לדרישות החוק.
          </p>

          <h3 className={`text-2xl font-bold tracking-tight mt-8
           ${isDarkMode ? "text-white" : ""}
          `}>תכנית הנגשה</h3>

          <p className={`mt-6 text-lg leading-8 
           ${isDarkMode ? "text-gray-300" : ""}
          `}>
            אנו מתחייבים להשלים את תהליך ההנגשה בהקדם האפשרי ולהפוך את האתר לנגיש עבור כלל המשתמשים. התהליך כולל התאמות טכניות, עיצוביות ותוכניות שיאפשרו שימוש נוח ויעיל באתר.
          </p>

          <h3 className={`text-2xl font-bold tracking-tight mt-8
           ${isDarkMode ? "text-white" : ""}
          `}>פניות בנושא נגישות</h3>

          <p className={`mt-6 text-lg leading-8 
           ${isDarkMode ? "text-gray-300" : ""}
          `}>
            נתקלתם בבעיה? נשמח לקבל פניות והצעות לשיפור נגישות האתר באמצעות טופס יצירת קשר, או באמצעות כתובת המייל:{' '}
            <a
              href="mailto:a47546@gmail.com"
              className={`font-medium hover:underline ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}
            >
              a47546@gmail.com
            </a>
            . אנו מתחייבים להתייחס לכל פנייה ברצינות ולפעול לתיקון הליקויים בהקדם האפשרי.
          </p>

          <p className={`mt-6 text-lg leading-8 text-gray-600
           ${isDarkMode ? "text-gray-300" : ""}
          `}>
            מסמך זה עודכן בתאריך: 11.12.2024
          </p>
        </div>
      </div>
    </div>
  )
}