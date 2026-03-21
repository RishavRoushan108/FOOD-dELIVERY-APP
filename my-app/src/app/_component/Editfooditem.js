"use client";

import Input from "./Input";
import Button from "./Button";
import { useState } from "react";
import Styles1 from "@/style/style1";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Editfooditem = ({ id }) => {
  const [foodItem, setfoodItem] = useState("");
  const [price, setprice] = useState("");
  const [path, setpath] = useState("");
  const [description, setdescription] = useState("");
  const route = useRouter();

  const Loadfooddetail = async () => {
    try {
      let response = await fetch(
        "http://localhost:3000/api/restaurant/fooditem/edit/" + id,
      );
      response = await response.json();
      if (response.success) {
        const { result } = response;
        setfoodItem(result.foodItem);
        setprice(result.price);
        setpath(result.path);
        setdescription(result.description);
      } else {
        throw new Error("response.success is false");
      }
    } catch (err) {
      console.log("unable to fetch the fooditem detail" + err);
      toast.error("unable to fetch the fooditem detail");
    }
  };

  useState(() => {
    Loadfooddetail();
  }, []);

  const Editfooditemhandle = async () => {
    if (!foodItem || !price || !path || !description) {
      toast.error("fill all detail");
      return;
    }
    try {
      let response = await fetch(
        "http://localhost:3000/api/restaurant/fooditem/edit/" + id,
        {
          method: "PATCH",
          body: JSON.stringify({ foodItem, price, path, description }),
        },
      );
      response = await response.json();
      if (response.success) {
        toast.success("Edited successful");
        route.push("/restaurant/hotel/dashboard");
      }
    } catch (err) {
      console.log("unable to update the fooditem detail" + err);
      toast.error("unable to update the fooditem detail");
    }
  };
  return (
    <div className={Styles1.login}>
      <h1 className={Styles1.title}>Edit food Item</h1>
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
        <Button title={"Edit Food Item"} onClick={Editfooditemhandle} />
      </div>
    </div>
  );
};

export default Editfooditem;
