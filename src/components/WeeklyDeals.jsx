import { FaArrowRight } from "react-icons/fa";
import fordImage from "../assets/images/car-demo.png";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import IsLoading from "./IsLoading";
import IsError from "./IsError";
import { useGetAllProducts, useGetSingleRandomProduct } from "../api/api";

function WeeklyDeals() {
  const { allProducts, isLoading, isError, error, refetch } = useGetAllProducts(
    {
      page: 1,
      limit: 16,
      status: "Active",
      product_name: "",
      min_price: 0,
      max_price: 0,
      category: "",
      size: "",
      color: "",
      sort_by: "created_at",
      sort_order: "desc",
    }
  );

  const { randomSingleProduct } = useGetSingleRandomProduct();

  if (isLoading) {
    return <IsLoading />;
  }

  if (isError) {
    return <IsError error={error} refetch={refetch} />;
  }

  return (
    <div>
      <div className=" py-10">
        {/* Product Grid */}
        <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-4">
          <div className=" bg-[#2b2b2b] rounded-lg p-6 grid grid-cols-2 gap-2 col-span-2">
            <div className="flex flex-col justify-center">
              <p className="text-blue-400 font-semibold mb-2">Only This Week</p>
              <h2 className="text-2xl font-bold text-[#e8decf] mb-4">
                A smart store for every people
              </h2>
              <p className="text-gray-300 mb-6 text-sm">
                Feed your family the best
              </p>
              <Link
                to={`/product/${randomSingleProduct?.id}`}
                className="bg-white !text-black flex items-center gap-2 px-5 py-2 rounded-md font-medium hover:bg-gray-200 transition"
              >
                Shop Now <FaArrowRight />
              </Link>
            </div>
            <div className="flex flex-col justify-center">
              <img
                src={randomSingleProduct?.images?.[0]}
                alt="Banner Product"
                className="max-h-[260px] object-contain w-full"
              />
            </div>
          </div>

          {allProducts?.map((product, idx) => (
            <ProductCard key={idx} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeeklyDeals;
