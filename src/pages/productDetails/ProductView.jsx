import React, { useMemo, useState, useEffect } from "react";
import { Button, Tag, Tooltip, message, Divider, Image } from "antd";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import Cookies from "js-cookie";
import { API, useGetAllWishIds } from "../../api/api";

export default function ProductView({ product }) {
  const { allWishlistId, refetch } = useGetAllWishIds();
  const [selectedImage, setSelectedImage] = useState(0);
  const [size, setSize] = useState(product?.sizes?.[0]);
  const [color, setColor] = useState(product?.colors?.[0]);
  const [loadingStates, setLoadingStates] = useState({});
  const savedCurrency = Cookies.get("currency");

  // Wishlist status check
  const isInWishlist = useMemo(() => {
    return allWishlistId?.some((item) => item.productId === product?.id);
  }, [allWishlistId, product?.id]);

  // Sync wishlisted state with actual wishlist data
  useEffect(() => {
    // This ensures our local state is always in sync with the server data
  }, [isInWishlist]);

  const handleHeartClick = async (productId) => {
    if (!productId) return;

    setLoadingStates((prev) => ({ ...prev, [productId]: true }));

    try {
      const res = await API.post("/wishlist/toggle", { productId: productId });

      if (res.data.action === "added") {
        message.success("Product added to wishlist!");
      } else {
        message.success("Product removed from wishlist!");
      }

      // Refetch wishlist data to sync with server
      await refetch();
    } catch (error) {
      console.error("Wishlist error:", error);
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
    return icons[currency] || "$";
  };

  const isProductLoading = loadingStates[product?.id] || false;

  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Gallery */}
        <div className="h-[80vh] flex flex-col justify-between">
          {/* Main Image */}
          <div className="flex-1 border-2 border-gray-400 rounded-2xl overflow-hidden flex items-center justify-center">
            <Image
              src={product?.images?.[selectedImage]}
              alt={product?.product_name}
            />
          </div>

          {/* Thumbnails */}
          <div className="mt-4 grid grid-cols-5 gap-4">
            {product?.images?.map((src, idx) => (
              <button
                key={src}
                onClick={() => setSelectedImage(idx)}
                className={`cursor-pointer relative rounded-xl overflow-hidden aspect-square border transition-all ${
                  selectedImage === idx
                    ? "border-blue-500 ring-2 ring-blue-500"
                    : "border-neutral-500 hover:border-gray-400"
                }`}
              >
                <img
                  src={src}
                  alt={`thumb-${idx}`}
                  className="object-cover w-full h-full rounded-xl"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            {product?.product_name}
          </h1>

          <Divider className="bg-gray-400 !my-[-10px]" />

          <div className="my-6 flex items-end gap-4">
            <div className="text-4xl font-bold text-blue-400">
              {getCurrencyIcon(savedCurrency)}
              {product?.offer_price?.toFixed(2)}
            </div>
            <div className="text-lg line-through text-neutral-400">
              {getCurrencyIcon(savedCurrency)}
              {product?.price?.toFixed(2)}
            </div>
          </div>

          {/* Size */}
          {product?.sizes?.length > 0 && (
            <div className="mb-6">
              <div className="text-sm text-neutral-400 mb-2">Size</div>
              <div className="flex gap-3">
                {product.sizes.map((s, index) => (
                  <Tag.CheckableTag
                    key={index}
                    checked={size === s}
                    onChange={() => setSize(s)}
                    className={`!px-5 !py-2 rounded-xl border ${
                      size === s
                        ? "!bg-transparent !text-white !border-blue-500"
                        : "!bg-transparent !text-neutral-300 !border-neutral-400 !hover:border-neutral-300"
                    }`}
                  >
                    {s}
                  </Tag.CheckableTag>
                ))}
              </div>
            </div>
          )}

          {/* Color */}
          {product?.colors?.length > 0 && (
            <div className="mb-8">
              <div className="text-sm text-neutral-400 mb-2">Color</div>
              <div className="flex gap-3">
                {product.colors.map((c) => (
                  <Tag.CheckableTag
                    key={c}
                    checked={color === c}
                    onChange={() => setColor(c)}
                    className={`!px-5 !py-2 rounded-xl border ${
                      color === c
                        ? "!bg-transparent !text-white !border-blue-500"
                        : "!bg-transparent !text-neutral-300 !border-neutral-400 !hover:border-neutral-300"
                    }`}
                  >
                    {c}
                  </Tag.CheckableTag>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="w-full">
            <Button
              type="primary"
              size="large"
              className="!w-full !h-12 !rounded-xl custom-primary-btn"
              href={product?.affiate_link}
              target="_blank"
            >
              Buy on {product?.agent?.agent_name}
            </Button>
          </div>

          {/* Actions */}
          <div className="mt-5 flex items-center gap-4">
            <Tooltip
              title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Button
                icon={
                  isInWishlist ? (
                    <AiFillHeart size={18} className="!text-red-500" />
                  ) : (
                    <AiOutlineHeart size={18} />
                  )
                }
                onClick={() => handleHeartClick(product?.id)}
                // disabled={isProductLoading}
                loading={isProductLoading}
                className={`!rounded-xl !h-10 !px-3 border ${
                  isInWishlist
                    ? "!border-red-500 hover:!border-red-400"
                    : "!border-neutral-700 hover:!border-neutral-500"
                }
                `}
              >
                <span className="ml-2">
                  {isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
                </span>
              </Button>
            </Tooltip>
          </div>

          {/* Meta */}
          <div className="mt-8 text-sm text-neutral-400 space-y-1">
            <div>
              Selected: <span className="text-white font-medium">{size}</span> /
              <span className="text-white font-medium"> {color}</span>
            </div>
            <div>SKU: {product?.id}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
