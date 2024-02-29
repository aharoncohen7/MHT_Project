import React, { useState, useContext, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material';
import DataContext from '../../contexts';
import PostRating from './PostRating'
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import TagList from './TagList';
import ParashasNav from '../layout/ParashasNav';

// פוסט בודד בעמוד נפרד - חדש
export default function SinglePost() {
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const { postId } = useParams()
  const { setMessage, setOriginalData, originalData, setFilteredData, userId } = useContext(DataContext)

  // מצא פוסט בודד מתוך הרשימה
  useEffect(() => {
    async function fetchData() {
      const result = originalData.find(post => post.id == postId);
      if (!result) {
        navigate(`/notfound`)
      }
      else {
        setItem(result);
      }
    }
    fetchData();
  }, [postId, originalData]);


  //כפתורי עריכה 
  async function buttonEvent(event, item) {
    let response;
    try {
      switch (event.target.value) {
        case 'delete':
          response = await fetch(`http://localhost:4002/api/posts/${item.id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'auth': localStorage.getItem('auth') || '',
              'authorization': localStorage.getItem('Authorization') || ''
            },
          });
          if (!response.ok) {
            throw new Error(`Failed to delete post! Status: ${response.status}`);
          }
          setOriginalData(prevOriginalData => prevOriginalData.filter(obj => obj.id !== item.id));
          setFilteredData(prevFilteredData => prevFilteredData.filter(obj => obj.id !== item.id));
          setMessage(`Post ${item.id} deleted`)
          return;
        case 'edit':
          const oldTitle = item.title;
          const oldBody = item.body;
          const result = await Swal.fire({
            title: 'ערוך פוסט',
            html: '<textarea id="title" style="background-color: rgba(172, 192, 389, 0.74); width: 350px; text-align: center;" class="swal2-input" placeholder="ערוך כותרת (עד 20 תווים)">' + oldTitle + '</textarea>' +
              '<textarea id="body" style="height: 300px; background-color: rgba(172, 592, 189, 0.74); width: 350px; text-align: center;" class="swal2-input" placeholder=" ערוך פוסט (עד 40 תווים)">' + oldBody + '</textarea>',
            showCancelButton: true,
            confirmButtonText: 'אישור',
            cancelButtonText: 'ביטול',
            preConfirm: () => {
              const title = document.getElementById('title').value;
              const body = document.getElementById('body').value;
              if (!title || !body) {
                Swal.showValidationMessage('אנא מלא את כל השדות');
              }
              return { title, body };
            }
          });
          if (!result.value) { return }
          response = await fetch(`http://localhost:4002/api/posts/${item.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
              title: result.value.title,
              body: result.value.body
            }),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
              'auth': localStorage.getItem('auth') || '',
              'authorization': localStorage.getItem('Authorization') || ''
            },
          })

          if (!response.ok) {
            setMessage("Failed to edit post")
            throw new Error(`Failed to edit post! Status: ${response.status}`);
          }

          setOriginalData(prevOriginalData => {
            const updatedData = [...prevOriginalData].map(obj => {
              if (obj.id === item.id) {
                return { ...obj, title: result.value.title, body: result.value.title.body };
              }
              return obj;
            });
            return updatedData;
          });

          setFilteredData(prevFilteredData => {
            const updatedData2 = [...prevFilteredData].map(obj => {
              if (obj.id === item.id) {
                return { ...obj, title: result.value.title, body: result.value.body };
              }
              return obj;
            });
            return updatedData2;
          });
          return;
        default:
          return;
      }
    }
    catch (error) {
      console.error(error.message);

    }
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
              className="absolute left-[max(50%,25rem)] top-0 h-[64rem] w-[128rem] -translate-x-1/2 stroke-gray-200 [mask-image:radial-gradient(64rem_64rem_at_top,white,transparent)]"
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
      
  
              <rect width="100%" height="100%" strokeWidth={0} fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" />
            </svg>
          </div>
          <div className="grid max-w-2xl grid-cols-1 mx-auto text-right gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center lg:gap-y-20">
            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
              <div className="lg:pr-38">
                <div className="lg:max-w-lg">
                  <p onClick={() => console.log(item)} className="text-base font-semibold leading-7 text-indigo-600">
                    {item.subtopic ? item.subtopic : "שם הפרשה"}
                  </p>
                  <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{item.title}</h1>
                  <p className="mt-6 text-xl leading-8 text-gray-700">{item.title}</p>
                </div>
              </div>
            </div>
            <div className="-ml-8 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2  lg:row-start-1 lg:overflow-hidden">
              <img
                className=" mb-5
                w-[48rem]  rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] "
                src={`https://www.breslev.org/wp-content/uploads/2019/07/${item.subtopic.replace(" ", "-")}.jpg`}
                alt="ggggg"
              />
              <span className='hidden sm:ml-6 sm:block'>
              <ParashasNav /></span>
            </div>
            <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
              <div className="lg:pr-4">
                <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">


                  <ul role="list" className="mt-8 space-y-8 text-gray-600">
                    {/* <p className="mt-8">{item.id}</p> */}
                  </ul>
                  <div className="mt-8">
                    <div className=' whitespace-normal tracking-widest'  dangerouslySetInnerHTML={{ __html: item.body }} />
                  </div>
                </div>
                <div>
                  <PostRating item={item} />

                </div>

                <div>
                  {item.tags !== null && <TagList postTags={item.tags} />}
                </div>

                {/* כפתורי עריכה */}
                {false && <div className="EditButtons" style={item.userId == userId ? { display: "inline-block" } : { display: "none" }}>
                  <label htmlFor="edit-delete">
                    <Button value="delete" onClick={(event) => buttonEvent(event, item)} variant="contained">🗑️</Button>
                    <Button value="edit" onClick={(event) => buttonEvent(event, item)} variant="contained">✏️</Button>
                  </label>
                </div>}
                <span className='absolute left-8 md:left-48 mt-6'>
                  <Button variant="contained" onClick={() => navigate(`/home/`)}>חזור</Button></span>
                {/* <Button variant="contained" onClick={() => navigate(`/edit/${item.id}`)}>Edit</Button> */}

                {/* <div className="hidden sm:ml-6 sm:block" style={{ top: '60px', right: '0px' }}><ParashasNav /></div> */}
              </div>
            </div>
          </div>
        </div>


      )}
    </>
  )
}
