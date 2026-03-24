"use client";
import { useContext, useState, useEffect } from "react";
import { cartContext } from "@/app/context/cartcontext";
import Link from "next/link";
import Image from "next/image";
import getDistance from "@/app/function/caldist";

const page = () => {
  const { cartlist, setcartlist } = useContext(cartContext);
  const [po, setpo] = useState(false);
  const [data, setData] = useState(null);
  const [restrodetail, setrestrodetail] = useState();
  const distance = getDistance(
    data?.location?.lat,
    data?.location?.lon,
    restrodetail?.location?.lat,
    restrodetail?.location?.lon,
  );
  async function gethoteldetail() {
    const id = cartlist[0]?.restro_id;
    let response = await fetch(
      "http://localhost:3000/api/customer/foodlist/" + id,
    );
    response = await response.json();
    setrestrodetail(response?.hoteldetail);
  }
  let totalfoodcost = 0;

  if (cartlist.length > 0) {
    totalfoodcost = cartlist.reduce((sum, item) => sum + item.price, 0);
  }

  const distancecost = Number((30 + distance * 7).toFixed(2));
  const tax = Number((totalfoodcost * 0.05).toFixed(2));
  const total = Number((totalfoodcost + distancecost + tax).toFixed(2));
  const fetchData = async () => {
    try {
      let res = await fetch("http://localhost:3000/api/customer", {
        withCredentials: true,
      });
      res = await res.json();
      setData(res.result);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchData();
    if (cartlist.length > 0) {
      gethoteldetail();
    }
  }, [cartlist]);
  const removefromcart = (item) => {
    setcartlist((prev) => prev.filter((element) => element._id !== item._id));
  };
  return (
    <div className="w-full flex justify-center">
      {cartlist?.length == 0 ? (
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full mt-10">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
            alt="Empty Cart"
            className="w-40 mx-auto mb-6"
          />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Your cart is empty 🛒
          </h1>
          <p className="text-gray-500 mb-6">
            Looks like you haven't added anything yet.
          </p>
          <Link href="/restaurant/user/dashboard">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition duration-300">
              Browse Restaurants 🍽️
            </button>
          </Link>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center">
          <div className="w-full">
            {cartlist.map((item) => (
              <div
                key={item._id}
                className="flex flex-col w-[80%] ml-[10%] md:flex-row items-center
                               justify-between gap-6
                               p-4 border rounded-lg shadow-sm
                               hover:shadow-md transition mt-2"
              >
                <div className="relative shrink-0 w-full h-50 md:w-32 md:h-32">
                  <Image
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0kw5tuHP2IBnFx4P1q14rLhdHUk1jO7bhoA&s"
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
                </div>
                <div className="md:mr-10 flex">
                  <p className="text-green-600 text-2xl font-bold mt-2 mr-2">
                    Price:
                  </p>
                  <p className="text-green-600  text-2xl font-bold mt-2">
                    ₹{item.price}
                  </p>
                </div>
                <button
                  className="bg-red-400 hover:bg-red-500 
                             text-white px-4 py-2 
                             rounded-md transition"
                  onClick={() => removefromcart(item)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => {
                setpo((val) => !val);
              }}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition duration-300 ease-in-out"
            >
              Proceed to Complete Order
            </button>
          </div>
          <div>
            {po && (
              <div className="w-full flex flex-col items-center">
                <div className="flex w-full items-center justify-center gap-10 p-10">
                  <div className="border-2 border-dashed rounded-2xl p-6 w-64 text-center space-y-2">
                    <div className="text-4xl">🍽️</div>
                    <h2 className="font-semibold text-lg">
                      {restrodetail?.name}
                    </h2>
                    <p className="text-gray-500">{restrodetail?.city}</p>
                    <p className="text-gray-500 flex items-center gap-2">
                      📍
                      <span>
                        {restrodetail?.location?.lat},{" "}
                        {restrodetail?.location?.lon}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-medium text-gray-600 mb-1">
                      {distance} km
                    </span>
                    <div className="text-4xl transform scale-x-[-1]">🏍️</div>
                    <div className="w-32 border-t-2 border-dashed my-2"></div>
                    <span className="text-sm text-gray-500">Delivery</span>
                  </div>
                  <div className="border-2 border-dashed rounded-2xl p-6 w-64 text-center space-y-2">
                    <div className="text-4xl">👤</div>
                    <h2 className="font-semibold text-lg">{data?.name}</h2>
                    <p className="text-gray-500">{data?.city}</p>
                    <p className="text-gray-500 flex items-center gap-2">
                      📍
                      <span>
                        {data?.location?.lat}, {data?.location?.lon}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="w-[80%] bg-white shadow-lg rounded-2xl p-6 space-y-4 border">
                  <h2 className="text-lg font-semibold">Billing Details</h2>

                  {/* Food Price */}
                  <div className="flex justify-between text-gray-600">
                    <span>Total Food Price</span>
                    <span>₹{totalfoodcost}</span>
                  </div>

                  {/* Delivery */}
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Charge</span>
                    <span>₹{distancecost}</span>
                  </div>

                  {/* Taxes */}
                  <div className="flex justify-between text-gray-600">
                    <span>Taxes & Fees (5%)</span>
                    <span>₹{tax}</span>
                  </div>

                  {/* Divider */}
                  <div className="border-t pt-3"></div>

                  {/* Total */}
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>
                <div className="mt-6 mb-10 flex justify-center">
                  <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition duration-300 ease-in-out">
                    Proceed to pay
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
