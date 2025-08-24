import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa";
import productImage from "../assets/images/car.png";
import fordImage from "../assets/images/car-demo.png";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

const products = Array(10).fill({
  id: 1,
  name: "Kvidio Headphone 512",
  image: productImage,
  price: 28.85,
  oldPrice: 32.8,
  isHot: true,
});

function WeeklyDeals() {
  return (
    <div>
      <div className=" py-10">
        {/* Product Grid */}
        <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-4">
          <div className=" bg-[#2b2b2b] rounded-lg p-6 flex justify-between col-span-2">
            <div>
              <p className="text-blue-400 font-semibold mb-2">Only This Week</p>
              <h2 className="text-2xl font-bold text-[#e8decf] mb-4">
                A smart store for every people
              </h2>
              <p className="text-gray-300 mb-6 text-sm">
                Feed your family the best
              </p>
              <button className="bg-white !text-black flex items-center gap-2 px-5 py-2 rounded-md font-medium hover:bg-gray-200 transition">
                Shop Now <FaArrowRight />
              </button>
            </div>
            <div className="flex justify-center mt-6">
              <img
                src={fordImage}
                alt="Banner Product"
                className="max-h-[230px] object-contain"
              />
            </div>
          </div>
          {products.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeeklyDeals;
