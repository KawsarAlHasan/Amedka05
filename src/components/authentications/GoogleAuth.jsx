import React from "react";
import { useGoogleLogin } from "@react-oauth/google";

import { API } from "../../api/api";
import { Button, message } from "antd";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

function GoogleAuth() {
  const handleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {

       
        const res = await API.post("/auth/google", {
          token: tokenResponse.access_token,
        });


        localStorage.setItem("token", res.data.token);

        message.success("Login successful!", 1).then(() => {
          window.location.reload();
        });
      } catch (err) {
        message.error( err?.response?.data?.message ||"Login failed. Please try again.");
      }
    },
    onError: () => console.error("Login Failed"),
  });

  return (
    <div>
      <Button
        color="default"
        className="text-center w-full !py-5 !font-semibold !rounded-full"
        onClick={() => handleLogin()}
      >
        <FcGoogle size={22} /> Sign in with Google
      </Button>
    </div>
  );
}

export default GoogleAuth;
