import ProductCard from "../../components/ProductCard";
import { useGetAllWishlist } from "../../api/api";
import IsLoading from "../../components/IsLoading";
import IsError from "../../components/IsError";

function Wishlist() {
  const { allWishlist, isLoading, isError, error, refetch } =
    useGetAllWishlist();

  if (isLoading) {
    return <IsLoading />;
  }

  if (isError) {
    return <IsError error={error} refetch={refetch} />;
  }

  return (
    <div>
      <div className=" py-10">
        <h2 className="text-2xl font-bold mb-5">My Wishlist</h2>
        <p className="text-gray-300 mb-5">
          Here are the products you have added to your wishlist.
        </p>

        {/* Product Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-5">
          {allWishlist?.map((product) => (
            <ProductCard key={product.id} product={product?.product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
