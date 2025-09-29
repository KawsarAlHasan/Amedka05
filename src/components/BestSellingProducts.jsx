import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useGetRandomProduct } from "../api/api";
import IsLoading from "./IsLoading";
import IsError from "./IsError";

function BestSellingProducts() {
  const { randomProduct, isLoading, isError, error, refetch } =
    useGetRandomProduct();

  if (isLoading) {
    return <IsLoading />;
  }

  if (isError) {
    return <IsError error={error} refetch={refetch} />;
  }

  return (
    <div>
      <div className=" py-10">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-blue-400 font-semibold mb-1">Featured Product</p>
            <h2 className="text-xl lg:text-3xl font-bold">
              Best Selling Products
            </h2>
          </div>
          <Link
            to="/all-products"
            className="custom-primary-btn px-6 py-2 rounded-md font-medium transition"
          >
            View All
          </Link>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-5">
          {randomProduct?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BestSellingProducts;
