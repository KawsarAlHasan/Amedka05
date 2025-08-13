import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import productImage from "../assets/images/car.png";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Kvidio Headphone 512",
    image: productImage,
    price: 28.85,
    oldPrice: 32.8,
    isHot: true,
  },
  {
    id: 2,
    name: "Kvidio Headphone 512",
    image: productImage,
    price: 28.85,
    oldPrice: 32.8,
    isHot: true,
  },
  {
    id: 3,
    name: "Kvidio Headphone 512",
    image: productImage,
    price: 28.85,
    oldPrice: 32.8,
    isHot: true,
  },
  {
    id: 4,
    name: "Kvidio Headphone 512",
    image: productImage,
    price: 28.85,
    oldPrice: 32.8,
    isHot: true,
  },
  {
    id: 5,
    name: "Kvidio Headphone 512",
    image: productImage,
    price: 28.85,
    oldPrice: 32.8,
    isHot: true,
  },
  {
    id: 6,
    name: "Kvidio Headphone 512",
    image: productImage,
    price: 28.85,
    oldPrice: 32.8,
    isHot: true,
  },
];

function SimillarProducts() {
  return (
    <div>
      <div className=" py-10">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-blue-400 font-semibold mb-1">Featured Product</p>
            <h2 className="text-3xl font-bold">Simillar Products</h2>
          </div>
          <button className="bg-blue-500 px-6 py-2 rounded-md font-medium hover:bg-blue-600 transition">
            View All
          </button>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {products.map((product) => (
            <div
              key={product.id}
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
                  className="mt-4 bg-blue-500 text-white w-full text-center block py-2 rounded-md hover:bg-blue-600 transition"
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

export default SimillarProducts;
