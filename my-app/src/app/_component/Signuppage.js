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
  const [role, setRole] = useState("customer");
  const [phoneNumber, setphoneNumber] = useState("");
  const route = useRouter();

  const signuphandle = async () => {
    if (!emailId || !password || !name) {
      toast.error("Please fill all fields");
      return;
    }

    if (role == "deliverypatner" && !phoneNumber) {
      toast.error("Please fill all fields");
      return;
    }

    if (role != "deliverypatner" && !city) {
      toast.error("Please fill all fields");
      return;
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailId);
    if (!isValidEmail) {
      toast.error("Enter valid emailid");
      return;
    }
    const isStrongPassword =
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[@$!%*?&]/.test(password);

    if (!isStrongPassword) {
      toast.error("Enter strong password");
      return;
    }

    try {
      let response;
      if (role === "hotelOwner") {
        response = await fetch("/api/restaurant", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emailId, password, name, city }),
          credentials: "include",
        });
      } else if (role === "customer") {
        response = await fetch("/api/customer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emailId, password, name, city }),
          credentials: "include",
        });
      } else {
        response = await fetch("/api/deliverypatner", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emailId, password, name, phoneNumber }),
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
          : role == "customer"
            ? route.push("/restaurant/user/dashboard")
            : route.push("/restaurant/deliverypatner/dashboard");
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
        {(role === "customer" || role === "deliverypatner") && (
          <Input
            type={"text"}
            title={"Enter your name"}
            placeholder={"eg: rishav"}
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        )}
        {role != "deliverypatner" && (
          <Input
            type={"text"}
            title={"Enter city"}
            placeholder={"eg: patna"}
            value={city}
            onChange={(e) => setcity(e.target.value)}
          />
        )}
        {role === "deliverypatner" && (
          <Input
            type={"number"}
            title={"Enter phone no"}
            placeholder={"eg: 840******"}
            value={phoneNumber}
            onChange={(e) => setphoneNumber(e.target.value)}
          />
        )}
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
        <button
          onClick={() => setRole("deliverypatner")}
          className={`px-1 py-0.5 rounded border
          ${role === "deliverypatner" ? "bg-black text-white" : ""}
        `}
        >
          Delivery Patner
        </button>
      </div>
      <div className="py-8">
        <Button title={"Signup"} onClick={signuphandle} />
      </div>
    </div>
  );
};

export default Signup;
