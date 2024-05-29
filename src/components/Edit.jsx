import React, { useContext, useEffect, useState } from 'react'
import Editor from './posts/Editor';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { useParams } from 'react-router-dom';
import DataContext from '../contexts';

export const Edit = () => {
    const { navigate } = useContext(DataContext)
    const { postId } = useParams()
    const [complete, setComplete] = useState(false)
    const [send, setSend] = useState(false)
    const [showEditor, setShowEditor] = useState(true);


    // useEffect(() => {
    //     if (!showEditor) {
    //         navigate(`/post/${postId}`);
    //     }
    // }, [showEditor])


    return (
        <>
            <Editor send={send} setComplete={setComplete} setShowEditor={setShowEditor} setSend={setSend} />
            <div style={{ position: "absolute", bottom: "10px", display: "flex", gap: "1rem" }}>
                <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() =>  { navigate(`/post/${postId}`)}}>סגור</Button>
                <Button disabled={!complete} variant="contained" endIcon={<SendIcon />} onClick={() => { setSend(true) }}>שלח</Button>
            </div>
        </>
    )
}
