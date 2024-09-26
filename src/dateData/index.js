

// const fs = require('fs');

const { connect } = require("@/server/connect");
import holidays from '../dateData/holidayNames.json';



// async function connectQuestionsAndParasha(dryRun = true) {
//         const cleanContentForSearch = (text) => {
//             return text
//                 .replace(/[^\u0590-\u05FF\s'"]/g, ' ')
//                 .replace(/\s+/g, ' ')
//                 .trim()
//                 .replace(/['"]/g, '"')
//                 .replace(/\\/g, '');
//         };
//         const cleanTag = (tag) => {
//             return tag
//                 .toLowerCase()
//                 // .replace(/^(פרשת|ספר)\s+/g, '')
//                 .replace(/\b(ו)(\S+)/g, '$2')
//                 .replace(/,/g, '')
//                 .trim();
//         };
//         try {
//             await connect();
//             const allTags = await HolidaysModel.find({ isActive: true });
//             // Create a map of cleaned tags
//             const tagMap = new Map();
//             allTags.forEach(tag => {
//                 if(tag.type === "parasha") {
//                 let cleanedTagName = cleanTag(tag.name);
//                 cleanedTagName = `${cleanedTagName}`
//                 // console.log(cleanedTagName)
//                 tagMap.set(cleanedTagName, tag._id.toString());}
//             });
//             const questions = await QAModel.find({ isActive: true });
//             let changesLog = [];
//             for (const question of questions) {
//                 const contentToSearch = cleanContentForSearch(`${question.title || ''} ${question.question} ${question.answer}`);
//                 const foundTags = new Set();
//                 tagMap.forEach((tagId, cleanedTagName) => {
//                     if (contentToSearch.includes(cleanedTagName)) {
//                         foundTags.add(tagId);
//                     }
//                 });
//                 // console.log(foundTags)
//                 // const existingTags = new Set();
//                 // const newTags = Array.from(foundTags).filter(tag => !existingTags.has(tag));
//                 if (foundTags.length > 0) {
//                     const proposedChanges = {
//                         questionId: question._id,
//                         currentTags: question.holidays,
//                         proposedNewTags: newTags,
//                         proposedFullTagSet: [...question.holidays, ...newTags]
//                     };
//                     changesLog.push(proposedChanges);
//                     if (!dryRun) {
//                         question.holidays = question.holidays ?  [...question.holidays, ...foundTags] : [...foundTags];
//                         await question.save();
//                         console.log(`Updated question ${question._id} with ${newTags.length} new proposed tags`);
//                     } else {
//                         console.log(`[DRY RUN] Would update question ${question._id} with ${newTags.length} new tags`);
//                     }
//                 }
//             }
//             console.log('Finished processing all questions');
//             return changesLog;
//         } catch (error) {
//             console.error('Error processing questions and tags:', error);
//             return null;
//         }
//     }




// // קריאת הקובץ
// const rawData = fs.readFileSync('holiday20Years.json');
// const holidays = JSON.parse(rawData);

// // עיבוד הנתונים
// const processedHolidays = new Map();

// for (const [date, holiday] of Object.entries(holidays)) {
//   if (holiday.mainTag) {
//     // אם ה-mainTag קיים וטרם נוסף למפה
//     if (!processedHolidays.has(holiday.mainTag)) {
//       processedHolidays.set(holiday.mainTag, {
//         name: holiday.mainTag,
//         englishName: holiday.inEnglish
//       });
//     }
//   }
// }

// // המרת המפה למערך
// const result = Array.from(processedHolidays.values());

// // כתיבת התוצאה לקובץ
// fs.writeFileSync('output.json', JSON.stringify(result, null, 2));

// console.log('הקובץ החדש נוצר בהצלחה.');


// const mongoose = require('mongoose');


// const { connect } = require('@/server/connect');
// const HolidaysModel  = require('@/server/models/holidays.model.js');






// // פונקציה להכנסת החגים למסד הנתונים
// "use server"
// import { connect } from "@/server/connect"
// import { create } from "@/server/controller/pendingQa.controller"
// import { revalidatePath } from "next/cache"
// import { redirect } from "next/navigation"

// // import  holidays from "../dateData/holidayNames.json"
// import  holidays from "../dateData/holidaysNames.json"
// import HolidaysModel from "@/server/models/holidays.model"
// // import { cookies } from "next/headers";
// // import { createQuestionService } from "../services/question.service"



// export const createQuestionAction = async (prevState, fd) => {
//   async function insertHolidays(holidays) {
//     try {
//       await connect()
  
//       for (const holiday of holidays) {
//         const newHoliday = new HolidaysModel({
//           name: holiday.hebrewName,
//           englishName: holiday.englishName,
          
//           type: 'holiday', // או 'parasha' לפי הצורך
//           // type: 'parasha', // או 'holiday' לפי הצורך
//         });
  
//         await newHoliday.save();
//         console.log(`הוכנס בהצלחה: ${holiday.hebrewName}`);
//       }
  
//       console.log('כל החגים הוכנסו בהצלחה');
//     } catch (error) {
//       console.error('שגיאה בהכנסת החגים:', error);
//     } finally {
//       // ניתוק מהמסד נתונים
//       // await mongoose.disconnect();
//     }
//   }
  
//   // קריאת קובץ ה-JSON
//   // const holidays = JSON.parse(holiday20Years);
  
//   // הרצת הפונקציה
//   insertHolidays(holidays);
// }


// async function insertTorahPortions() {
//     try {
//         await connectToMongo()
//       // שליפת החומשים הקיימים
//       const chumashim = await tagsModel.find({ name: { $in: [
//         'ספר בראשית', 'ספר שמות', 'ספר ויקרא', 'ספר במדבר', 'ספר דברים'
//       ]}});
  
//       if (chumashim.length !== 5) {
//         throw new Error('לא נמצאו כל חמשת החומשים במסד הנתונים');
//       }
  
//       console.log('החומשים נשלפו בהצלחה');
  
//       // פונקציה עזר לקביעת החומש של כל פרשה
//       function getChumashIndex(index) {
//         if (index <= 11) return 0; // בראשית
//         if (index <= 22) return 1; // שמות
//         if (index <= 33) return 2; // ויקרא
//         if (index <= 42) return 3; // במדבר
//         return 4; // דברים
//       }
  
//       // הכנסת הפרשות
//       for (let i = 0; i < parashiot.length; i++) {
//         const portion = parashiot[i];
//         const chumashIndex = getChumashIndex(i);
        
//         const newPortion = await create({
//           name: `פרשת ${portion.hebrewName}`,
//           description: `פרשת ${portion.hebrewName}`,
//           isActive: true,
//           parent: chumashim[chumashIndex]._id
//         });
  
//         console.log(`הוכנס בהצלחה: פרשת ${portion.hebrewName}`);
  
//         // עדכון החומש עם הפרשה החדשה
//         await tagsModel.findByIdAndUpdate(
//           chumashim[chumashIndex]._id,
//           { $push: { children: newPortion._id } }
//         );
//       }
  
//       console.log('כל הפרשות הוכנסו בהצלחה');
//       return NextResponse.json(await readRelevantQaService())
//     } catch (error) {
//       console.error('שגיאה בהכנסת הפרשות:', error);
//     } finally {
//       // ניתוק מהמסד נתונים
//     //   await mongoose.disconnect();
//     }
//   }

        // // שליפת החומשים הקיימים
        // const chumashim = await tagsModel.find({ name: { $in: [
        //   'ספר בראשית', 'ספר שמות', 'ספר ויקרא', 'ספר במדבר', 'ספר דברים'
        // ]}});
    
        // if (chumashim.length !== 5) {
        //   throw new Error('לא נמצאו כל חמשת החומשים במסד הנתונים');
        // }
    
        // console.log('החומשים נשלפו בהצלחה');
    
        // // פונקציה עזר לקביעת החומש של כל פרשה
        // function getChumashIndex(index) {
        //   if (index <= 11) return 0; // בראשית
        //   if (index <= 23) return 1; // שמות
        //   if (index <= 36) return 2; // ויקרא
        //   if (index <= 48) return 3; // במדבר
        //   return 4; // דברים
        // }
    
        // // הכנסת הפרשות
        // for (let i = 0; i < parashiot.length; i++) {
        //   const portion = parashiot[i];
        //   const chumashIndex = getChumashIndex(i);
          
        //   const newPortion = await create({
        //     name: `פרשת ${portion.hebrewName}`,
        //     description: `פרשת ${portion.hebrewName}`,
        //     isActive: true,
        //     parent: chumashim[chumashIndex]._id
        //   });
    
        //   console.log(`הוכנס בהצלחה: פרשת ${portion.hebrewName}`);
    
        //   // עדכון החומש עם הפרשה החדשה
        //   await tagsModel.findByIdAndUpdate(
        //     chumashim[chumashIndex]._id,
        //     { $push: { children: newPortion._id } }
        //   );
        // }


  //       try{
  //         // Fetch all parasha objects
  //   const parashas = await HolidaysModel.find({ type: 'parasha' });

  //   // Fetch all tags
  //   const tags = await tagsModel.find();

  //   for (const parasha of parashas) {
  //     // Find the matching tag
  //     const matchingTag = tags.find(tag => {
  //       // Remove "פרשת " from the tag name and compare with parasha name
  //       const tagNameWithoutPrefix = tag.name.replace(/^פרשת /, '');
  //       return tagNameWithoutPrefix === parasha.name;
  //     });

  //     if (matchingTag) {
  //       // Update the parasha's tags array
  //       await HolidaysModel.findOneAndUpdate(parasha._id, { 
  //         $addToSet: { tags: matchingTag._id } 
  //       });
  //       console.log(`Updated tags for parasha: ${parasha.name}`);
  //     } else {
  //       console.log(`No matching tag found for parasha: ${parasha.name}`);
  //     }
  //   }

  //   console.log('Finished updating parasha tags');
  // } catch (error) {
  //   console.error('Error updating parasha tags:', error);
  // }



  // async function processQuestionsAndTags(dryRun = true) {

//     const cleanContentForSearch = (text) => {
//         return text
//             // שלב 2: החלפת כל התווים שאינם אותיות עבריות, גרשיים, מרכאות או רווחים ברווח בודד
//             .replace(/[^\u0590-\u05FF\s'"]/g, ' ')
//             // שלב 3: החלפת רצף של רווחים ברווח בודד
//             .replace(/\s+/g, ' ')
//             // שלב 4: הסרת רווחים מתחילת וסוף המחרוזת
//             .trim()
//             // שלב 5: החלפת גרשיים ומרכאות בגרסאות סטנדרטיות
//             .replace(/['"]/g, '"')
//             // שלב 1: הסרת תווים אלכסוניים
//             .replace(/\\/g, '');
//     };

//     const cleanTag = (tag) => {
//         return tag
//             .replace(/^(פרשת|ספר)\s+/g, '')
//             .replace(/\b(ו)(\S+)/g, '$2')
//             .replace(/,/g, '')
//             .trim();
//     };

//     const updateTagMap = (tagMap, tag) => {
//         const cleanedTag = cleanTag(tag);

//         if (cleanedTag) {
//             if (!tagMap.has(cleanedTag)) {
//                 tagMap.set(cleanedTag, new Set());
//             }
//             tagMap.get(cleanedTag).add(tag._id);
//         }
//     };





//     try {

//         await connect()
//         // 1. טעינת כל התגיות
//         const allTags = await tagsModel.find({ isActive: true });

//         // 2. יצירת מנגנון חיפוש יעיל
//         const tagMap = new Map();
//         // אם מעוניינים לפצל תגיות למילים בודדות
//         // allTags.forEach(tag => {
//         //   const words = tag.name.toLowerCase().split(/\s+/);
//         //   words.forEach(word => {
//         //     if (!tagMap.has(word)) {
//         //       tagMap.set(word, new Set());
//         //     }
//         //     tagMap.get(word).add(tag._id);
//         //   });
//         // אחרת
//         allTags.forEach(tag => {

//             if (!tagMap.has(tag)) {
//                 tagMap.set(tag, new Set());
//             }

//             tagMap.get(tag).add(tag._id);

//             // הכנה לעתיד: אם יש מערך של מילים קשורות, נוסיף גם אותן
//             // if (tag.relatedWords) {
//             //     tag.relatedWords.forEach(word => {
//             //         if (!tagMap.has(word)) {
//             //             tagMap.set(word, new Set());
//             //         }
//             //         tagMap.get(word).add(tag._id);
//             //     });
//             // }
//         });


//         // 3. עיבוד השאלות והתשובות
//         const questions = await QAModel.find({ isActive: true });

//         let changesLog = [];

//         for (const question of questions) {
//             //שרשור כותרת שאלה ותשובה
//             // מחיקת תווים בעייתים מלבד גרשיים
//             const contentToSearch = cleanContentForSearch(`${question.title || ''} ${question.question} ${question.answer}`);
//             // מערך
//             const words = contentToSearch.split(/\s+/);
//             // console.log("🚀 ~ words:", words)
//             // סט למניעת כפילויות
//             const foundTags = new Set();

//             words.forEach(word => {
//                 console.log(word)
//                 if (tagMap.has(word)) {

//                     tagMap.get(word).forEach(tagId => foundTags.add(tagId.toString()));
//                 }
//             });

//             // 4. הכנת השינויים המוצעים
//             const existingTags = new Set(question.tags.map(tag => tag.toString()));
//             const newTags = Array.from(foundTags).filter(tag => !existingTags.has(tag));

//             if (newTags.length > 0) {
//                 const proposedChanges = {
//                     questionId: question._id,
//                     currentTags: question.tags,
//                     proposedNewTags: newTags,
//                     proposedFullTagSet: [...question.tags, ...newTags]
//                 };

//                 changesLog.push(proposedChanges);


//                 if (!dryRun) {
//                     question.proposedTags = proposedChanges.proposedFullTagSet;
//                     await question.save();
//                     console.log(`Updated question ${question._id} with ${newTags.length} new proposed tags`);
//                 } else {
//                     console.log(`[DRY RUN] Would update question ${question._id} with ${newTags.length} new tags`);
//                 }
//             } else {
//                 // console.log(`No new tags found for question ${question._id}`);
//             }
//         }
//         console.log(changesLog)
//         console.log('Finished processing all questions');
//         return changesLog;
//     } catch (error) {
//         console.error('Error processing questions and tags:', error);
//         return null;
//     }
// }

// export default processQuestionsAndTags;


async function processQuestionsAndTags(dryRun = true) {
      const cleanContentForSearch = (text) => {
          return text
              .replace(/[^\u0590-\u05FF\s'"]/g, ' ')
              .replace(/\s+/g, ' ')
              .trim()
              .replace(/['"]/g, '"')
              .replace(/\\/g, '');
      };
  
      const cleanTag = (tag) => {
          return tag
              .toLowerCase()
              .replace(/^(פרשת|ספר)\s+/g, '')
              .replace(/\b(ו)(\S+)/g, '$2')
              .replace(/,/g, '')
              .trim();
      };
  
      try {
          await connect();
          const allTags = await tagsModel.find({ isActive: true });
  
          // יצירת מפת תגים מנוקים
          const tagMap = new Map();
          allTags.forEach(tag => {
              const cleanedTagName = cleanTag(tag.name);
              const words = cleanedTagName.split(/\s+/);
              words.forEach(word => {
                  if (!tagMap.has(word)) {
                      tagMap.set(word, new Set());
                  }
                  tagMap.get(word).add(tag._id.toString());
              });
          });
  
          const questions = await QAModel.find({ isActive: true });
          let changesLog = [];
  
          for (const question of questions) {
              const contentToSearch = cleanContentForSearch(`${question.title || ''} ${question.question} ${question.answer}`);
              const words = contentToSearch.split(/\s+/);
              const foundTags = new Set();
  
              words.forEach(word => {
                  const cleanedWord = cleanTag(word);
                  if (tagMap.has(cleanedWord)) {
                      tagMap.get(cleanedWord).forEach(tagId => foundTags.add(tagId));
                  }
              });
  
              const existingTags = new Set(question.tags.map(tag => tag.toString()));
              const newTags = Array.from(foundTags).filter(tag => !existingTags.has(tag));
  
              if (newTags.length > 0) {
                  const proposedChanges = {
                      questionId: question._id,
                      currentTags: question.tags,
                      proposedNewTags: newTags,
                      proposedFullTagSet: [...question.tags, ...newTags]
                  };
  
                  changesLog.push(proposedChanges);
  
                  if (!dryRun) {
                      question.proposedTags = proposedChanges.proposedFullTagSet;
                      await question.save();
                      console.log(`Updated question ${question._id} with ${newTags.length} new proposed tags`);
                  } else {
                      console.log(`[DRY RUN] Would update question ${question._id} with ${newTags.length} new tags`);
                  }
              }
          }
  
          console.log('Finished processing all questions');
          return changesLog;
      } catch (error) {
          console.error('Error processing questions and tags:', error);
          return null;
      }
  }
  
  export default processQuestionsAndTags;
  
  