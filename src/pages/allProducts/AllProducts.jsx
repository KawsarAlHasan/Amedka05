import React, { useState } from "react";
import productImage from "../../assets/images/car.png";
import ProductCard from "../../components/ProductCard";
import { useGetAllProducts } from "../../api/api";

function AllProducts() {
  const [filter, setFilter] = useState("all");

  const { allProducts, pagination, isLoading, isError, error, refetch } =
    useGetAllProducts({
      page: 1,
      limit: 10,
      status: "Active",
      product_name: "",
      min_price: 0,
      max_price: 0,
      size: "",
      color: "",
      sort_by: "created_at",
      sort_order: "desc",
    });

    console.log("allProducts:", allProducts);

  const filteredProducts = allProducts.filter((product) => {
    if (filter === "all") return true;
    if (filter === "hot") return product.isHot;
    return true;
  });

  let sortedProducts = [...filteredProducts];
  if (filter === "lowToHigh") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (filter === "highToLow") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div>
      <div className="py-10">
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
