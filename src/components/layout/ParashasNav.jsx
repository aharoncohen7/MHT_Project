import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { torah } from '../../data/parshiot.json';
import { useNavigate } from 'react-router-dom';

export default function ParashasNav() {
  const navigate = useNavigate();

  // אחראי שבכל רגע לא היהי פתוח יותר משלב אחד
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div >
      {Object.entries(torah).map(([chometName, parshiot], index) => (
        <Accordion expanded={expanded === `panel${index + 4}`} onChange={handleChange(`panel${index + 4}`)} key={chometName}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index + 4}bh-content`}
            id={`panel${index + 4}bh-header`}
          >
            <Typography >{chometName}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {parshiot.map((parasha) => (
              // <div onClick={() => navigate(`/topic/${parasha}`)} key={parasha}>
              <div onClick={() => navigate(`/home/?parasha=${parasha}`)} key={parasha}>
                {parasha}
              </div>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

//   return (
//     <div className="fixed" style={{ top: '60px' }}>
//       {Object.entries(torah).map(([chometName, parshiot], index) => (
//         <Accordion expanded={expanded === `panel${index + 4}`} onChange={handleChange(`panel${index + 4}`)} key={chometName}>
//           <AccordionSummary
//             expandIcon={<ExpandMoreIcon />}
//             aria-controls={`panel${index + 4}bh-content`}
//             id={`panel${index + 4}bh-header`}
//           >
//             <Typography sx={{ width: '33%', flexShrink: 0 }}>{chometName}</Typography>
//           </AccordionSummary>
//           <AccordionDetails>
//             {parshiot.map((parasha) => (
//               <div style={{ width: "100px", height: "35px", margin: "10px" }} onClick={() => navigate(`/topic/${parasha}`)} key={parasha}>
//                 {parasha}
//               </div>
//             ))}
//           </AccordionDetails>
//         </Accordion>
//       ))}
//     </div>
//   );
// }

