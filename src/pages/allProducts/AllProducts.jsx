import React, { useState } from "react";
import ProductCard from "../../components/ProductCard";
import { useGetAllProducts } from "../../api/api";
import IsLoading from "../../components/IsLoading";
import IsError from "../../components/IsError";
import { useLocation } from "react-router-dom";

function AllProducts() {
  const [filter, setFilter] = useState("all");

  // get query params from url
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const product_name = queryParams.get("product_name") || "";
  const category = queryParams.get("category") || "";
  const color = queryParams.get("color") || "";
  const size = queryParams.get("size") || "";

  const { allProducts, pagination, isLoading, isError, error, refetch } =
    useGetAllProducts({
      page: 1,
      limit: 10,
      status: "Active",
      product_name: product_name,
      min_price: 0,
      max_price: 0,
      category: category,
      size: size,
      color: color,
      sort_by: "created_at",
      sort_order: "desc",
    });

  const filteredProducts = allProducts.filter((product) => {
    if (filter === "all") return true;
    return true;
  });

  let sortedProducts = [...filteredProducts];
  if (filter === "lowToHigh") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (filter === "highToLow") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  if (isLoading) {
    return <IsLoading />;
  }

  if (isError) {
    return <IsError error={error} refetch={refetch} />;
  }

  return (
    <div>
      <div className="py-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">All Products</h2>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border !px-3 py-2 rounded-lg bg-[#3a3a3a] text-[#FFFFFF]"
          >
            <option value="all">All Products</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-5">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
}

export default AllProducts;
