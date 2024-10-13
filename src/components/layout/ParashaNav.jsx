import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import * as React from 'react';
// import { torah } from '../../data/parshiot.json';
import { useNavigate } from 'react-router-dom';


const torah = {
  "בראשית": ["בראשית", "נח", "לך לך", "וירא", "חיי שרה", "תולדות", "ויצא", "וישלח", "וישב", "מקץ", "ויגש", "ויחי"],
  "שמות": ["שמות", "וארא", "בא", "בשלח", "יתרו", "משפטים", "תרומה", "תצווה", "כי תשא", "ויקהל", "פקודי"],
  "ויקרא": ["ויקרא", "צו", "שמיני", "תזריע", "מצורע", "אחרי מות", "קדושים", "אמור", "בהר", "בחוקתי"],
  "במדבר": ["במדבר", "נשא", "בהעלותך", "שלח", "קרח", "חוקת", "בלק", "פנחס", "מטות", "מסעי"],
  "דברים": ["דברים", "ואתחנן", "עקב", "ראה", "שופטים", "כי תצא", "כי תבא", "נצבים", "וילך", "האזינו", "וזאת הברכה"],
  "חגים ומועדי ישראל": [ "ראש השנה", "יום כיפור","סוכות","שמחת תורה",  "חנוכה","עשרה בטבת",  "ט״ו בשבט", "פורים","פסח", "שבועות","י״ז בתמוז", "תשעה באב" ]
}


export default function ParashaNav() {
  const navigate = useNavigate();

  // אחראי שבכל רגע לא יהיה פתוח יותר משלב אחד
  const [expanded, setExpanded] = React.useState(false);


  // אחראי על פתיחת האקורדיון
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    // <div className='mt-6 w-min-500'>
    //   {Object.entries(torah).map(([chometName, parshiot], index) => (
    //     <Accordion expanded={expanded === `panel${index + 4}`} onChange={handleChange(`panel${index + 4}`)} key={chometName}>
    //       <AccordionSummary
    //         expandIcon={<ExpandMoreIcon />}
    //         aria-controls={`panel${index + 4}bh-content`}
    //         id={`panel${index + 4}bh-header`}
    //       >
    //         <Typography >{chometName}</Typography>
    //       </AccordionSummary>
    //       <AccordionDetails >
    //         {parshiot.map((parasha) => (
    //           <div className='cursor-pointer' onClick={() => navigate(`/home/?parasha=${parasha}`)} key={parasha}>
    //             {parasha}
    //           </div>
    //         ))}
    //       </AccordionDetails>
    //     </Accordion>
    //   ))}
    // </div>
    <div className="mt-6 w-full">
  {Object.entries(torah).map(([chometName, parshiot], index) => (
    <Accordion  expanded={expanded === `panel${index + 4}`} onChange={handleChange(`panel${index + 4}`)} key={chometName}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${index + 4}bh-content`}
        id={`panel${index + 4}bh-header`}
      >
        <Typography fontFamily="Heebo">{chometName}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {parshiot.map((parasha) => (
          <div
            className="cursor-pointer p-1 hover:bg-gray-100 transition duration-200"
            style={{ width: '100%' }}
            onClick={() => navigate(`/home/?parasha=${parasha}`)}
            key={parasha}
          >
            {parasha}
          </div>
        ))}
      </AccordionDetails>
    </Accordion>
  ))}
</div>

  );
}

