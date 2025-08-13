import { Tabs } from "antd";
import React from "react";

import { FaCheck } from "react-icons/fa";

const { TabPane } = Tabs;

function Details() {
  const tableData = [
    { label: "Model", value: "#8786867" },
    { label: "Style", value: "Classic style" },
    { label: "Certificate", value: "ISO-898921212" },
    { label: "Size", value: "34mm x 450mm x 19mm" },
    { label: "Memory", value: "36GB RAM" },
  ];

  const features = [
    "Some great feature name here",
    "Lorem ipsum dolor sit amet, consectetur",
    "Duis aute irure dolor in reprehenderit",
    "Some great feature name here",
  ];
  return (
    <div className="">
      <div className="p-6 rounded-md border-2 border-gray-400 ">
        <Tabs defaultActiveKey="1" className="custom-tabs">
          <TabPane tab="Description" key="1">
            {/* Description text */}
            <p className="mb-4 leading-relaxed !text-white">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit, sed do eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Ut enim ad minim veniam, Quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
              dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur.
            </p>

            {/* Table */}
            <table className="w-full border border-gray-500 mb-6">
              <tbody>
                {tableData.map((row, index) => (
                  <tr
                    key={index}
                    className="border border-gray-500 !text-white"
                  >
                    <td className="p-2 border border-gray-500">{row.label}</td>
                    <td className="p-2 border border-gray-500">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Features List */}
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center !text-white">
                  <FaCheck className="!text-green-400 mr-2" /> {feature}
                </li>
              ))}
            </ul>
          </TabPane>
          <TabPane tab="Reviews" key="2">
            <p className="!text-white">No reviews yet.</p>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
}

export default Details;
