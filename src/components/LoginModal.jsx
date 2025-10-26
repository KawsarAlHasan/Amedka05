import React, { useState, useEffect } from "react";
import { Button, message, Modal } from "antd";
import { FaDiscord, FaUserAlt } from "react-icons/fa";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import GoogleAuth from "./authentications/GoogleAuth";
import { GoogleOAuthProvider } from "@react-oauth/google";
import DiscordAuth from "./authentications/DiscordAuth";

export default function LoginModel({ isModalOpen, onClose }) {
  const navigate = useNavigate();

  const handleNotNow = () => {
    Cookies.set("skipLogin", "true", { expires: 1 });
    onClose();
    window.location.reload();
  };

  const handleEPLogin = () => {
    onClose(); 
    navigate("/login");
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className=" ">
      <Modal
        centered
        title={false}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        closable={true} 
        className="bg-[#1f1f1f] rounded-lg"
        styles={{
          content: {
            background: "#1f1f1f",
            borderRadius: 12,
            border: "1px solid #ffffff",
            boxShadow: "0 0 50px rgba(128, 128, 128, 0.4)",
          },
          body: { color: "#1f1f1f" },
        }}
      >
        <div className="text-center text-white">
          <h1 className="text-[28px] font-bold mb-2">Sign In</h1>
          <p className="text-gray-400 mb-6">
            Please login to continue using our website
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <GoogleOAuthProvider clientId="713219959723-ba4plbc7ameq57m7e1b9jatme3fah87o.apps.googleusercontent.com">
            <GoogleAuth onSuccess={onClose} /> 
          </GoogleOAuthProvider>

          <DiscordAuth onSuccess={onClose} /> 

          <Button
            color="default"
            className="text-center w-full !py-5 !font-semibold !rounded-full"
            onClick={handleEPLogin}
          >
            <FaUserAlt size={18} /> Login
          </Button>

          <Button
            color="default"
            className="text-center w-full !py-5 !font-semibold !rounded-full"
            onClick={handleNotNow}
          >
            Not Now
          </Button>
        </div>
      </Modal>
    </div>
  );
}