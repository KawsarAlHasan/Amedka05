import { Card } from "antd";

import { useGetAllCategories } from "../api/api";
import Loading from "./Loading";
import IsLoading from "./IsLoading";

function CategorySection() {
  const { allCategories, isLoading, isError, error, refetch } =
    useGetAllCategories();


  return (
    <div>
      <div className="py-10">
        {/* Top Label */}
        <p className="text-blue-400 font-semibold mb-2">Categories</p>

        {/* Title */}
        <h2 className="text-3xl font-bold mb-8">Browse By Category</h2>

        {isLoading && <IsLoading rows={1} />}

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 md:gap-5">
          {allCategories?.map((cat, idx) => (
            <Card
              key={idx}
              className="flex flex-col items-center justify-center border border-gray-500 text-center cursor-pointer hover:border-blue-500 transition-all"
              style={{
                backgroundColor: "transparent",
                color: "white",
                height: 120,
              }}
              bodyStyle={{ padding: "20px" }}
            >
              <div className="flex justify-center">
                <img
                  className="w-[50px] h-[50px]"
                  src={cat.category_image}
                  alt={cat.category_name}
                />
              </div>
              <p className="!mt-[5px] text-sm">{cat.category_name}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategorySection;
