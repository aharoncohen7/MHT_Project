import DomPurify from "dompurify";
import React from "react";
import { changeColorLinks } from "../../helpers/helpers";

// הודעה לדוגמה
const htmlString = `<span  
   dir="rtl"
    style=
   "text-decoration: none;
   font-style: normal;
   font-weight: normal;
   text-align: right;" 
 > what is <span style="color: yellow;">your</span> <span style="color: green;">זהו טקסט עם קישור: https://example.com אני מקווה שהקישור הזה יוצג בצבע כחול.</span> ? </span>
     </span>`;

const SanitizedHTML = ({ htmlContent }) => {
  // קבלת כיוון הטקסט מהתוכן כדי להחילו על האלמנט העוטף
  function getTextStyles(content) {
    const textAlignMatch = content.match(/text-align:\s*(\w+)/);
    const TextDirectionMatch = content.match(/<[^>]+dir=["'](\w+)["'][^>]*>/);
    // const TextDirectionMatch = content.match(/dir:\s*(\w+)/);

    if (textAlignMatch && TextDirectionMatch) {
      return {
        textAlign: textAlignMatch[1],
        dir: TextDirectionMatch[1],
      };
    } else {
      // console.log(content);
      const hebrewCharacters = content.replace(/[^א-ת]/g, "");
      const isHebrew = hebrewCharacters.length / content.length > 0.5;

      return {
        textAlign: isHebrew ? "right" : "left",
        dir: isHebrew ? "rtl" : "ltr",
        // textAlign: "inherit",
        wordwrap: "break-word",
        overflowWrap: "break-word",
        whiteSpace:"normal"
      };
    }
  }
  // ניטור הודעה
  const sanitizedHTML = DomPurify.sanitize(htmlContent);
  // const sanitizedHTML1 = DomPurify.sanitize(('<p>abc<iframe//src=jAva&Tab;script:alert(3)>def</p>'));
  // console.log("🚀 ~ SanitizedHTML ~ sanitizedHTML1:", sanitizedHTML1)

  // אפשרויות להגבלות נוספות
  // const sanitizedHTML = DomPurify.sanitize(msg.content, {
  //   ALLOWED_TAGS: ['b', 'i', 'em', 'strong'],
  //   ALLOWED_ATTR: ['style'],
  // });

  //  console.log(changeColorLinks(sanitizedHTML));

  // console.log(htmlContent);

  return (
    <div
      style={getTextStyles(sanitizedHTML)}
      // dangerouslySetInnerHTML={{ __html: sanitizedHTML }}/>
    dangerouslySetInnerHTML={{ __html: changeColorLinks(sanitizedHTML) }} />
  );
};

export default SanitizedHTML;
