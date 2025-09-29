import React, { useState, useEffect } from "react";
import { Button, message, Modal } from "antd";
import Cookies from "js-cookie";
import { API, useGetAllAgents, useGetMyProfile } from "../api/api";
import EC from "../assets/ec.png";
import UC from "../assets/uc.png";
import AC from "../assets/ac.png";
import CC from "../assets/cc.png";
import YC from "../assets/yc.png";

const currencies = ["EUR", "USD", "AUD", "CAD", "YUAN"];

export default function InitialCurrencyAgent() {
  const { allAgents, isLoading, isError, error, refetch } = useGetAllAgents();
  const { myProfile } = useGetMyProfile();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const skipLogin = Cookies.get("skipLogin");
    const savedCurrency = Cookies.get("currency");
    const savedAgent = Cookies.get("agent");

    if ((token || skipLogin) && (!savedCurrency || !savedAgent)) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, []);

  const handleSave = async () => {
    if (selectedCurrency && selectedAgent) {
      Cookies.set("currency", selectedCurrency, { expires: 7 });
      Cookies.set("agent", selectedAgent, { expires: 7 });

      setIsModalOpen(false);
    }

    if (myProfile.id) {
      try {
        const response = await API.put(`/user/currency/${myProfile.id}`, {
          currency: selectedCurrency,
          agent: selectedAgent,
        });

        if (response.status === 200) {
          message.success("Agent and currency selection successful!");
        }
      } catch (error) {
        message.error(
          error?.response?.data?.message ||
            "Agent selection failed. Please try again."
        );
      }
    }

    window.location.reload();
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
                    ? "bg-blue-700 text-white"
                    : "bg-[#2a2a2a] text-gray-300 hover:bg-[#363636]"
                }`}
              >
                <img
                  className="w-[55px] h-[55px] bg-[#cfcbcb] rounded-full"
                  src={
                    currency === "EUR"
                      ? EC
                      : currency === "USD"
                      ? UC
                      : currency === "AUD"
                      ? AC
                      : currency === "YUAN"
                      ? YC
                      : CC
                  }
                  alt={currency}
                />

                {currency}
              </button>
            ))}
          </div>
        </div>

        {/* Agent Selection */}
        <div>
          <h3 className="text-white text-sm font-medium mb-3">Agent</h3>
          <div className="flex flex-col gap-2 ">
            {allAgents.map((agent) => (
              <div
                key={agent.agent_name}
                onClick={() => setSelectedAgent(agent.id)}
                className={`p-3  border border-[#696969]  flex items-center gap-1 rounded-md cursor-pointer transition-colors ${
                  selectedAgent === agent.id
                    ? "bg-blue-500 text-white"
                    : "bg-[#2a2a2a] text-gray-300 hover:bg-[#363636]"
                }`}
              >
                <img
                  className="w-[50px] h-[46px] rounded"
                  src={agent?.agent_image}
                  alt={agent.agent_name}
                />
                <span className="font-medium">{agent.agent_name}</span>
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
