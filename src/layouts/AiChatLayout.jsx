import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

function AiChatLayout() {
  return (
    <div className="bg-[#3a3a3a] min-h-screen text-[#FFFFFF] ">
      <div className="">
        {/* bg-[#6d6b6b] */}
        <Navbar />
        <div className="container mx-auto px-2 md:px-0">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AiChatLayout;
