import React, { useContext, useEffect, useState } from 'react'
import Modal from 'react-modal';
import Editor from './posts/Editor';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import UserContext from '../contexts';

export default function PopUp({ showEditor, setShowEditor}) {
  const [complete, setComplete] = useState(false)
  const [send, setSend] = useState(false)
  const { userId } = useContext(UserContext)
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

      <Editor send={send} setSend={setSend} setComplete={setComplete} setShowEditor={setShowEditor} />
      {/* <div style={{ position: "absolute", bottom: "10px", display: "flex", gap: "1rem" }}>
        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => setShowEditor(false)}>ביטול</Button>
        <Button disabled={!complete} variant="contained" endIcon={<SendIcon />} onClick={() => {
          setSend(true)
        }}  >שלח</Button>
      </div> */}
    </Modal>


// ⭐️⭐️⭐️⭐️⭐


  );
};
