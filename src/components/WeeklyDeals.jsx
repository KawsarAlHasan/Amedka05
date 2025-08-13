import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FaArrowRight } from "react-icons/fa";
import productImage from "../assets/images/car.png";
import fordImage from "../assets/images/car-demo.png";
import { Link } from "react-router-dom";

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
        <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
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
            <div
              key={idx}
              className="relative border border-gray-600 bg-[#2b2b2b] rounded-lg overflow-hidden"
            >
              {/* Hot Badge */}
              {product.isHot && (
                <span className="absolute top-2 left-2 bg-[#D1BFA7] text-black px-3 py-1 rounded-md text-xs font-semibold">
                  Hot
                </span>
              )}

              {/* Heart Icon */}
              <AiOutlineHeart className="absolute top-2 right-2 text-white text-lg bg-[#2b2b2b] p-1 rounded-full cursor-pointer" />

              {/* Image */}
              <div className="flex justify-center items-center h-48">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 object-contain"
                />
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="text-sm font-medium">{product.name}</h3>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-blue-400 font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-gray-400 line-through text-sm">
                    ${product.oldPrice}
                  </span>
                </div>
                <Link
                  to={`/product/${product.id}`}
                  className="block text-center mt-4 bg-blue-500 text-white w-full py-2 rounded-md hover:bg-blue-600 transition"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeeklyDeals;
