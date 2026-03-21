"use client";

import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import Styles1 from "@/style/style1";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Signup = () => {
  let [emailId, setemailId] = useState("");
  let [password, setpassword] = useState("");
  let [name, setname] = useState("");
  let [city, setcity] = useState("");
  let [add, setadd] = useState("");
  const [role, setRole] = useState("customer");
  const route = useRouter();

  const signuphandle = async () => {
    if (!emailId || !password) {
      toast.error("Please fill all fields");
      return;
    }
    if (role === "hotelOwner" && !name) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      let response;
      if (role === "hotelOwner") {
        response = await fetch("http://localhost:3000/api/restaurant", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emailId, password, name, city, add }),
          credentials: "include",
        });
      } else {
        response = await fetch("http://localhost:3000/api/customer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emailId, password, city, add }),
          credentials: "include",
        });
      }
      response = await response.json();
      if (response.success) {
        const { result } = response;
        delete result.password;
        localStorage.setItem("restaurantUser", JSON.stringify(result));
        toast.success("Signup successful");
        console.log("Signup successful");
        role === "hotelOwner"
          ? route.push("/restaurant/hotel/dashboard")
          : route.push("/restaurant/user/dashboard");
      } else {
        alert("signup failed");
      }
    } catch (err) {
      console.error("Request failed:", err);
      toast.error("Something went wrong. Try again.");
    }
  };
  return (
    <div className={Styles1.login}>
      <h2 className={Styles1.title}>Signup</h2>
      <div className={Styles1.form}>
        <Input
          type={"text"}
          title={"Email Id"}
          placeholder={"abc@gmail.com"}
          value={emailId}
          onChange={(e) => setemailId(e.target.value)}
        />
        <Input
          type={"password"}
          title={"Password"}
          placeholder={"******"}
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        {role === "hotelOwner" && (
          <Input
            type={"text"}
            title={"Enter restaurant name"}
            placeholder={"eg: khana khazana"}
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        )}
        <Input
          type={"text"}
          title={"Enter city"}
          placeholder={"eg: patna"}
          value={city}
          onChange={(e) => setcity(e.target.value)}
        />
      </div>
      <div className="flex gap-3 mt-3">
        <button
          onClick={() => setRole("customer")}
          className={`px-1 py-0.5 rounded border
          ${role === "customer" ? "bg-black text-white" : ""}
        `}
        >
          Customer
        </button>

        <button
          onClick={() => setRole("hotelOwner")}
          className={`px-1 py-0.5 rounded border
          ${role === "hotelOwner" ? "bg-black text-white" : ""}
        `}
        >
          Hotel Owner
        </button>
      </div>
      <div className="py-8">
        <Button title={"Signup"} onClick={signuphandle} />
      </div>
    </div>
  );
};

export default Signup;
