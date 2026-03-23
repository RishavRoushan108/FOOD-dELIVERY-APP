"use client";
import { useContext } from "react";
import { cartContext } from "@/app/context/cartcontext";
import Link from "next/link";
import Image from "next/image";
const page = () => {
  const { cartlist, setcartlist } = useContext(cartContext);
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
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition duration-300 ease-in-out">
              Proceed to Complete Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
