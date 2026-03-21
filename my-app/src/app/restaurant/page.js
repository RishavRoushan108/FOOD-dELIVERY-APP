"use client";
import { useState } from "react";
import Login from "../_component/Loginpage";
import Signup from "../_component/Signuppage";

const RestaurantLogin = () => {
  const [login, setlogin] = useState(true);
  return (
    <div>
      <button onClick={() => setlogin(!login)}>
        {login ? "donot have account ? signup" : "already have account ? login"}
      </button>
      {login ? <Login /> : <Signup />}
    </div>
  );
};

export default RestaurantLogin;
