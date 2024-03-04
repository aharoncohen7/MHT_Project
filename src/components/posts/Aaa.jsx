import React, { useState } from 'react'
import EditorPopUp from "../EditorPopUp";
import { useParams } from 'react-router-dom';

export default function Aaa() {
  const { postId } = useParams()
  console.log(postId);
  const [showEditor, setShowEditor] = useState(false);
  
  return (
    <>
    ggggggggggggggggggggggggggggggggggggggggggggggggggggggg
    gggggggggggggggggggggggggggggggggggggggggggggggggggggggg
    gggggggggggggggggggggggggggggggggggggggggggggggggggggggg
    ggggggggggggggggggggggggggggggggggggggggggggggggggggggg
    gggggggggggggggggggggggggggggggggggggggggggggggggggggggg
    gggggggggggggggggggggggggggggggggggggggggggggggggggggggg
    ggggggggggggggggggggggggggggggggggggggggggggggggggggggg
    gggggggggggggggggggggggggggggggggggggggggggggggggggggggg
    ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
    gggggggggggggggggggggggggggggggggggggggggggggggggggggggg
    gggggggggggggggggggggggggggggggggggggggggggggggggggggggg

      <span>Add new post <button className='fixed top-3 w-6 h-5 bg-black' onClick={() => setShowEditor(true)}> ➕</button>
      </span>
      <span>Add new post <button className='fixed top-6 w-6 h-5 bg-black' onClick={() => setShowEditor(true)}> ➕</button>
      </span>
      <span>Add new post <button className='fixed top-9 w-6 h-5 bg-black' onClick={() => setShowEditor(true)}> ➕</button>
      </span>
      <span>Add new post <button className='fixed top-3 w-6 h-5 bg-black' onClick={() => setShowEditor(true)}> ➕</button>
      </span>
      <span>Add new post <button className='' onClick={() => setShowEditor(true)}> ➕</button>
      </span>
      {showEditor && <EditorPopUp showEditor={showEditor} setShowEditor={setShowEditor} />}
    </>
  )
}
