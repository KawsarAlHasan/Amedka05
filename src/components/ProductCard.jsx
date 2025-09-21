import { message } from "antd";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const handleHeartClick = (productId) => {
    message.success("Product added to wishlist!");
  };

  return (
    <div>
      <div
        key={product?.id}
        className="relative border border-gray-600 bg-[#2b2b2b] rounded-2xl overflow-hidden"
      >
        {/* Hot Badge */}
        {product?.isHot && (
          <span className="absolute top-2 left-2 bg-[#D1BFA7] text-black px-3 py-1 rounded-md text-xs font-semibold">
            Hot
          </span>
        )}

        {/* Heart Icon */}
        <AiOutlineHeart
          onClick={() => handleHeartClick(product?.id)}
          className="absolute top-2 right-2 text-[#2b2b2b] text-3xl bg-white p-1 rounded-full cursor-pointer"
        />

        {/* Image */}
        <div className="flex justify-center items-center h-48">
          <img
            src={product?.image || product?.images[0] }
            alt={product?.product_name}
            className="h-40 object-contain"
          />
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-sm font-medium">{product?.product_name}</h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-blue-400 font-bold">
              ${product?.offer_price?.toFixed(2)}
            </span>
            <span className="text-gray-400 line-through text-sm">
              ${product?.price?.toFixed(2)}
            </span>
          </div>
          <Link
            to={`/product/${product?.id}`}
            className="mt-4 custom-primary-btn text-white w-full text-center block py-2 rounded-md  transition"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
