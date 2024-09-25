import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import { torah } from '../../data/parshiot.json';
import { useNavigate } from 'react-router-dom';


const torah = {
  "בראשית": ["בראשית", "נח", "לך לך", "וירא", "חיי שרה", "תולדות", "ויצא", "וישלח", "וישב", "מקץ", "ויגש", "ויחי"],
  "שמות": ["שמות", "וארא", "בא", "בשלח", "יתרו", "משפטים", "תרומה", "תצווה", "כי תשא", "ויקהל", "פקודי"],
  "ויקרא": ["ויקרא", "צו", "שמיני", "תזריע", "מצורע", "אחרי מות", "קדושים", "אמור", "בהר", "בחקותי"],
  "במדבר": ["במדבר", "נשא", "בהעלותך", "שלח", "קרח", "חוקת", "בלק", "פנחס", "מטות", "מסעי"],
  "דברים": ["דברים", "ואתחנן", "עקב", "ראה", "שופטים", "כי תצא", "כי תבא", "נצבים", "וילך", "האזינו", "וזאת הברכה"]
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
    <div className='mt-6'>
      {Object.entries(torah).map(([chometName, parshiot], index) => (
        <Accordion expanded={expanded === `panel${index + 4}`} onChange={handleChange(`panel${index + 4}`)} key={chometName}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index + 4}bh-content`}
            id={`panel${index + 4}bh-header`}
          >
            <Typography >{chometName}</Typography>
          </AccordionSummary>
          <AccordionDetails >
            {parshiot.map((parasha) => (
              <div onClick={() => navigate(`/בית/?parasha=${parasha}`)} key={parasha}>
                {parasha}
              </div>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

