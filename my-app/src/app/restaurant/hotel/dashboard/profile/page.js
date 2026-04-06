"use client";

import { useState, useEffect } from "react";

const Profile = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let res = await fetch("http://localhost:3000/api/restaurant", {
          withCredentials: true,
        });
        res = await res.json();
        setData(res.result[0]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="w-full flex items-center justify-center ">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-orange-500">
          Profile
        </h2>

        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">Name</p>
            <p className="text-lg font-medium">{data?.name}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-medium">{data?.emailId}</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="text-lg font-medium">{data?.city}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Location 📍</p>
            <p className="text-lg font-medium">
              Lat: {data?.location?.lat} Lon: {data?.location?.lon}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
