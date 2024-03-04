
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState, useContext, useEffect } from "react";
import DataContext from '../../contexts';
import DataContext2 from '../../contexts/index2';
import Search from "./Search"
import AdditionPopUp from '../AdditionPopUp';
import Swal from 'sweetalert2';
import ParashasNav from '../layout/ParashasNav';
import { FiFeather } from 'react-icons/fi';
import { FiTrash2 } from "react-icons/fi";
import Cookies from "js-cookie";


export default function AllPosts({userId, adminMode}) {
    const { setMessage,  message, navigate} = useContext(DataContext)
    const {setOriginalData, setFilteredData} = useContext(DataContext2)
    // const navigate = useNavigate();
    const [showEditor, setShowEditor] = useState(false);
    const [myPosts, setMyPosts] = useState([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const tag = searchParams.get('tag');
    const subtopic = searchParams.get('parasha');
    // console.log(tag || "tag", subtopic || "subtopic", adminMode ||"adminMode");



    // מחיקה
    async function deletePost(item) {
        console.log(item);
        try {
            let response = await fetch(`http://localhost:4002/api/posts/${item.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    // 'auth': localStorage.getItem('auth') || '',
                    'authorization': localStorage.getItem('Authorization') || ''
                },
            });
            if (!response.ok) {
                console.log("problem deleting post");
                throw new Error(`Failed to delete post! Status: ${response.status}`);
            }
            // alert(`Post ${item.id} deleted`) 
            setOriginalData(prevOriginalData => prevOriginalData.filter(obj => obj.id !== item.id));
            setFilteredData(prevFilteredData => prevFilteredData.filter(obj => obj.id !== item.id));
            //   setMessage(`Post ${item.id} deleted`) 
            alert(`Post ${item.id} deleted`)
            navigate(`/home`)
        }
        catch (error) {
            alert(`Post ${item.id} not deleted`)
            console.error(error.message);

        }
    }




    return (
        <>
            <div className="py-24 bg-white sm:py-32">

                <div className="px-6 mx-auto max-w-7xl lg:px-8">
                    <div className="max-w-2xl mx-auto lg:mx-0">
                        {/* <h2 className="text-3xl font-bold tracking-tight text-center text-gray-900 sm:text-4xl">{parasha || "פרשת השבוע"}</h2>
                    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span> */}
                        {/* <p className="mt-2 text-lg leading-8 text-gray-600">
                        Learn how to grow your business with our expert advice.
                    </p> */}


                    </div>
                    {!showEditor && <Search
                        setMyPosts={setMyPosts}
                        tag={tag}
                        subtopic={subtopic}
                    />}
                    <button onClick={() => setShowEditor(true)} > <FiFeather size={"20px"} /><span>הוסף מאמר </span></button>
                    {message && <p style={{ color: 'red' }}>{message}</p>}
                    <div className="grid max-w-2xl grid-cols-1 pt-10 mx-auto mt-10 border-t border-gray-200 gap-x-8 gap-y-16 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3  ">
                        {myPosts.map((post) => (
                            <article key={post.id} className="flex flex-col items-center justify-between max-w-xl hover:bg-gray-100 border border-gray-300 shadow-md truncate rounded-md">
                                <div className="flex items-center text-xs gap-x-4">
                                    <time dateTime={post.datetime} className="text-gray-500">
                                        {post.created_at.split('T')[0]}
                                    </time>
                                    <a className="relative z-1 rounded-full bg-gray-50 px-4 py-4  mt-2 font-medium text-gray-600 hover:bg-gray-100 " >
                                        {post.subtopic}
                                    </a>
                                </div>
                                <div onClick={() => { navigate(`/post/${post.id}`) }} className="relative group">
                                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                        <a href={post.href}>
                                            <span className="absolute inset-0 " />
                                            <p style={{ wordWrap: "break-word" }} className="text-right m-6 overflow-wrap-normal ">{post.title}</p>
                                        </a>
                                    </h3>
                                    {/* <p className="mt-5 text-sm leading-6 text-gray-600 line-clamp-3">{post.title}</p> */}
                                </div>
                                <div className="relative flex items-center mt-8 gap-x-4">
                                    {/* <img src={post.author.imageUrl} alt="" className="w-10 h-10 rounded-full bg-gray-50" /> */}
                                    <div className="text-sm leading-6">
                                        <p className="font-semibold text-gray-900">
                                            {/* <a href={post.author.href}>
                          <span className="absolute inset-0" />
                          {post.author.name}
                        </a> */}
                                        </p>
                                        {/* <p className="text-gray-600">{post.author.role}</p> */}
                                    </div>
                                {adminMode &&   <button
                                        type="button"
                                        className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                        onClick={() => deletePost(post)}
                                    >
                                        <span className="text-lg font-bold text-gray-500"><FiTrash2 /></span>
                                    </button>}
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
                <ParashasNav />

            </div>
            {showEditor &&
                <AdditionPopUp userId={userId} showEditor={showEditor} setShowEditor={setShowEditor} />}
        </>
    )
}
