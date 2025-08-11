import React from "react";
import HeroSection from "./HeroSection";
import CategorySection from "../../components/CategorySection";
import BestSellingProducts from "../../components/BestSellingProducts";
import WeeklyDeals from "../../components/WeeklyDeals";

function Home() {
  return (
    <div>
      <HeroSection />
      <CategorySection />
      <BestSellingProducts />
      <WeeklyDeals />
    </div>
  );
}

export default Home;
