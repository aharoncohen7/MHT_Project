import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { torah } from '../../data/parshiot.json';
import { useNavigate } from 'react-router-dom';

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

