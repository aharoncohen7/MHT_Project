import React, { useState, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material';
import DataContext from '../../contexts';
import MyRating from '../MyRating'
import TagList from './TagList';
import ParashaNav from '../layout/ParashaNav';
import Cookies from "js-cookie";
import DataContext2 from '../../contexts/index2';
import { importedDelete } from "../../functions/postFunctions"



// פוסט בודד בעמוד נפרד - חדש
export default function SinglePost() {
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const { postId } = useParams()
  const { setMessage,message, logOut, adminMode } = useContext(DataContext)
  const { setOriginalData, originalData } = useContext(DataContext2)

  // מצא פוסט בודד מתוך הרשימה
  useEffect(() => {
    async function fetchData() {
      const result = originalData.find(post => post.id == postId);
      if (result) {
        setItem(result);
        console.log(result)
      }
      
    }
    fetchData();
  }, [postId, originalData]);

  
// מחיקה
  function deletePost() {
    importedDelete(item, setOriginalData, setMessage, logOut, navigate)
}



  return (
    <>
      {item && (
        <div className="relative flex items-center justify-center px-6 py-24 overflow-hidden bg-white isolate sm:py-12 lg:overflow-visible lg:px-24">
          {item.subtopic && <div className="flex items-center flex-shrink-0">
            {/* <img
              className="w-auto h-20 hidden sm:ml-6 sm:block"
              src={`https://www.breslev.org/wp-content/uploads/2019/07/${item.subtopic.replace(" ", "-")}.jpg`}
              alt="הפרשה"
            /> */}
          </div>}
          <div className="absolute inset-0 overflow-hidden -z-10">
            <svg
              className="absolute left-[max(50%,25rem)] top-0 h-[44rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
              aria-hidden="true"
            >
              <defs>
                <pattern
                  id="e813992c-7d03-4cc4-a2bd-151760b470a0"
                  width={200}
                  height={200}
                  x="50%"
                  y={-1}
                  patternUnits="userSpaceOnUse"
                >
                  <path d="M100 200V.5M.5 .5H200" fill="none" />
                </pattern>
              </defs>

//lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8
              <rect width="100%" height="100%" strokeWidth={0} fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
            </svg>
          </div>
          <div className="grid max-w-2xl grid-cols-1 mx-auto text-right gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-y-10">
            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
              <div className="lg:pr-38">
                <div className="lg:max-w-lg mr-6 ">
                  <button onClick={ () =>{if(item.subtopic) navigate(`/home/?parasha=${item.subtopic}`)}} className="ml-20   leading-7 text-indigo-800 font-bold text-xl">
                    {item.subtopic ? item.subtopic : "שם הפרשה"}
                  </button>
                  
                  <h2   className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{item.title}</h2>
                  <button onClick={ () =>{ navigate(`/home/?author=${item.userId}`)}}  className="mt-6 text-xl font-bold leading-8 text-indigo-800"> {item.author} :מחבר</button>
                </div>
              </div>
             
            </div>
            <div className="z-10 -ml-8 -mt-12 p-12 lg:sticky lg:top-12 lg:col-start-2  lg:row-start-1 lg:overflow-hidden">
              {item.subtopic && <img
                className=" mb-5
                w-[48rem]  rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[26rem]"
                src={`https://www.breslev.org/wp-content/uploads/2019/07/${item.subtopic.replace(" ", "-")}.jpg`}
                alt="תמונת הפרשה"
              />}
             <span className='hidden lg:col-start-2 lg:row-start-2  lg:block mr-10  lg:sticky mb-5 
                w-[48rem] rounded-xl shadow-xl sm:w-[26rem]
                '>
                <ParashaNav /></span>
            </div>
            {/* <span className='hidden lg:col-start-2 lg:row-start-2  lg:block mr-10  lg:sticky mb-5 
                w-[48rem] rounded-xl shadow-xl sm:w-[26rem]
                '>
                <ParashaNav /></span> */}
            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
              <div className="lg:pr-4 -mt-20">
                <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                  <ul role="list" className="mt-8 space-y-8 text-gray-600">
                    {/* <p className="mt-8">{item.id}</p> */}
                  </ul>
                  <div className="mt-8">
                    <div style={{ wordWrap: "break-word" }} className=' whitespace-normal tracking-widest' dangerouslySetInnerHTML={{ __html: item.body }} />
                  </div>
                </div>
                <div>
                  <MyRating item={item} />
                </div>

                <div>
                  {item.tags !== null && <TagList postTags={item.tags} />}
                </div>

                {/* כפתורי עריכה */}
                <div className="EditButtons">
             
                    <Button variant="contained" onClick={() => navigate(-1)}>חזור</Button>
                    {message && <p style={{ color: 'red' }}>{message}</p>}
                    {adminMode &&
                    <>
                    <Button value="delete" onClick={deletePost} variant="contained">🗑️</Button>
                    <Button variant="contained" onClick={() => navigate(`/edit/${item.id}`)}>ערוך מאמר</Button>
                    </>}
                   
        
                </div>
                
                {/* <div className="hidden sm:ml-6 sm:block" style={{ top: '60px', right: '0px' }}><ParashaNav /></div> */}
              </div>
            </div>
          </div>
        </div>


      )}
    </>
  )
}






  // function processString(string) {
  //   const words = string.split(" ");
  //   if (words.length >= 2) {
  //     if (words.length >= 3) {
  //       words[1] = words[2].replace(" ", "-");
  //     } else {
  //       words[0] = words[1];
  //     }
  //     return words.slice(1).join(" ");
  //   }
  //   return string;
  // }


  // useEffect(() => { console.log(originalData, userId) }
  //   ,[postId, originalData])


  // // מחיקה
  // async function deletePost() {

  //   try {
  //     let response = await fetch(`https://vortly-db.onrender.com/api/posts/${item.id}`, {
  //       method: 'DELETE',
  //       headers: {
  //         'Content-Type': 'application/json',
  //        
  //         'authorization': localStorage.getItem('Authorization') || ''
  //       },
  //     });
  //     if (!response.ok) {
  //       console.log("problem deleting post");
  //       throw new Error(`Failed to delete post! Status: ${response.status}`);
  //     }
  //     // alert(`Post ${item.id} deleted`) 
  //     setOriginalData(prevOriginalData => prevOriginalData.filter(obj => obj.id !== item.id));
  //     setMessage([`Post ${item.id} deleted`, true])
  //     alert(`Post ${item.id} deleted`)
  //     navigate(`/`)
  //   }
  //   catch (error) {
  //     alert(`Post ${item.id} not deleted`)
  //     console.error(error.message);

  //   }
  // }
