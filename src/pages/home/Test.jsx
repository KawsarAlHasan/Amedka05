import { Button } from "antd";
import React from "react";
import { FaDiscord } from "react-icons/fa";

function DiscordAuth() {
  const clientId = "1416113786724548620";
  const redirectUri = "http://localhost:5173/discord/callback";
  const scope = "identify email";

  const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&response_type=code&scope=${encodeURIComponent(scope)}`;

  const handleDiscordLogin = () => {
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      discordAuthUrl,
      "Discord Login",
      `width=${width},height=${height},top=${top},left=${left}`
    );

    window.addEventListener("message", (event) => {
      if (event.origin !== window.location.origin) return;

      if (event.data.type === "DISCORD_AUTH_SUCCESS") {
        console.log("Discord Auth Code:", event.data.code);
        popup.close();
      }
    });
  };

  return (
    <div>
      <Button
        className="text-center w-full !py-5 !font-semibold !rounded-full"
        onClick={handleDiscordLogin}
      >
        <FaDiscord size={20} /> Sign in with Discord
      </Button>
    </div>
  );
}

export default DiscordAuth;
