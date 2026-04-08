"use client";
import Showdetailid from "@/app/_component/Showdetailid";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Orderslist = () => {
  const [orderlist, setorderlist] = useState([]);
  const [showdetailid, setshowdetailid] = useState("");
  const [text, settext] = useState("");
  const [selectedorder, setselctedorder] = useState("");

  function showdetail(_id) {
    if (showdetailid == null || showdetailid != _id) {
      setshowdetailid(_id);
    } else {
      setshowdetailid(null);
    }
  }
  function setinput(_id) {
    if (selectedorder == null || selectedorder != _id) {
      setselctedorder(_id);
      settext("");
    } else {
      setselctedorder("");
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
  const handlesubmit = async (_id, status) => {
    try {
      if (status == "Order Confirmed" && text != "Accepted") {
        toast.error("Enter Accepted");
        return;
      }
      if (status == "Picked Up" && text != "Delivered") {
        toast.error("Enter Delivered");
        return;
      }
      const payload = {
        _id,
        status: text,
      };
      const res = await fetch("http://localhost:3000/api/orders", {
        method: "PATCH",
        body: JSON.stringify(payload),
        credentials: "include",
      });
      if (res.ok) {
        toast.success("status updated successfully");
        loadorderlist();
      } else {
        throw new Error("status update failed");
      }
    } catch (err) {
      console.log(err);
      toast.error("status update failed");
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
            <div key={item?._id} className="w-full flex  gap-2">
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

                {item.status == "Order Confirmed" ||
                item.status === "Picked Up" ? (
                  <div className=" pt-2 border-t border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                    <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
                      {item.status == "Order Confirmed"
                        ? "Accepted"
                        : "Delivered"}
                    </span>
                    <div className="relative flex w-full max-w-sm">
                      <input
                        type="text"
                        placeholder={
                          item.status == "Order Confirmed"
                            ? "Enter Accepted"
                            : "Enter Delivered"
                        }
                        value={selectedorder == item._id ? text : ""}
                        onChange={(e) => settext(e.target.value)}
                        onClick={() => setinput(item._id)}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                      />
                      <button
                        onClick={() => handlesubmit(item._id, item.status)}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 text-sm font-semibold rounded-r-lg transition-colors"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                ) : null}
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
