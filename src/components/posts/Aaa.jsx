import React, { useState } from 'react'
import EditorPopUp from "../EditorPopUp";

export default function Aaa () {
    const [showEditor, setShowEditor] = useState(true);
console.log("dgdfgdsgfdgfdg");




  return (
    <>
     <span>Add new post <button className='fixed top-3 w-6 h-5 bg-black' onClick={() => setShowEditor(true)}> ➕</button></span>
   {showEditor && <EditorPopUp showEditor={showEditor} setShowEditor={setShowEditor}/>}
   </>
  )
}
