import React from "react";
import { useGoogleLogin } from "@react-oauth/google";

import { API } from "../../api/api";
import { Button } from "antd";
import { FcGoogle } from "react-icons/fc";

function GoogleAuth() {
  const handleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await API.post("/auth/google", {
          token: tokenResponse.access_token,
        });
        console.log("User Data:", res.data);
      } catch (err) {
        console.error("Backend error:", err);
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
