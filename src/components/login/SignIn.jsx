
import Login from './Login'
import Register from './Register';
import React, { useState } from 'react';

export default function SignIn() {
  const [isExists, setIsExists] = useState(true);

  return (
    <>
      {isExists && <Login setIsExists={setIsExists}/> || <Register setIsExists={setIsExists}/>}
    </>
  )
}
