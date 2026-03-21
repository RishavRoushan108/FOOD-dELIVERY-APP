"use client";

import Addfooditem from "@/app/_component/Addfooditem";
import Displayfooditem from "@/app/_component/Displayfooditem";
import { useState } from "react";

const Dashboard = () => {
  const [Dashboard, setDashboard] = useState(true);
  return (
    <div className="w-full max-w-7xl self-stretch flex flex-col">
      <div className="flex justify-center py-4">
        <button
          onClick={() => setDashboard(!Dashboard)}
          className={
            "bg-[#235736c3] text-white p-2 rounded-md hover:bg-[#2c6d44a9]"
          }
        >
          {Dashboard ? "Add food Item" : "Go to dashboard"}
        </button>
      </div>
      {Dashboard ? (
        <Displayfooditem />
      ) : (
        <div className="flex justify-center">
          <Addfooditem setDashboard={setDashboard} />
        </div>
      )}
    </div>
  );
};
export default Dashboard;
