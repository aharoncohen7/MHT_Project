
import Login from './Login'
import Register from './Register';
import React, { useState } from 'react';

export default function SignIn() {
  const [isNew, setIsNew] = useState(true);



  return (
    <>
      {isNew && <Login setIsNew={setIsNew}
      //  setUserName={(userName) => setUserName(userName)} setUserID={(userId) => setUserID(userId)}
      />
        || <Register setIsNew={setIsNew}
        //  setUserName={(userName) => setUserName(userName)} setUserID={(userId) => setUserID(userId)}
        />
      }
    </>
  )
}
