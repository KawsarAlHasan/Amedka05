import React, { useMemo, useState } from "react";
import { Button, Radio, Tag, Tooltip, message, Divider, Image } from "antd";
import { AiOutlineHeart } from "react-icons/ai";
import { LuShare2 } from "react-icons/lu";

/**
 * Demo Product Detail Page
 * Tech: React + TailwindCSS + Ant Design + react-icons
 * Notes:
 * - This is a single-file component you can drop into a React app.
 * - Assumes Tailwind is already configured. AntD can be installed with `npm i antd`.
 * - Replace demo data with real API later.
 */

const DEMO_PRODUCT = {
  id: "sku-demo-001",
  title: "Marketside Fresh Organic Bananas, Bunch",
  price: 0.89,
  oldPrice: 1.99,
  sizes: ["M", "L", "XL"],
  colors: [
    { name: "Grey", value: "grey" },
    { name: "Red", value: "red" },
    { name: "White", value: "white" },
  ],
  // Demo gallery (jacket images to match screenshot vibe)
  images: [
    "https://img.freepik.com/free-psd/black-isolated-car_23-2151852894.jpg",
    "https://i.pinimg.com/736x/2e/ff/4b/2eff4bb45cbd1b520ed30cc3939471d1.jpg",
    "https://pngimg.com/d/porsche_PNG10622.png",
    "https://img.lovepik.com/free-png/20210926/lovepik-a-car-png-image_401434180_wh1200.png",
    "https://www.pngplay.com/wp-content/uploads/8/Red-Sports-Car-Transparent-PNG.png",
  ],
  cta: {
    label: "Buy on Hippobuy",
    href: "#",
  },
};

export default function ProductDetailDemo() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [size, setSize] = useState(DEMO_PRODUCT.sizes[0]);
  const [color, setColor] = useState(DEMO_PRODUCT.colors[0].value);
  const [wishlisted, setWishlisted] = useState(false);

  const formattedPrice = useMemo(() => `$${DEMO_PRODUCT.price.toFixed(2)}`, []);
  const formattedOldPrice = useMemo(
    () => `$${DEMO_PRODUCT.oldPrice.toFixed(2)}`,
    []
  );

  const onWishlist = () => {
    setWishlisted((w) => !w);
    message.success(wishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  const onShare = async () => {
    const url =
      typeof window !== "undefined"
        ? window.location.href
        : "https://example.com";
    try {
      await navigator.clipboard.writeText(url);
      message.success("Product link copied!");
    } catch (e) {
      message.info("Share this URL: " + url);
    }
  };

  return (
    <div className="">
      <div className="   ">
        {/* Grid: Gallery + Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="h-screen flex flex-col justify-between">
            {/* Main Image */}
            <div className="flex-1 border-2 border-gray-400 rounded-2xl overflow-hidden flex items-center justify-center">
              <Image
                src={DEMO_PRODUCT.images[selectedImage]}
                alt={DEMO_PRODUCT.title}
                preview={false}
                className="object-contain w-full h-full"
              />
            </div>

            {/* Thumbnails */}
            <div className="mt-4 grid grid-cols-5 gap-4">
              {DEMO_PRODUCT.images.map((src, idx) => (
                <button
                  key={src}
                  onClick={() => setSelectedImage(idx)}
                  className={`relative rounded-xl overflow-hidden aspect-square border transition-all ${
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
              {DEMO_PRODUCT.title}
            </h1>

            <div className="mt-6 flex items-end gap-4">
              <div className="text-4xl font-bold text-blue-400">
                {formattedPrice}
              </div>
              <div className="text-lg line-through text-neutral-400">
                {formattedOldPrice}
              </div>
            </div>

            <Divider className="bg-neutral-800" />

            {/* Size */}
            <div className="mb-6">
              <div className="text-sm text-neutral-400 mb-2">Size</div>
              <Radio.Group
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="flex gap-3"
                optionType="button"
              >
                {DEMO_PRODUCT.sizes.map((s) => (
                  <Radio.Button
                    key={s}
                    value={s}
                    className="!bg-transparent !text-white !border-neutral-700 hover:!border-neutral-500 !rounded-xl px-4 py-2"
                  >
                    {s}
                  </Radio.Button>
                ))}
              </Radio.Group>
            </div>

            {/* Color */}
            <div className="mb-8">
              <div className="text-sm text-neutral-400 mb-2">Color</div>
              <div className="flex gap-3">
                {DEMO_PRODUCT.colors.map((c) => (
                  <Tag.CheckableTag
                    key={c.value}
                    checked={color === c.value}
                    onChange={() => setColor(c.value)}
                    className={`px-5 py-2 rounded-xl border ${
                      color === c.value
                        ? "!bg-transparent !text-white border-blue-500"
                        : "!bg-transparent !text-neutral-300 border-neutral-700 hover:border-neutral-500"
                    }`}
                  >
                    {c.name}
                  </Tag.CheckableTag>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="w-full">
              <Button
                type="primary"
                size="large"
                className="!w-full !h-12 !rounded-xl !text-white"
                onClick={() =>
                  message.success("Redirecting to Hippobuy… (demo)")
                }
              >
                {DEMO_PRODUCT.cta.label}
              </Button>
            </div>

            {/* Actions */}
            <div className="mt-5 flex items-center gap-4">
              <Tooltip
                title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Button
                  icon={<AiOutlineHeart size={18} />}
                  onClick={onWishlist}
                  className={`!rounded-xl !h-10 !px-3 border-neutral-700 ${
                    wishlisted
                      ? "!border-blue-500"
                      : "hover:!border-neutral-500"
                  }`}
                >
                  <span className="ml-2">Add to wishlist</span>
                </Button>
              </Tooltip>

              <Tooltip title="Share this product">
                <Button
                  icon={<LuShare2 size={18} />}
                  onClick={onShare}
                  className="!rounded-xl !h-10 !px-3 border-neutral-700 hover:!border-neutral-500"
                >
                  <span className="ml-2">Share this product</span>
                </Button>
              </Tooltip>
            </div>

            {/* Meta */}
            <div className="mt-8 text-sm text-neutral-400 space-y-1">
              <div>
                Selected: <span className="text-white font-medium">{size}</span>{" "}
                /<span className="text-white font-medium"> {color}</span>
              </div>
              <div>SKU: {DEMO_PRODUCT.id}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
