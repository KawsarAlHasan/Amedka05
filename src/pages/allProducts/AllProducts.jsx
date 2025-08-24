import React, { useState } from "react";
import productImage from "../../assets/images/car.png";
import ProductCard from "../../components/ProductCard";

const products = [
  {
    id: 1,
    name: "Wireless Earbuds X1",
    image: productImage,
    price: 19.99,
    oldPrice: 25.99,
    isHot: true,
  },
  {
    id: 2,
    name: "Gaming Mouse Pro",
    image: productImage,
    price: 35.5,
    oldPrice: 42.0,
    isHot: false,
  },
  {
    id: 3,
    name: "Bluetooth Speaker S2",
    image: productImage,
    price: 49.99,
    oldPrice: 59.99,
    isHot: true,
  },
  {
    id: 4,
    name: "Mechanical Keyboard K7",
    image: productImage,
    price: 75.0,
    oldPrice: 89.0,
    isHot: false,
  },
  {
    id: 5,
    name: "Smartwatch Vibe",
    image: productImage,
    price: 120.0,
    oldPrice: 150.0,
    isHot: true,
  },
  {
    id: 11,
    name: "USB-C Hub 7-in-1",
    image: productImage,
    price: 29.99,
    oldPrice: 39.99,
    isHot: false,
  },
  {
    id: 12,
    name: "4K Action Camera",
    image: productImage,
    price: 180.0,
    oldPrice: 220.0,
    isHot: true,
  },
  {
    id: 13,
    name: "Wireless Charger Pad",
    image: productImage,
    price: 15.5,
    oldPrice: 20.0,
    isHot: false,
  },
  {
    id: 14,
    name: "Noise Cancelling Headset",
    image: productImage,
    price: 89.99,
    oldPrice: 110.0,
    isHot: true,
  },
  {
    id: 15,
    name: "Portable SSD 1TB",
    image: productImage,
    price: 130.0,
    oldPrice: 160.0,
    isHot: false,
  },
  {
    id: 21,
    name: "Drone Mini X5",
    image: productImage,
    price: 220.0,
    oldPrice: 260.0,
    isHot: true,
  },
  {
    id: 22,
    name: "VR Headset Z3",
    image: productImage,
    price: 300.0,
    oldPrice: 350.0,
    isHot: true,
  },
  {
    id: 23,
    name: "Smart Home Camera",
    image: productImage,
    price: 55.0,
    oldPrice: 70.0,
    isHot: false,
  },
  {
    id: 24,
    name: "Fitness Band 4",
    image: productImage,
    price: 45.0,
    oldPrice: 60.0,
    isHot: true,
  },
  {
    id: 25,
    name: "Laptop Stand Adjustable",
    image: productImage,
    price: 25.0,
    oldPrice: 35.0,
    isHot: false,
  },
];

function AllProducts() {
  const [filter, setFilter] = useState("all");

  const filteredProducts = products.filter((product) => {
    if (filter === "all") return true;
    if (filter === "hot") return product.isHot;
    if (filter === "lowToHigh") return true; // sorting will be handled below
    if (filter === "highToLow") return true;
    return true;
  });

  // Apply sorting
  let sortedProducts = [...filteredProducts];
  if (filter === "lowToHigh") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (filter === "highToLow") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div>
      <div className=" py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">All Products</h2>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border px-3 py-2 rounded-lg bg-[#3a3a3a] text-[#FFFFFF]"
          >
            <option value="all">All Products</option>
            <option value="hot">Hot Deals</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-5">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllProducts;
