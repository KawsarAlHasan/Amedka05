import { message } from "antd";
import { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { API, useGetAllWishIds, useGetSingleAgent } from "../api/api";
import Cookies from "js-cookie";
import LoginModel from "./LoginModal";

function ProductCard({ product, isTargetBlank = false }) {
  const { allWishlistId, refetch } = useGetAllWishIds();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const savedCurrency = Cookies.get("currency");
  const savedAgent = Cookies.get("agent");

  const { agentDetail } = useGetSingleAgent(savedAgent);

  const [loadingStates, setLoadingStates] = useState({});

  const isInWishlist = allWishlistId?.some(
    (item) => item.productId === product?.id
  );
  const isProductLoading = loadingStates[product?.id] || false;

  const handleHeartClick = async (productId) => {
    setLoadingStates((prev) => ({ ...prev, [productId]: true }));

    try {
      const res = await API.post("/wishlist/toggle", { productId: productId });

      if (res.data.action === "added") {
        message.success("Product added to wishlist!");
      } else {
        message.success("Product removed from wishlist!");
      }

      refetch();
    } catch (error) {
      message.error(
        error?.response?.data?.message || "Failed to update wishlist."
      );
    } finally {
      setLoadingStates((prev) => ({ ...prev, [productId]: false }));
    }
  };

  // currencies logo use function
  const getCurrencyIcon = (currency) => {
    const icons = {
      EUR: "€",
      USD: "$",
      AUD: "A$",
      CAD: "C$",
      YUAN: "¥",
    };
    return icons[currency] || "¥";
  };

  // Price conversion function
  const getConvertedPrice = (price) => {
    if (!price || !agentDetail || !savedCurrency) return price;

    const exchangeRates = {
      EUR: agentDetail.euro_rate,
      USD: agentDetail.usd_rate,
      AUD: agentDetail.aud_rate,
      CAD: agentDetail.cad_rate,
      YUAN: agentDetail.yuan_rate,
    };

    const rate = exchangeRates[savedCurrency];

    if (rate && rate > 0) {
      return price * rate;
    }

    return price;
  };

  // Get converted prices
  const convertedPrice = getConvertedPrice(product?.price);
  const convertedOfferPrice = getConvertedPrice(product?.offer_price);

  const handleHeartClickWithAuth = (productId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      Cookies.remove("skipLogin");
      setIsLoginModalOpen(true);
    } else {
      handleHeartClick(productId);
    }
  };

  const handleCloseLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <div className="w-full">
      <div
        key={product?.id}
        className="relative border border-gray-600 bg-[#2b2b2b] rounded-2xl overflow-hidden"
      >
        {/* Heart Icon with Loading */}
        {isProductLoading ? (
          <div className="absolute top-4 right-4 border text-gray-400 text-3xl bg-white p-1 rounded-full cursor-not-allowed">
            <div className="w-6 h-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : isInWishlist ? (
          <AiFillHeart
            onClick={() => handleHeartClickWithAuth(product?.id)}
            className="absolute top-4 right-4 border text-red-500 text-3xl bg-white p-1 rounded-full cursor-pointer hover:scale-110 transition-transform"
          />
        ) : (
          <AiOutlineHeart
            onClick={() => handleHeartClickWithAuth(product?.id)}
            className="absolute top-4 right-4 border text-[#2b2b2b] text-3xl bg-white p-1 rounded-full cursor-pointer hover:scale-110 transition-transform"
          />
        )}

        {/* Image */}
        <div className="flex justify-center items-center h-48">
          <img
            src={product?.image || product?.images[0]}
            alt={product?.product_name || product?.name}
            className="h-40 w-full px-3 bg-cover mt-[-8px]"
          />
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="text-sm font-medium">
            {product?.product_name || product?.name}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-blue-400 font-bold">
              {getCurrencyIcon(savedCurrency)}
              {convertedPrice?.toFixed(2)}
            </span>

            {product?.offer_price && (
              <span className="text-gray-400 line-through text-sm">
                {getCurrencyIcon(savedCurrency)}
                {convertedOfferPrice?.toFixed(2)}
              </span>
            )}
          </div>
          <Link
            target={isTargetBlank ? "_blank" : "_self"}
            to={`/product/${product?.id}`}
            className="mt-4 custom-primary-btn text-white w-full text-center block py-2 rounded-md transition"
          >
            View
          </Link>
        </div>
      </div>

      <LoginModel
        isModalOpen={isLoginModalOpen}
        onClose={handleCloseLoginModal}
      />
    </div>
  );
}

export default ProductCard;
