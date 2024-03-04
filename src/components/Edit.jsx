import React, {  useContext, useEffect, useState } from 'react'
import PostEditor from './posts/PostEditor';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Message from './Message';
import { useParams } from 'react-router-dom';
import DataContext from '../contexts';

export const Edit = () => {
    const { setMessage,  message, navigate} = useContext(DataContext)
    const { postId } = useParams()
    console.log(postId);
    const [complete, setComplete] = useState(false)
    const [send, setSend] = useState(false)
    const [showEditor, setShowEditor] = useState(true);

    useEffect(()=>{
        if(!showEditor){
            navigate(`/post/${postId}`);
        }

    }, [showEditor])









  
    return (
        <>
            <PostEditor send={send} setComplete={setComplete} setShowEditor={setShowEditor} setMessage={setMessage} setSend={setSend} />
            <div style={{ position: "absolute", bottom: "10px", display: "flex", gap: "1rem" }}>
                <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => setShowEditor(false)}>סגור</Button>
                <Button disabled={!complete} variant="contained" endIcon={<SendIcon />} onClick={() => {
                    // addNewPost();
                    setSend(true)
                }}  >שלח</Button>
            </div>
            {message && <Message message={message} />}




        </>
    )
}
