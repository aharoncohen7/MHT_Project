import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-modal';
import PostEditor from './posts/PostEditor';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import DataContext from '../contexts';

export default function PopUp({ showEditor, setShowEditor}) {
  const [complete, setComplete] = useState(false)
  const [send, setSend] = useState(false)
  const [message, setMessage] = useState(null);
  const { userId } = useContext(DataContext)
  console.log(userId);
  Modal.setAppElement('#root')


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

      <PostEditor send={send} setSend={setSend} setComplete={setComplete} setShowEditor={setShowEditor} />
      <div style={{ position: "absolute", bottom: "10px", display: "flex", gap: "1rem" }}>
        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => setShowEditor(false)}>⭐️⭐️⭐️⭐️⭐סגור</Button>
        <Button disabled={!complete} variant="contained" endIcon={<SendIcon />} onClick={() => {
          // addNewPost();
          setSend(true)
        }}  >שלח</Button>
      </div>
    </Modal>





  );
};
