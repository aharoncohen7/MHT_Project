import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import UserContext from "../../contexts"

const links = [
  { name: 'להרחבה', href: '#' },
  { name: 'צור קשר', href: '/about/contact-us' },
  { name: 'הצטרף אלינו', href: '#' },
  // { name: 'לתרומות', href: '#' },
]
const stats = [
  { name: 'עורכי תוכן מקצועיים', value: '10+' },
  { name: 'כותבים רשומים', value: '80+' },
  { name: 'מאמרים חדשים מדי שבוע', value: '20+' },
  { name: 'תגיות בנושאים שונים', value: '150+' },
]
const logo = "https://img.uniquemu.co.il/upload/bIj1Npo.png";

export default function AboutUs() {
  const { isDarkMode } = useContext(UserContext)
  const navigator = useNavigate()

  return (
    <div className={`relative py-24 overflow-hidden 
       ${isDarkMode ? "bg-gray-900" : ""}
     isolate sm:py-32`}>
      <img
        src={logo}
        className="absolute inset-0 object-cover object-right w-full h-full opacity-5 -z-10 md:object-center"
      />
      {/* <div
        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
        aria-hidden="true"
      >
        <div
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div> */}
      <div
        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
        aria-hidden="true"
      >
        <div
          // className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
          // style={{
          //   clipPath:
          //     'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          // }}
        />
      </div>
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className={`text-4xl font-bold tracking-tight 
           ${isDarkMode ? "text-white" : ""}
          sm:text-6xl`}>אודותינו</h2>

          <p className={`mt-6 text-lg leading-8 
           ${isDarkMode ? "text-gray-300" : ""}
          `}>
            אתר וורטלי שם לעצמו למטרה להוות פלטפורמה נוחה ויעילה לפרסום חידושי תורה עצמיים.  האתר מתוכנן ונבנה בצורה נוחה ואינטואטיבית בדגש על חווית משתמש, על מנת לאפשר למשתמש להפיץ את חידושיו ולהגיע בקלות ובנוחות לקהלים אחרים. כעת אנו מתמקדים בתוכן על פרשיות השבוע ומועדי השנה, אך בעתיד אנו מקווים להתרחב לתחומי תוכן נוספים, ליצור פורום דיונים ועוד. האתר נבנה ללא מטרות רווח אלא להפצת תורה.
          </p>
          <p className={`mt-6 text-lg leading-8 text-gray-600
           ${isDarkMode ? "text-gray-300" : ""}
          `}>
            הבהרה: האתר מצוי עדיין בתהליכי פיתוח ולצערנו עדיין לא הגענו לנושא הנגישות. הנושא חשוב לנו והוא יטופל בהקדם האפשרי, עמכם הסליחה!
            </p>
        </div>
        <div className="max-w-2xl mx-auto mt-10 lg:mx-0 lg:max-w-none">
          <div className={`grid grid-cols-1 
          
            ${isDarkMode ? "text-base" : ""}
           font-semibold leading-7 
                    ${isDarkMode ? "text-white" : ""}
           gap-x-8 gap-y-6 sm:grid-cols-2 md:flex lg:gap-x-10`}>
            {links.map((link) => (
           
                <span key={link.name} onClick={()=>navigator(link.href)} className="px-2 cursor-pointer" >{link.name}</span>
         
            ))}
          </div>
          <dl className="grid grid-cols-1 gap-8 mt-16 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.name} className="flex flex-col-reverse">
                <dt className="text-base leading-7 text-gray-500">{stat.name}</dt>
                <dd className={`text-2xl font-bold leading-9 tracking-tight 
           ${isDarkMode ? "text-white" : ""}
                `}>{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
