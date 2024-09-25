import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

export default function SignIn() {
  const [isExists, setIsExists] = useState(true);

  return (
    <>
      {(isExists && <Login setIsExists={setIsExists} />) || (
        <Register setIsExists={setIsExists} />
      )}
    </>
  );
}
