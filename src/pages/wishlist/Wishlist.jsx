import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import productImage from "../../assets/images/car.png";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";

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

function Wishlist() {
  return (
    <div>
      <div className=" py-10">
      

        {/* Product Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
