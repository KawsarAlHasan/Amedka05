import { Tabs } from "antd";
import { FaCheck } from "react-icons/fa";
const { TabPane } = Tabs;

function Details({ product }) {
  return (
    <div className="">
      <div className="p-6 rounded-md border-2 border-gray-400 ">
        <Tabs defaultActiveKey="1" className="custom-tabs">
          <TabPane tab="Description" key="1">
            {/* Description text */}
            <p className="mb-4 leading-relaxed !text-white">
              {product?.description || "No description available."}
            </p>

            {/* Table */}
            <table className="w-full border border-gray-500 mb-6">
              <tbody>
                {product?.colors && (
                  <tr className="border border-gray-500 !text-white">
                    <td className="p-2 border border-gray-500">Colors</td>
                    <td className="p-2 border border-gray-500">
                      {product.colors.join(", ")}
                    </td>
                  </tr>
                )}

                {product?.sizes && (
                  <tr className="border border-gray-500 !text-white">
                    <td className="p-2 border border-gray-500">Sizes</td>
                    <td className="p-2 border border-gray-500">
                      {product.sizes.join(", ")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </TabPane>
          {/* <TabPane tab="Reviews" key="2">
            <p className="!text-white">No reviews yet.</p>
          </TabPane> */}
        </Tabs>
      </div>
    </div>
  );
}

export default Details;
