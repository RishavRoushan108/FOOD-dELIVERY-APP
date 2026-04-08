"use client";
import Showdetailid from "@/app/_component/Showdetailid";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Orderslist = () => {
  const [orderlist, setorderlist] = useState([]);
  const [showdetailid, setshowdetailid] = useState(null);
  function showdetail(_id) {
    if (showdetailid == null || showdetailid != _id) {
      setshowdetailid(_id);
    } else {
      setshowdetailid(null);
    }
  }
  const loadorderlist = async () => {
    try {
      let res = await fetch("http://localhost:3000/api/orders");
      res = await res.json();
      setorderlist(res.orderlist);
    } catch (err) {
      console.log(err);
      toast.error("failed to load detail");
    }
  };
  useEffect(() => {
    loadorderlist();
  }, []);
  return (
    <div className="w-full">
      {orderlist?.length == 0 ? (
        <div className="flex flex-col items-center justify-center mt-40 text-gray-500">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-xl font-semibold">No Orders Yet</h2>
          <p className="text-sm">Start ordering your favorite food 🍔</p>
        </div>
      ) : (
        <div className="mt-5">
          {orderlist?.map((item) => (
            <div key={item?._id} className="w-full flex gap-2">
              <div className="w-[80%] mx-auto flex justify-between items-center bg-white shadow-md rounded-xl p-4 mb-4">
                {/* Left Section */}
                <div>
                  <h2 className="font-semibold text-lg">
                    {item.restro_id?.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {item.food_id.length} items • ₹{item.price.total}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>

                {/* Right Section */}
                <div className="text-right">
                  <span className="block text-sm text-green-600 font-medium mb-2">
                    {item.status}
                  </span>

                  <button
                    onClick={() => showdetail(item._id)}
                    className="px-4 py-1 text-sm bg-black text-white rounded-lg hover:bg-gray-800"
                  >
                    View Details
                  </button>
                </div>
              </div>
              {showdetailid && showdetailid == item?._id ? (
                <Showdetailid item={item} setshowdetailid={setshowdetailid} />
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orderslist;
