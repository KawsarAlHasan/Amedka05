import React from "react";
import { FiArrowUpRight } from "react-icons/fi";

function HeroSection() {
  return (
    <section className=" text-center py-20 px-4">
      {/* Title */}
      <h1 className="text-3xl md:text-5xl font-bold mb-4">
        Find the Best Deals, All in One Place
      </h1>

      {/* Subtitle */}
      <p className="text-gray-300 max-w-2xl mx-auto mb-8">
        We search the top stores and bring you the best products at the best
        prices, saving you time and money on every purchase.
      </p>

      {/* Button */}
      <button className="inline-flex items-center gap-2 bg-transparent border border-white px-5 py-2 rounded transition">
        Explore Now
        <FiArrowUpRight size={18} />
      </button>
    </section>
  );
}

export default HeroSection;
