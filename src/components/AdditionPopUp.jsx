import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';
import PostCreation from './posts/PostCreation';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Message from './Message';

export default function AdditionPopUp({ showEditor, setShowEditor }) {
  const [complete, setComplete] = useState(false)
  const [send, setSend] = useState(false)
  const [message, setMessage] = useState(null);


    // איפוס הודעות מערכת
    useEffect(() => {
      if (message !== "") {
        setTimeout(() => {
          setMessage(null);
        }, 8000);
      }
    }, [message]);


  return (

    <Modal
      isOpen={showEditor}
      onRequestClose={setShowEditor}
      // contentLabel="Modal"
      // ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          maxWidth: '1200px',
          // minHeight: '700px',
          // height: '200px',
          margin: 'auto',
          borderRadius: "10px",
          textAlign: "center"
        },
      }}
    >

      <PostCreation send={send} setComplete={setComplete} setShowEditor={setShowEditor} setMessage={setMessage} setSend={setSend} />
      <div style={{ position: "absolute", bottom: "10px", display: "flex", gap: "1rem" }}>
        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => setShowEditor(false)}>סגור</Button>
        <Button disabled={!complete} variant="contained" endIcon={<SendIcon />} onClick={() => {
          // addNewPost();
          setSend(true)
        }}  >שלח</Button>
      </div>
      {message && <Message message={message} />}
    </Modal>





  );
};
