import React from "react";
import { FiArrowUpRight } from "react-icons/fi";

function HeroSection() {
  return (
    <section className=" text-center pt-14 pb-5 lg:pt-40 lg:pb-24">
      {/* Title */}
      <p className="text-3xl md:text-[72px]  font-bold">
        Find the Best Deals, All in One Place
      </p>

      {/* Subtitle */}
      <p className="text-gray-300 max-w-4xl mx-auto text-[22px] md:text-[24px] mb-8 lg:!mt-[-50px]">
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
