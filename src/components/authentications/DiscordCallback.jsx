// src/pages/auth/DiscordCallback.jsx
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Spin } from "antd";
import { FaDiscord } from "react-icons/fa";

function DiscordCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("loading"); // loading | success | error
  const [message, setMessage] = useState("Authorizing with Discord...");
  const postedRef = useRef(false);
  const abortRef = useRef(null);

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      setStatus("error");
      setMessage(`Discord returned: ${error}`);
      return;
    }

    if (!code) {
      setStatus("error");
      setMessage("Missing authorization code.");
      return;
    }

    setStatus("loading");
    setMessage("Exchanging code for tokens...");

    const controller = new AbortController();
    abortRef.current = controller;

    (async () => {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/auth/discord",
          { code },
          {
            // withCredentials: true,
            signal: controller.signal,
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = res?.data;
        if (!data) {
          throw new Error("Empty response from server");
        }

        setStatus("success");
        setMessage("Login successful. Closing...");

        if (window.opener && !postedRef.current) {
          postedRef.current = true;
          window.opener.postMessage(
            { type: "DISCORD_AUTH_SUCCESS", payload: data },
            window.location.origin
          );
        }

        setTimeout(() => {
          if (!window.opener || window.opener.closed) {
            try {
              localStorage.setItem(
                "DISCORD_AUTH_PAYLOAD",
                JSON.stringify(data)
              );
            } catch (_) {}
            navigate("/", { replace: true });
          } else {
            window.close();
          }
        }, 500);
      } catch (err) {
        console.error(err);
        setStatus("error");
        setMessage(
          err?.response?.data?.message ||
            err?.message ||
            "Authentication failed."
        );
      }
    })();

    return () => {
      try {
        controller.abort();
      } catch {}
    };
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#5865F2]/10 via-transparent to-[#5865F2]/20 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white/80 backdrop-blur shadow-xl rounded-2xl p-8">
          <div className="flex items-center justify-center mb-4">
            <FaDiscord size={36} className="text-[#5865F2]" />
          </div>

          <h1 className="text-2xl font-bold text-center mb-2">
            Discord Authentication
          </h1>

          <p
            className={`text-center mb-6 ${
              status === "error"
                ? "text-red-600"
                : status === "success"
                ? "text-emerald-600"
                : "text-gray-700"
            }`}
          >
            {message}
          </p>

          <div className="flex flex-col items-center">
            {status === "loading" && (
              <>
                <Spin />
                <p className="text-xs text-gray-500 mt-3">
                  Please wait while we complete your sign-in…
                </p>
              </>
            )}

            {status === "success" && (
              <p className="text-sm text-emerald-700">
                You can close this window if it doesn't close automatically.
              </p>
            )}

            {status === "error" && (
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Something went wrong. You may close this window and try again.
                </p>
                <button
                  className="px-4 py-2 rounded-full font-medium bg-[#5865F2] text-white hover:opacity-90"
                  onClick={() => window.close()}
                >
                  Close Window
                </button>
              </div>
            )}
          </div>

          <div className="mt-6 text-center">
            <p className="text-[11px] text-gray-400">
              If this page is stuck, you can safely close it and retry from the
              app.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiscordCallback;
