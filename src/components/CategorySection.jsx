import { Card } from "antd";
import Slider from "react-slick";

import { useGetAllCategories } from "../api/api";
import IsLoading from "./IsLoading";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

function CategorySection() {
  const { allCategories, isLoading } = useGetAllCategories();

  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: false,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="py-10">
      {/* Top Label */}
      <p className="text-blue-400 font-semibold mb-2">Categories</p>

      {/* Title */}
      <h2 className="text-3xl font-bold mb-8">Browse By Category</h2>

      {isLoading && <IsLoading rows={1} />}

      {/* Category Slider */}
      <div className="px-6">
        <Slider {...settings}>
          {allCategories?.map((cat, idx) => (
            <div key={idx} className="px-1">
              <Card
                className="flex flex-col items-center justify-center border border-gray-500 text-center cursor-pointer hover:border-blue-500 transition-all"
                style={{
                  backgroundColor: "transparent",
                  color: "white",
                  height: 140,
                }}
                bodyStyle={{ padding: "20px" }}
                onClick={() => {
                  navigate(`/all-products?category=${cat.category_name}`);
                }}
              >
                <div className="flex justify-center">
                  <img
                    className="w-[50px] h-[50px] object-contain"
                    src={cat.category_image}
                    alt={cat.category_name}
                  />
                </div>
                <p className="!mt-[10px] text-sm font-medium">
                  {cat.category_name}
                </p>
              </Card>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default CategorySection;
