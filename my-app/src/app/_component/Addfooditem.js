"use client";

import Input from "./Input";
import Button from "./Button";
import { useState } from "react";
import Styles1 from "@/style/style1";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Addfooditem = ({ setDashboard }) => {
  const [foodItem, setfoodItem] = useState("");
  const [price, setprice] = useState("");
  const [path, setpath] = useState("");
  const [description, setdescription] = useState("");
  const addfooditemhandle = async () => {
    if (!foodItem || !price || !path || !description) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      let response = await fetch(
        "http://localhost:3000/api/restaurant/fooditem",
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            foodItem,
            price,
            path,
            description,
          }),
        },
      );
      response = await response.json();
      if (response.success) {
        console.log(response.result);
        toast.success("food added successfully");
        setDashboard(true);
      } else {
        alert("add food item failed");
      }
    } catch (err) {
      console.error("Request failed:", err);
      toast.error("Something went wrong. Try again.");
    }
  };
  return (
    <div className={Styles1.login}>
      <h1 className={Styles1.title}>Add food Item</h1>
      <div className={Styles1.form}>
        <Input
          type={"text"}
          title={"Enter food name"}
          placeholder={"eg:biryani"}
          value={foodItem}
          onChange={(e) => setfoodItem(e.target.value)}
        />
        <Input
          type={"text"}
          title={"Enter price"}
          placeholder={"eg:100Rs"}
          value={price}
          onChange={(e) => setprice(e.target.value)}
        />
        <Input
          type={"text"}
          title={"Enter path"}
          placeholder={"eg:abc.jpg"}
          value={path}
          onChange={(e) => setpath(e.target.value)}
        />
        <Input
          type={"text"}
          title={"Enter description"}
          placeholder={"eg:food is tasty"}
          value={description}
          onChange={(e) => setdescription(e.target.value)}
        />
      </div>
      <div className="py-8">
        <Button title={"Add Food Item"} onClick={addfooditemhandle} />
      </div>
    </div>
  );
};

export default Addfooditem;
