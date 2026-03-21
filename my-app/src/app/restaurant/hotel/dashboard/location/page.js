"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import toast from "react-hot-toast";

const SetLocationMap = dynamic(
  () => import("@/app/_component/SetLocationMap"),
  {
    ssr: false,
  },
);

export default function SetLocationPage() {
  const [position, setPosition] = useState({
    lat: 25.6093239,
    lng: 85.1235252,
  });

  const [search, setSearch] = useState("");
  const [city, setcity] = useState("patna");
  const savelocationhandle = async () => {
    try {
      const obj = {
        city,
        location: {
          lat: position.lat,
          lon: position.lng,
        },
      };
      const response = await fetch(
        "http://localhost:3000/api/restaurant/location",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(obj),
        },
      );
      const data = await response.json();
      if (data.success) {
        toast.success("location updated successfully");
      }
    } catch (err) {
      toast.error("location update failed ");
      console.log(err);
    }
  };

  // 🔍 Search location using OpenStreetMap (FREE)
  const handleSearch = async () => {
    if (!search) {
      toast.error("enter the location");
      return;
    }

    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${search}`,
    );
    const data = await res.json();
    if (data.length > 0) {
      setPosition({
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
      });
      setcity(data[0].name);
    } else {
      toast.error("location not found");
    }
  };

  return (
    <div className="w-[60%] min-h-screen flex flex-col items-center gap-4">
      <h2 className="text-xl font-semibold mt-4">Set Hotel Location</h2>

      {/* 🔎 Search box */}
      <div className="flex gap-2 w-[60%]">
        <input
          type="text"
          placeholder="Search city, area, or landmark"
          className="flex-1 border px-3 py-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button
          onClick={handleSearch}
          className="bg-black text-white px-4 rounded"
        >
          Search
        </button>
      </div>

      {/* 🗺️ Map */}
      <div className="w-[60%]">
        <SetLocationMap position={position} setPosition={setPosition} />
      </div>

      {/* 📍 Coordinates preview */}
      <p className="text-md text-gray-700">
        Lat: {position.lat}, lon: {position.lng}
      </p>

      <button
        className="bg-green-600 text-white px-6 py-2 rounded mb-6"
        onClick={savelocationhandle}
      >
        Save Location
      </button>
    </div>
  );
}
