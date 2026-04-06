"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useContext } from "react";
import { cartContext } from "@/app/context/cartcontext";

const page = ({ params }) => {
  const [restrodetail, setrestrodetail] = useState({});
  const [fooditemlist, setfooditemlist] = useState([]);
  const { idlist, cartlist, setcartlist } = useContext(cartContext);

  useEffect(() => {
    loadrestrodetail();
  }, []);
  const loadrestrodetail = async () => {
    const { id } = await params;
    let response = await fetch(
      "http://localhost:3000/api/customer/foodlist/" + id,
    );
    response = await response.json();
    if (response.success) {
      setrestrodetail(response.hoteldetail);
      setfooditemlist(response.foodlist);
    }
  };

  const addtocart = (item) => {
    if (cartlist.length > 0 && cartlist[0].restro_id !== item.restro_id) {
      setcartlist([item]);
    } else {
      setcartlist((prev) => [...prev, item]);
    }
  };
  const removefromcart = (item) => {
    setcartlist((prev) => prev.filter((element) => element._id !== item._id));
  };
  return (
    <div className="w-full">
      <div
        className="
      h-80 w-full bg-cover bg-center relative
      flex items-center justify-center
      before:absolute before:inset-0
      before:bg-black/50
      before:content-['']
      before:z-0
    "
        style={{ backgroundImage: "url('/background.png')" }}
      >
        <div className="relative z-10 flex gap-4 w-[80%] max-w-2xl">
          <h1 className="text-white text-5xl">{restrodetail?.name}</h1>
        </div>
      </div>
      <div className="w-full bg-green-100 border border-green-300 rounded-lg shadow-sm p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-sm text-gray-800">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-green-700">Address:</span>
            <span>{restrodetail?.city}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-green-700">Latitude:</span>
            <span>{restrodetail?.location?.lat}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-green-700">Longitude:</span>
            <span>{restrodetail?.location?.lon}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-green-700">Contact:</span>
            <span>{restrodetail?.emailId}</span>
          </div>
        </div>
      </div>
      <div className="space-y-6 mt-10">
        {fooditemlist.length === 0 ? (
          <h1 className="text-center text-gray-500 text-lg">
            No food items present
          </h1>
        ) : (
          fooditemlist.map((item) => (
            <div
              key={item._id}
              className="flex flex-col w-[80%] ml-[10%] md:flex-row items-center 
                   justify-between gap-6 
                   p-4 border rounded-lg shadow-sm 
                   hover:shadow-md transition"
            >
              <div className="relative shrink-0 w-full h-50 md:w-32 md:h-32">
                <Image
                  src={item?.path}
                  alt={item.foodItem}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-xl font-semibold text-gray-800">
                  {item.foodItem}
                </h2>
                <p className="text-gray-500 mt-1">{item.description}</p>
                <p className="text-green-600 font-bold mt-2">₹{item.price}</p>
              </div>
              <div className="flex gap-3">
                {idlist.includes(item._id) ? (
                  <button
                    className="bg-red-400 hover:bg-red-500 
                             text-white px-4 py-2 
                             rounded-md transition"
                    onClick={() => removefromcart(item)}
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    className="bg-green-400 hover:bg-green-500 
                             text-white px-4 py-2 
                             rounded-md transition"
                    onClick={() => addtocart(item)}
                  >
                    Add
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default page;
