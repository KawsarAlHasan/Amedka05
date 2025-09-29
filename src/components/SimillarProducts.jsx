import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useGetAllProducts } from "../api/api";
import IsLoading from "./IsLoading";
import IsError from "./IsError";

function SimillarProducts({ category }) {
  const { allProducts, isLoading, isError, error, refetch } = useGetAllProducts(
    {
      page: 1,
      limit: 6,
      status: "Active",
      product_name: "",
      min_price: 0,
      max_price: 0,
      category: category?.category_name,
      size: "",
      color: "",
      sort_by: "created_at",
      sort_order: "desc",
    }
  );

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
            <h2 className="text-3xl font-bold">Simillar Products</h2>
          </div>
          <Link
            to={`/all-products?category=${category?.category_name}`}
            className="custom-primary-btn px-6 py-2 rounded-md font-medium transition"
          >
            View All
          </Link>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-1 md:gap-3 lg:gap-5">
          {allProducts?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SimillarProducts;
