"use client";

import Banner from "@/app/_component/Banner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserDashboard = () => {
  const [citylist, setcitylist] = useState([]);
  const [hotellist, sethotellist] = useState([]);
  const router = useRouter();
  useEffect(() => {
    loadcitylist();
    loadhotellist();
  }, []);
  const loadcitylist = async () => {
    try {
      let response = await fetch("http://localhost:3000/api/customer/location");
      response = await response.json();
      if (response.success) {
        setcitylist(response.data);
      }
    } catch (err) {
      console.log(err);
      toast.error("unable to load the list");
    }
  };
  const loadhotellist = async (params) => {
    try {
      let url = "http://localhost:3000/api/customer/foodlist";
      if (params?.city) {
        url = url + "?city=" + params.city;
      } else if (params?.name) {
        url = url + "?name=" + params.name;
      }
      let response = await fetch(url);
      response = await response.json();
      if (response.success) {
        sethotellist(response.result);
      }
    } catch (err) {
      console.log(err);
      toast.error("unable to load the list");
    }
  };
  return (
    <div className="w-full">
      <Banner citylist={citylist} loadhotellist={loadhotellist} />
      <div
        className="grid gap-6 p-6 
                  grid-cols-1 
                  sm:grid-cols-2 
                  md:grid-cols-3 
                  lg:grid-cols-4"
      >
        {hotellist.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl 
                   transition duration-300 p-5 cursor-pointer"
            onClick={() => {
              router.push("/restaurant/user/dashboard/" + item._id);
            }}
          >
            <h2 className="text-xl font-semibold mb-2">{item.name}</h2>

            <p className="text-gray-600">📍 {item.city}</p>

            <p className="text-sm text-gray-400 mt-2">
              Lat: {item.location.lat}
            </p>
            <p className="text-sm text-gray-400">Lon: {item.location.lon}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
