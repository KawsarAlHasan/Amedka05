import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import Cookies from "js-cookie";

const currencies = [
  "EUR",
  "USD",
  "AUD",
  "CAD",
  "GBP",
  "JPY",
  "CHF",
  "CNY",
  "KRW",
];
const agents = [
  { name: "Hipobuy", displayName: "Hipobuy" },
  { name: "CNFans", displayName: "CN fans" },
  { name: "Kobuy", displayName: "Kako Buy" },
  { name: "Oopbuy", displayName: "Oopbuy" },
  { name: "CSSbuy", displayName: "CSS" },
];

export default function InitialCurrencyAgent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const skipLogin = Cookies.get("skipLogin");
    const savedCurrency = Cookies.get("currency");
    const savedAgent = Cookies.get("agent");

    console.log("token", token);
    console.log("skipLogin", skipLogin);
    console.log("savedCurrency", savedCurrency);
    console.log("savedAgent", savedAgent);

    if ((token || skipLogin) && (!savedCurrency || !savedAgent)) {
      setIsModalOpen(true);
      console.log("Modal should open");
    } else {
      setIsModalOpen(false);
      console.log("Modal should NOT open");
    }
  }, []);

  const handleSave = () => {
    if (selectedCurrency && selectedAgent) {
      Cookies.set("currency", selectedCurrency, { expires: 7 });
      Cookies.set("agent", selectedAgent, { expires: 7 });
      setIsModalOpen(false);
    }
  };

  return (
    <Modal
      centered
      title={false}
      open={isModalOpen}
      footer={null}
      closable={false}
      className="preferences-modal rounded-lg"
      styles={{
        content: {
          background: "#1f1f1f",
          borderRadius: 12,
          border: "1px solid #696969",
          padding: "24px",
          maxWidth: "520px",
          margin: "0 auto",
          // boxShadow: "0 0 20px rgba(500, 300, 0, 0.4)",
           boxShadow: "0 0 50px rgba(128, 128, 128, 0.4)",
        },
        body: {
          color: "#ffffff",
          padding: 0,
        },
      }}
    >
      <div className="text-center text-white mb-6">
        <h1 className="text-2xl font-bolf mb-2">Select your preferences</h1>
      </div>

      <div className="flex flex-col gap-6">
        {/* Currency Selection */}
        <div>
          <h3 className="text-white text-sm font-medium mb-3">Currency</h3>
          <div className="flex flex-wrap gap-2">
            {currencies.map((currency) => (
              <button
                key={currency}
                onClick={() => setSelectedCurrency(currency)}
                className={`py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  selectedCurrency === currency
                    ? "bg-blue-500 text-white"
                    : "bg-[#2a2a2a] text-gray-300 hover:bg-[#363636]"
                }`}
              >
                {currency}
              </button>
            ))}
          </div>
        </div>

        {/* Agent Selection */}
        <div>
          <h3 className="text-white text-sm font-medium mb-3">Agent</h3>
          <div className="flex flex-col gap-2">
            {agents.map((agent) => (
              <div
                key={agent.name}
                onClick={() => setSelectedAgent(agent.name)}
                className={`p-3 rounded-md cursor-pointer transition-colors ${
                  selectedAgent === agent.name
                    ? "bg-blue-500 text-white"
                    : "bg-[#2a2a2a] text-gray-300 hover:bg-[#363636]"
                }`}
              >
                <span className="font-medium">{agent.displayName}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex flex-col gap-3 mt-2">
          <Button
            type="primary"
            className={`w-full !py-4 font-semibold !rounded-full border-none 
    ${
      !selectedCurrency || !selectedAgent
        ? "bg-gray-500 !text-gray-300 cursor-not-allowed"
        : "bg-blue-500 !text-white hover:bg-blue-600"
    }`}
            onClick={handleSave}
            disabled={!selectedCurrency || !selectedAgent}
          >
            Save Preferences
          </Button>
        </div>
      </div>
    </Modal>
  );
}
