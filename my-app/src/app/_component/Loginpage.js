"use client";
import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import Styles1 from "@/style/style1";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Login = () => {
  const [emailId, setemailId] = useState("");
  const [password, setpassword] = useState("");
  const [role, setRole] = useState("customer");
  const route = useRouter();
  const loginHandle = async () => {
    if (!emailId || !password) {
      toast.error("Please fill all fields");
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
          body: JSON.stringify({ emailId, password, login: true }),
          credentials: "include",
        });
      } else if (role == "customer") {
        response = await fetch("/api/customer", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emailId, password, login: true }),
          credentials: "include",
        });
      } else {
        response = await fetch("/api/deliverypatner", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emailId, password, login: true }),
          credentials: "include",
        });
      }
      response = await response.json();
      console.log(response);
      if (response.success) {
        const { result } = response;
        delete result.password;
        localStorage.setItem("restaurantUser", JSON.stringify(result));
        toast.success("login successful");
        console.log("login successful");
        role === "hotelOwner"
          ? route.push("/restaurant/hotel/dashboard")
          : role == "customer"
            ? route.push("/restaurant/user/dashboard")
            : route.push("/restaurant/deliverypatner/dashboard");
      } else {
        alert("login failed");
      }
    } catch (err) {
      console.error("Request failed:", err);
      toast.error("Something went wrong. Try again.");
    }
  };
  return (
    <div className={Styles1.login}>
      <h2 className={Styles1.title}>Login</h2>
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
          onClick={() => setRole("deliveryPatner")}
          className={`px-1 py-0.5 rounded border
          ${role === "deliveryPatner" ? "bg-black text-white" : ""}
        `}
        >
          delivery Patner
        </button>
      </div>
      <div className="py-4">
        <Button title={"Login"} onClick={loginHandle} />
      </div>
    </div>
  );
};

export default Login;
