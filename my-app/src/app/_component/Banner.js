"use client";
import React from "react";
import { useState } from "react";

const Banner = ({ citylist, loadhotellist }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [location, setLocation] = useState("");
  const [name, setname] = useState("");
  return (
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
      {/* CONTENT ABOVE OVERLAY */}
      <div className="relative z-10 flex gap-4 w-[80%] max-w-2xl">
        <input
          type="text"
          placeholder="Location"
          value={location}
          onClick={() => setShowDropdown((e) => !e)}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-3 rounded-md outline-none
                   bg-white text-black shadow-md
                   border border-gray-300"
        />
        {showDropdown && citylist?.length > 0 && (
          <ul
            className="absolute z-10 w-[20%] bg-gray-200 border border-gray-600
                       rounded-md mt-10 max-h-38 overflow-y-auto shadow-lg"
          >
            {citylist.map((city, index) => (
              <li
                key={index}
                onClick={() => {
                  setLocation(city);
                  setShowDropdown(false);
                  loadhotellist({ city: city });
                }}
                className="px-4 py-1 cursor-pointer hover:bg-gray-300"
              >
                {city}
              </li>
            ))}
          </ul>
        )}
        <input
          type="text"
          placeholder="Search food"
          value={name}
          onChange={(e) => setname(e.target.value)}
          className="flex-1 p-3 rounded-md outline-none
                   bg-white text-black shadow-md
                   border border-gray-300"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              loadhotellist({ name: name });
            }
          }}
        />
      </div>
    </div>
  );
};

export default Banner;
