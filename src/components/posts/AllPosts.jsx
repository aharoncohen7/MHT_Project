
import React, { useState, useContext } from "react";
import DataContext from '../../contexts';
import DataContext2 from '../../contexts/index2';
import Search from "./Search"
import PopUp from '../PopUp';
import Swal from 'sweetalert2';
import ParashaNav from '../layout/ParashaNav';
import { FiFeather } from 'react-icons/fi';
import { FiTrash2 } from "react-icons/fi";
import { deletePost2 } from "../../functions/postFunctions"
import Cookies from "js-cookie";


// שינוי מבנה תאריך יצירת מאמר
function formatDate(dateString) {
    const parts = dateString.split('T')[0].split("-");
    return `${parts[2]}-${parts[1]}-${parts[0].slice(2)}`;
}



export default function AllPosts() {
    const {userId, adminMode, setMessage, message,logOut, navigate} = useContext(DataContext)
    const {setOriginalData} = useContext(DataContext2)
    const [showEditor, setShowEditor] = useState(false);
    const [sortedList, setSortedList] = useState([]);
    
    

    function importedDelete(item) {
        deletePost2(item, setOriginalData, setMessage, logOut, navigate)
    }


    function extractTextBetweenTags(html) {
        const regex = /<[^>]+>([^<]*)<\/[^>]+>/g; // פסקלות רגולריות לזיהוי תגיות HTML
        const matches = html.matchAll(regex); // מצא את כל ההתאמות לתגיות בטקסט
        let result = ''; // תוכן הטקסט בין התגיות
    
        for (const match of matches) {
            result += match[1].trim(); // הוסף את התוכן שנמצא בין התגיות לתוך התוצאה
        }
        return result.substring(0, 50);
    }
    
    

       //עריכה 
    async function adminEdit(item) {
         item.tags
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

      try {
        const response = await fetch(`https://vortly.onrender.com/api/posts/${item.id}`, {
            method: 'PATCH',
            body: JSON.stringify({
                selectedBook: item.topic ,
                selectedPortion: item.subtopic,
                title: result.value.title,
                body: result.value.body,
                tags: [],
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
               
                'authorization': localStorage.getItem('Authorization') || ''
            },
        });
        // console.log(response);
        if (response.status === 400 || response.status === 404) {
            console.log("400/404");
            const errorMessage = await response.text();
            console.log('Post not updated' + errorMessage);
            setMessage(['Post not updated ' + errorMessage, false])
            if (response.status == 401) {
                logOut()
            }
            throw new Error(`Failed to update post! Status: ${response.status}`);
        }
        const newPost = await response.json();
        // console.log(newPost);
        setOriginalData(prevOriginalData => prevOriginalData.filter(obj => obj.id !== item.id));
        setOriginalData(prevOriginalData => [...prevOriginalData, newPost]);
        setMessage(['Post updated successfully', true]);
    }
    catch (error) {
        console.error(error.message);
    }
  }



    return (
        <>
            <div className="py-24 sm:py-32">
                <div className="px-6 mx-auto max-w-7xl lg:px-8">
                    <div className="max-w-2xl mx-auto lg:mx-0">
                        {/* <h2 className="text-3xl font-bold tracking-tight text-center text-gray-900 sm:text-4xl">{parasha || "פרשת השבוע"}</h2>
                    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span> */}
                        {/* <p className="mt-2 text-lg leading-8 text-gray-600">
                        Learn how to grow your business with our expert advice.
                    </p> */}


                    </div>
                    {!showEditor && <Search setSortedList={setSortedList} />}
                    {!showEditor && <button className= "z-20 fixed bottom-6 sm:bottom-14 left-6 sm:left-14 bg-gray-700 rounded-full text-gray-700 hover:bg-gray-900 hover:text-gray h-14 sm:h-20 w-14 sm:w-20 px-4 sm:px-5 text-sm font-medium" onClick={() => setShowEditor(true)} > <FiFeather className="text-white size-6 sm:size-10 ml-0" /> </button>}
                   
                    {message && <p style={{ color: 'red' }}>{message}</p>}
                    <div className="mb-20 grid max-w-2xl grid-cols-1 pt-10 mx-auto border-t border-gray-200 gap-x-8 gap-y-16 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3  ">
                        {sortedList.map((post) => (
                            <article  key={post.id} className="bg-white flex flex-col items-center justify-between max-w-xl hover:bg-gray-100 border border-gray-300 shadow-md truncate rounded-md">
                                <div className="flex items-center text-xs gap-x-4">
                                    <p className="text-gray-500">
                                        {formatDate(post.created_at)}
                                    </p>
                                    <div className="text-sm leading-6">
                                        <p className="font-semibold text-gray-900">
                                           {/* <span className="absolute inset-0" /> */}
                                           {post.author} :מחבר
                                        </p>
                                    </div>
                                    <a className="relative z-1 rounded-full bg-gray-50 px-4 py-4  mt-2 font-medium text-gray-600 hover:bg-gray-100 " >
                                        {post.subtopic}
                                    </a>
                                </div>
                                <div onClick={() => { navigate(`/post/${post.id}`) }}  className="relative group">
                                   
                                
                                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        
                                            <span className="absolute inset-0 " />
                                            <p style={{ wordWrap: "break-word" }} className=" ml-20 mr-20 text-right m-6 overflow-wrap-normal ">{post.title}
                                            </p>
                                        <p className='ml-20 mr-20 text-sm leading-6 text-gray-600 line-clamp-3'>
                                            {extractTextBetweenTags(post.body)}
                                        </p>
                                    </h3>
                                    <p className="ml-20 mt-5  text-sm leading-6 text-gray-600 line-clamp-3">{"<<קרא עוד"}</p>
                                </div>
                                <div className="relative flex items-center mt-8 gap-x-4">
                                {adminMode &&  <> <button
                                        type="button"
                                        className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        onClick={() => importedDelete(post)}
                                    >
                                        <span className="text-lg font-bold text-gray-500"><FiTrash2/></span>
                                    </button>
                                     <button
                                     type="button"
                                     className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                     onClick={() => adminEdit(post)}
                                 >
                                     <span className="text-lg font-bold text-gray-500">✏️</span>
                                 </button></>
                                    }
                                </div>
                            </article>
                        ))}
                    </div>
                    <div className="border-t mt-10 ">
                    <ParashaNav />
                    </div>
                </div>
               

            </div>
            {showEditor &&
                <PopUp userId={userId} showEditor={showEditor} setShowEditor={setShowEditor} />}
        </>
    )
}















    // // מחיקה
    // async function deletePost(item) {
    //     console.log(item);
    //     try {
    //         let response = await fetch(`https://vortly.onrender.com/api/posts/${item.id}`, {
    //             method: 'DELETE',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                
    //                 'authorization': localStorage.getItem('Authorization') || ''
    //             },
    //         });
    //         if (!response.ok) {
    //             console.log("problem deleting post");
    //             throw new Error(`Failed to delete post! Status: ${response.status}`);
    //         }
    //         // alert(`Post ${item.id} deleted`) 
    //         setOriginalData(prevOriginalData => prevOriginalData.filter(obj => obj.id !== item.id));
    //         
    //         alert(`Post ${item.id} deleted`)
    //         navigate(`/home`)
    //     }
    //     catch (error) {
    //         alert(`Post ${item.id} not deleted`)
    //         console.error(error.message);

    //     }
    // }
