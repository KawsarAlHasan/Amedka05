import React from "react";
import { Card } from "antd";
import {
  AiOutlineMobile,
  AiOutlineDesktop,
  AiOutlineCamera,
} from "react-icons/ai";
import { FiHeadphones } from "react-icons/fi";
import { IoGameControllerOutline } from "react-icons/io5";
import { BsSmartwatch } from "react-icons/bs";

const categories = [
  { name: "Phones", icon: <AiOutlineMobile size={40} /> },
  { name: "Computers", icon: <AiOutlineDesktop size={40} /> },
  { name: "SmartWatch", icon: <BsSmartwatch size={40} /> },
  { name: "Camera", icon: <AiOutlineCamera size={40} /> },
  { name: "HeadPhones", icon: <FiHeadphones size={40} /> },
  { name: "Gaming", icon: <IoGameControllerOutline size={40} /> },
  { name: "Gaming", icon: <IoGameControllerOutline size={40} /> },
];

function CategorySection() {
  return (
    <div>
      <div className="py-10">
        {/* Top Label */}
        <p className="text-blue-400 font-semibold mb-2">Categories</p>

        {/* Title */}
        <h2 className="text-3xl font-bold mb-8">Browse By Category</h2>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-5">
          {categories.map((cat, idx) => (
            <Card
              key={idx}
              className="flex flex-col items-center justify-center border border-gray-500 text-center cursor-pointer hover:border-blue-500 transition-all"
              style={{
                backgroundColor: "transparent",
                color: "white",
                height: 120,
              }}
              bodyStyle={{ padding: "20px" }}
            >
              <div className="flex justify-center">{cat.icon}</div>
              <p className="!mt-[5px] text-sm">{cat.name}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategorySection;
